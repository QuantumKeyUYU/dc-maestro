import React from 'react';
import { 
  Activity, 
  Zap, 
  Thermometer, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

const KPICard: React.FC<{
  title: string;
  value: string;
  unit?: string;
  trend?: number;
  icon: React.ElementType;
  colorClass: string;
  status: StatusLevel;
}> = ({ title, value, unit, trend, icon: Icon, colorClass, status }) => {
  const statusColors = {
    [StatusLevel.NORMAL]: 'border-slate-800 bg-slate-900',
    [StatusLevel.WARNING]: 'border-amber-500/50 bg-amber-950/10',
    [StatusLevel.CRITICAL]: 'border-rose-500/50 bg-rose-950/10',
    [StatusLevel.OFFLINE]: 'border-slate-700 bg-slate-800/50',
  };

  return (
    <div className={`rounded-xl border p-5 ${statusColors[status]} transition-all hover:shadow-lg relative overflow-hidden group`}>
       <div className={`absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity ${colorClass}`}>
          <Icon className="w-32 h-32" />
       </div>
       
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
          <Icon className={`w-5 h-5 ${colorClass.replace('text-', '')}`} />
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
            {trend > 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="relative z-10">
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
          {unit && <span className="text-sm text-slate-500 font-medium">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Обзор ЦОД "Север-1"</h1>
          <p className="text-slate-400 text-sm mt-1">Оперативная сводка за последние 24 часа</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-slate-800 text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-700 border border-slate-700 transition-colors">
              Экспорт отчета
           </button>
           <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all">
              Добавить инцидент
           </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-white mb-6">Динамика нагрузки и температуры</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="power" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPower)" />
                <Area type="monotone" dataKey="temp" stroke="#10b981" strokeWidth={2} fillOpacity={0} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Feed */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-lg font-semibold text-white">Критические Алерты</h3>
             <span className="text-xs font-mono text-rose-400 bg-rose-950/30 px-2 py-1 rounded">LIVE</span>
          </div>
          
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {[
              { id: 1, title: 'Сбой PDU-A2', loc: 'Ряд 4, Стойка 12', time: '10 мин назад', level: StatusLevel.CRITICAL },
              { id: 2, title: 'Высокая температура', loc: 'Холодный коридор B', time: '25 мин назад', level: StatusLevel.WARNING },
              { id: 3, title: 'Потеря связи', loc: 'Датчик влажности #4', time: '1 час назад', level: StatusLevel.WARNING },
              { id: 4, title: 'Доступ в серверную', loc: 'Инженер Иванов И.И.', time: '2 часа назад', level: StatusLevel.NORMAL },
            ].map((alert) => (
              <div key={alert.id} className="flex gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700">
                <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${
                  alert.level === StatusLevel.CRITICAL ? 'bg-rose-500 animate-pulse' : 
                  alert.level === StatusLevel.WARNING ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-200">{alert.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{alert.loc}</p>
                </div>
                <span className="text-xs text-slate-600 whitespace-nowrap">{alert.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-blue-400 hover:text-blue-300 py-2 border-t border-slate-800 transition-colors">
            Посмотреть журнал событий
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;