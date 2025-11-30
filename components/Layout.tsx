import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { 
  LayoutDashboard, Server, Wrench, Package, Users, 
  CreditCard, Shield, Info, Bell, Search, Menu, X
} from 'lucide-react';
import { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Sites & Assets', path: '/sites', icon: Server, badge: 2 },
  { label: 'Maintenance', path: '/maintenance', icon: Wrench, badge: 3 },
  { label: 'Inventory', path: '/inventory', icon: Package, badge: 5 },
  { label: 'Personnel', path: '/personnel', icon: Users },
  { label: 'Finance', path: '/finance', icon: CreditCard },
  { label: 'Safety', path: '/safety', icon: Shield, badge: 2 },
  { label: 'About', path: '/about', icon: Info },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setIsSidebarOpen(false);
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex bg-background text-gray-200 font-sans selection:bg-primary/30">
      {/* --- Sidebar --- */}
      <aside 
        className={clsx(
          "fixed inset-y-0 left-0 z-40 w-72 bg-[#080B10] border-r border-white/5 transition-transform duration-300 ease-in-out flex flex-col",
          !isSidebarOpen && "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="font-bold text-white text-lg">D</span>
            </div>
            <div className={clsx("transition-opacity duration-200", !isSidebarOpen && "lg:hidden")}>
              <h1 className="font-bold text-white tracking-tight leading-none">DC Maestro</h1>
              <p className="text-[10px] text-primary uppercase tracking-[0.2em]">System Control</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={clsx(
                  "group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-primary/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-primary/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                )}
                title={item.label}
              >
                <Icon size={20} className={clsx(isActive ? "text-primary" : "text-gray-500 group-hover:text-gray-300")} />
                <span className={clsx("text-sm font-medium whitespace-nowrap transition-opacity", !isSidebarOpen && "lg:hidden")}>
                  {item.label}
                </span>
                {item.badge && (
                   <span className={clsx(
                     "ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white border border-white/10",
                     !isSidebarOpen && "lg:hidden"
                   )}>
                     {item.badge}
                   </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Profile / User */}
        <div className="p-4 border-t border-white/5">
          <div className={clsx("flex items-center gap-3", !isSidebarOpen && "lg:justify-center")}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border border-white/10 ring-2 ring-black"></div>
            <div className={clsx(!isSidebarOpen && "lg:hidden")}>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-500">Chief Engineer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <div className={clsx("flex-1 flex flex-col transition-all duration-300", isSidebarOpen ? "lg:ml-72" : "lg:ml-20")}>
        
        {/* Header */}
        <header className="h-20 sticky top-0 z-30 glass-panel border-b border-white/5 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white lg:hidden"
            >
              <Menu size={20} />
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-3 text-gray-500 group-focus-within:text-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search sites, assets, or events (Cmd+K)" 
                className="bg-[#0B0E14] border border-white/10 rounded-full py-2 pl-10 pr-4 w-64 text-sm text-gray-300 focus:outline-none focus:border-primary/50 focus:w-80 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Status Indicators */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-emerald-400">System Synced</span>
            </div>

            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-background"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto animate-fade-in">
             {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
