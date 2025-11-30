import React, { useState } from 'react';
import clsx from 'clsx';
import { Search, MapPin, CheckCircle, AlertTriangle, XCircle, Server } from 'lucide-react';
import { Card, Badge, StatCard } from '../components/UI';
import { SITES, ASSETS } from '../constants';

export const Sites: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredSites = SITES.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Sites & Assets</h2>
        <div className="relative group">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={16} />
           <input 
             type="text" 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             placeholder="Search sites..." 
             className="bg-[#0B0E14] border border-white/10 rounded-full py-2 pl-10 pr-4 w-64 text-sm text-gray-300 focus:outline-none focus:border-primary/50 transition-all placeholder:text-gray-600"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <Card title="Data Center Sites">
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead>
                   <tr className="border-b border-white/5 text-gray-500 uppercase text-xs">
                     <th className="pb-3 font-semibold">Name</th>
                     <th className="pb-3 font-semibold">Region</th>
                     <th className="pb-3 font-semibold text-right">Uptime</th>
                     <th className="pb-3 font-semibold text-right">Capacity</th>
                     <th className="pb-3 font-semibold text-right">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {filteredSites.map((site) => (
                     <tr key={site.id} className="group hover:bg-white/5 transition-colors cursor-pointer">
                       <td className="py-4 font-medium text-white flex items-center gap-3">
                          <div className="p-2 rounded bg-white/5 text-gray-400">
                             <Server size={16} />
                          </div>
                          {site.name}
                       </td>
                       <td className="py-4 text-gray-400">{site.region}</td>
                       <td className="py-4 text-right font-mono text-emerald-400">{site.uptime}%</td>
                       <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                               <div className={clsx("h-full rounded-full", site.capacity > 80 ? "bg-amber-500" : "bg-blue-500")} style={{ width: `${site.capacity}%` }} />
                            </div>
                            <span className="text-xs text-gray-400 w-8">{site.capacity}%</span>
                          </div>
                       </td>
                       <td className="py-4 text-right">
                         <Badge 
                           label={site.status} 
                           tone={site.status === 'healthy' ? 'success' : site.status === 'warning' ? 'warning' : 'danger'} 
                           size="sm" 
                         />
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </Card>

           <Card title="Critical Assets">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {ASSETS.map((asset) => (
                   <div key={asset.id} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                      <div className="flex justify-between items-start mb-2">
                         <Badge label={asset.type} tone="neutral" size="sm" />
                         <span className={clsx("text-xs font-medium", asset.status === 'operational' ? 'text-emerald-400' : 'text-rose-400')}>
                            {asset.status.toUpperCase()}
                         </span>
                      </div>
                      <div className="font-medium text-white mb-1">{asset.name}</div>
                      <div className="text-xs text-gray-500 mb-3">{asset.siteId.toUpperCase()} • ID: {asset.id}</div>
                      <div className="flex items-center justify-between text-xs">
                         <span className="text-gray-400">Health</span>
                         <span className={clsx("font-mono", asset.health > 90 ? "text-emerald-400" : "text-amber-400")}>{asset.health}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
                         <div className="h-full bg-current text-primary" style={{ width: `${asset.health}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </Card>
        </div>

        <div className="space-y-6">
           <StatCard label="Total Sites" value={SITES.length} icon={MapPin} tone="primary" />
           <StatCard label="Avg Uptime" value="99.9%" icon={CheckCircle} tone="success" subtext="Global Average" />
           <StatCard label="Sites Warning" value={SITES.filter(s => s.status !== 'healthy').length} icon={AlertTriangle} tone="warning" />
           
           <Card title="Regional Distribution" subtitle="Sites by Region">
              <div className="space-y-3 mt-2">
                 {['Central', 'North-West', 'Volga', 'Urals', 'Siberia'].map(region => {
                    const count = SITES.filter(s => s.region === region).length;
                    return (
                       <div key={region} className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">{region}</span>
                          <div className="flex items-center gap-2">
                             <div className="w-24 h-1.5 bg-gray-800 rounded-full">
                                <div className="h-full bg-blue-500/50 rounded-full" style={{ width: `${count * 20}%` }} />
                             </div>
                             <span className="text-xs font-mono text-gray-300 w-4">{count}</span>
                          </div>
                       </div>
                    )
                 })}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};
