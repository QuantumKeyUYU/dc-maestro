import { NavLink, Route, Routes } from 'react-router-dom';
import clsx from 'clsx';
import { DashboardPage } from '../modules/dashboard/DashboardPage';
import { SitesPage } from '../modules/sites/SitesPage';
import { PersonnelPage } from '../modules/personnel/PersonnelPage';
import { MaintenancePage } from '../modules/maintenance/MaintenancePage';
import { InventoryPage } from '../modules/inventory/InventoryPage';
import { FinancePage } from '../modules/finance/FinancePage';
import { SafetyPage } from '../modules/safety/SafetyPage';
import { globalOperationalStrainIndex } from '../shared/lib/kpi';
import { sites } from '../shared/data/sites';
import { shifts } from '../shared/data/shifts';
import { financialRecords } from '../shared/data/financialRecords';
import { KpiBadge } from '../shared/components/KpiBadge';
import { StatusPill } from '../shared/components/StatusPill';
import { strings } from '../shared/lib/strings';
import { InfoTooltip } from '../shared/components/InfoTooltip';
import { SitesDetailPage } from '../modules/sites/SitesDetailPage';
import { AboutPage } from '../modules/about/AboutPage';
import { Boxes, Briefcase, Cpu, LayoutDashboard, Shield, Users, Wallet, Wrench } from 'lucide-react';

const navItems = [
  { to: '/', label: strings.nav.dashboard, icon: LayoutDashboard },
  { to: '/sites', label: strings.nav.sites, icon: Cpu },
  { to: '/personnel', label: strings.nav.personnel, icon: Users },
  { to: '/maintenance', label: strings.nav.maintenance, icon: Wrench },
  { to: '/inventory', label: strings.nav.inventory, icon: Boxes },
  { to: '/finance', label: strings.nav.finance, icon: Wallet },
  { to: '/safety', label: strings.nav.safety, icon: Shield },
  { to: '/about', label: strings.nav.about, icon: Briefcase }
];

export default function App() {
  const osi = globalOperationalStrainIndex(sites, shifts, sites, financialRecords);

  const osiTone = osi.category === 'critical' ? 'danger' : osi.category === 'watch' ? 'warning' : 'success';

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 md:w-60 sm:w-56 bg-bg-surface border-r border-border-subtle p-6 flex flex-col gap-8 shadow-soft">
          <div>
            <div className="text-[13px] uppercase tracking-[0.2em] text-text-dim">DC Maestro</div>
            <div className="text-2xl font-semibold text-accent-primary mt-1">{strings.headers.appTitle}</div>
          </div>
          <nav className="flex flex-col gap-2 text-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition-colors border border-transparent',
                      'hover:bg-bg-surfaceSoft/70 hover:text-text-primary',
                      isActive
                        ? 'bg-bg-surfaceSoft text-text-primary border-l-4 border-accent-primary/80 shadow-soft'
                        : 'text-text-muted'
                    )
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <header className="sticky top-0 z-10 bg-bg-app/80 backdrop-blur border-b border-border-subtle px-8 py-5 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-text-primary">{strings.headers.appTitle}</h1>
              <p className="text-sm text-text-muted">{strings.headers.appSubtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-1 text-right">
                <KpiBadge label="Operational Strain Index" value={`${osi.value.toFixed(1)} / 100`} tone={osiTone} />
                <InfoTooltip label={strings.headers.osiTooltip}>
                  <StatusPill
                    label={osi.category === 'critical' ? 'Критично' : osi.category === 'watch' ? 'Нагрузка' : 'Стабильно'}
                    tone={osiTone}
                  />
                </InfoTooltip>
              </div>
            </div>
          </header>

          <div className="p-8 space-y-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/sites" element={<SitesPage />} />
              <Route path="/sites/:id" element={<SitesDetailPage />} />
              <Route path="/personnel" element={<PersonnelPage />} />
              <Route path="/maintenance" element={<MaintenancePage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/finance" element={<FinancePage />} />
              <Route path="/safety" element={<SafetyPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
