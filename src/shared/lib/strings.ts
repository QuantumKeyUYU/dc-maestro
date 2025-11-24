export const pluralize = (
  count: number,
  forms: { one: string; few: string; many: string }
) => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return forms.one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms.few;
  return forms.many;
};

export const strings = {
  nav: {
    dashboard: 'Дашборд',
    sites: 'Площадки ЦОД',
    personnel: 'Персонал',
    maintenance: 'ТО и активы',
    inventory: 'Запасы',
    finance: 'Финансовая сводка',
    safety: 'Охрана труда',
    about: 'Вакансия / Demo'
  },
  headers: {
    appTitle: 'DC Maestro',
    appSubtitle: 'Кокпит руководителя эксплуатации ЦОД',
    dashboardLabel: 'Кокпит DC Maestro',
    moduleLabel: 'Модуль',
    aboutLabel: 'Вакансия / Demo',
    osiTooltip:
      'Operational Strain Index — агрегированный индекс нагрузки на сеть ЦОД (надёжность, загрузка смен, частота инцидентов).'
  },
  badges: {
    sitesTooltip: (count: number) =>
      `${count} ${pluralize(count, { one: 'площадка', few: 'площадки', many: 'площадок' })} со статусом «Критично» или «Предупреждение»`,
    maintenanceTooltip: (count: number) =>
      `${count} ${pluralize(count, { one: 'заявка', few: 'заявки', many: 'заявок' })} на ТО в работе или просрочены`,
    inventoryTooltip: (count: number) =>
      `${count} ${pluralize(count, { one: 'позиция', few: 'позиции', many: 'позиций' })} с критическим остатком`,
    safetyTooltip: (count: number) =>
      `${count} ${pluralize(count, { one: 'событие', few: 'события', many: 'событий' })} безопасности требуют внимания`
  },
  statusLabels: {
    healthy: 'Стабильно',
    warning: 'Предупреждение',
    critical: 'Критично',
    done: 'Завершено',
    in_progress: 'В работе',
    open: 'Открыто',
    scheduled: 'Запланировано',
    overdue: 'Просрочено',
    draft: 'Черновик',
    sent: 'Отправлено',
    received: 'Получено',
    in_transit: 'В пути'
  },
  dashboard: {
    title: 'Дашборд',
    subtitle: 'Обзор состояния сети и эксплуатационных рисков',
    todayReport: 'Краткий отчёт за сегодня',
    alerts: 'Текущие предупреждения',
    worstSites: 'Проблемные площадки'
  },
  sites: {
    title: 'Площадки ЦОД',
    subtitle: 'Uptime, надёжность и инциденты по площадкам',
    allSites: 'Все площадки',
    overviewTab: 'Обзор',
    incidentsTab: 'Инциденты',
    maintenanceTab: 'ТО и активы',
    financeTab: 'Финансы'
  },
  personnel: {
    title: 'Персонал',
    subtitle: 'Роли, смены, загрузка исполнителей'
  },
  maintenance: {
    title: 'ТО и активы',
    subtitle: 'Критичные активы, заявки на обслуживание и просрочки'
  },
  inventory: {
    title: 'Запасы',
    subtitle: 'Склад, минимальные остатки, закупки'
  },
  finance: {
    title: 'Финансовая сводка',
    subtitle: 'OPEX/CAPEX и структура затрат'
  },
  safety: {
    title: 'Охрана труда и безопасность',
    subtitle: 'Инциденты, тренировки, инспекции'
  },
  about: {
    title: 'Вакансия / Demo',
    subtitle: 'Сценарий демонстрации кокпита для собеседований'
  }
};
