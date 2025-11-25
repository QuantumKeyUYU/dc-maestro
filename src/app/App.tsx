import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
// Импорты страниц и утилит заменены на заглушки для обеспечения компиляции, 
// поскольку вспомогательные файлы (../modules/, ../shared/) не предоставлены.
// В рабочем проекте эти импорты должны быть корректными.
// @ts-ignore
import { DashboardPage } from './modules/dashboard/DashboardPage';
// @ts-ignore
import { SitesPage } from './modules/sites/SitesPage';
// @ts-ignore
import { PersonnelPage } from './modules/personnel/PersonnelPage';
// @ts-ignore
import { MaintenancePage } from './modules/maintenance/MaintenancePage';
// @ts-ignore
import { InventoryPage } from './modules/inventory/InventoryPage';
// @ts-ignore
import { FinancePage } from './modules/finance/FinancePage';
// @ts-ignore
import { SafetyPage } from './modules/safety/SafetyPage';
// @ts-ignore
import { strings } from './shared/lib/strings';
// @ts-ignore
import { SitesDetailPage } from './modules/sites/SitesDetailPage';
// @ts-ignore
import { AboutPage } from './modules/about/AboutPage';

// Импортируем иконки, используя Lucide Icons (предполагаем, что они доступны)
import { Boxes, Briefcase, Cpu, LayoutDashboard, Shield, Users, Wallet, Wrench, ChevronDown, Bell } from 'lucide-react';

// Имитация хука useNavBadges и SectionHeader для компиляции
const useNavBadges = () => ({ nonHealthySites: 1, overdueWorkOrders: 2, lowInventory: 0, openSafety: 1 });
const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
    <div className="mb-4">
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
);

// Типы и метаданные страниц
type PageMeta = {
  match: RegExp;
  title: string;
  subtitle?: string;
  label?: string | null;
};

// Имитация объекта strings
const mockStrings = {
    headers: {
        appTitle: 'DASHSYS'
    },
    dashboard: { title: 'Дашборд', subtitle: 'Общая сводка' },
    sites: { title: 'Объекты' },
    personnel: { title: 'Персонал', subtitle: 'Управление сотрудниками' },
    maintenance: { title: 'ТОиР', subtitle: 'Заказы на обслуживание' },
    inventory: { title: 'Склад', subtitle: 'Запасы и материалы' },
    finance: { title: 'Финансы', subtitle: 'Финансовые потоки' },
    safety: { title: 'Безопасность', subtitle: 'Инциденты и контроль' },
    about: { title: 'О системе', subtitle: 'Информация' },
};
// Заменяем strings на mockStrings для компиляции
const strings = mockStrings;

const pageMeta: PageMeta[] = [
  {
    match: /^\/$/,
    title: strings.dashboard.title,
    subtitle: strings.dashboard.subtitle,
  },
  { match: /^\/sites(\/.*)?$/, title: strings.sites.title, label: strings.sites.title },
  { match: /^\/personnel$/, title: strings.personnel.title, subtitle: strings.personnel.subtitle, label: strings.personnel.title },
  { match: /^\/maintenance$/, title: strings.maintenance.title, subtitle: strings.maintenance.subtitle, label: strings.maintenance.title },
  { match: /^\/inventory$/, title: strings.inventory.title, subtitle: strings.inventory.subtitle, label: strings.inventory.title },
  { match: /^\/finance$/, title: strings.finance.title, subtitle: strings.finance.subtitle, label: strings.finance.title },
  { match: /^\/safety$/, title: strings.safety.title, subtitle: strings.safety.subtitle, label: strings.safety.title },
  { match: /^\/about$/, title: strings.about.title, subtitle: strings.about.subtitle, label: strings.about.title },
];

