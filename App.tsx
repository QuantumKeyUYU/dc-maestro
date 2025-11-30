import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Monitoring from './components/Monitoring';
import Maintenance from './components/Maintenance';
import Settings from './components/Settings';
import UnderConstruction from './components/UnderConstruction';
import Projects from './components/Projects';
import { ModuleType } from './types';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(
    ModuleType.DASHBOARD
  );

  const renderContent = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD:
        return <Dashboard />;
      case ModuleType.MONITORING:
        return <Monitoring />;
      case ModuleType.MAINTENANCE:
        return <Maintenance />;
      case ModuleType.PERSONNEL:
        return (
          <UnderConstruction title="Персонал (WFM)" code="personnel-module" />
        );
      case ModuleType.WAREHOUSE:
        return (
          <UnderConstruction
            title="Склад и Закупки"
            code="warehouse-module"
          />
        );
      case ModuleType.FINANCE:
        return (
          <UnderConstruction title="Финансы" code="finance-module" />
        );
      case ModuleType.PROJECTS:
        return <Projects />;
      case ModuleType.SECURITY:
        return (
          <UnderConstruction title="Безопасность" code="security-module" />
        );
      case ModuleType.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-50">
      <Sidebar activeModule={activeModule} onNavClick={setActiveModule} />

      <div className="relative flex flex-1 flex-col overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(30, 64, 175, 0.4) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <Header />

        <main className="relative z-10 flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
