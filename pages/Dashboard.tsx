import React, { useState } from 'react';
import clsx from 'clsx';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { ArrowRight, AlertTriangle, CheckCircle, Activity, Thermometer } from 'lucide-react';
import { Card, Badge, StatCard } from '../components/UI';
import { SITES, INCIDENTS, METRICS_DATA, CHART_DATA } from '../constants';
import { Site, Incident } from '../types';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'detail'>('overview');

  // Helper for color coding reliability
  const getReliabilityColor = (score: number) => {
    if (score >= 98) return 'text-emerald-400';
    if (score >= 90) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className="space-y-8">
      
      {/* --- Hero Section --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 relative overflow-hidden rounded-2xl glass-panel p-8 flex flex-col justify-between border-l-4 border-l-primary">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
           
           <div>
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-2xl font-bold text-white tracking-tight">Command Center</h2>
               <Badge label="Network Stable" tone="success" pulsing />
             </div>
             <p className="text-gray-400 max-w-xl">
               Real-time overview of resilience, load, and operational risk across the Data Center network.
               Infrastructure is currently operating within optimal parameters.
             </p>
           </div>

           <div className="mt-8 flex items-center gap-8 border-t border-white/5 pt-6">
              <div>
                <p className="text-xs uppercase text-gray-500 font-semibold mb-1">Global Uptime</p>
                <p className="text-3xl font-mono text-white">99.98<span className="text-sm text-gray-500">%</span></p>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-500 font-semibold mb-1">Total Capacity</p>
                <p className="text-3xl font-mono text-white">72.4<span className="text-sm text-gray-500">%</span></p>
              </div>
              <div className="hidden sm:block">
                 <p className="text-xs uppercase text-gray-500 font-semibold mb-1">Operational Strain</p>
                 <div className="flex items-center gap-2">
                   <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[28%]"></div>
                   </div>
                   <span className="text-sm text-emerald-400 font-mono">28.8</span>
                 </div>
              </div>
           </div>
        </div>

        {/* OSI Card */}
        <div className="rounded-2xl glass-panel p-8 flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/5"></div>
          <Activity size={48} className="text-blue-500 mb-4 opacity-80" />
          <h3 className="text-4xl font-bold text-white mb-1">28.8</h3>
          <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-4">Strain Index</p>
          <p className="text-center text-gray-400 text-sm">
            Stable Zone. System is maintaining trend. No immediate load shedding required.
          </p>
        </div>
      </div>

      {/* --- Key Metrics --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS_DATA.map((metric, idx) => (
          <StatCard 
            key={idx}
            label={metric.label} 
            value={metric.value} 
            tone={metric.tone} 
            subtext={metric.change ? `${metric.change > 0 ? '+' : ''}${metric.change}% from last week` : 'Requires attention'}
            icon={metric.tone === 'danger' ? AlertTriangle : metric.tone === 'success' ? CheckCircle : Activity}
          />
        ))}
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Alerts & Table */}
        <div className="xl:col-span-2 space-y-6">
          <Card title="Live Alerts" subtitle="Incidents, Maintenance, and Security" 
            action={
              <button className="text-sm text-primary hover:text-white transition-colors flex items-center gap-1">
                View All <ArrowRight size={14} />
              </button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 uppercase text-xs">
                    <th className="pb-3 font-semibold">Type</th>
                    <th className="pb-3 font-semibold">Description</th>
                    <th className="pb-3 font-semibold text-center">Site</th>
                    <th className="pb-3 font-semibold">Priority</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {INCIDENTS.map((incident) => (
                    <tr key={incident.id} className="group hover:bg-white/5 transition-colors">
                      <td className="py-4 font-medium text-white">{incident.type}</td>
                      <td className="py-4 text-gray-400 max-w-md truncate">{incident.description}</td>
                      <td className="py-4 text-center">
                        <span className="font-mono text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700">{incident.siteId.toUpperCase()}</span>
                      </td>
                      <td className="py-4">
                         <Badge label={incident.priority} tone={incident.priority === 'critical' ? 'danger' : incident.priority === 'high' ? 'warning' : 'primary'} size="sm" />
                      </td>
                      <td className="py-4 text-right">
                        <button className="px-3 py-1 text-xs font-medium text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card title="Risk Factors" subtitle="Items outside nominal range">
               <div className="space-y-4 mt-2">
                 <div className="flex justify-between items-center p-3 rounded bg-rose-500/5 border border-rose-500/10">
                   <div className="flex items-center gap-3">
                     <Thermometer size={18} className="text-rose-400" />
                     <span className="text-gray-200 text-sm">Temperature Spike</span>
                   </div>
                   <span className="text-rose-400 font-bold">SPB-1</span>
                 </div>
                 <div className="flex justify-between items-center p-3 rounded bg-amber-500/5 border border-amber-500/10">
                   <div className="flex items-center gap-3">
                     <AlertTriangle size={18} className="text-amber-400" />
                     <span className="text-gray-200 text-sm">Maintenance Overdue</span>
                   </div>
                   <span className="text-amber-400 font-bold">3 Orders</span>
                 </div>
               </div>
             </Card>
             <Card title="Efficiency" subtitle="Power Usage Effectiveness (PUE)">
                <div className="h-32 flex items-end gap-1 mt-2">
                  {[1.4, 1.35, 1.42, 1.38, 1.32, 1.28, 1.3].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                      <div 
                        className="bg-primary/20 hover:bg-primary/40 border-t border-primary/50 transition-all rounded-t-sm" 
                        style={{ height: `${(val - 1) * 200}%` }}
                      ></div>
                      <span className="text-[10px] text-gray-600 text-center mt-1 group-hover:text-primary">{val}</span>
                    </div>
                  ))}
                </div>
             </Card>
          </div>
        </div>

        {/* Right Column: Charts & Worst Sites */}
        <div className="space-y-6">
          <Card title="Network Load" subtitle="7-Day Trend">
            <div className="h-[250px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#94A3B8' }}
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="load" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorLoad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Worst Performing" subtitle="By Reliability Score">
            <div className="space-y-3 mt-1">
              {[...SITES].sort((a,b) => a.reliability - b.reliability).slice(0, 3).map((site) => (
                <div key={site.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <div>
                    <div className="font-medium text-white">{site.name}</div>
                    <div className="text-xs text-gray-500">{site.region}</div>
                  </div>
                  <div className="text-right">
                    <div className={clsx("font-mono font-bold", getReliabilityColor(site.reliability))}>
                      {site.reliability}%
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase">Reliability</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};