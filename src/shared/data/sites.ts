import { DataCenterSite } from '../models/DataCenterSite';

export const sites: DataCenterSite[] = [
  {
    id: 'msk-1',
    name: 'МСК-1. Магистральный ЦОД',
    region: 'Москва, Ярославское ш.',
    status: 'healthy',
    totalCapacityKw: 4500,
    usedCapacityKw: 3320,
    totalRacks: 440,
    usedRacks: 380,
    monitoringPeriodHours: 720,
    downtimeMinutes: 18,
    incidentsLastPeriod: 2,
    mttrMinutes: 32,
    energyCostPerKwh: 5.1,
    energyConsumedKwh: 920000
  },
  {
    id: 'spb-1',
    name: 'СПБ-1. Резервный ЦОД',
    region: 'Санкт-Петербург, Пулковское ш.',
    status: 'warning',
    totalCapacityKw: 3000,
    usedCapacityKw: 2480,
    totalRacks: 320,
    usedRacks: 276,
    monitoringPeriodHours: 720,
    downtimeMinutes: 110,
    incidentsLastPeriod: 7,
    mttrMinutes: 78,
    energyCostPerKwh: 4.8,
    energyConsumedKwh: 640000
  },
  {
    id: 'nsk-1',
    name: 'ЕКБ-1. Уральский узел',
    region: 'Екатеринбург, Академический',
    status: 'healthy',
    totalCapacityKw: 1900,
    usedCapacityKw: 1250,
    totalRacks: 220,
    usedRacks: 158,
    monitoringPeriodHours: 720,
    downtimeMinutes: 48,
    incidentsLastPeriod: 4,
    mttrMinutes: 50,
    energyCostPerKwh: 4.4,
    energyConsumedKwh: 445000
  },
  {
    id: 'nn-1',
    name: 'НН-1. Основной ЦОД',
    region: 'Нижний Новгород, Кстово',
    status: 'critical',
    totalCapacityKw: 1600,
    usedCapacityKw: 1380,
    totalRacks: 190,
    usedRacks: 160,
    monitoringPeriodHours: 720,
    downtimeMinutes: 1800,
    incidentsLastPeriod: 12,
    mttrMinutes: 118,
    energyCostPerKwh: 4.6,
    energyConsumedKwh: 345000
  }
];
