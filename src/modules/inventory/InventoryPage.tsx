import { useState } from 'react';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { Table } from '../../shared/components/Table';
import { inventoryItems } from '../../shared/data/inventory';
import { purchaseOrders } from '../../shared/data/purchaseOrders';
import { StatusPill } from '../../shared/components/StatusPill';

export function InventoryPage() {
  const [showItems, setShowItems] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6">
      <SectionHeader title="Inventory" description="Остатки и закупки" />

      <Card title="Складские позиции">
        <Table>
          <thead className="text-xs uppercase text-gray-400">
            <tr>
              <th className="text-left py-2">SKU</th>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Category</th>
              <th className="text-left py-2">Site</th>
              <th className="text-left py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => {
              const low = item.quantityOnHand <= item.minThreshold;
              return (
                <tr key={item.id} className={`border-t border-gray-800 ${low ? 'bg-amber-900/20' : ''}`}>
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

      <Card title="Purchase Orders">
        <Table>
          <thead className="text-xs uppercase text-gray-400">
            <tr>
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Supplier</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Created</th>
              <th className="text-left py-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((po) => (
              <tr key={po.id} className="border-t border-gray-800">
                <td className="py-2 pr-4">{po.id}</td>
                <td className="py-2 pr-4 text-gray-300">{po.supplierName}</td>
                <td className="py-2 pr-4">
                  <StatusPill
                    label={po.status}
                    tone={po.status === 'received' ? 'success' : po.status === 'draft' ? 'neutral' : 'info'}
                  />
                </td>
                <td className="py-2 pr-4">{new Date(po.createdAt).toLocaleDateString('ru-RU')}</td>
                <td className="py-2 pr-4">
                  <button
                    className="text-sky-300 underline"
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
