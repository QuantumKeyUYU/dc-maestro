import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Monitoring from './components/Monitoring';
import Maintenance from './components/Maintenance';
import { ModuleType } from './types';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);

  const renderContent = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD:
        return <Dashboard />;
      case ModuleType.MONITORING:
        return <Monitoring />;
      case ModuleType.MAINTENANCE:
        return <Maintenance />;
      default:
        return (
          <div className="flex items-center justify-center h-full flex-col text-slate-500 animate-in fade-in">
            <div className="w-16 h-16 border-2 border-slate-800 border-dashed rounded-xl mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold">?</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-300">Модуль в разработке</h2>
            <p className="mt-2">Раздел "{activeModule}" будет доступен в следующем обновлении.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <Sidebar activeModule={activeModule} onNavigate={setActiveModule} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background Grid Pattern for high-tech feel */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>
        
        <Header />
        
        <main className="flex-1 overflow-y-auto relative z-10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;