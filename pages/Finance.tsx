import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, TrendingUp, PieChart as PieIcon, FileText } from 'lucide-react';
import { Card, Badge, StatCard } from '../components/UI';
import { FINANCES } from '../constants';

const PIE_DATA = [
  { name: 'Energy', value: 45 },
  { name: 'Staff', value: 30 },
  { name: 'Hardware', value: 15 },
  { name: 'Maint', value: 10 },
];

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

export const Finance: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white tracking-tight">Financial Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total OPEX (Mo)" value="₽ 4.2M" icon={DollarSign} tone="neutral" />
        <StatCard label="CAPEX (YTD)" value="₽ 12.5M" icon={TrendingUp} tone="primary" />
        <StatCard label="Energy Cost" value="+5.2%" icon={ZapIcon} tone="warning" subtext="vs Last Month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <Card title="Recent Transactions">
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead>
                   <tr className="border-b border-white/5 text-gray-500 uppercase text-xs">
                     <th className="pb-3 font-semibold">Date</th>
                     <th className="pb-3 font-semibold">Category</th>
                     <th className="pb-3 font-semibold">Site</th>
                     <th className="pb-3 font-semibold text-right">Amount</th>
                     <th className="pb-3 font-semibold text-right">Type</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {FINANCES.map((record) => (
                     <tr key={record.id} className="group hover:bg-white/5 transition-colors">
                       <td className="py-4 text-gray-400 font-mono text-xs">{record.date}</td>
                       <td className="py-4 text-white font-medium">{record.category}</td>
                       <td className="py-4 text-gray-500">{record.siteId.toUpperCase()}</td>
                       <td className="py-4 text-right text-gray-300 font-mono">
                          ₽ {record.amount.toLocaleString()}
                       </td>
                       <td className="py-4 text-right">
                         <Badge 
                           label={record.type} 
                           tone={record.type === 'OPEX' ? 'primary' : 'warning'} 
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

        <Card title="Cost Distribution" subtitle="OPEX Breakdown">
           <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={PIE_DATA}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                      ))}
                    </Pie>
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#0F172A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                       itemStyle={{ color: '#fff' }}
                    />
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="text-center">
                    <span className="text-2xl font-bold text-white">100%</span>
                    <p className="text-xs text-gray-500 uppercase">Total</p>
                 </div>
              </div>
           </div>
           <div className="space-y-2 mt-4">
              {PIE_DATA.map((item, index) => (
                 <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                       <span className="text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-gray-500 font-mono">{item.value}%</span>
                 </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
};

// Helper Icon for Finance
const ZapIcon = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
