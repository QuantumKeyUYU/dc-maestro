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

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/sites', label: 'Sites' },
  { to: '/personnel', label: 'Personnel' },
  { to: '/maintenance', label: 'Maintenance' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/finance', label: 'Finance' },
  { to: '/safety', label: 'Safety' }
];

export default function App() {
  const osi = globalOperationalStrainIndex(sites, shifts, sites, financialRecords);

  const osiTone = osi.category === 'critical' ? 'danger' : osi.category === 'watch' ? 'warning' : 'success';

  return (
    <div className="min-h-screen bg-background text-gray-100">
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 bg-surface border-r border-gray-800 p-4 flex flex-col gap-4">
          <div className="text-xl font-bold text-sky-200">DC Maestro</div>
          <nav className="flex flex-col gap-2 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg font-medium ${
                    isActive ? 'bg-accent/20 text-sky-200 border border-sky-500/40' : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-gray-800 px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-100">DC Maestro</h1>
              <p className="text-sm text-gray-400">Кокпит управления сетью ЦОД</p>
            </div>
            <div className="flex items-center gap-3">
              <KpiBadge label="Operational Strain Index" value={`${osi.value.toFixed(1)} / 100`} tone={osiTone} />
              <StatusPill
                label={osi.category === 'critical' ? 'Critical' : osi.category === 'watch' ? 'Watch' : 'Stable'}
                tone={osiTone}
              />
            </div>
          </header>

          <div className="p-8 space-y-6">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/sites" element={<SitesPage />} />
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
