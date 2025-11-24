import { useMemo, useState } from 'react';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { Table } from '../../shared/components/Table';
import { StatusPill } from '../../shared/components/StatusPill';
import { sites } from '../../shared/data/sites';
import { incidents } from '../../shared/data/incidents';
import { financialRecords } from '../../shared/data/financialRecords';
import { energyReadings } from '../../shared/data/energy';
import { KpiBadge } from '../../shared/components/KpiBadge';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { capacityLoadIndex, reliabilityScore, siteFinancialHealth, uptimePercent } from '../../shared/lib/kpi';

export function SitesPage() {
  const [selectedId, setSelectedId] = useState<string>(sites[0]?.id ?? '');
  const selected = useMemo(() => sites.find((s) => s.id === selectedId) ?? sites[0], [selectedId]);

  const siteIncidents = incidents.filter((i) => i.siteId === selected?.id).slice(0, 5);
  const siteEnergy = energyReadings[selected?.id ?? ''] ?? [];

  const detailMetrics = selected
    ? {
        uptime: uptimePercent(selected),
        reliability: reliabilityScore(selected),
        capacity: capacityLoadIndex(selected),
        finance: siteFinancialHealth(selected, financialRecords)
      }
    : null;

  return (
    <div className="space-y-6">
      <SectionHeader title="Sites" description="Обзор площадок и инцидентов" />

      <Card title="Все площадки">
        <Table>
          <thead className="text-xs uppercase text-gray-400">
            <tr>
              <th className="text-left py-2">Site</th>
              <th className="text-left py-2">Region</th>
              <th className="text-right py-2">Uptime</th>
              <th className="text-right py-2">Reliability</th>
              <th className="text-right py-2">Capacity</th>
              <th className="text-right py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr
                key={site.id}
                className={`border-t border-gray-800 cursor-pointer ${selected?.id === site.id ? 'bg-gray-800/60' : ''}`}
                onClick={() => setSelectedId(site.id)}
              >
                <td className="py-2 pr-4">{site.name}</td>
                <td className="py-2 pr-4 text-gray-300">{site.region}</td>
                <td className="py-2 text-right">{uptimePercent(site).toFixed(2)}%</td>
                <td className="py-2 text-right">{reliabilityScore(site).toFixed(1)}</td>
                <td className="py-2 text-right">{capacityLoadIndex(site).toFixed(1)}%</td>
                <td className="py-2 text-right">
                  <StatusPill
                    label={site.status}
                    tone={site.status === 'healthy' ? 'success' : site.status === 'warning' ? 'warning' : 'danger'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {selected && detailMetrics && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2" title={selected.name} subtitle={selected.region}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <KpiBadge label="Uptime" value={`${detailMetrics.uptime.toFixed(2)}%`} tone="info" />
              <KpiBadge label="Reliability" value={detailMetrics.reliability.toFixed(1)} tone="success" />
              <KpiBadge label="Capacity Load" value={`${detailMetrics.capacity.toFixed(1)}%`} tone="warning" />
              <KpiBadge label="Financial Health" value={`${detailMetrics.finance.toFixed(1)}%`} tone="neutral" />
            </div>
            <h3 className="text-sm text-gray-400 mb-2">Последние инциденты</h3>
            <div className="space-y-2">
              {siteIncidents.map((incident) => (
                <div key={incident.id} className="p-3 bg-gray-900/60 rounded-lg border border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-100">{incident.category}</div>
                    <StatusPill
                      label={incident.severity}
                      tone={incident.severity === 'critical' ? 'danger' : incident.severity === 'major' ? 'warning' : 'info'}
                    />
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{incident.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(incident.startedAt).toLocaleString('ru-RU')}
                    {incident.resolvedAt ? ` → ${new Date(incident.resolvedAt).toLocaleString('ru-RU')}` : ' (в работе)'}
                  </p>
                </div>
              ))}
              {siteIncidents.length === 0 && <p className="text-sm text-gray-500">Нет инцидентов.</p>}
            </div>
          </Card>
          <Card title="Энергопотребление (кВт·ч)">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={siteEnergy}>
                  <XAxis dataKey="month" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937' }} />
                  <Bar dataKey="kwh" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
