import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Activity,
  Zap,
  Thermometer,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { StatusLevel } from '../types';

const data = [
  { time: '00:00', power: 240, temp: 21 },
  { time: '04:00', power: 238, temp: 21.2 },
  { time: '08:00', power: 265, temp: 22.5 },
  { time: '12:00', power: 290, temp: 23.1 },
  { time: '16:00', power: 278, temp: 22.8 },
  { time: '20:00', power: 250, temp: 21.5 },
  { time: '23:59', power: 245, temp: 21.1 },
];

type KPICardProps = {
  title: string;
  value: string;
  unit?: string;
  trend?: number;
  icon: React.ElementType;
  colorClass: string;
  status: StatusLevel;
};

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  trend,
  icon: Icon,
  colorClass,
  status,
}) => {
  const statusColors: Record<StatusLevel, string> = {
    [StatusLevel.NORMAL]: 'border-slate-800 bg-slate-900',
    [StatusLevel.WARNING]: 'border-amber-500/50 bg-amber-950/10',
    [StatusLevel.CRITICAL]: 'border-rose-500/50 bg-rose-950/10',
    [StatusLevel.OFFLINE]: 'border-slate-700 bg-slate-800/50',
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-lg group ${statusColors[status]}`}
    >
      <div
        className={`pointer-events-none absolute -right-6 -top-6 opacity-5 transition-opacity group-hover:opacity-10 ${colorClass}`}
      >
        <Icon className="h-32 w-32" />
      </div>

      <div className="relative z-10 mb-4 flex items-start justify-between">
        <div
          className={`rounded-lg border border-slate-800/60 bg-slate-900/60 p-2 ${colorClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        {typeof trend === 'number' && (
          <div
            className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              trend > 0
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-rose-500/10 text-rose-400'
            }`}
          >
            {trend > 0 ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="mb-1 text-sm font-medium text-slate-400">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold tracking-tight text-white">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-medium text-slate-500">{unit}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Отдельный компонент, который меряет размер контейнера и рисует график
const LoadTemperatureChart: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({
        width: rect.width || 0,
        height: rect.height || 0,
      });
    };

    update();

    const observer = new ResizeObserver(() => update());
    observer.observe(el);
    window.addEventListener('resize', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div ref={ref} className="h-80 w-full">
      {size.width > 0 && size.height > 0 && (
        <AreaChart
          data={data}
          width={size.width}
          height={size.height}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#1e293b"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#1e293b',
              borderRadius: 8,
            }}
            itemStyle={{ color: '#e2e8f0' }}
          />
          <Area
            type="monotone"
            dataKey="power"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPower)"
            name="Нагрузка, kW"
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={0}
            strokeDasharray="5 5"
            name="Температура, °C"
          />
        </AreaChart>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 p-6 animate-in fade-in duration-500">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Обзор ЦОД &quot;Север-1&quot;
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Оперативная сводка за последние 24 часа
          </p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700">
            Экспорт отчета
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500">
            Добавить инцидент
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Uptime (Аптайм)"
          value="99.998"
          unit="%"
          trend={0.01}
          icon={Activity}
          colorClass="text-emerald-400"
          status={StatusLevel.NORMAL}
        />
        <KPICard
          title="Общая Мощность"
          value="842"
          unit="kW"
          trend={2.4}
          icon={Zap}
          colorClass="text-amber-400"
          status={StatusLevel.WARNING}
        />
        <KPICard
          title="Средняя T° Зала"
          value="22.4"
          unit="°C"
          trend={-0.5}
          icon={Thermometer}
          colorClass="text-blue-400"
          status={StatusLevel.NORMAL}
        />
        <KPICard
          title="Активные Заявки"
          value="12"
          unit="шт"
          trend={-15}
          icon={Clock}
          colorClass="text-purple-400"
          status={StatusLevel.NORMAL}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Динамика нагрузки и температуры
              </h3>
              <p className="text-xs text-slate-500">
                За последние 24 часа, шаг 1 час
              </p>
            </div>
            <div className="flex gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <span className="inline-block h-1.5 w-3 rounded-full bg-blue-400" />
                Нагрузка
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-1.5 w-3 rounded-full bg-emerald-400" />
                Температура
              </span>
            </div>
          </div>

          <LoadTemperatureChart />
        </div>

        <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Критические Алерты
            </h3>
            <span className="rounded bg-rose-950/30 px-2 py-1 text-xs font-mono text-rose-400">
              LIVE
            </span>
          </div>

          <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pr-2">
            {[
              {
                id: 1,
                title: 'Сбой PDU-A2',
                loc: 'Ряд 4, Стойка 12',
                time: '10 мин назад',
                level: StatusLevel.CRITICAL,
              },
              {
                id: 2,
                title: 'Высокая температура',
                loc: 'Холодный коридор B',
                time: '25 мин назад',
                level: StatusLevel.WARNING,
              },
              {
                id: 3,
                title: 'Потеря связи',
                loc: 'Датчик влажности #4',
                time: '1 час назад',
                level: StatusLevel.WARNING,
              },
              {
                id: 4,
                title: 'Доступ в серверную',
                loc: 'Инженер Иванов И.И.',
                time: '2 часа назад',
                level: StatusLevel.NORMAL,
              },
            ].map((alert) => (
              <div
                key={alert.id}
                className="flex gap-3 rounded-lg border border-transparent p-3 transition-colors hover:border-slate-700 hover:bg-slate-800/50"
              >
                <div
                  className={`mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                    alert.level === StatusLevel.CRITICAL
                      ? 'bg-rose-500 animate-pulse'
                      : alert.level === StatusLevel.WARNING
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-200">
                    {alert.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500">{alert.loc}</p>
                </div>
                <span className="whitespace-nowrap text-xs text-slate-600">
                  {alert.time}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full border-t border-slate-800 py-2 text-center text-sm text-blue-400 transition-colors hover:text-blue-300">
            Посмотреть журнал событий
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
