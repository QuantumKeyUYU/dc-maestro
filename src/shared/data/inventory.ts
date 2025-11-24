import { InventoryItem } from '../models/InventoryItem';

export const inventoryItems: InventoryItem[] = [
  {
    id: 'inv-001',
    sku: 'UPS-BATT-96V',
    name: 'Батарейный модуль 96V',
    category: 'spare_part',
    quantityOnHand: 4,
    minThreshold: 6,
    unit: 'pcs',
    siteId: 'msk-1'
  },
  {
    id: 'inv-002',
    sku: 'CRAC-FLTR-XL',
    name: 'Фильтр CRAC XL',
    category: 'consumable',
    quantityOnHand: 2,
    minThreshold: 5,
    unit: 'pcs',
    siteId: 'spb-1'
  },
  {
    id: 'inv-003',
    sku: 'CAB-FO-100M',
    name: 'Оптический патч-корд 100м',
    category: 'tool',
    quantityOnHand: 10,
    minThreshold: 2,
    unit: 'm',
    siteId: null
  },
  {
    id: 'inv-004',
    sku: 'OIL-GEN-20L',
    name: 'Масло для генератора 20л',
    category: 'consumable',
    quantityOnHand: 1,
    minThreshold: 3,
    unit: 'l',
    siteId: 'nn-1'
  },
  {
    id: 'inv-005',
    sku: 'COOL-GLY-25L',
    name: 'Охлаждающая жидкость 25л',
    category: 'consumable',
    quantityOnHand: 0,
    minThreshold: 2,
    unit: 'can',
    siteId: 'spb-1'
  },
  {
    id: 'inv-006',
    sku: 'PPE-ARC-SET',
    name: 'Комплект СИЗ для ВН',
    category: 'safety',
    quantityOnHand: 3,
    minThreshold: 5,
    unit: 'sets',
    siteId: null
  }
];
