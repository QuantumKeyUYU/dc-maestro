export interface DataCenterSite {
  id: string;
  name: string;
  region: string;
  status: 'healthy' | 'warning' | 'critical';
  totalCapacityKw: number;
  usedCapacityKw: number;
  totalRacks: number;
  usedRacks: number;
  monitoringPeriodHours: number;
  downtimeMinutes: number;
  incidentsLastPeriod: number;
  mttrMinutes: number;
  energyCostPerKwh: number;
  energyConsumedKwh: number;
}
