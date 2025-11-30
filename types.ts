// types.ts
import type { ElementType } from 'react';

export enum ModuleType {
  DASHBOARD = 'dashboard',
  MONITORING = 'monitoring',
  MAINTENANCE = 'maintenance',
  PERSONNEL = 'personnel',
  WAREHOUSE = 'warehouse',
  FINANCE = 'finance',
  PROJECTS = 'projects',
  SECURITY = 'security',
  SETTINGS = 'settings',
}

export enum StatusLevel {
  NORMAL = 'normal',
  WARNING = 'warning',
  CRITICAL = 'critical',
  OFFLINE = 'offline',
}

export interface NavItem {
  id: ModuleType;
  label: string;
  icon: ElementType;
}

// для настроек UI
export type ThemeMode = 'dark' | 'light' | 'system';
export type Language = 'ru' | 'en';
