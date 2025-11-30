import React from 'react';

export interface Site {
  id: string;
  name: string;
  region: string;
  uptime: number;
  reliability: number;
  capacity: number;
  status: 'healthy' | 'warning' | 'critical';
}

export interface Incident {
  id: string;
  type: string;
  description: string;
  siteId: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  timestamp: string;
}

export interface Metric {
  label: string;
  value: string | number;
  change?: number; // percentage
  trend?: 'up' | 'down' | 'neutral';
  tone: 'neutral' | 'success' | 'warning' | 'danger';
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<any>;
  badge?: number;
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  siteId: string;
  status: 'operational' | 'maintenance' | 'offline';
  health: number;
  nextService: string;
}

export interface WorkOrder {
  id: string;
  title: string;
  type: 'PM' | 'Repair' | 'Inspection';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'completed';
  assignee: string;
  dueDate: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  minLevel: number;
  status: 'ok' | 'low' | 'critical';
  siteId: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  siteId: string;
  status: 'on_shift' | 'off_duty' | 'break';
  efficiency: number;
}

export interface FinancialRecord {
  id: string;
  category: string;
  type: 'OPEX' | 'CAPEX';
  amount: number;
  date: string;
  siteId: string;
}

export interface SafetyEvent {
  id: string;
  title: string;
  type: 'Inspection' | 'Training' | 'Incident' | 'Compliance';
  status: 'completed' | 'pending' | 'overdue';
  dueDate: string;
  siteId: string;
}
