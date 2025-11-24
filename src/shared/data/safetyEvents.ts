import { SafetyEvent } from '../models/SafetyEvent';

export const safetyEvents: SafetyEvent[] = [
  {
    id: 'safe-001',
    siteId: 'msk-1',
    type: 'training',
    title: 'Учебная тревога по пожару',
    date: new Date('2024-11-25'),
    status: 'scheduled',
    responsibleStaffId: 'st-005'
  },
  {
    id: 'safe-002',
    siteId: 'spb-1',
    type: 'inspection',
    title: 'Проверка клапанов газового пожаротушения',
    date: new Date('2024-11-10'),
    status: 'done',
    responsibleStaffId: 'st-003'
  },
  {
    id: 'safe-003',
    siteId: 'nn-1',
    type: 'incident',
    title: 'Несоблюдение процедуры LOTO',
    date: new Date('2024-11-05'),
    status: 'overdue',
    responsibleStaffId: null
  },
  {
    id: 'safe-004',
    siteId: null,
    type: 'document_expiry',
    title: 'Актуализация инструкций по ЭБ',
    date: new Date('2024-11-30'),
    status: 'scheduled',
    responsibleStaffId: 'st-001'
  },
  {
    id: 'safe-005',
    siteId: 'spb-1',
    type: 'training',
    title: 'Просрочен инструктаж по работам на высоте',
    date: new Date('2024-11-15'),
    status: 'overdue',
    responsibleStaffId: 'st-004'
  }
];
