import { useMemo, useState } from 'react';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { Table } from '../../shared/components/Table';
import { assets } from '../../shared/data/assets';
import { workOrders } from '../../shared/data/workOrders';
import { StatusPill } from '../../shared/components/StatusPill';

const types = ['all', 'UPS', 'Generator', 'CRAC', 'PDU', 'Rack', 'FireSystem', 'Other'] as const;
const criticalities = ['all', 1, 2, 3] as const;

export function MaintenancePage() {
  const [typeFilter, setTypeFilter] = useState<(typeof types)[number]>('all');
  const [critFilter, setCritFilter] = useState<(typeof criticalities)[number]>('all');

  const filteredAssets = useMemo(
    () =>
      assets.filter(
        (asset) => (typeFilter === 'all' || asset.type === typeFilter) && (critFilter === 'all' || asset.criticality === critFilter)
      ),
    [typeFilter, critFilter]
  );

  return (
    <div className="space-y-6">
      <SectionHeader title="Maintenance" description="Активы и заявки" />

      <Card title="Активы">
        <div className="flex gap-3 mb-3 flex-wrap">
          <select
            className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as (typeof types)[number])}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            value={critFilter}
            onChange={(e) => setCritFilter((e.target.value === 'all' ? 'all' : Number(e.target.value)) as (typeof criticalities)[number])}
          >
            {criticalities.map((crit) => (
              <option key={crit} value={crit}>
                {crit === 'all' ? 'Все уровни' : `Критичность ${crit}`}
              </option>
            ))}
          </select>
        </div>
        <Table>
          <thead className="text-xs uppercase text-gray-400">
            <tr>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Criticality</th>
              <th className="text-left py-2">Site</th>
              <th className="text-left py-2">Next PM</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="border-t border-gray-800">
                <td className="py-2 pr-4">{asset.name}</td>
                <td className="py-2 pr-4 text-gray-300">{asset.type}</td>
                <td className="py-2 pr-4">{asset.criticality}</td>
                <td className="py-2 pr-4 text-gray-300">{asset.siteId}</td>
                <td className="py-2 pr-4 text-gray-300">
                  {asset.nextPlannedMaintenanceDate
                    ? new Date(asset.nextPlannedMaintenanceDate).toLocaleDateString('ru-RU')
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Card title="Work Orders">
        <Table>
          <thead className="text-xs uppercase text-gray-400">
            <tr>
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Priority</th>
              <th className="text-left py-2">Asset</th>
              <th className="text-left py-2">Site</th>
              <th className="text-left py-2">Due</th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map((wo) => {
              const isOverdue = wo.dueDate && wo.status !== 'done' && wo.dueDate < new Date();
              return (
                <tr key={wo.id} className={`border-t border-gray-800 ${isOverdue ? 'bg-red-900/20' : ''}`}>
                  <td className="py-2 pr-4">{wo.id}</td>
                  <td className="py-2 pr-4 text-gray-300">{wo.type}</td>
                  <td className="py-2 pr-4">
                    <StatusPill
                      label={wo.status}
                      tone={
                        wo.status === 'done' ? 'success' : wo.status === 'in_progress' ? 'info' : isOverdue ? 'danger' : 'warning'
                      }
                    />
                  </td>
                  <td className="py-2 pr-4">{wo.priority}</td>
                  <td className="py-2 pr-4 text-gray-300">{wo.assetId}</td>
                  <td className="py-2 pr-4 text-gray-300">{wo.siteId}</td>
                  <td className="py-2 pr-4 text-gray-300">
                    {wo.dueDate ? new Date(wo.dueDate).toLocaleDateString('ru-RU') : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
