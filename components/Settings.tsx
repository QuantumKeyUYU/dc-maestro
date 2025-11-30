// components/Settings.tsx
import React from 'react';
import { Bell, Globe2, Moon, ShieldCheck, Sun } from 'lucide-react';
import { useUiSettings } from '../UiSettingsContext';
import type { ThemeMode, Language } from '../types';

const Settings: React.FC = () => {
  const { theme, language, setTheme, setLanguage } = useUiSettings();
  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [pushAlerts, setPushAlerts] = React.useState(true);

  const handleTheme = (value: ThemeMode) => setTheme(value);
  const handleLanguage = (value: Language) => setLanguage(value);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Настройки</h1>
          <p className="mt-1 text-sm text-slate-400">
            Локальные настройки демо-стенда DC Maestro. Данные не сохраняются на
            сервере и используются только для презентации.
          </p>
        </div>
        <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          DEMO • offline
        </span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr,1fr]">
        {/* Левая колонка */}
        <div className="space-y-6">
          {/* Профиль */}
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-200">Профиль</h2>
            <p className="mt-1 text-xs text-slate-500">
              В реальной системе здесь будут данные из LDAP / AD / IDM. Сейчас
              это статический пользователь для демонстрации.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-semibold">
                АП
              </div>
              <div className="space-y-1 text-sm">
                <div className="font-medium text-white">Алексей Петров</div>
                <div className="text-slate-400">Старший инженер ЦОД</div>
                <div className="text-xs text-slate-500">
                  Уровень доступа: L3 • role: dc_senior_engineer
                </div>
              </div>
            </div>
          </section>

          {/* Интерфейс */}
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Globe2 className="h-4 w-4 text-slate-400" />
              Интерфейс
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  ТЕМА
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleTheme('dark')}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                      theme === 'dark'
                        ? 'border-blue-500 bg-blue-500/10 text-blue-100'
                        : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <Moon className="h-3.5 w-3.5" />
                    Тёмная
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTheme('light')}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                      theme === 'light'
                        ? 'border-amber-400 bg-amber-500/10 text-amber-100'
                        : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <Sun className="h-3.5 w-3.5" />
                    Светлая
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTheme('system')}
                    className={`hidden md:flex flex-1 items-center justify-center rounded-lg border px-3 py-2 text-xs ${
                      theme === 'system'
                        ? 'border-emerald-400 bg-emerald-500/10 text-emerald-100'
                        : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    Система
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  В демо-теме принудительно используется тёмная палитра в
                  компонентах, но фон страницы меняется, чтобы увидеть эффект.
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  ЯЗЫК ИНТЕРФЕЙСА
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleLanguage('ru')}
                    className={`flex flex-1 items-center justify-center rounded-lg border px-3 py-2 text-xs ${
                      language === 'ru'
                        ? 'border-blue-500 bg-blue-500/10 text-blue-100'
                        : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    RU
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguage('en')}
                    className={`flex flex-1 items-center justify-center rounded-lg border px-3 py-2 text-xs ${
                      language === 'en'
                        ? 'border-blue-500 bg-blue-500/10 text-blue-100'
                        : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    EN
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  В текущей демо-сборке переведены навигация и верхняя панель,
                  остальной текст пока только на русском.
                </p>
              </div>
            </div>
          </section>

          {/* Уведомления */}
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Bell className="h-4 w-4 text-slate-400" />
              Уведомления
            </h2>

            <div className="mt-4 space-y-3 text-sm">
              <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
                <div>
                  <div className="font-medium text-slate-200">
                    Критические алерты
                  </div>
                  <div className="text-xs text-slate-500">
                    Срабатывание аварийных датчиков, потеря связи, сбой
                    питания.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-blue-500"
                />
              </label>

              <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
                <div>
                  <div className="font-medium text-slate-200">
                    Рабочие уведомления
                  </div>
                  <div className="text-xs text-slate-500">
                    Новые заявки, смены, комментарии к инцидентам.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={pushAlerts}
                  onChange={(e) => setPushAlerts(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-blue-500"
                />
              </label>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              В боевой системе источником уведомлений могут быть почта,
              мессенджеры, SMS или интеграция с ITSM-платформой.
            </p>
          </section>
        </div>

        {/* Правая колонка */}
        <aside className="space-y-4">
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              О системе
            </h2>

            <dl className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Версия интерфейса</dt>
                <dd className="font-mono text-slate-200">
                  v0.2.4.0 LIVE (demo)
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Среда</dt>
                <dd className="font-mono text-emerald-300">LOCAL / LAB</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Режим данных</dt>
                <dd className="font-mono text-slate-200">Статический mock</dd>
              </div>
            </dl>

            <p className="mt-4 text-xs text-slate-500">
              Все данные на этом стенде являются тестовыми и не относятся к
              реальному оборудованию или клиентам.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Settings;
