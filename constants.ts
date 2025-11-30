import { Site, Incident, Metric, Asset, WorkOrder, InventoryItem, Staff, FinancialRecord, SafetyEvent } from './types';

export const SITES: Site[] = [
  { id: 'nn-1', name: 'Nizhny Novgorod DC-1', region: 'Volga', uptime: 99.99, reliability: 98, capacity: 45, status: 'healthy' },
  { id: 'spb-1', name: 'St. Petersburg DC-1', region: 'North-West', uptime: 98.4, reliability: 85, capacity: 82, status: 'warning' },
  { id: 'msk-1', name: 'Moscow Core DC-1', region: 'Central', uptime: 99.95, reliability: 95, capacity: 91, status: 'healthy' },
  { id: 'nsk-1', name: 'Novosibirsk Edge', region: 'Siberia', uptime: 94.2, reliability: 60, capacity: 20, status: 'critical' },
  { id: 'ekb-1', name: 'Yekaterinburg Node', region: 'Urals', uptime: 99.8, reliability: 92, capacity: 55, status: 'healthy' },
];

export const INCIDENTS: Incident[] = [
  { id: 'INC-204', type: 'Incident', description: 'NN-1: Generator Start Failure', siteId: 'nn-1', priority: 'critical', status: 'investigating', timestamp: '10:42 AM' },
  { id: 'INC-203', type: 'Security', description: 'EKB-1: Unauthorized Access Attempt', siteId: 'ekb-1', priority: 'high', status: 'open', timestamp: '09:15 AM' },
  { id: 'INC-202', type: 'Temperature', description: 'SPB-1: Thermal Spikes in Hall B', siteId: 'spb-1', priority: 'high', status: 'open', timestamp: '08:30 AM' },
  { id: 'WO-105', type: 'Maintenance', description: 'Fuel Injector Replacement', siteId: 'nn-1', priority: 'medium', status: 'open', timestamp: 'Yesterday' },
];

export const METRICS_DATA: Metric[] = [
  { label: 'Network Uptime', value: '98.86%', change: -0.04, trend: 'down', tone: 'warning' },
  { label: 'Ops Load Index', value: '31.8', change: 1.2, trend: 'up', tone: 'success' },
  { label: 'Low Inventory', value: '5 Items', tone: 'warning' },
  { label: 'Active Incidents', value: '3', tone: 'danger' },
];

export const CHART_DATA = [
  { name: 'Mon', uptime: 99.9, load: 45 },
  { name: 'Tue', uptime: 99.8, load: 52 },
  { name: 'Wed', uptime: 99.9, load: 48 },
  { name: 'Thu', uptime: 98.2, load: 61 },
  { name: 'Fri', uptime: 99.5, load: 55 },
  { name: 'Sat', uptime: 99.9, load: 40 },
  { name: 'Sun', uptime: 99.9, load: 38 },
];

export const ASSETS: Asset[] = [
  { id: 'GEN-01', name: 'Diesel Generator A', type: 'Generator', siteId: 'nn-1', status: 'operational', health: 98, nextService: '2024-12-15' },
  { id: 'UPS-04', name: 'Core UPS Bank 4', type: 'UPS', siteId: 'spb-1', status: 'maintenance', health: 75, nextService: '2024-10-25' },
  { id: 'CRAC-12', name: 'Cooling Unit 12', type: 'CRAC', siteId: 'msk-1', status: 'operational', health: 92, nextService: '2025-01-10' },
  { id: 'PDU-08', name: 'Rack PDU Row 8', type: 'PDU', siteId: 'nsk-1', status: 'offline', health: 40, nextService: 'Overdue' },
  { id: 'FS-01', name: 'Fire Suppression System', type: 'FireSystem', siteId: 'ekb-1', status: 'operational', health: 100, nextService: '2025-03-01' },
];

