export interface PurchaseOrderItem {
  inventoryItemId: string;
  quantity: number;
  pricePerUnit: number;
}

export interface PurchaseOrder {
  id: string;
  supplierName: string;
  createdAt: Date;
  status: 'draft' | 'sent' | 'received' | 'cancelled';
  items: PurchaseOrderItem[];
}
