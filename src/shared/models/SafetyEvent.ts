export interface SafetyEvent {
  id: string;
  siteId: string | null;
  type: 'training' | 'inspection' | 'incident' | 'document_expiry';
  title: string;
  date: Date;
  status: 'scheduled' | 'done' | 'overdue';
  responsibleStaffId: string | null;
}
