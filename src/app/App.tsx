import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
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
import { StatusPill } from '../shared/components/StatusPill';
import { strings } from '../shared/lib/strings';
import { InfoTooltip } from '../shared/components/InfoTooltip';
import { SitesDetailPage } from '../modules/sites/SitesDetailPage';
import { AboutPage } from '../modules/about/AboutPage';
import { Boxes, Briefcase, Cpu, LayoutDashboard, Shield, Users, Wallet, Wrench } from '../shared/icons';
import { useNavBadges } from '../shared/hooks/useNavBadges';

const pageMeta = [
  { match: /^\/$/, title: strings.dashboard.title, subtitle: strings.dashboard.subtitle },
  { match: /^\/sites(\/.*)?$/, title: strings.sites.title, subtitle: strings.sites.subtitle },
  { match: /^\/maintenance/, title: strings.maintenance.title, subtitle: strings.maintenance.subtitle },
  { match: /^\/inventory/, title: strings.inventory.title, subtitle: strings.inventory.subtitle },
  { match: /^\/personnel/, title: strings.personnel.title, subtitle: strings.personnel.subtitle },
  { match: /^\/finance/, title: strings.finance.title, subtitle: strings.finance.subtitle },
  { match: /^\/safety/, title: strings.safety.title, subtitle: strings.safety.subtitle },
  { match: /^\/about/, title: strings.nav.about, subtitle: 'Актуальная демо-страница' }
];

export default function App() {
  const osi = globalOperationalStrainIndex(sites, shifts, sites, financialRecords);
  const { pathname } = useLocation();
  const navBadges = useNavBadges();

  const navItems = [
    { to: '/', label: strings.nav.dashboard, icon: LayoutDashboard },
    { to: '/sites', label: strings.nav.sites, icon: Cpu, badge: navBadges.nonHealthySites },
    { to: '/maintenance', label: strings.nav.maintenance, icon: Wrench, badge: navBadges.overdueWorkOrders },
    { to: '/inventory', label: strings.nav.inventory, icon: Boxes },
    { to: '/personnel', label: strings.nav.personnel, icon: Users },
    { to: '/finance', label: strings.nav.finance, icon: Wallet },
    { to: '/safety', label: strings.nav.safety, icon: Shield, badge: navBadges.overdueSafety },
    { to: '/about', label: strings.nav.about, icon: Briefcase }
  ];

  const currentPage = pageMeta.find((entry) => entry.match.test(pathname)) ?? pageMeta[0];

  const osiTone = osi.category === 'critical' ? 'danger' : osi.category === 'watch' ? 'warning' : 'success';
  const osiDescriptor =
    osi.category === 'critical'
      ? 'Критично / Требуется реакция'
      : osi.category === 'watch'
        ? 'Нагрузка сети / Рост нагрузки'
        : 'Стабильно / Контроль тренда';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-[#0b1220] to-[#0d121a] text-text-primary relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(62,236,226,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(124,140,251,0.08),transparent_32%)]" />
      <div className="flex h-screen overflow-hidden relative">
          <aside className="w-64 md:w-60 sm:w-56 bg-gradient-to-b from-bg-surface/95 to-bg-surfaceSoft/90 border-r border-white/5 p-6 flex flex-col gap-8 shadow-ambient backdrop-blur-xl relative z-10">
            <div className="space-y-1">
              <div className="text-2xl font-semibold text-text-primary drop-shadow-sm">{strings.headers.appTitle}</div>
              <div className="text-xs uppercase tracking-[0.22em] text-text-dim">Кокпит эксплуатации</div>
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
                      'relative group flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all border border-transparent backdrop-blur-sm',
                      'hover:bg-white/4 hover:text-text-primary hover:translate-x-[1px] hover:shadow-glow',
                      isActive
                        ? 'bg-white/8 text-text-primary shadow-glow border-white/10'
                        : 'text-text-muted'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="absolute bottom-1.5 left-3 right-3 h-px rounded-full bg-accent-primary/70 blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                      <Icon className="w-4 h-4 scale-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-accent-primary to-accent-muted" />
                      <span className="truncate relative">
                        {item.label}
                        <span
                          className={clsx(
                            'absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-accent-primary/70 to-transparent blur-sm transition-opacity duration-300',
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                          )}
                        />
                      </span>
                      {item.badge ? (
                        <span className="ml-auto inline-flex min-w-[24px] h-6 items-center justify-center rounded-full bg-status-warning/20 text-status-warning text-xs font-semibold px-2 shadow-[0_0_0_1px_rgba(251,191,36,0.35)]">
                          {item.badge}
                        </span>
                      ) : null}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto scrollbar-thin relative z-0">
          <header className="sticky top-0 z-10 bg-gradient-to-r from-bg-app/90 via-bg-app/80 to-bg-surface/75 backdrop-blur-2xl border-b border-white/5 px-8 py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between shadow-ambient">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.24em] text-text-dim">DC Maestro</p>
              <h1 className="text-3xl font-semibold text-text-primary drop-shadow-sm">{currentPage.title}</h1>
              {currentPage.subtitle && <p className="text-base text-text-muted leading-relaxed max-w-3xl">{currentPage.subtitle}</p>}
            </div>
            <div className="flex items-center gap-4">
              <div className="glass-shell">
                <div className="glass-inner flex items-center gap-4 py-3 px-4">
                  <div className="space-y-1 text-left">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-text-dim">Operational Strain Index</div>
                    <div className="text-3xl font-bold text-text-primary">{osi.value.toFixed(1)}</div>
                    <div className="text-sm text-text-muted">Нагрузка сети · {osiDescriptor}</div>
                  </div>
                  <InfoTooltip label={strings.headers.osiTooltip}>
                    <StatusPill
                      label={osi.category === 'critical' ? 'Критично' : osi.category === 'watch' ? 'Нагрузка' : 'Стабильно'}
                      tone={osiTone}
                    />
                  </InfoTooltip>
                </div>
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
