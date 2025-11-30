// components/Sidebar.tsx
import React from 'react';
import {
  LayoutDashboard,
  Server,
  Wrench,
  Users,
  Package,
  PieChart,
  Briefcase,
  ShieldCheck,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react';
import { ModuleType } from '../types';

interface SidebarProps {
  activeModule: ModuleType;
  onNavClick: (module: ModuleType) => void;
}

interface NavItem {
  id: ModuleType;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: ModuleType.DASHBOARD,
    label: 'Дашборд',
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: ModuleType.MONITORING,
    label: 'Мониторинг (DCIM)',
    icon: <Server className="w-4 h-4" />,
  },
  {
    id: ModuleType.MAINTENANCE,
    label: 'ТО и Ремонты',
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    id: ModuleType.PERSONNEL,
    label: 'Персонал (WFM)',
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: ModuleType.WAREHOUSE,
    label: 'Склад и Закупки',
    icon: <Package className="w-4 h-4" />,
  },
  {
    id: ModuleType.FINANCE,
    label: 'Финансы',
    icon: <PieChart className="w-4 h-4" />,
  },
  {
    id: ModuleType.PROJECTS,
    label: 'Проекты',
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: ModuleType.SECURITY,
    label: 'Безопасность',
    icon: <ShieldCheck className="w-4 h-4" />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onNavClick }) => {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950/95">
      {/* Логотип / кнопка "Домой" */}
      <button
        type="button"
        onClick={() => onNavClick(ModuleType.DASHBOARD)}
        className="flex items-center gap-3 border-b border-slate-800 px-4 py-4 text-left outline-none focus-visible:outline-none focus-visible:ring-0"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-blue-900/40">
          M
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-wide text-slate-50">
            DC MAESTRO
          </span>
          <span className="text-[11px] text-slate-400">
            v2.4.0 • LIVE demo
          </span>
        </div>
      </button>

      {/* Основное меню */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavClick(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-500/15 text-blue-100 border border-blue-500/40'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-slate-50'
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg border text-slate-200 ${
                  isActive
                    ? 'border-blue-500/60 bg-blue-500/20'
                    : 'border-slate-700 bg-slate-900'
                }`}
              >
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Нижняя панель: настройки / выход */}
      <div className="border-t border-slate-800 bg-slate-950/95 p-4">
        <button
          type="button"
          onClick={() => onNavClick(ModuleType.SETTINGS)}
          className="mb-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-900">
            <SettingsIcon className="h-4 w-4" />
          </span>
          Настройки
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900/80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950">
            <LogOut className="h-4 w-4" />
          </span>
          Выйти
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
