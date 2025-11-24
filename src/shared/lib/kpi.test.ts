import { describe, expect, it } from 'vitest';
import { capacityLoadIndex, globalOperationalStrainIndex, opsLoadIndex, reliabilityScore, siteFinancialHealth, uptimePercent } from './kpi';
import { DataCenterSite } from '../models/DataCenterSite';
import { Shift } from '../models/Shift';
import { FinancialRecord } from '../models/FinancialRecord';

const baseSite: DataCenterSite = {
  id: 'test',
  name: 'Test Site',
  region: 'Test',
  status: 'healthy',
  totalCapacityKw: 100,
  usedCapacityKw: 60,
  totalRacks: 10,
  usedRacks: 6,
  monitoringPeriodHours: 720,
  downtimeMinutes: 10,
  incidentsLastPeriod: 2,
  mttrMinutes: 30,
  energyCostPerKwh: 5,
  energyConsumedKwh: 1000
};

const sampleShifts: Shift[] = [
  {
    id: 'shift1',
    siteId: 'test',
    date: '2024-11-22',
    startTime: '08:00',
    endTime: '20:00',
    plannedStaffIds: ['a', 'b'],
    actualStaffIds: ['a', 'b', 'c'],
    overtimeHoursTotal: 2
  }
];

const sampleFinancial: FinancialRecord[] = [
  {
    id: 'fr-1',
    siteId: 'test',
    date: new Date(),
    type: 'opex',
    category: 'energy',
    amountRub: 400,
    description: 'Energy'
  },
  {
    id: 'fr-2',
    siteId: 'test',
    date: new Date(),
    type: 'opex',
    category: 'maintenance',
    amountRub: 600,
    description: 'Maintenance'
  }
];

describe('kpi calculations', () => {
  it('calculates uptime and reliability in normal range', () => {
    expect(uptimePercent(baseSite)).toBeCloseTo(99.99, 1);
    expect(reliabilityScore(baseSite)).toBeGreaterThan(80);
  });

  it('handles edge cases with zero downtime and capacity', () => {
    const zeroSite: DataCenterSite = { ...baseSite, downtimeMinutes: 0, usedCapacityKw: 0, usedRacks: 0 };
    expect(uptimePercent(zeroSite)).toBe(100);
    expect(capacityLoadIndex(zeroSite)).toBe(0);
  });

  it('calculates operational load', () => {
    const load = opsLoadIndex(baseSite, sampleShifts);
    expect(load).toBeGreaterThan(50);
  });

  it('computes financial health near target', () => {
    const health = siteFinancialHealth(baseSite, sampleFinancial);
    expect(health).toBeGreaterThan(80);
  });

  it('builds global OSI', () => {
    const osi = globalOperationalStrainIndex([baseSite], sampleShifts, [baseSite], sampleFinancial);
    expect(osi.value).toBeGreaterThan(0);
    expect(['stable', 'watch', 'critical']).toContain(osi.category);
  });
});
