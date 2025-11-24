import { DataCenterSite } from '../models/DataCenterSite';
import { Shift } from '../models/Shift';
import { FinancialRecord } from '../models/FinancialRecord';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function uptimePercent(site: DataCenterSite): number {
  const totalMinutes = site.monitoringPeriodHours * 60;
  const uptimeMinutes = Math.max(0, totalMinutes - site.downtimeMinutes);
  return (100 * uptimeMinutes) / totalMinutes;
}

export function reliabilityScore(site: DataCenterSite): number {
  const u = uptimePercent(site) / 100;
  const mNorm = clamp(site.mttrMinutes / 60, 0, 1);
  const mEff = 1 - mNorm;
  return (0.7 * u + 0.3 * mEff) * 100;
}

export function capacityLoadIndex(site: DataCenterSite): number {
  const powerLoad = site.usedCapacityKw / site.totalCapacityKw;
  const rackLoad = site.usedRacks / site.totalRacks;
  return 100 * (0.6 * powerLoad + 0.4 * rackLoad);
}

export function opsLoadIndex(site: DataCenterSite, siteShifts: Shift[]): number {
  const relevant = siteShifts.filter((shift) => shift.siteId === site.id);
  const plannedHours = relevant.reduce((sum, shift) => {
    const start = Number.parseInt(shift.startTime.split(':')[0], 10);
    const end = Number.parseInt(shift.endTime.split(':')[0], 10);
    const duration = (end >= start ? end - start : 24 - start + end) || 0;
    return sum + duration * shift.plannedStaffIds.length;
  }, 0);

  const actualHours = relevant.reduce((sum, shift) => {
    const start = Number.parseInt(shift.startTime.split(':')[0], 10);
    const end = Number.parseInt(shift.endTime.split(':')[0], 10);
    const duration = (end >= start ? end - start : 24 - start + end) || 0;
    return sum + duration * shift.actualStaffIds.length;
  }, 0);

  const overtimeHours = relevant.reduce((sum, shift) => sum + shift.overtimeHoursTotal, 0);
  const utilization = actualHours / Math.max(plannedHours, 1);
  const overtimeRatio = overtimeHours / Math.max(actualHours, 1);
  const uClamped = clamp(utilization, 0, 1.5);
  return (100 * clamp(0.7 * (uClamped / 1.0) + 0.3 * overtimeRatio, 0, 2)) / 2;
}

export function siteFinancialHealth(site: DataCenterSite, records: FinancialRecord[]): number {
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1);

  const recent = records.filter((r) => r.siteId === site.id && r.date >= oneMonthAgo);
  const totalOpex = recent.filter((r) => r.type === 'opex').reduce((sum, r) => sum + r.amountRub, 0);
  const totalEnergyOpex = recent
    .filter((r) => r.category === 'energy' && r.type === 'opex')
    .reduce((sum, r) => sum + r.amountRub, 0);

  const energyShare = totalEnergyOpex / Math.max(totalOpex, 1);
  const target = 0.4;
  const penalty = clamp(Math.abs(energyShare - target) / 0.2, 0, 1);
  return (1 - penalty) * 100;
}

export function globalOperationalStrainIndex(
  sites: DataCenterSite[],
  siteShifts: Shift[],
  incidentsLastPeriod: DataCenterSite[],
  records: FinancialRecord[]
): { value: number; category: 'stable' | 'watch' | 'critical' } {
  const reliabilityAvg =
    sites.reduce((sum, site) => sum + reliabilityScore(site), 0) / Math.max(sites.length, 1);
  const opsAvg = sites.reduce((sum, site) => sum + opsLoadIndex(site, siteShifts), 0) / Math.max(sites.length, 1);
  const incidentRate =
    incidentsLastPeriod.reduce(
      (sum, site) => sum + site.incidentsLastPeriod * ((30 * 24) / site.monitoringPeriodHours),
      0
    ) / Math.max(incidentsLastPeriod.length, 1);

  const Rn = 1 - reliabilityAvg / 100;
  const On = opsAvg / 100;
  const In = clamp(incidentRate / 10, 0, 2);
  const osi = 100 * clamp(0.5 * Rn + 0.3 * On + 0.2 * (In / 2), 0, 1);

  let category: 'stable' | 'watch' | 'critical' = 'stable';
  if (osi >= 60) category = 'critical';
  else if (osi >= 30) category = 'watch';

  return { value: osi, category };
}
