import React, { useMemo, useState } from 'react';
import {
  FolderKanban,
  AlertTriangle,
  CheckCircle2,
  Clock4,
  Sparkles,
} from 'lucide-react';

type ProjectStatus = 'active' | 'risk' | 'planned' | 'done';

interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: 'Высокий' | 'Средний' | 'Низкий';
  owner: string;
  deadline: string;
  progress: number;
}

const PROJECTS: Project[] = [
  {
    id: 'PRJ-001',
    name: 'Модернизация холодного коридора B',
    description: 'Замена кондиционеров и оптимизация температурных профилей.',
    status: 'active',
    priority: 'Высокий',
    owner: 'Иванов И.И.',
    deadline: '31.01.2026',
    progress: 62,
  },
  {
    id: 'PRJ-002',
    name: 'Внедрение DCIM-интеграции',
    description: 'Связка DC Maestro с системой учёта активов и CMDB.',
    status: 'risk',
    priority: 'Высокий',
    owner: 'Петров А.В.',
    deadline: '15.12.2025',
    progress: 38,
  },
  {
    id: 'PRJ-003',
    name: 'Оптимизация энергопотребления (PUE)',
    description:
      'Пилотный проект по снижению PUE за счёт динамического управления нагрузкой.',
    status: 'planned',
    priority: 'Средний',
    owner: 'Сидорова К.А.',
    deadline: '01.04.2026',
    progress: 10,
  },
  {
    id: 'PRJ-004',
    name: 'Миграция клиентов в зал C',
    description: 'Перенос инфраструктуры крупных клиентов в новый модуль.',
    status: 'active',
    priority: 'Средний',
    owner: 'Громов Н.П.',
    deadline: '10.02.2026',
    progress: 45,
  },
  {
    id: 'PRJ-005',
    name: 'Обновление прошивок сетевого оборудования',
    description: 'Плановое обновление ПО для ядра сети и access-слоя.',
    status: 'done',
    priority: 'Низкий',
    owner: 'Токарев Д.С.',
    deadline: '05.11.2025',
    progress: 100,
  },
];

type FilterKey = 'all' | 'active' | 'risk' | 'planned' | 'done';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<FilterKey>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.status === filter);
  }, [filter]);

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-200">
            <Clock4 className="h-3 w-3" />
            В работе
          </span>
        );
      case 'risk':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-200">
            <AlertTriangle className="h-3 w-3" />
            Риск срыва
          </span>
        );
      case 'planned':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/10 px-2 py-0.5 text-xs font-medium text-slate-200">
            <Sparkles className="h-3 w-3" />
            План
          </span>
        );
      case 'done':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-200">
            <CheckCircle2 className="h-3 w-3" />
            Завершён
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'Высокий':
        return 'text-rose-300 bg-rose-500/10 border-rose-500/40';
      case 'Средний':
        return 'text-amber-300 bg-amber-500/10 border-amber-500/40';
      case 'Низкий':
        return 'text-slate-200 bg-slate-600/10 border-slate-500/30';
      default:
        return 'text-slate-200 bg-slate-700/10 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Заголовок + summary */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-white">
            <FolderKanban className="h-6 w-6 text-blue-400" />
            Проекты ЦОД
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Управление ключевыми инициативами: модернизация инфраструктуры,
            энергосбережение, миграции и интеграции.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
            <div className="text-slate-400">Активных</div>
            <div className="text-right text-sm font-semibold text-slate-50">
              {PROJECTS.filter((p) => p.status === 'active').length}
            </div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
            <div className="text-slate-400">Под риском</div>
            <div className="text-right text-sm font-semibold text-amber-300">
              {PROJECTS.filter((p) => p.status === 'risk').length}
            </div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
            <div className="text-slate-400">Завершено</div>
            <div className="text-right text-sm font-semibold text-emerald-300">
              {PROJECTS.filter((p) => p.status === 'done').length}
            </div>
          </div>
        </div>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 text-xs">
          {(
            [
              ['all', 'Все'],
              ['active', 'В работе'],
              ['risk', 'Риск'],
              ['planned', 'План'],
              ['done', 'Завершённые'],
            ] as [FilterKey, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full border px-3 py-1 ${
                filter === key
                  ? 'border-blue-500 bg-blue-500/10 text-blue-100'
                  : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500">
          Записи: {filtered.length} из {PROJECTS.length}
        </span>
      </div>

      {/* Таблица проектов */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 shadow-sm">
        <div className="hidden border-b border-slate-800 bg-slate-900/90 px-4 py-2 text-xs text-slate-400 md:grid md:grid-cols-[0.6fr,1.2fr,0.6fr,0.6fr,0.6fr,0.6fr] md:gap-4">
          <div>Проект</div>
          <div>Описание</div>
          <div>Приоритет</div>
          <div>Статус</div>
          <div>Ответственный</div>
          <div className="text-right">Дедлайн / Прогресс</div>
        </div>

        <div className="divide-y divide-slate-800">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="grid gap-4 px-4 py-3 text-xs text-slate-100 transition-colors hover:bg-slate-900/80 md:grid-cols-[0.6fr,1.2fr,0.6fr,0.6fr,0.6fr,0.6fr]"
            >
              <div>
                <div className="font-mono text-[11px] text-slate-500">
                  {project.id}
                </div>
                <div className="mt-0.5 text-sm font-semibold">
                  {project.name}
                </div>
              </div>

              <div className="text-slate-300">{project.description}</div>

              <div>
                <span
                  className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${getPriorityColor(
                    project.priority
                  )}`}
                >
                  {project.priority}
                </span>
              </div>

              <div>{getStatusBadge(project.status)}</div>

              <div>
                <div className="text-sm text-slate-100">
                  {project.owner}
                </div>
                <div className="text-[11px] text-slate-500">
                  Группа эксплуатации
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-slate-400">
                  Дедлайн: {project.deadline}
                </div>
                <div className="mt-1 flex items-center justify-end gap-2">
                  <div className="h-1.5 w-24 rounded-full bg-slate-800">
                    <div
                      className={`h-1.5 rounded-full ${
                        project.status === 'done'
                          ? 'bg-emerald-400'
                          : project.status === 'risk'
                          ? 'bg-amber-400'
                          : 'bg-blue-400'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[11px] text-slate-200">
                    {project.progress}%
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center text-xs text-slate-500">
              Под выбранный фильтр пока не попало ни одного проекта.
            </div>
          )}
        </div>
      </div>

      <p className="text-[11px] text-slate-500">
        В реальной инсталляции этот раздел может быть связан с корпоративной
        системой управления проектами или внутренним реестром инициатив ЦОД.
      </p>
    </div>
  );
};

export default Projects;
