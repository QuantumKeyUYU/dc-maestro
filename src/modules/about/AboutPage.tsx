import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { CtaLink } from '../../shared/components/CtaPill';
import { ArrowRight } from '../../shared/icons';

const responsibilityItems = [
  {
    title: 'Аптайм и инциденты ЦОД',
    description: 'Контролируйте SLA, смотрите аптайм по площадкам и быстро проваливайтесь в инциденты.',
    to: '/sites',
    label: 'Dashboard + Sites'
  },
  {
    title: 'Работа выездных и локальных бригад',
    description: 'Нагрузка смен, исполнители, выезды и планирование.',
    to: '/personnel',
    label: 'Personnel'
  },
  {
    title: 'ТО, ремонты, высоковольтные системы',
    description: 'Все заявки на обслуживание, критичность активов и статус выполнения.',
    to: '/maintenance',
    label: 'Maintenance'
  },
  {
    title: 'Склад, закупки',
    description: 'Остатки по складам, позиции на минимуме, потребности на закупку.',
    to: '/inventory',
    label: 'Inventory'
  },
  {
    title: 'Расходы, бюджет',
    description: 'OPEX/CAPEX по площадкам и динамика затрат энергии.',
    to: '/finance',
    label: 'Finance'
  },
  {
    title: 'Охрана труда, пожарная безопасность, договоры',
    description: 'Инциденты безопасности, инструктажи, просроченные проверки.',
    to: '/safety',
    label: 'Safety'
  }
];

const interviewFlow = [
  'Начните с дашборда: Operational Strain Index и краткий отчёт дня подсветят проблемные зоны.',
  'Откройте «Площадки ЦОД» и провалитесь в нагруженный ЦОД, чтобы показать живые KPI и инциденты.',
  'Через блок предупреждений перейдите в Maintenance или Safety, чтобы разобрать просрочки.',
  'Покажите склад и финансовые расходы для привязки к бюджету и закупкам.',
  'Завершите показом смен и нагрузки персонала в модуле Personnel.'
];

export function AboutPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="DC Maestro для роли Руководителя эксплуатации сети ЦОД"
        subtitle="Внутренний прототип под вакансию «Вис Энергия»: демонстрация системного управления сетью ЦОД."
      />

      <p className="text-sm text-neutral-400 leading-relaxed max-w-4xl">
        Демо собирает ключевые сценарии роли: контроль эксплуатационных рисков, прозрачность загрузки смен, просроченные заявки и
        безопасность. Это быстрый кокпит, чтобы нанимающий сразу увидел, как закрываются задачи «руководителя эксплуатации ЦОД» без
        долгого онбординга.
      </p>

      <Card title="Зона ответственности" subtitle="Как пункты вакансии ложатся на модули DC Maestro">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {responsibilityItems.map((item) => (
            <div
              key={item.title}
              className="rounded-card border border-border-soft bg-base-panelSoft p-5 shadow-elevation-card flex flex-col gap-3"
            >
              <div className="space-y-2">
                <div className="text-lg font-semibold text-neutral-100">{item.title}</div>
                <p className="text-sm text-neutral-400 leading-relaxed break-words">{item.description}</p>
                <p className="text-xs text-text-muted mt-1">{item.label}</p>
              </div>
              <CtaLink to={item.to} icon={<ArrowRight className="w-4 h-4" aria-hidden />} size="lg" className="mt-auto">
                Открыть модуль
              </CtaLink>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Как использовать демо на собеседовании" subtitle="5 шагов, чтобы провести нанимающего через ключевые сценарии">
        <ul className="list-disc pl-5 space-y-2 text-neutral-100">
          {interviewFlow.map((tip) => (
            <li key={tip} className="leading-relaxed">
              {tip}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
