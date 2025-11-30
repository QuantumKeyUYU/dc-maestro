// i18n.ts
import type { Language } from './types';
import { useUiSettings } from './UiSettingsContext';

const translations: Record<Language, Record<string, string>> = {
  ru: {
    'nav.dashboard': 'Дашборд',
    'nav.monitoring': 'Мониторинг (DCIM)',
    'nav.maintenance': 'ТО и Ремонты',
    'nav.personnel': 'Персонал (WFM)',
    'nav.warehouse': 'Склад и Закупки',
    'nav.finance': 'Финансы',
    'nav.projects': 'Проекты',
    'nav.security': 'Безопасность',
    'sidebar.main': 'Основное',

    'header.searchPlaceholder':
      'Поиск по оборудованию, сотрудникам, инцидентам...',
    'header.notifications': 'Уведомления',
    'header.role': 'Старший инженер',
    'header.theme.dark': 'Тёмная',
    'header.theme.light': 'Светлая',
    'header.theme.system': 'Системная',
  },
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.monitoring': 'Monitoring (DCIM)',
    'nav.maintenance': 'Maintenance',
    'nav.personnel': 'Workforce (WFM)',
    'nav.warehouse': 'Warehouse & Procurement',
    'nav.finance': 'Finance',
    'nav.projects': 'Projects',
    'nav.security': 'Security',
    'sidebar.main': 'Main',

    'header.searchPlaceholder':
      'Search equipment, staff, incidents...',
    'header.notifications': 'Notifications',
    'header.role': 'Senior Engineer',
    'header.theme.dark': 'Dark',
    'header.theme.light': 'Light',
    'header.theme.system': 'System',
  },
};

export const translate = (lang: Language, key: string): string => {
  const byLang = translations[lang] || translations.ru;
  return byLang[key] ?? translations.ru[key] ?? key;
};

export const useTranslation = () => {
  const { language } = useUiSettings();

  return {
    language,
    t: (key: string) => translate(language, key),
  };
};
