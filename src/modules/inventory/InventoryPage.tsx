import { useEffect, useRef, useState } from 'react';
import { Card } from '../../shared/components/Card';
import { Table } from '../../shared/components/Table';
import { inventoryItems } from '../../shared/data/inventory';
import { purchaseOrders } from '../../shared/data/purchaseOrders';
import { StatusPill } from '../../shared/components/StatusPill';
import { strings } from '../../shared/lib/strings';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';
import { useLocation } from 'react-router-dom';
import { getStatusLabel, getStatusTone } from '../../shared/lib/status';

export function InventoryPage() {
  const [showItems, setShowItems] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const locationState = location.state as { siteId?: string; filter?: 'lowStock' } | undefined;
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const itemsRef = useRef<HTMLDivElement>(null);

  const itemsTable = useTableSortAndFilter(inventoryItems, ['sku', 'name', 'siteId', 'category'], 'name');
  const poTable = useTableSortAndFilter(purchaseOrders, ['id', 'supplierName', 'status'], 'createdAt');

  useEffect(() => {
    if (locationState?.siteId) {
      itemsTable.setSearchQuery(locationState.siteId);
    }
    if (locationState?.filter === 'lowStock') {
      setLowStockOnly(true);
      itemsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [locationState?.siteId, locationState?.filter, itemsTable.setSearchQuery]);

  return (
    <div className="space-y-8">
      <Card title="Складские позиции">
        <div className="flex justify-between items-center mb-4" ref={itemsRef}>
          {lowStockOnly ? (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-text-primary shadow-inner">
                Фильтр: позиции на минимуме
              </span>
              <button
                type="button"
                className="text-xs text-accent-primary hover:text-accent-muted transition"
                onClick={() => setLowStockOnly(false)}
              >
                Сбросить
              </button>
            </div>
          ) : (
            <span className="text-xs text-text-dim">Показываем весь склад</span>
          )}
          <input
            value={itemsTable.searchQuery}
            onChange={(e) => itemsTable.setSearchQuery(e.target.value)}
            placeholder="Поиск по SKU, названию или площадке"
            className="bg-gradient-to-b from-bg-surface/90 to-bg-surfaceSoft/88 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent-primary/60 focus:shadow-[0_0_0_2px_rgba(62,236,226,0.12)]"
          />
          <div className="text-xs text-text-dim">Клик по заголовку — сортировка</div>
        </div>
        <Table framed={false}>
          <thead>
            <tr>
              <th className="text-left py-2 cursor-pointer" onClick={() => itemsTable.requestSort('sku')}>
                SKU {itemsTable.sortConfig.key === 'sku' ? (itemsTable.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left py-2 cursor-pointer" onClick={() => itemsTable.requestSort('name')}>
                Название {itemsTable.sortConfig.key === 'name' ? (itemsTable.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left py-2">Категория</th>
              <th className="text-left py-2">Площадка</th>
              <th className="text-left py-2 cursor-pointer" onClick={() => itemsTable.requestSort('quantityOnHand')}>
                Количество {itemsTable.sortConfig.key === 'quantityOnHand' ? (itemsTable.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {itemsTable.sortedAndFiltered
              .filter((item) => (lowStockOnly ? item.quantityOnHand <= item.minThreshold : true))
              .map((item) => {
              const low = item.quantityOnHand <= item.minThreshold;
              return (
                <tr key={item.id} className={`border-t border-border-subtle/40 ${low ? 'bg-status-warning/10' : ''}`}>
                  <td className="py-2 pr-4 text-text-primary">{item.sku}</td>
                  <td className="py-2 pr-4 text-text-primary">{item.name}</td>
                  <td className="py-2 pr-4 text-text-muted">{item.category}</td>
                  <td className="py-2 pr-4 text-text-muted">{item.siteId ?? 'Центральный склад'}</td>
                  <td className="py-2 pr-4 text-text-primary">{item.quantityOnHand} {item.unit}</td>
                </tr>
              );
              })}
          </tbody>
        </Table>
      </Card>

      <Card title="Закупки">
        <div className="flex justify-between items-center mb-4">
          <input
            value={poTable.searchQuery}
            onChange={(e) => poTable.setSearchQuery(e.target.value)}
            placeholder="Поиск по поставщику или статусу"
            className="bg-gradient-to-b from-bg-surface/90 to-bg-surfaceSoft/88 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent-primary/60 focus:shadow-[0_0_0_2px_rgba(62,236,226,0.12)]"
          />
          <div className="text-xs text-text-dim">Клик по строке статуса — подсказка</div>
        </div>
        <Table framed={false}>
          <thead>
            <tr>
              <th className="text-left py-2 cursor-pointer" onClick={() => poTable.requestSort('id')}>
                ID {poTable.sortConfig.key === 'id' ? (poTable.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left py-2">Поставщик</th>
              <th className="text-left py-2">Статус</th>
              <th className="text-left py-2">Создано</th>
              <th className="text-left py-2">Позиции</th>
            </tr>
          </thead>
          <tbody>
            {poTable.sortedAndFiltered.map((po) => (
              <tr key={po.id} className="border-t border-border-subtle/40">
                <td className="py-2 pr-4 text-text-primary">{po.id}</td>
                <td className="py-2 pr-4 text-text-primary">{po.supplierName}</td>
                <td className="py-2 pr-4">
                  <StatusPill label={getStatusLabel(po.status)} tone={getStatusTone(po.status)} />
                </td>
                <td className="py-2 pr-4 text-text-muted">{new Date(po.createdAt).toLocaleDateString('ru-RU')}</td>
                <td className="py-2 pr-4">
                  <button
                    className="text-accent-primary hover:text-accent-muted underline-offset-4 underline transition"
                    onClick={() => setShowItems((prev) => ({ ...prev, [po.id]: !prev[po.id] }))}
                  >
                    {showItems[po.id] ? 'Скрыть' : 'Показать'} ({po.items.length})
                  </button>
                  {showItems[po.id] && (
                    <ul className="text-xs text-text-primary mt-2 space-y-1">
                      {po.items.map((item, idx) => (
                        <li key={idx}>
                          {item.inventoryItemId}: {item.quantity} шт × {item.pricePerUnit.toLocaleString('ru-RU')} ₽
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
