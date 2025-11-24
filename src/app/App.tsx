import { NavLink, Route, Routes } from 'react-router-dom';
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

const navItems = [
  { to: '/', label: strings.nav.dashboard },
  { to: '/sites', label: strings.nav.sites },
  { to: '/personnel', label: strings.nav.personnel },
  { to: '/maintenance', label: strings.nav.maintenance },
  { to: '/inventory', label: strings.nav.inventory },
  { to: '/finance', label: strings.nav.finance },
  { to: '/safety', label: strings.nav.safety }
];

export default function App() {
  const osi = globalOperationalStrainIndex(sites, shifts, sites, financialRecords);

  const osiTone = osi.category === 'critical' ? 'danger' : osi.category === 'watch' ? 'warning' : 'success';

  return (
    <div className="min-h-screen bg-background text-gray-100">
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 bg-surface border-r border-gray-800 p-6 flex flex-col gap-6 shadow-xl">
          <div className="text-2xl font-bold text-primary tracking-tight">{strings.headers.appTitle}</div>
          <nav className="flex flex-col gap-2 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl font-medium transition ${
                    isActive ? 'bg-primary/15 text-primary border border-primary/40' : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-gray-800 px-8 py-5 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-50">{strings.headers.appTitle}</h1>
              <p className="text-sm text-gray-400">{strings.headers.appSubtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-1">
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
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
