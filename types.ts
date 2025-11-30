import { LucideIcon } from "lucide-react";

export enum ModuleType {
  DASHBOARD = 'dashboard',
  MONITORING = 'monitoring',
  MAINTENANCE = 'maintenance',
  PERSONNEL = 'personnel',
  WAREHOUSE = 'warehouse',
  FINANCE = 'finance',
  PROJECTS = 'projects',
  SECURITY = 'security'
}

export enum StatusLevel {
  NORMAL = 'normal',
  WARNING = 'warning',
  CRITICAL = 'critical',
  OFFLINE = 'offline'
}

export interface NavItem {
  id: ModuleType;
  label: string;
  icon: LucideIcon;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  change?: number; // percentage
  status: StatusLevel;
  icon?: LucideIcon;
}

export interface RackData {
  id: string;
  name: string;
  usage: number; // percentage
  temperature: number; // celsius
  power: number; // kW
  status: StatusLevel;
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  dueTime: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
}