import { WorkOrder } from '../models/WorkOrder';

export const workOrders: WorkOrder[] = [
  {
    id: 'wo-001',
    assetId: 'as-003',
    siteId: 'nn-1',
    type: 'Repair',
    status: 'in_progress',
    priority: 1,
    createdAt: new Date('2024-11-05T10:00:00Z'),
    dueDate: new Date('2024-11-18T00:00:00Z'),
    completedAt: null,
    assignedStaffId: 'st-003',
    description: 'Замена форсунки топливной системы генератора.'
  },
  {
    id: 'wo-002',
    assetId: 'as-002',
    siteId: 'spb-1',
    type: 'PM',
    status: 'open',
    priority: 2,
    createdAt: new Date('2024-11-12T08:00:00Z'),
    dueDate: new Date('2024-11-20T00:00:00Z'),
    completedAt: null,
    assignedStaffId: 'st-004',
    description: 'Очистка фильтров CRAC и проверка автоматики.'
  },
  {
    id: 'wo-003',
    assetId: 'as-001',
    siteId: 'msk-1',
    type: 'Inspection',
    status: 'done',
    priority: 3,
    createdAt: new Date('2024-11-01T07:00:00Z'),
    dueDate: new Date('2024-11-10T00:00:00Z'),
    completedAt: new Date('2024-11-08T15:00:00Z'),
    assignedStaffId: 'st-002',
    description: 'Плановая инспекция UPS блока А.'
  },
  {
    id: 'wo-004',
    assetId: 'as-004',
    siteId: 'spb-1',
    type: 'Repair',
    status: 'open',
    priority: 1,
    createdAt: new Date('2024-11-18T09:00:00Z'),
    dueDate: new Date('2024-11-22T00:00:00Z'),
    completedAt: null,
    assignedStaffId: 'st-005',
    description: 'Замена датчика утечки в зале B.'
  }
];
