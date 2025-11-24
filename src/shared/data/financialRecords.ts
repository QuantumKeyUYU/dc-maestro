import { FinancialRecord } from '../models/FinancialRecord';

export const financialRecords: FinancialRecord[] = [
  {
    id: 'fin-001',
    siteId: 'msk-1',
    date: new Date('2024-11-05'),
    type: 'opex',
    category: 'energy',
    amountRub: 4800000,
    description: 'Потребление энергии за октябрь'
  },
  {
    id: 'fin-002',
    siteId: 'msk-1',
    date: new Date('2024-11-08'),
    type: 'opex',
    category: 'maintenance',
    amountRub: 350000,
    description: 'Контракт на обслуживание UPS'
  },
  {
    id: 'fin-003',
    siteId: 'spb-1',
    date: new Date('2024-11-07'),
    type: 'opex',
    category: 'energy',
    amountRub: 3200000,
    description: 'Энергия за октябрь'
  },
  {
    id: 'fin-004',
    siteId: 'nn-1',
    date: new Date('2024-11-15'),
    type: 'capex',
    category: 'hardware',
    amountRub: 2100000,
    description: 'Закупка модулей хранения'
  },
  {
    id: 'fin-005',
    siteId: null,
    date: new Date('2024-11-10'),
    type: 'opex',
    category: 'staff',
    amountRub: 5400000,
    description: 'ФОТ ноября'
  },
  {
    id: 'fin-006',
    siteId: 'spb-1',
    date: new Date('2024-11-16'),
    type: 'opex',
    category: 'maintenance',
    amountRub: 460000,
    description: 'Сервисное обслуживание охлаждения'
  }
];
