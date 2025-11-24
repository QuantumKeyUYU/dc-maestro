import { Shift } from '../models/Shift';

export const shifts: Shift[] = [
  {
    id: 'sh-001',
    siteId: 'msk-1',
    date: '2024-11-22',
    startTime: '08:00',
    endTime: '20:00',
    plannedStaffIds: ['st-002', 'st-003', 'st-004'],
    actualStaffIds: ['st-002', 'st-003', 'st-004'],
    overtimeHoursTotal: 1.5
  },
  {
    id: 'sh-002',
    siteId: 'spb-1',
    date: '2024-11-22',
    startTime: '08:00',
    endTime: '20:00',
    plannedStaffIds: ['st-003', 'st-004'],
    actualStaffIds: ['st-003'],
    overtimeHoursTotal: 3
  },
  {
    id: 'sh-003',
    siteId: 'nn-1',
    date: '2024-11-22',
    startTime: '08:00',
    endTime: '20:00',
    plannedStaffIds: ['st-005', 'st-004'],
    actualStaffIds: ['st-005', 'st-004'],
    overtimeHoursTotal: 0.5
  },
  {
    id: 'sh-004',
    siteId: 'nsk-1',
    date: '2024-11-22',
    startTime: '20:00',
    endTime: '08:00',
    plannedStaffIds: ['st-004'],
    actualStaffIds: ['st-004'],
    overtimeHoursTotal: 0
  }
];
