import { Asset } from '../models/Asset';

export const assets: Asset[] = [
  {
    id: 'as-001',
    siteId: 'msk-1',
    type: 'UPS',
    name: 'ABB Conceptpower DPA 500',
    criticality: 1,
    commissioningDate: new Date('2021-06-01'),
    lastMaintenanceDate: new Date('2024-10-15'),
    nextPlannedMaintenanceDate: new Date('2025-01-15'),
    failureCountLifetime: 1
  },
  {
    id: 'as-002',
    siteId: 'spb-1',
    type: 'CRAC',
    name: 'Vertiv Liebert DSE 120kW',
    criticality: 2,
    commissioningDate: new Date('2020-03-20'),
    lastMaintenanceDate: new Date('2024-09-01'),
    nextPlannedMaintenanceDate: new Date('2024-12-15'),
    failureCountLifetime: 3
  },
  {
    id: 'as-003',
    siteId: 'nn-1',
    type: 'Generator',
    name: 'FG Wilson 500 kVA',
    criticality: 1,
    commissioningDate: new Date('2019-11-10'),
    lastMaintenanceDate: new Date('2024-08-20'),
    nextPlannedMaintenanceDate: new Date('2024-11-30'),
    failureCountLifetime: 4
  },
  {
    id: 'as-004',
    siteId: 'nsk-1',
    type: 'PDU',
    name: 'Schneider Electric Galaxy',
    criticality: 2,
    commissioningDate: new Date('2022-05-01'),
    lastMaintenanceDate: new Date('2024-10-28'),
    nextPlannedMaintenanceDate: new Date('2025-02-01'),
    failureCountLifetime: 0
  },
  {
    id: 'as-005',
    siteId: 'msk-1',
    type: 'Rack',
    name: 'RackLine 48U',
    criticality: 3,
    commissioningDate: new Date('2023-01-15'),
    lastMaintenanceDate: null,
    nextPlannedMaintenanceDate: new Date('2025-03-01'),
    failureCountLifetime: 0
  }
];
