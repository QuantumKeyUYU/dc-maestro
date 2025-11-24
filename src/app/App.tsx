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
    <div className="min-h-screen bg-bg-shell text-text-primary relative">
      <div className="flex h-screen overflow-hidden relative">
        <aside className="w-[260px] lg:w-[252px] md:w-[240px] sm:w-[220px] bg-bg-shell border-r border-border-subtle px-6 py-6 flex flex-col gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(
                'block -mx-2 px-3 py-3 rounded-[10px] transition text-left space-y-1 border border-border-subtle bg-bg-surface/80 shadow-soft',
                'hover:bg-white/[0.04] hover:border-border-subtle cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary/35 focus-visible:ring-offset-0'
              )
            }
          >
            <div className="text-xl font-semibold text-text-primary leading-tight">{strings.headers.appTitle}</div>
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
                      'relative flex items-center gap-3 px-3 py-2.5 rounded-[10px] font-medium transition-colors border border-transparent',
                      isActive
                        ? 'bg-bg-surface/80 text-text-primary border-border-subtle'
                        : 'text-text-muted hover:bg-white/[0.04] hover:border-border-subtle/70 hover:text-text-primary'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={clsx(
                          'absolute left-0 top-2 bottom-2 w-[3px] rounded-full transition',
                          isActive ? 'bg-accent-primary/70' : 'bg-transparent'
                        )}
                        aria-hidden
                      />
                      <Icon className="w-[18px] h-[18px] text-current" />
                      <span className="flex-1 min-w-0 text-left leading-tight text-current relative truncate">{item.label}</span>
                      {item.badge ? (
                        <span
                          className={clsx(
                            'ml-2 inline-grid h-6 min-w-[26px] shrink-0 place-items-center rounded-[6px] px-2 text-[12px] font-semibold leading-none tracking-tight text-[#c9e7d7] bg-status-ok/12 border border-status-ok/35',
                            isActive && 'text-[#e4f6eb] bg-status-ok/18 border-status-ok/45'
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
          <header className="sticky top-0 z-10 bg-bg-shell/92 backdrop-blur border-b border-border-subtle px-7 py-3.5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeader
              as="h1"
              label={currentPage.label ?? undefined}
              title={currentPage.title}
              subtitle={currentPage.subtitle}
              framed={false}
              className="mb-0 px-0 py-0"
              action={
                <InfoTooltip
                  label={hasOsiData ? osiExplainer : 'Нет данных по показателю OSI за выбранный период.'}
                  triggerArea="container"
                  className="self-start w-full"
                  resetKey={pathname}
                >
                  <div className="relative overflow-hidden rounded-[10px] border border-border-subtle bg-bg-surface px-4 py-3 shadow-soft flex flex-col gap-2">
                    <div className="text-[11px] uppercase tracking-[0.14em] text-text-dim">Operational Strain Index</div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-2xl font-semibold text-text-primary">{osiValueDisplay}</div>
                      <StatusPill label={osiStateDisplay} tone={osiToneDisplay} size="sm" />
                    </div>
                    <div className="text-sm text-text-muted leading-snug">{osiDescriptor}</div>
                  </div>
                </InfoTooltip>
              }
            />
          </header>

          <div className="px-8 pt-6 max-[800px]:pt-5 pb-10 space-y-8">
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
