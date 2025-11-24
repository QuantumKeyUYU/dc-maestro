import { useEffect, useState } from 'react';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { Table } from '../../shared/components/Table';
import { inventoryItems } from '../../shared/data/inventory';
import { purchaseOrders } from '../../shared/data/purchaseOrders';
import { StatusPill } from '../../shared/components/StatusPill';
import { strings } from '../../shared/lib/strings';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';
import { useLocation } from 'react-router-dom';

export function InventoryPage() {
  const [showItems, setShowItems] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const locationState = location.state as { siteId?: string } | undefined;

  const itemsTable = useTableSortAndFilter(inventoryItems, ['sku', 'name', 'siteId', 'category'], 'name');
  const poTable = useTableSortAndFilter(purchaseOrders, ['id', 'supplierName', 'status'], 'createdAt');

  useEffect(() => {
    if (locationState?.siteId) {
      itemsTable.setSearchQuery(locationState.siteId);
    }
  }, [locationState?.siteId, itemsTable.setSearchQuery]);

  return (
    <div className="space-y-6">
      <SectionHeader title={strings.inventory.title} description={strings.inventory.description} />

      <Card title="Складские позиции">
        <div className="flex justify-between items-center mb-3">
          <input
            value={itemsTable.searchQuery}
            onChange={(e) => itemsTable.setSearchQuery(e.target.value)}
            placeholder="Поиск по SKU, названию или площадке"
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary/60"
          />
          <div className="text-xs text-gray-400">Клик по заголовку — сортировка</div>
        </div>
        <Table>
          <thead className="text-xs uppercase text-gray-400">
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
            {itemsTable.sortedAndFiltered.map((item) => {
              const low = item.quantityOnHand <= item.minThreshold;
              return (
                <tr key={item.id} className={`border-t border-gray-800 ${low ? 'bg-warning/10' : ''}`}>
                  <td className="py-2 pr-4">{item.sku}</td>
                  <td className="py-2 pr-4 text-gray-300">{item.name}</td>
                  <td className="py-2 pr-4">{item.category}</td>
                  <td className="py-2 pr-4">{item.siteId ?? 'Центральный склад'}</td>
                  <td className="py-2 pr-4">{item.quantityOnHand} {item.unit}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>

      <Card title="Закупки">
        <div className="flex justify-between items-center mb-3">
          <input
            value={poTable.searchQuery}
            onChange={(e) => poTable.setSearchQuery(e.target.value)}
            placeholder="Поиск по поставщику или статусу"
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary/60"
          />
          <div className="text-xs text-gray-400">Клик по строке статуса — подсказка</div>
        </div>
        <Table>
          <thead className="text-xs uppercase text-gray-400">
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
              <tr key={po.id} className="border-t border-gray-800">
                <td className="py-2 pr-4">{po.id}</td>
                <td className="py-2 pr-4 text-gray-300">{po.supplierName}</td>
                <td className="py-2 pr-4">
                  <StatusPill
                    label={po.status === 'received' ? 'Получено' : po.status === 'draft' ? 'Черновик' : 'В пути'}
                    tone={po.status === 'received' ? 'success' : po.status === 'draft' ? 'neutral' : 'info'}
                  />
                </td>
                <td className="py-2 pr-4">{new Date(po.createdAt).toLocaleDateString('ru-RU')}</td>
                <td className="py-2 pr-4">
                  <button
                    className="text-primary underline"
                    onClick={() => setShowItems((prev) => ({ ...prev, [po.id]: !prev[po.id] }))}
                  >
                    {showItems[po.id] ? 'Скрыть' : 'Показать'} ({po.items.length})
                  </button>
                  {showItems[po.id] && (
                    <ul className="text-xs text-gray-300 mt-2 space-y-1">
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
