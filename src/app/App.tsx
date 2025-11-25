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
    <div className="min-h-screen text-text-primary relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(120,200,255,0.18),transparent_35%),radial-gradient(circle_at_84%_12%,rgba(83,221,196,0.18),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(165,120,255,0.12),transparent_40%)] blur-[90px] opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_35%,transparent_60%),linear-gradient(120deg,rgba(97,210,255,0.06),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.04)_0%,transparent_36%,transparent_70%,rgba(255,255,255,0.02)_100%)]" />

      <div className="flex h-screen overflow-hidden relative">
        <aside className="w-[260px] lg:w-[252px] md:w-[240px] sm:w-[220px] bg-[rgba(6,8,14,0.78)] border-r border-white/10 px-6 py-7 flex flex-col gap-6 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.55)] relative z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(79,180,255,0.22),transparent_45%)] opacity-80 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          <NavLink to="/" className="group block relative">
            <div className="relative -mx-1 px-4 py-4 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_-4%,rgba(255,255,255,0.32),transparent_38%),radial-gradient(circle_at_80%_10%,rgba(124,210,255,0.22),transparent_36%)] opacity-70" />
              <div className="absolute inset-x-2 top-[2px] h-[1px] bg-white/25 rounded-full" />
              <div className="flex items-center justify-between gap-3 relative">
                <div>
                  <div className="text-lg sm:text-xl font-semibold text-text-primary leading-tight">{strings.headers.appTitle}</div>
                  <p className="text-[12px] text-text-muted mt-1">Системный контроль объектов</p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
                  <span className="h-[6px] w-[6px] rounded-full bg-emerald-300 shadow-[0_0_0_5px_rgba(16,185,129,0.22)]" />
                  Live
                </div>
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
                      'group relative flex items-center gap-3 rounded-[16px] px-3.5 py-2.5 text-sm transition-all border border-transparent text-text-secondary backdrop-blur-[14px] overflow-hidden',
                      isActive
                        ? 'bg-gradient-to-r from-[rgba(79,180,255,0.32)] via-[rgba(99,205,255,0.18)] to-[rgba(79,180,255,0.12)] text-text-primary border-[rgba(144,206,255,0.38)] shadow-[0_20px_52px_rgba(0,0,0,0.48)]'
                        : 'bg-white/0 hover:bg-white/[0.05] hover:text-white/85 hover:border-white/12'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-70 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.08),transparent_40%)] transition" />
                      <span
                        className={clsx(
                          'absolute left-2 top-1/2 h-[70%] w-px -translate-y-1/2 rounded-full transition-all',
                          isActive
                            ? 'bg-gradient-to-b from-[rgba(174,226,255,0.95)] via-[rgba(107,176,255,0.75)] to-[rgba(80,160,255,0.55)]'
                            : 'bg-white/0 group-hover:bg-gradient-to-b group-hover:from-white/40 group-hover:via-white/20 group-hover:to-transparent'
                        )}
                      />
                      <Icon
                        className={clsx(
                          'w-[18px] h-[18px] drop-shadow-[0_6px_16px_rgba(79,180,255,0.24)] relative',
                          isActive ? 'text-white' : 'text-text-secondary'
                        )}
                      />
                      <span className="flex-1 min-w-0 text-left leading-tight relative truncate font-medium tracking-[-0.01em]">
                        {item.label}
                      </span>
                      {item.badge ? (
                        <span className="ml-auto inline-flex items-center justify-center rounded-capsule px-2 py-[3px] text-[11px] text-text-primary bg-white/12 border border-white/15 shadow-[0_10px_22px_rgba(0,0,0,0.38)]">
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
          <header className="sticky top-0 z-10 bg-[rgba(8,12,18,0.92)] backdrop-blur-2xl border-b border-white/10 px-7 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
            <SectionHeader
              as="h1"
              label={currentPage.label ?? undefined}
              title={currentPage.title}
              subtitle={currentPage.subtitle}
              framed={false}
              className="mb-0 px-0 py-0"
            />
            <div className="mt-4 flex flex-wrap gap-3 text-[12px] text-text-secondary">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.32)]">
                <span className="h-[6px] w-[6px] rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
                Инфраструктура синхронизирована
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5">
                <span className="h-[6px] w-[6px] rounded-full bg-cyan-300/80" />
                Последнее обновление: {lastUpdated}
              </div>
            </div>
          </header>

          <div className="relative px-8 pt-8 max-[800px]:pt-7 pb-12 space-y-8">
            <div className="pointer-events-none absolute inset-x-4 -top-6 h-24 bg-[radial-gradient(circle_at_50%_20%,rgba(111,186,255,0.14),transparent_55%),radial-gradient(circle_at_16%_50%,rgba(124,210,255,0.12),transparent_48%)] blur-2xl opacity-80" />
            <div className="pointer-events-none absolute inset-x-0 top-20 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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
