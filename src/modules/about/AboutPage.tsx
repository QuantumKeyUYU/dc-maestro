import { Link } from 'react-router-dom';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';

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
        description="Внутренний прототип под вакансию «Вис Энергия»: демонстрация системного управления сетью ЦОД."
      />

      <Card title="Зона ответственности" subtitle="Как пункты вакансии ложатся на модули DC Maestro">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {responsibilityItems.map((item) => (
            <div
              key={item.title}
              className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-primary/40 transition shadow-sm hover:shadow-primary/10 flex flex-col gap-3"
            >
              <div>
                <div className="text-lg font-semibold text-gray-100">{item.title}</div>
                <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                <p className="text-xs text-primary/80 mt-2">{item.label}</p>
              </div>
              <Link
                to={item.to}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary/80 transition"
              >
                Открыть модуль
                <span aria-hidden className="text-base">↗</span>
              </Link>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Как использовать демо на собеседовании" subtitle="5 шагов, чтобы провести нанимающего через ключевые сценарии">
        <ul className="list-disc pl-5 space-y-2 text-gray-200">
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