// Заглушки для компонентов, которые не были предоставлены, чтобы избежать ошибок компиляции
const MockPage = ({ name }: { name: string }) => (
    <div className="p-8 bg-base-panelSoft rounded-xl text-white">
        <h2 className="text-2xl font-bold">Страница: {name}</h2>
        <p className="mt-2 text-text-muted">Этот контент является заглушкой, так как оригинальный компонент не был предоставлен.</p>
    </div>
);
const DashboardPage = () => <MockPage name="Дашборд" />;
const SitesPage = () => <MockPage name="Объекты" />;
const PersonnelPage = () => <MockPage name="Персонал" />;
const MaintenancePage = () => <MockPage name="ТОиР" />;
const InventoryPage = () => <MockPage name="Склад" />;
const FinancePage = () => <MockPage name="Финансы" />;
const SafetyPage = () => <MockPage name="Безопасность" />;
const SitesDetailPage = () => <MockPage name="Детали Объекта" />;
const AboutPage = () => <MockPage name="О системе" />;


export default function App() {
  const location = useLocation();
  const badges = useNavBadges();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Обновляем текущее время каждую минуту для шапки
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Имитация последнего обновления данных
  const lastUpdated = useMemo(() => {
    return currentTime.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [currentTime]);

  const currentPage = useMemo(() => {
    return pageMeta.find((meta) => meta.match.test(location.pathname));
  }, [location.pathname]);

  const navItems = useMemo(() => [
    { to: '/', label: 'Дашборд', icon: LayoutDashboard },
    { to: '/sites', label: 'Объекты', icon: Cpu, badge: badges.nonHealthySites > 0 ? { value: badges.nonHealthySites, tooltip: 'Не в порядке' } : null },
    { to: '/personnel', label: 'Персонал', icon: Users },
    { to: '/maintenance', label: 'ТОиР', icon: Wrench, badge: badges.overdueWorkOrders > 0 ? { value: badges.overdueWorkOrders, tooltip: 'Просроченные заказы' } : null },
    { to: '/inventory', label: 'Склад', icon: Boxes, badge: badges.lowInventory > 0 ? { value: badges.lowInventory, tooltip: 'Заканчивается' } : null },
    { to: '/finance', label: 'Финансы', icon: Wallet },
    { to: '/safety', label: 'Безопасность', icon: Shield, badge: badges.openSafety > 0 ? { value: badges.openSafety, tooltip: 'Открытые инциденты' } : null },
    { to: '/about', label: 'О системе', icon: Briefcase },
  ], [badges]);

  return (
    // Улучшенный фон с легким градиентом и текстурой
    <div className="min-h-screen text-text-primary relative overflow-x-hidden bg-[#0a0f18] font-inter">
      <div className="flex h-screen relative">
        
        {/* Адаптивный и стильный Сайдбар */}
        <aside className="
          w-[250px] xl:w-[268px] 
          bg-base-panel border-r border-border-soft/80 
          px-5 py-7 flex flex-col gap-8 
          shadow-xl shadow-black/30 sticky top-0 h-full 
          relative z-20 
          backdrop-blur-xl 
          overflow-y-auto scrollbar-thin
          max-sm:hidden 
          transition-transform duration-300 ease-out
        ">
          
          {/* Логотип/Заголовок (Стильный блок) */}
          <NavLink to="/" className="group block -mx-1">
            <div className="p-4 rounded-xl border border-border-soft bg-base-panelSoft shadow-elevation-card flex items-center justify-between gap-3 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="space-y-0.5">
                <div className="text-xl font-extrabold text-white leading-snug tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-500">
                    {strings.headers.appTitle}
                </div>
                <p className="text-[12px] leading-snug text-text-muted">Системный контроль объектов</p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-600/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 shadow-lg shadow-emerald-700/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </div>
            </div>
          </NavLink>
          
          {/* Навигация */}
          <nav className="flex flex-col gap-2.5 text-[15px] relative">
            <div className="text-xs uppercase text-text-muted tracking-widest mb-1 pl-3">Навигация</div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={item.badge?.tooltip ?? item.label}
                  className={({ isActive }) =>
                    clsx(
                      'group relative flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] transition-all duration-200 border text-text-secondary', 
                      isActive
                        // Улучшенный АКТИВНЫЙ СТИЛЬ: "Неоновое" свечение + яркий градиент
                        ? 'bg-gradient-to-br from-cyan-900/40 to-cyan-900/10 text-white border-cyan-500/30 shadow-lg shadow-cyan-900/40 transform scale-[1.01] font-semibold' 
                        // Улучшенный HOVER СТИЛЬ: Эффект свечения на наведении
                        : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10 hover:text-text-primary hover:shadow-sm'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Иконка с цветовым акцентом */}
                      <Icon className={clsx('w-5 h-5 transition-colors duration-200', isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(52,211,255,0.7)]' : 'text-text-secondary/70')} /> 
                      <span className="flex-1 text-left leading-none whitespace-normal break-words font-medium tracking-wide">
                        {item.label}
                      </span>
                      {item.badge ? (
                        // Стильный бейдж с градиентом и тенью
                        <span className="ml-auto inline-flex items-center justify-center rounded-full px-2 py-[4px] text-[11px] text-white bg-gradient-to-r from-red-500 to-amber-500 border border-red-400/50 shadow-md shadow-red-700/40 font-bold leading-none">
                          {item.badge.value}
                        </span>
                      ) : null}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Футер сайдбара */}
          <div className="mt-auto pt-4 border-t border-border-soft/50">
            <div className="text-xs text-text-muted text-center">
                © {new Date().getFullYear()} {strings.headers.appTitle}
            </div>
          </div>
        </aside>

        {/* Основной контент */}
        <main className="flex-1 overflow-y-auto scrollbar-thin z-10">
          
          {/* Улучшенная Шапка (Header) */}
          <header className="sticky top-0 z-10 bg-base-panel/90 backdrop-blur-md border-b border-border-soft/70 px-6 sm:px-8 py-5">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              
              <div className="flex flex-col">
                <div className="text-[28px] font-semibold tracking-tight text-text-primary leading-tight flex items-center gap-3">
                  {/* Заголовок страницы с легким градиентом */}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    {currentPage?.title}
                  </span>
                </div>
                {currentPage?.subtitle && (
                    <p className="text-sm text-text-secondary mt-1">{currentPage.subtitle}</p>
                )}
              </div>

              <div className="flex items-center gap-4">
                
                {/* Кнопка уведомлений */}
                <button 
                  className="p-2 rounded-full text-white/80 hover:bg-white/5 transition-colors relative"
                  title="Уведомления"
                >
                  <Bell className="w-5 h-5"/>
                  {badges.nonHealthySites + badges.overdueWorkOrders + badges.openSafety + badges.lowInventory > 0 && (
                    <span className="absolute top-0.5 right-0.5 h-2 w-2 bg-red-500 rounded-full border border-base-panel shadow-md"></span>
                  )}
                </button>

                {/* Блок статусов */}
                <div className="flex items-center gap-3 text-[13px] text-text-secondary font-medium">
                  {/* Стильный бейдж "Синхронизировано" */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-700/20 px-3.5 py-1.5 shadow-md shadow-emerald-700/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Инфраструктура синхронизирована
                  </div>
                  {/* Бейдж "Последнее обновление" */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
                    Обновление: {lastUpdated}
                  </div>
                </div>

                {/* Профиль пользователя */}
                <div className="flex items-center gap-2 ml-2 cursor-pointer p-1.5 rounded-full hover:bg-white/5 transition-colors">
                    <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/30">
                        ДМ
                    </div>
                    <ChevronDown className="w-4 h-4 text-text-secondary"/>
                </div>
              </div>

            </div>
          </header>

          {/* Контент страниц */}
          <div className="relative px-6 sm:px-8 pt-8 max-[800px]:pt-7 pb-12 space-y-8 max-w-7xl mx-auto">
            <Routes>
              {/* Примечание: Используются заглушки для страниц, которые не были предоставлены */}
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
