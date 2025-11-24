export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'spare_part' | 'consumable' | 'tool';
  quantityOnHand: number;
  minThreshold: number;
  unit: 'pcs' | 'm' | 'kg' | 'l';
  siteId: string | null;
}
