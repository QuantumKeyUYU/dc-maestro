import { PurchaseOrder } from '../models/PurchaseOrder';

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: 'po-001',
    supplierName: 'ЭнергоСнаб',
    createdAt: new Date('2024-11-15'),
    status: 'sent',
    items: [
      { inventoryItemId: 'inv-001', quantity: 4, pricePerUnit: 55000 },
      { inventoryItemId: 'inv-004', quantity: 6, pricePerUnit: 7200 }
    ]
  },
  {
    id: 'po-002',
    supplierName: 'КлиматПроф',
    createdAt: new Date('2024-11-12'),
    status: 'draft',
    items: [{ inventoryItemId: 'inv-002', quantity: 8, pricePerUnit: 2800 }]
  }
];
