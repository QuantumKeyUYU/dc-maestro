import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
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
import { SectionHeader } from '../shared/components/SectionHeader';

const pageMeta = [
  { match: /^\/$/, title: strings.dashboard.title, subtitle: strings.dashboard.subtitle },
  { match: /^\/sites(\/.*)?$/, title: strings.sites.title, subtitle: strings.sites.subtitle },
  { match: /^\/maintenance/, title: strings.maintenance.title, subtitle: strings.maintenance.subtitle },
  { match: /^\/inventory/, title: strings.inventory.title, subtitle: strings.inventory.subtitle },
  { match: /^\/personnel/, title: strings.personnel.title, subtitle: strings.personnel.subtitle },
  { match: /^\/finance/, title: strings.finance.title, subtitle: strings.finance.subtitle },
  { match: /^\/safety/, title: strings.safety.title, subtitle: strings.safety.subtitle },
  { match: /^\/about/, title: strings.about.title, subtitle: strings.about.subtitle }
];

export default function App() {
  const osi = globalOperationalStrainIndex(sites, shifts, sites, financialRecords);
  const { pathname } = useLocation();
  const navBadges = useNavBadges();

  const navItems = [
    { to: '/', label: strings.nav.dashboard, icon: LayoutDashboard },
    {
      to: '/sites',
      label: strings.nav.sites,
      icon: Cpu,
      badge: navBadges.nonHealthySites ? { value: navBadges.nonHealthySites, tooltip: strings.badges.sitesTooltip(navBadges.nonHealthySites) } : null
    },
    {
      to: '/maintenance',
      label: strings.nav.maintenance,
      icon: Wrench,
      badge: navBadges.overdueWorkOrders
        ? { value: navBadges.overdueWorkOrders, tooltip: strings.badges.maintenanceTooltip(navBadges.overdueWorkOrders) }
        : null
    },
    {
      to: '/inventory',
      label: strings.nav.inventory,
      icon: Boxes,
      badge: navBadges.lowInventory
        ? { value: navBadges.lowInventory, tooltip: strings.badges.inventoryTooltip(navBadges.lowInventory) }
        : null
    },
    { to: '/personnel', label: strings.nav.personnel, icon: Users },
    { to: '/finance', label: strings.nav.finance, icon: Wallet },
    {
      to: '/safety',
      label: strings.nav.safety,
      icon: Shield,
      badge: navBadges.openSafety
        ? { value: navBadges.openSafety, tooltip: strings.badges.safetyTooltip(navBadges.openSafety) }
        : null
    },
    { to: '/about', label: strings.nav.about, icon: Briefcase }
  ];

  const currentPage = pageMeta.find((entry) => entry.match.test(pathname)) ?? pageMeta[0];

  const metaDescriptionByRoute = useMemo(() => {
    const map = new Map<RegExp, string | undefined>();
    pageMeta.forEach((entry) => map.set(entry.match, entry.subtitle));
    return map;
  }, []);

  useEffect(() => {
    document.title = `DC Maestro — ${currentPage.title}`;

    const description = currentPage.subtitle ?? metaDescriptionByRoute.get(currentPage.match);
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }
  }, [currentPage, metaDescriptionByRoute, pathname]);

  const osiTone = osi.category === 'critical' ? 'danger' : osi.category === 'watch' ? 'warning' : 'success';
  const osiState = osi.category === 'critical' ? 'Критично' : osi.category === 'watch' ? 'Повышенная нагрузка' : 'Стабильно';
  const osiTrend = osi.category === 'critical' ? 'Требуется реакция' : osi.category === 'watch' ? 'Рост нагрузки' : 'Контроль тренда';
  const osiDescriptor = `Нагрузка сети · ${osiState} / ${osiTrend}`;
  const osiRange = osi.category === 'critical' ? 'критического напряжения' : osi.category === 'watch' ? 'повышенной нагрузки' : 'стабильной нагрузки';
  const osiRisk = osi.category === 'critical' ? 'высокий' : osi.category === 'watch' ? 'умеренный' : 'низкий';
  const hasOsiData = Number.isFinite(osi.value);
  const osiValueDisplay = hasOsiData ? osi.value.toFixed(1) : '—';
  const osiExplainer = hasOsiData
    ? `${osiValueDisplay} — диапазон ${osiRange}. Риск перегрузки ${osiRisk}.`
    : 'Нет данных по показателю OSI за выбранный период.';
  const osiStateDisplay = hasOsiData ? osiState : 'Нет данных';
  const osiToneDisplay = hasOsiData ? osiTone : 'neutral';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-[#0b1220] to-[#0d121a] text-text-primary relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(62,236,226,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(124,140,251,0.08),transparent_32%)]" />
      <div className="flex h-screen overflow-hidden relative">
          <aside className="w-[260px] lg:w-[252px] md:w-[240px] sm:w-[220px] bg-gradient-to-b from-bg-surface/95 to-bg-surfaceSoft/90 border-r border-white/5 p-6 flex flex-col gap-8 shadow-ambient backdrop-blur-xl relative z-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                clsx(
                  'space-y-1 -mx-2 px-2 py-1.5 rounded-xl transition text-left block',
                  'hover:bg-white/5 hover:shadow-glow/50 cursor-pointer',
                  isActive ? 'bg-white/5' : 'bg-transparent'
                )
              }
            >
              <div className="text-2xl font-semibold text-text-primary drop-shadow-sm">{strings.headers.appTitle}</div>
              <div className="text-xs uppercase tracking-[0.22em] text-text-dim">Кокпит руководителя эксплуатации ЦОД</div>
            </NavLink>
          <nav className="flex flex-col gap-1.5 text-[15px]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={item.badge?.tooltip ?? item.label}
                  className={({ isActive }) =>
                    clsx(
                      'relative group flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all border border-transparent backdrop-blur-sm',
                      'hover:bg-white/5 hover:text-text-primary hover:translate-x-[1px] hover:shadow-glow',
                      isActive
                        ? 'bg-white/8 text-text-primary shadow-glow border-white/10'
                        : 'text-text-muted'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="absolute bottom-1.5 left-3 right-3 h-px rounded-full bg-accent-primary/60 blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                      <Icon className="w-[18px] h-[18px] text-transparent bg-clip-text bg-gradient-to-br from-accent-primary to-accent-muted" />
                      <span className="flex-1 min-w-0 text-left leading-tight text-text-primary relative">
                        {item.label}
                        <span
                          className={clsx(
                            'absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-accent-primary/70 to-transparent blur-sm transition-opacity duration-300',
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                          )}
                        />
                      </span>
                      {item.badge ? (
                        <span
                          className={clsx(
                            'ml-3 inline-flex h-[22px] min-w-[28px] shrink-0 items-center justify-center rounded-full border px-2.5 text-[11px] font-medium tracking-tight text-cyan-50/85 backdrop-blur-sm bg-[rgba(54,211,211,0.16)] border-[rgba(54,211,211,0.46)] shadow-[0_0_0_1px_rgba(62,236,226,0.12)]',
                            isActive && 'text-cyan-50 border-[rgba(62,236,226,0.6)]'
                          )}
                        >
                          {item.badge.value}
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
          <header className="sticky top-0 z-10 bg-gradient-to-r from-bg-app/90 via-bg-app/80 to-bg-surface/75 backdrop-blur-2xl border-b border-white/5 px-8 py-5 max-[800px]:py-4 flex flex-col gap-6 max-[800px]:gap-5 lg:flex-row lg:items-start lg:justify-between shadow-ambient">
            <SectionHeader
              as="h1"
              label={`Модуль: ${currentPage.title}`}
              title={currentPage.title}
              subtitle={currentPage.subtitle}
              className="mb-0"
            />
            <div className="flex items-start gap-4">
              <InfoTooltip
                label={hasOsiData ? osiExplainer : 'Нет данных по показателю OSI за выбранный период.'}
                triggerArea="container"
                className="glass-shell self-start w-full max-w-xl"
              >
                <div className="glass-inner flex flex-col gap-3 py-3 px-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-1 text-left">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-text-dim">Operational Strain Index</div>
                    <div className="text-3xl font-bold text-text-primary">{osiValueDisplay}</div>
                    <div className="text-sm text-text-muted">{osiDescriptor}</div>
                  </div>
                  <div className="flex flex-col items-start gap-2 lg:items-end">
                    <div className="flex items-center gap-2">
                      <StatusPill label={osiStateDisplay} tone={osiToneDisplay} size="sm" />
                      <span className="text-xs text-text-muted hidden sm:inline">Наведи, чтобы узнать подробнее</span>
                    </div>
                  </div>
                </div>
              </InfoTooltip>
            </div>
          </header>

          <div className="px-8 pt-6 max-[800px]:pt-5 pb-8 space-y-8">
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
