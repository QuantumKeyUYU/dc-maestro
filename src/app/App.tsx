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

type PageMeta = {
  match: RegExp;
  title: string;
  subtitle?: string;
  label?: string | null;
};

const pageMeta: PageMeta[] = [
  {
    match: /^\/$/,
    title: strings.dashboard.title,
    subtitle: strings.dashboard.subtitle
  },
  { match: /^\/sites(\/.*)?$/, title: strings.sites.title, subtitle: strings.sites.subtitle, label: undefined },
  {
    match: /^\/maintenance/,
    title: strings.maintenance.title,
    subtitle: strings.maintenance.subtitle
  },
  {
    match: /^\/inventory/,
    title: strings.inventory.title,
    subtitle: strings.inventory.subtitle
  },
  {
    match: /^\/personnel/,
    title: strings.personnel.title,
    subtitle: strings.personnel.subtitle
  },
  {
    match: /^\/finance/,
    title: strings.finance.title,
    subtitle: strings.finance.subtitle
  },
  {
    match: /^\/safety/,
    title: strings.safety.title,
    subtitle: strings.safety.subtitle
  },
  {
    match: /^\/about/,
    title: strings.about.title,
    subtitle: strings.about.subtitle,
    label: strings.headers.aboutLabel
  }
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
    <div className="min-h-screen bg-bg-app text-text-primary relative">
      <div className="flex h-screen overflow-hidden relative">
          <aside className="w-[260px] lg:w-[252px] md:w-[240px] sm:w-[220px] bg-[#0b1118] border-r border-[rgba(255,255,255,0.05)] p-6 flex flex-col gap-7">
            <NavLink
              to="/"
              className={({ isActive }) =>
                clsx(
                  'block -mx-2 px-3 py-2 rounded-[8px] transition text-left space-y-1 border border-[rgba(255,255,255,0.05)] bg-[#0d141c]',
                  'hover:bg-white/[0.03] hover:border-[rgba(255,255,255,0.08)] cursor-pointer',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary/25 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
                  isActive && 'border-[rgba(255,255,255,0.1)] bg-white/[0.03]'
                )
              }
            >
              <div className="text-xl font-semibold text-text-primary">{strings.headers.appTitle}</div>
            </NavLink>
            <nav className="flex flex-col gap-1 text-[15px]">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={item.badge?.tooltip ?? item.label}
                  className={({ isActive }) =>
                    clsx(
                      'relative flex items-center gap-3 px-3 py-2.5 rounded-[8px] font-medium transition-colors border border-transparent',
                      isActive
                        ? 'bg-white/[0.05] text-text-primary border-[rgba(255,255,255,0.08)]'
                        : 'text-text-muted hover:bg-white/[0.03] hover:border-[rgba(255,255,255,0.06)] hover:text-text-primary'
                    )
                  }
                  >
                    {({ isActive }) => (
                      <>
                          <Icon className="w-[18px] h-[18px] text-current" />
                          <span className="flex-1 min-w-0 text-left leading-tight text-current relative truncate">{item.label}</span>
                        {item.badge ? (
                          <span
                            className={clsx(
                              'ml-2 inline-grid h-5 min-w-[24px] shrink-0 place-items-center rounded-full px-2 text-[11px] font-semibold leading-none tracking-tight text-[#8fc7b7] bg-[rgba(42,143,115,0.18)] border border-[rgba(63,177,165,0.32)] [@media(forced-colors:active)]:border-[ButtonText] [@media(forced-colors:active)]:text-[CanvasText] [@media(forced-colors:active)]:bg-[Canvas]',
                              isActive && 'text-[#a6d9c9] bg-[rgba(42,143,115,0.24)] border-[rgba(63,177,165,0.38)]'
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
          <header className="sticky top-0 z-10 bg-[#0a1015]/95 border-b border-[rgba(255,255,255,0.06)] px-8 py-3 max-[800px]:py-3 flex flex-col gap-4 max-[800px]:gap-4 lg:flex-row lg:items-start lg:justify-between">
            <SectionHeader
              as="h1"
              label={currentPage.label ?? undefined}
              title={currentPage.title}
              subtitle={currentPage.subtitle}
              className="mb-0"
            />
            <div className="flex items-start gap-4">
              <InfoTooltip
                label={hasOsiData ? osiExplainer : 'Нет данных по показателю OSI за выбранный период.'}
                triggerArea="container"
                className="self-start w-full max-w-xl"
                resetKey={pathname}
              >
                <div className="relative overflow-hidden rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#0b1118] px-4 py-3 shadow-[0_6px_18px_rgba(0,0,0,0.24)] flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-1 text-left">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-text-dim">Operational Strain Index</div>
                    <div className="text-2xl font-semibold text-text-primary">{osiValueDisplay}</div>
                    <div className="text-sm text-text-muted">{osiDescriptor}</div>
                  </div>
                  <div className="flex flex-col items-start gap-2 lg:items-end">
                    <div className="flex items-center gap-2">
                      <StatusPill label={osiStateDisplay} tone={osiToneDisplay} size="sm" />
                      <span className="text-[11px] text-text-muted hidden sm:inline">Наведи, чтобы узнать подробнее</span>
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
