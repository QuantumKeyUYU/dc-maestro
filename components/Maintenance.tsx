import React from 'react';
import { Calendar, CheckCircle2, Clock, AlertCircle, Plus, Filter } from 'lucide-react';
import { Task } from '../types';

const tasks: Task[] = [
  { id: 'TSK-1024', title: 'Замена фильтров в кондиционере A2', assignee: 'Иванов И.', dueTime: 'Сегодня, 14:00', priority: 'medium', status: 'in-progress' },
  { id: 'TSK-1025', title: 'Диагностика ИБП №3 (Ежеквартальная)', assignee: 'Петров А.', dueTime: 'Завтра, 09:00', priority: 'high', status: 'pending' },
  { id: 'TSK-1022', title: 'Обновление прошивки СХД', assignee: 'Сидоров К.', dueTime: 'Вчера, 18:00', priority: 'low', status: 'completed' },
];

const Maintenance: React.FC = () => {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Техническое Обслуживание</h1>
          <p className="text-slate-400 text-sm">Управление заявками и планирование смен (WFM)</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all">
          <Plus className="w-4 h-4" />
          Создать заявку
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Task List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
              Текущие задачи
            </h3>
            <button className="p-2 hover:bg-slate-800 rounded text-slate-400 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto flex-1 p-2">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-950/50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Задача</th>
                  <th className="px-4 py-3">Исполнитель</th>
                  <th className="px-4 py-3">Срок</th>
                  <th className="px-4 py-3 rounded-r-lg">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <td className="px-4 py-4">
                      <div className="font-medium text-slate-200">{task.title}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{task.id}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">
                          {task.assignee.charAt(0)}
                        </div>
                        <span className="text-slate-400">{task.assignee}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-400">{task.dueTime}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                        ${task.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                          task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                          'bg-slate-700/50 text-slate-400 border-slate-600/20'
                        }`}>
                        {task.status === 'in-progress' ? 'В работе' : task.status === 'completed' ? 'Готово' : 'Ожидает'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shift Schedule (WFM Mini) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            Смены сегодня
          </h3>
          
          <div className="space-y-4">
             {/* Timeline Visual */}
             <div className="relative pl-4 border-l-2 border-slate-800 space-y-6">
                <div className="relative">
                   <div className="absolute -left-[21px] top-1 w-3 h-3 bg-emerald-500 rounded-full ring-4 ring-slate-900"></div>
                   <div className="text-xs text-slate-500 mb-1">08:00 - 20:00</div>
                   <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <div className="text-sm font-bold text-white">Дневная смена А</div>
                      <div className="flex -space-x-2 mt-2">
                         <div className="w-6 h-6 rounded-full bg-slate-600 border border-slate-800"></div>
                         <div className="w-6 h-6 rounded-full bg-slate-500 border border-slate-800"></div>
                         <div className="w-6 h-6 rounded-full bg-slate-400 border border-slate-800 flex items-center justify-center text-[9px] text-slate-900 font-bold">+2</div>
                      </div>
                   </div>
                </div>

                <div className="relative opacity-60">
                   <div className="absolute -left-[21px] top-1 w-3 h-3 bg-slate-600 rounded-full ring-4 ring-slate-900"></div>
                   <div className="text-xs text-slate-500 mb-1">20:00 - 08:00</div>
                   <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <div className="text-sm font-bold text-white">Ночная смена B</div>
                      <div className="text-xs text-slate-400 mt-1">Ожидание заступления</div>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="mt-auto pt-6">
            <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3 flex gap-3">
               <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
               <div className="text-xs text-blue-200">
                  <span className="font-bold">AI Предикция:</span> Высокая вероятность нагрузки на персонал в 18:00 из-за плановых работ.
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;