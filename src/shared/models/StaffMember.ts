export interface StaffMember {
  id: string;
  fullName: string;
  role: 'technician' | 'engineer' | 'shift_lead' | 'manager';
  skills: string[];
  grade: 1 | 2 | 3 | 4;
  hourlyRate: number;
  assignedSiteIds: string[];
}
