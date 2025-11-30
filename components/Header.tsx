import React from 'react';
import { Search, Bell, User, Command } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Search Bar - Global Search as per PDF */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-12 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-950 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
            placeholder="Поиск по оборудованию, сотрудникам, инцидентам..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-slate-500 text-xs border border-slate-700 rounded px-1.5 py-0.5 bg-slate-800">
              <Command className="w-3 h-3 inline mr-0.5" />K
            </span>
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 ml-4">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-slate-900"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-700 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-white">Алексей Петров</div>
            <div className="text-xs text-slate-400">Старший Инженер</div>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 cursor-pointer hover:border-slate-400 transition-colors">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;