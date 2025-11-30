import React from 'react';
import { Shield, AlertTriangle, FileCheck, Calendar } from 'lucide-react';
import { Card, Badge, StatCard } from '../components/UI';
import { SAFETY_EVENTS } from '../constants';

export const Safety: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white tracking-tight">Safety & Compliance</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Compliance Score" value="98%" icon={Shield} tone="success" />
        <StatCard label="Open Issues" value={SAFETY_EVENTS.filter(e => e.status !== 'completed').length} icon={AlertTriangle} tone="warning" />
        <StatCard label="Audits Due" value="2" icon={Calendar} tone="primary" />
      </div>

      <Card title="Safety Events & Inspections">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 uppercase text-xs">
                <th className="pb-3 font-semibold">Event Title</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Site</th>
                <th className="pb-3 font-semibold">Due Date</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {SAFETY_EVENTS.map((event) => (
                <tr key={event.id} className="group hover:bg-white/5 transition-colors">
                  <td className="py-4 font-medium text-white flex items-center gap-3">
                     <FileCheck size={16} className="text-gray-500" />
                     {event.title}
                  </td>
                  <td className="py-4 text-gray-400">{event.type}</td>
                  <td className="py-4 text-gray-400">{event.siteId.toUpperCase()}</td>
                  <td className="py-4 text-gray-400 font-mono text-xs">{event.dueDate}</td>
                  <td className="py-4 text-right">
                    <Badge 
                      label={event.status} 
                      tone={event.status === 'completed' ? 'success' : event.status === 'overdue' ? 'danger' : 'neutral'} 
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
