import { Incident } from '../models/Incident';

export const incidents: Incident[] = [
  {
    id: 'inc-001',
    siteId: 'nn-1',
    severity: 'critical',
    startedAt: new Date('2024-11-23T03:15:00Z'),
    resolvedAt: null,
    category: 'power',
    description: 'НН-1: отказ ДГУ на старте, нагрузка частично переведена на сеть.'
  },
  {
    id: 'inc-002',
    siteId: 'spb-1',
    severity: 'major',
    startedAt: new Date('2024-11-18T12:00:00Z'),
    resolvedAt: new Date('2024-11-18T13:45:00Z'),
    category: 'cooling',
    description: 'Повышение температуры в зале А из-за отказа клапана.'
  },
  {
    id: 'inc-003',
    siteId: 'msk-1',
    severity: 'minor',
    startedAt: new Date('2024-11-20T09:30:00Z'),
    resolvedAt: new Date('2024-11-20T10:00:00Z'),
    category: 'network',
    description: 'Кратковременный рост задержек на магистральном канале.'
  },
  {
    id: 'inc-004',
    siteId: 'nsk-1',
    severity: 'critical',
    startedAt: new Date('2024-11-22T04:10:00Z'),
    resolvedAt: null,
    category: 'security',
    description: 'ЕКБ-1: подозрение на несанкционированный доступ в подсеть управления.'
  },
  {
    id: 'inc-005',
    siteId: 'spb-1',
    severity: 'critical',
    startedAt: new Date('2024-11-24T07:45:00Z'),
    resolvedAt: null,
    category: 'cooling',
    description: 'СПБ-1: аварийный рост температуры в зале B, резервное охлаждение задействовано.'
  }
];
