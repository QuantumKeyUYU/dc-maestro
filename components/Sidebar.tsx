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
  Settings,
  LogOut
} from 'lucide-react';
import { ModuleType, NavItem } from '../types';

interface SidebarProps {
  activeModule: ModuleType;
  onNavigate: (module: ModuleType) => void;
}

const navItems: NavItem[] = [
  { id: ModuleType.DASHBOARD, label: 'Дашборд', icon: LayoutDashboard },
  { id: ModuleType.MONITORING, label: 'Мониторинг (DCIM)', icon: Server },
  { id: ModuleType.MAINTENANCE, label: 'ТО и Ремонты', icon: Wrench },
  { id: ModuleType.PERSONNEL, label: 'Персонал (WFM)', icon: Users },
  { id: ModuleType.WAREHOUSE, label: 'Склад и Закупки', icon: Package },
  { id: ModuleType.FINANCE, label: 'Финансы', icon: PieChart },
  { id: ModuleType.PROJECTS, label: 'Проекты', icon: Briefcase },
  { id: ModuleType.SECURITY, label: 'Безопасность', icon: ShieldCheck },
];

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onNavigate }) => {
  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 transition-all duration-300">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight leading-tight">DC MAESTRO</span>
            <span className="text-[10px] text-slate-400 font-mono uppercase">v2.4.0 Live</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
          Основное
        </div>
        {navItems.map((item) => {
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-600/10 text-blue-400 shadow-[inset_3px_0_0_0_#3b82f6]' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <button className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg w-full transition-colors text-sm font-medium mb-1">
          <Settings className="w-4 h-4" />
          Настройки
        </button>
        <button className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg w-full transition-colors text-sm font-medium">
          <LogOut className="w-4 h-4" />
          Выйти
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;