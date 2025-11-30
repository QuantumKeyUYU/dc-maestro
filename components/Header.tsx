// components/Header.tsx
import React from 'react';
import { Bell } from 'lucide-react';
import { useUiSettings } from '../UiSettingsContext';
import { useTranslation } from '../i18n';

const Header: React.FC = () => {
  const { theme, language } = useUiSettings();
  const { t } = useTranslation();

  const themeLabel =
    theme === 'dark'
      ? t('header.theme.dark')
      : theme === 'light'
      ? t('header.theme.light')
      : t('header.theme.system');

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-3 backdrop-blur">
      {/* Поиск */}
      <div className="flex max-w-xl flex-1 items-center">
        <div className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs text-slate-300">
          <span className="text-slate-500">🔍</span>
          <input
            type="text"
            placeholder={t('header.searchPlaceholder')}
            className="w-full bg-transparent text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          <span className="hidden rounded border border-slate-700 px-1.5 py-0.5 text-[10px] text-slate-400 md:inline">
            Ctrl + K
          </span>
        </div>
      </div>

      {/* Правая часть */}
      <div className="ml-4 flex items-center gap-4">
        {/* Плашка тема/язык */}
        <div className="hidden items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-300 md:flex">
          <span className="font-mono uppercase">{language}</span>
          <span className="text-slate-600">•</span>
          <span>{themeLabel}</span>
        </div>

        {/* Колокольчик */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-950 text-slate-200 hover:bg-slate-900"
          aria-label={t('header.notifications')}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-slate-900 bg-rose-500" />
        </button>

        {/* Пользователь */}
        <div className="flex items-center gap-3">
          <div className="text-right text-xs leading-tight">
            <div className="font-medium text-slate-100">Алексей Петров</div>
            <div className="text-[11px] text-slate-400">{t('header.role')}</div>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-100">
            АП
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
