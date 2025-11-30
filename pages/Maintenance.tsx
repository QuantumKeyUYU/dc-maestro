import React from 'react';
import clsx from 'clsx';
import { Calendar, Wrench, Clock, CheckSquare } from 'lucide-react';
import { Card, Badge, StatCard } from '../components/UI';
import { WORK_ORDERS } from '../constants';

export const Maintenance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white tracking-tight">Maintenance Management</h2>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Create Work Order
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Open Orders" value={WORK_ORDERS.filter(w => w.status === 'open').length} icon={Clock} tone="warning" />
        <StatCard label="In Progress" value={WORK_ORDERS.filter(w => w.status === 'in_progress').length} icon={Wrench} tone="primary" />
        <StatCard label="Completed (30d)" value="12" icon={CheckSquare} tone="success" />
        <StatCard label="Overdue" value="1" icon={Calendar} tone="danger" />
      </div>

      <Card title="Active Work Orders">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 uppercase text-xs">
                <th className="pb-3 font-semibold">ID</th>
                <th className="pb-3 font-semibold">Title</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Assignee</th>
                <th className="pb-3 font-semibold">Due Date</th>
                <th className="pb-3 font-semibold">Priority</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {WORK_ORDERS.map((wo) => (
                <tr key={wo.id} className="group hover:bg-white/5 transition-colors">
                  <td className="py-4 font-mono text-gray-500 text-xs">{wo.id}</td>
                  <td className="py-4 font-medium text-white">{wo.title}</td>
                  <td className="py-4 text-gray-400">{wo.type}</td>
                  <td className="py-4 text-gray-400 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white">
                      {wo.assignee.charAt(0)}
                    </div>
                    {wo.assignee}
                  </td>
                  <td className="py-4 text-gray-400">{wo.dueDate}</td>
                  <td className="py-4">
                    <span className={clsx(
                      "text-xs font-semibold px-2 py-0.5 rounded",
                      wo.priority === 'high' ? "text-rose-400 bg-rose-400/10" :
                      wo.priority === 'medium' ? "text-amber-400 bg-amber-400/10" :
                      "text-blue-400 bg-blue-400/10"
                    )}>
                      {wo.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <Badge 
                      label={wo.status.replace('_', ' ')} 
                      tone={wo.status === 'completed' ? 'success' : wo.status === 'in_progress' ? 'primary' : 'neutral'} 
                      size="sm" 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
