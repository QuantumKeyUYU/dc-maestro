export interface Shift {
  id: string;
  siteId: string;
  date: string;
  startTime: string;
  endTime: string;
  plannedStaffIds: string[];
  actualStaffIds: string[];
  overtimeHoursTotal: number;
}
