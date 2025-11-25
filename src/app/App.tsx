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
    <div className="min-h-screen text-text-primary relative">
      <div className="flex h-screen overflow-hidden relative">
        <aside className="w-[260px] lg:w-[252px] md:w-[240px] sm:w-[220px] bg-[rgba(8,10,14,0.92)] border-r border-white/5 px-6 py-6 flex flex-col gap-6 backdrop-blur-xl shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(
                'relative block -mx-1 px-4 py-3 rounded-2xl transition text-left space-y-1 border border-white/8 bg-[rgba(12,16,24,0.82)] shadow-[0_18px_48px_rgba(0,0,0,0.45)] before:absolute before:inset-x-4 before:top-2 before:h-[2px] before:rounded-full before:bg-accent-primary/60',
                'hover:bg-[rgba(12,16,24,0.9)] text-text-primary',
                isActive && 'bg-[rgba(12,16,24,0.95)] text-text-primary border-white/10'
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
                      'relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-text-secondary transition-colors border border-transparent',
                      isActive
                        ? 'bg-[rgba(255,255,255,0.04)] text-text-primary border border-white/10 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-[2px] before:bg-accent-primary/80'
                        : 'hover:bg-[rgba(255,255,255,0.02)]'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={clsx('w-[18px] h-[18px] text-current', isActive ? 'text-text-primary' : 'text-text-muted')} />
                      <span className="flex-1 min-w-0 text-left leading-tight text-current relative truncate">{item.label}</span>
                      {item.badge ? (
                        <span className="ml-auto inline-flex items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary text-[11px] px-2 py-[2px] border border-accent-primary/30 shadow-[0_6px_20px_rgba(76,181,245,0.25)]">
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
          <header className="sticky top-0 z-10 bg-[rgba(5,7,11,0.9)] backdrop-blur-xl border-b border-white/5 px-7 py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between shadow-[0_18px_48px_rgba(0,0,0,0.35)]">
            <SectionHeader
              as="h1"
              label={currentPage.label ?? undefined}
              title={currentPage.title}
              subtitle={currentPage.subtitle}
              framed={false}
              className="mb-0 px-0 py-0"
            />
            <InfoTooltip
              label={hasOsiData ? osiExplainer : 'Нет данных по показателю OSI за выбранный период.'}
              triggerArea="container"
              className="self-start w-full lg:w-auto"
              resetKey={pathname}
            >
              <div className="relative flex items-center gap-4 rounded-2xl border border-white/8 bg-[rgba(20,28,38,0.75)] px-5 py-4 shadow-[0_18px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-accent-primary/40 before:content-['']">
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-[0.18em] text-text-muted">OSI</div>
                  <div className="text-[28px] font-semibold tracking-tight text-white leading-none">{osiValueDisplay}</div>
                  <div className="text-sm text-text-secondary">Operational Strain Index</div>
                </div>
                <StatusPill
                  label={osiStateDisplay}
                  variant={osiToneDisplay === 'danger' ? 'danger' : osiToneDisplay === 'warning' ? 'warn' : 'ok'}
                  size="sm"
                />
              </div>
            </InfoTooltip>
          </header>

          <div className="px-8 pt-7 max-[800px]:pt-6 pb-12 space-y-10">
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
