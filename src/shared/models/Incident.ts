export interface Incident {
  id: string;
  siteId: string;
  severity: 'minor' | 'major' | 'critical';
  startedAt: Date;
  resolvedAt: Date | null;
  category: 'power' | 'cooling' | 'network' | 'security' | 'other';
  description: string;
}
