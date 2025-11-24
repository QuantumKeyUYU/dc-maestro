import { DataCenterSite } from '../models/DataCenterSite';

export const sites: DataCenterSite[] = [
  {
    id: 'msk-1',
    name: 'Москва — Север',
    region: 'Москва',
    status: 'healthy',
    totalCapacityKw: 4200,
    usedCapacityKw: 3150,
    totalRacks: 420,
    usedRacks: 360,
    monitoringPeriodHours: 720,
    downtimeMinutes: 22,
    incidentsLastPeriod: 3,
    mttrMinutes: 38,
    energyCostPerKwh: 5.1,
    energyConsumedKwh: 880000
  },
  {
    id: 'spb-1',
    name: 'Санкт-Петербург — Пулково',
    region: 'Санкт-Петербург',
    status: 'warning',
    totalCapacityKw: 2800,
    usedCapacityKw: 2350,
    totalRacks: 300,
    usedRacks: 260,
    monitoringPeriodHours: 720,
    downtimeMinutes: 95,
    incidentsLastPeriod: 6,
    mttrMinutes: 72,
    energyCostPerKwh: 4.8,
    energyConsumedKwh: 610000
  },
  {
    id: 'nsk-1',
    name: 'Новосибирск — Академ',
    region: 'Новосибирск',
    status: 'healthy',
    totalCapacityKw: 1800,
    usedCapacityKw: 1200,
    totalRacks: 210,
    usedRacks: 150,
    monitoringPeriodHours: 720,
    downtimeMinutes: 40,
    incidentsLastPeriod: 4,
    mttrMinutes: 54,
    energyCostPerKwh: 4.3,
    energyConsumedKwh: 430000
  },
  {
    id: 'nn-1',
    name: 'Нижний Новгород — Волга',
    region: 'Нижний Новгород',
    status: 'critical',
    totalCapacityKw: 1500,
    usedCapacityKw: 1320,
    totalRacks: 180,
    usedRacks: 150,
    monitoringPeriodHours: 720,
    downtimeMinutes: 160,
    incidentsLastPeriod: 8,
    mttrMinutes: 105,
    energyCostPerKwh: 4.6,
    energyConsumedKwh: 320000
  }
];
