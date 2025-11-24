import { StaffMember } from '../models/StaffMember';

export const staffMembers: StaffMember[] = [
  {
    id: 'st-001',
    fullName: 'Ирина Соколова',
    role: 'manager',
    skills: ['budgeting', 'capacity planning'],
    grade: 4,
    hourlyRate: 3200,
    assignedSiteIds: ['msk-1', 'spb-1']
  },
  {
    id: 'st-002',
    fullName: 'Максим Панов',
    role: 'shift_lead',
    skills: ['operations', 'incident response'],
    grade: 3,
    hourlyRate: 2200,
    assignedSiteIds: ['msk-1']
  },
  {
    id: 'st-003',
    fullName: 'Дарья Кузнецова',
    role: 'engineer',
    skills: ['power', 'cooling'],
    grade: 3,
    hourlyRate: 1900,
    assignedSiteIds: ['spb-1', 'nn-1']
  },
  {
    id: 'st-004',
    fullName: 'Владимир Романов',
    role: 'technician',
    skills: ['network', 'hardware'],
    grade: 2,
    hourlyRate: 1400,
    assignedSiteIds: ['nsk-1']
  },
  {
    id: 'st-005',
    fullName: 'Светлана Тимофеева',
    role: 'engineer',
    skills: ['fire safety', 'monitoring'],
    grade: 2,
    hourlyRate: 1500,
    assignedSiteIds: ['nn-1', 'nsk-1']
  }
];
