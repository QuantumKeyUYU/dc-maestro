import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { StatusPill } from '../../shared/components/StatusPill';
import { KpiBadge } from '../../shared/components/KpiBadge';
import { Table } from '../../shared/components/Table';
import { sites } from '../../shared/data/sites';
import { reliabilityScore, capacityLoadIndex, uptimePercent } from '../../shared/lib/kpi';

const chartData = sites.map((site) => ({ name: site.name, uptime: Number(uptimePercent(site).toFixed(2)) }));

export function DashboardPage() {
  const withScores = sites.map((site) => ({
    ...site,
    uptime: uptimePercent(site),
    reliability: reliabilityScore(site),
    capacity: capacityLoadIndex(site)
  }));

  const worstSites = [...withScores].sort((a, b) => a.reliability - b.reliability).slice(0, 3);

  return (
    <div className="space-y-6">
      <SectionHeader title="Dashboard" description="Сводка ключевых метрик по сети ЦОД" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {withScores.map((site) => (
          <Card key={site.id}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-semibold text-gray-100">{site.name}</div>
                <div className="text-sm text-gray-400">{site.region}</div>
              </div>
              <StatusPill
                label={site.status}
                tone={site.status === 'healthy' ? 'success' : site.status === 'warning' ? 'warning' : 'danger'}
              />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <KpiBadge label="Uptime" value={`${site.uptime.toFixed(2)}%`} tone="info" />
              <KpiBadge label="Reliability" value={`${site.reliability.toFixed(1)}`} tone="success" />
              <KpiBadge label="Capacity" value={`${site.capacity.toFixed(1)}%`} tone="warning" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2" title="Uptime по площадкам">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} domain={[90, 100]} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937' }} />
                <Bar dataKey="uptime" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Top проблемные сайты" subtitle="По Reliability Score">
          <Table>
            <thead className="text-xs uppercase text-gray-400">
              <tr>
                <th className="text-left py-2">Site</th>
                <th className="text-right py-2">Reliability</th>
                <th className="text-right py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {worstSites.map((site) => (
                <tr key={site.id} className="border-t border-gray-800">
                  <td className="py-2 pr-4">
                    <div className="font-medium">{site.name}</div>
                    <div className="text-xs text-gray-400">{site.region}</div>
                  </td>
                  <td className="py-2 text-right">{site.reliability.toFixed(1)}</td>
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
      </div>
    </div>
  );
}
