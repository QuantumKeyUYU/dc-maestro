import React from 'react';
import clsx from 'clsx';
import { Package, AlertCircle, ShoppingCart, Box } from 'lucide-react';
import { Card, Badge, StatCard } from '../components/UI';
import { INVENTORY } from '../constants';

export const Inventory: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white tracking-tight">Inventory Control</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Items" value="1,240" icon={Package} tone="neutral" />
        <StatCard label="Low Stock Alerts" value={INVENTORY.filter(i => i.status !== 'ok').length} icon={AlertCircle} tone="warning" />
        <StatCard label="Pending Orders" value="5" icon={ShoppingCart} tone="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2">
            <Card title="Stock Levels">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 uppercase text-xs">
                      <th className="pb-3 font-semibold">SKU / Name</th>
                      <th className="pb-3 font-semibold">Category</th>
                      <th className="pb-3 font-semibold">Site</th>
                      <th className="pb-3 font-semibold text-right">Stock</th>
                      <th className="pb-3 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {INVENTORY.map((item) => (
                      <tr key={item.id} className="group hover:bg-white/5 transition-colors">
                        <td className="py-4">
                           <div className="font-medium text-white">{item.name}</div>
                           <div className="text-xs font-mono text-gray-500">{item.sku}</div>
                        </td>
                        <td className="py-4 text-gray-400">{item.category}</td>
                        <td className="py-4 text-gray-400">{item.siteId.toUpperCase()}</td>
                        <td className="py-4 text-right">
                           <span className={clsx("font-mono font-medium", item.stock <= item.minLevel ? "text-rose-400" : "text-white")}>
                              {item.stock}
                           </span>
                           <span className="text-gray-600 text-xs ml-1">/ {item.minLevel} min</span>
                        </td>
                        <td className="py-4 text-right">
                          <Badge 
                            label={item.status} 
                            tone={item.status === 'ok' ? 'success' : item.status === 'low' ? 'warning' : 'danger'} 
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

         <div className="space-y-6">
            <Card title="Categories">
               <div className="space-y-4">
                  {[
                    { label: 'Spare Parts', count: 450, color: 'bg-blue-500' },
                    { label: 'Consumables', count: 320, color: 'bg-emerald-500' },
                    { label: 'Hardware', count: 180, color: 'bg-purple-500' },
                    { label: 'Safety Gear', count: 85, color: 'bg-amber-500' },
                  ].map((cat) => (
                     <div key={cat.label} className="group">
                        <div className="flex justify-between text-sm mb-1">
                           <span className="text-gray-300">{cat.label}</span>
                           <span className="text-gray-500">{cat.count}</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                           <div className={clsx("h-full rounded-full opacity-60 group-hover:opacity-100 transition-opacity", cat.color)} style={{ width: '60%' }} />
                        </div>
                     </div>
                  ))}
               </div>
            </Card>
            <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 flex flex-col items-center text-center">
               <Box size={40} className="text-primary mb-3" />
               <h3 className="text-white font-medium mb-1">Procurement needed</h3>
               <p className="text-sm text-gray-400 mb-4">5 items have reached critical stock levels.</p>
               <button className="w-full py-2 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
                  Create Purchase Order
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
