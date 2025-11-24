export interface FinancialRecord {
  id: string;
  siteId: string | null;
  date: Date;
  type: 'opex' | 'capex';
  category: 'energy' | 'rent' | 'staff' | 'maintenance' | 'hardware' | 'other';
  amountRub: number;
  description: string;
}
