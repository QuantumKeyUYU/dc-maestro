export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'spare_part' | 'consumable' | 'tool' | 'safety';
  quantityOnHand: number;
  minThreshold: number;
  unit: 'pcs' | 'm' | 'kg' | 'l' | 'can' | 'sets';
  siteId: string | null;
}
