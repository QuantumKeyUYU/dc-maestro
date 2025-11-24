export interface Asset {
  id: string;
  siteId: string;
  type: 'UPS' | 'Generator' | 'CRAC' | 'PDU' | 'Rack' | 'FireSystem' | 'Other';
  name: string;
  criticality: 1 | 2 | 3;
  commissioningDate: Date;
  lastMaintenanceDate: Date | null;
  nextPlannedMaintenanceDate: Date | null;
  failureCountLifetime: number;
}