export const WORK_ORDERS: WorkOrder[] = [
  { id: 'WO-101', title: 'Monthly Generator Test', type: 'PM', priority: 'medium', status: 'completed', assignee: 'Alex K.', dueDate: '2024-10-20' },
  { id: 'WO-102', title: 'Replace UPS Battery Module', type: 'Repair', priority: 'high', status: 'in_progress', assignee: 'Sarah M.', dueDate: '2024-10-22' },
  { id: 'WO-103', title: 'Thermal Imaging Inspection', type: 'Inspection', priority: 'low', status: 'open', assignee: 'Team B', dueDate: '2024-10-28' },
  { id: 'WO-104', title: 'Firmware Update Switchgear', type: 'PM', priority: 'medium', status: 'open', assignee: 'Dmitry V.', dueDate: '2024-10-24' },
  { id: 'WO-105', title: 'Investigate PDU Failure', type: 'Repair', priority: 'high', status: 'open', assignee: 'Urgent Response', dueDate: 'Today' },
];

export const INVENTORY: InventoryItem[] = [
  { id: 'INV-001', sku: 'FLT-AIR-2040', name: 'Air Filter 20x40', category: 'Consumable', stock: 45, minLevel: 10, status: 'ok', siteId: 'msk-1' },
  { id: 'INV-002', sku: 'CBL-CAT6-305', name: 'Cat6 Cable Spool', category: 'Connectivity', stock: 2, minLevel: 5, status: 'low', siteId: 'spb-1' },
  { id: 'INV-003', sku: 'SFP-10G-LR', name: 'SFP+ 10G Transceiver', category: 'Hardware', stock: 0, minLevel: 4, status: 'critical', siteId: 'nn-1' },
  { id: 'INV-004', sku: 'BAT-12V-9AH', name: 'UPS Battery 12V', category: 'Spare Part', stock: 120, minLevel: 20, status: 'ok', siteId: 'msk-1' },
  { id: 'INV-005', sku: 'FUSE-400A', name: '400A Industrial Fuse', category: 'Spare Part', stock: 3, minLevel: 3, status: 'low', siteId: 'nsk-1' },
];

export const STAFF: Staff[] = [
  { id: 'ST-01', name: 'Elena Voronina', role: 'Shift Lead', siteId: 'msk-1', status: 'on_shift', efficiency: 95 },
  { id: 'ST-02', name: 'Ivan Petrov', role: 'Senior Engineer', siteId: 'spb-1', status: 'on_shift', efficiency: 88 },
  { id: 'ST-03', name: 'Mike Ross', role: 'Technician', siteId: 'nn-1', status: 'off_duty', efficiency: 92 },
  { id: 'ST-04', name: 'Anna Sokolova', role: 'Operations Manager', siteId: 'msk-1', status: 'on_shift', efficiency: 97 },
  { id: 'ST-05', name: 'Sergey Volkov', role: 'Security Lead', siteId: 'nsk-1', status: 'break', efficiency: 85 },
];

export const FINANCES: FinancialRecord[] = [
  { id: 'FIN-001', category: 'Energy', type: 'OPEX', amount: 450000, date: '2024-10-01', siteId: 'msk-1' },
  { id: 'FIN-002', category: 'Maintenance', type: 'OPEX', amount: 120000, date: '2024-10-05', siteId: 'spb-1' },
  { id: 'FIN-003', category: 'Hardware', type: 'CAPEX', amount: 2500000, date: '2024-09-28', siteId: 'nn-1' },
  { id: 'FIN-004', category: 'Staff', type: 'OPEX', amount: 890000, date: '2024-10-01', siteId: 'all' },
  { id: 'FIN-005', category: 'Rent', type: 'OPEX', amount: 300000, date: '2024-10-01', siteId: 'ekb-1' },
];

export const SAFETY_EVENTS: SafetyEvent[] = [
  { id: 'SAF-01', title: 'Annual Fire Drill', type: 'Training', status: 'completed', dueDate: '2024-09-15', siteId: 'msk-1' },
  { id: 'SAF-02', title: 'Electrical Safety Audit', type: 'Inspection', status: 'pending', dueDate: '2024-10-30', siteId: 'spb-1' },
  { id: 'SAF-03', title: 'PPE Equipment Check', type: 'Compliance', status: 'overdue', dueDate: '2024-10-15', siteId: 'nsk-1' },
  { id: 'SAF-04', title: 'First Aid Refresher', type: 'Training', status: 'pending', dueDate: '2024-11-01', siteId: 'nn-1' },
];
