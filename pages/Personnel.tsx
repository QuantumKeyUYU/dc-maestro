import React from 'react';
import clsx from 'clsx';
import { Users, Clock, Zap, Award } from 'lucide-react';
import { Card, Badge, StatCard } from '../components/UI';
import { STAFF } from '../constants';

export const Personnel: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white tracking-tight">Personnel & Shifts</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Staff" value="48" icon={Users} tone="neutral" />
        <StatCard label="On Shift" value={STAFF.filter(s => s.status === 'on_shift').length} icon={Clock} tone="success" />
        <StatCard label="Avg Efficiency" value="94%" icon={Zap} tone="primary" />
        <StatCard label="Shift Load" value="High" icon={Award} tone="warning" subtext="Mosow Core DC-1" />
      </div>

      <Card title="Staff Directory & Status">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 uppercase text-xs">
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Site</th>
                <th className="pb-3 font-semibold text-center">Efficiency</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {STAFF.map((staff) => (
                <tr key={staff.id} className="group hover:bg-white/5 transition-colors">
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                       {staff.name.charAt(0)}
                    </div>
                    <div className="font-medium text-white">{staff.name}</div>
                  </td>
                  <td className="py-4 text-gray-400">{staff.role}</td>
                  <td className="py-4 text-gray-400">{staff.siteId.toUpperCase()}</td>
                  <td className="py-4 text-center">
                    <span className={clsx("font-mono font-medium", staff.efficiency > 90 ? "text-emerald-400" : "text-gray-300")}>
                      {staff.efficiency}%
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <Badge 
                      label={staff.status.replace('_', ' ')} 
                      tone={staff.status === 'on_shift' ? 'success' : staff.status === 'break' ? 'warning' : 'neutral'} 
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
