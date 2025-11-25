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
import { strings } from '../shared/lib/strings';
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
  const { pathname } = useLocation();
  const navBadges = useNavBadges();
  const lastUpdated = useMemo(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), []);

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

  return (
    <div className="min-h-screen text-text-primary relative overflow-hidden bg-[#0b1119]">
      <div className="flex h-screen overflow-hidden relative">
        <aside className="w-[250px] xl:w-[268px] bg-base-panel border-r border-border-soft/80 px-6 py-7 flex flex-col gap-7 shadow-elevation-card/70 relative z-10 backdrop-blur-2xl">
          <NavLink to="/" className="group block">
            <div className="px-4 py-4 rounded-card border border-border-soft bg-base-panelSoft shadow-elevation-card flex items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-lg sm:text-xl font-semibold text-text-primary leading-snug tracking-[-0.01em]">{strings.headers.appTitle}</div>
                <p className="text-[12px] leading-snug text-text-muted">Системный контроль объектов</p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/40 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-50 shadow-[0_6px_14px_rgba(0,0,0,0.3)]">
                <span className="h-[7px] w-[7px] rounded-full bg-emerald-300" />
                Live
              </div>
            </div>
          </NavLink>
          <nav className="flex flex-col gap-2 text-[15px] relative">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={item.badge?.tooltip ?? item.label}
                  className={({ isActive }) =>
                    clsx(
                      'group relative flex items-center gap-3 rounded-[14px] px-3.5 py-3 text-sm transition-colors border text-text-secondary backdrop-blur-xl min-h-[48px]',
                      isActive
                        ? 'bg-white/8 text-text-primary border-border-soft shadow-[0_14px_30px_rgba(0,0,0,0.36)]'
                        : 'bg-transparent border-transparent hover:bg-white/6 hover:border-border-soft'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={clsx('w-[18px] h-[18px]', isActive ? 'text-white' : 'text-text-secondary')} />
                      <span className="flex-1 min-w-0 text-left leading-snug whitespace-normal break-normal font-medium tracking-[-0.01em]">
                        {item.label}
                      </span>
                      {item.badge ? (
                        <span className="ml-auto inline-flex items-center justify-center rounded-full px-2 py-[3px] text-[11px] text-text-primary bg-white/10 border border-border-soft">
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
          <header className="sticky top-0 z-10 bg-[rgba(10,14,22,0.94)] backdrop-blur-xl border-b border-border-soft/80 shadow-[0_16px_36px_rgba(0,0,0,0.45)]">
            <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 py-4">
              <SectionHeader
                as="h1"
                label={currentPage.label ?? undefined}
                title={currentPage.title}
                subtitle={currentPage.subtitle}
                framed={false}
                className="mb-0 px-0 py-0"
              />
              <div className="mt-4 flex flex-wrap gap-3 text-[13px] text-text-secondary">
                <div className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/[0.04] px-3.5 py-1.5 shadow-[0_12px_24px_rgba(0,0,0,0.25)]">
                  <span className="h-[6px] w-[6px] rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
                  Инфраструктура синхронизирована
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/[0.02] px-3.5 py-1.5">
                  <span className="h-[6px] w-[6px] rounded-full bg-cyan-300/80" />
                  Последнее обновление: {lastUpdated}
                </div>
              </div>
            </div>
          </header>

          <div className="relative px-6 sm:px-8 pt-8 max-[800px]:pt-7 pb-12 space-y-8 max-w-7xl mx-auto">
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
