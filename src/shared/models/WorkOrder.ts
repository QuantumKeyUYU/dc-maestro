export interface WorkOrder {
  id: string;
  assetId: string;
  siteId: string;
  type: 'PM' | 'Repair' | 'Inspection';
  status: 'open' | 'in_progress' | 'done';
  priority: 1 | 2 | 3;
  createdAt: Date;
  dueDate: Date | null;
  completedAt: Date | null;
  assignedStaffId: string | null;
  description: string;
}
