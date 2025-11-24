import { Incident } from '../models/Incident';

export const incidents: Incident[] = [
  {
    id: 'inc-001',
    siteId: 'nn-1',
    severity: 'critical',
    startedAt: new Date('2024-11-10T03:15:00Z'),
    resolvedAt: new Date('2024-11-10T06:40:00Z'),
    category: 'power',
    description: 'Отказ ДГУ при тестовом запуске, переход на резервную линию.'
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
    severity: 'major',
    startedAt: new Date('2024-11-22T04:10:00Z'),
    resolvedAt: null,
    category: 'security',
    description: 'Проверка инцидента доступа в подсеть управления.'
  }
];
