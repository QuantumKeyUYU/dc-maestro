import { Link } from 'react-router-dom';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
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
    <div className="space-y-8">
      <SectionHeader
        title="DC Maestro для роли Руководителя эксплуатации сети ЦОД"
        subtitle="Внутренний прототип под вакансию «Вис Энергия»: демонстрация системного управления сетью ЦОД."
      />

      <p className="text-sm text-text-muted leading-relaxed max-w-4xl">
        Демо собирает ключевые сценарии роли: контроль эксплуатационных рисков, прозрачность загрузки смен, просроченные заявки и
        безопасность. Это быстрый кокпит, чтобы нанимающий сразу увидел, как закрываются задачи «руководителя эксплуатации ЦОД» без
        долгого онбординга.
      </p>

      <Card title="Зона ответственности" subtitle="Как пункты вакансии ложатся на модули DC Maestro">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {responsibilityItems.map((item) => (
            <Card key={item.title} interactive className="bg-white/5">
              <div className="space-y-2">
                <div className="text-lg font-semibold text-text-primary">{item.title}</div>
                <p className="text-sm text-text-muted">{item.description}</p>
                <p className="text-xs text-accent-muted mt-1">{item.label}</p>
              </div>
              <Link
                to={item.to}
                className="inline-flex items-center gap-2 text-accent-primary font-medium text-sm mt-3 transition-transform hover:translate-x-0.5"
              >
                Открыть модуль
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </Card>
          ))}
        </div>
      </Card>

      <Card title="Как использовать демо на собеседовании" subtitle="5 шагов, чтобы провести нанимающего через ключевые сценарии">
        <ul className="list-disc pl-5 space-y-2 text-text-primary">
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
