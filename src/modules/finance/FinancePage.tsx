import { useMemo, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Card } from '../../shared/components/Card';
import { Table } from '../../shared/components/Table';
import { financialRecords } from '../../shared/data/financialRecords';
import { sites } from '../../shared/data/sites';
import { strings } from '../../shared/lib/strings';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';

const COLORS = ['#4CB5F5', '#4CB5F5CC', '#4CB5F599', '#4CB5F566', '#4CB5F533'];
const LABEL_COLOR = '#B3B9C7';

export function FinancePage() {
  const [siteFilter, setSiteFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'opex' | 'capex'>('all');

  const filtered = useMemo(
    () =>
      financialRecords.filter(
        (r) => (siteFilter === 'all' || r.siteId === siteFilter) && (typeFilter === 'all' || r.type === typeFilter)
      ),
    [siteFilter, typeFilter]
  );

  const table = useTableSortAndFilter(filtered, ['category', 'type', 'siteId'], 'date');

  const totalOpex = filtered.filter((r) => r.type === 'opex').reduce((sum, r) => sum + r.amountRub, 0);
  const totalCapex = filtered.filter((r) => r.type === 'capex').reduce((sum, r) => sum + r.amountRub, 0);

  const pieData = Object.entries(
    filtered.reduce<Record<string, number>>((acc, r) => {
      if (r.type !== 'opex') return acc;
      acc[r.category] = (acc[r.category] ?? 0) + r.amountRub;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card className="xl:col-span-2" title="Финансовые записи">
          <div className="flex gap-3 mb-4 flex-wrap items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <select
                value={siteFilter}
                onChange={(e) => setSiteFilter(e.target.value)}
                className="bg-[rgba(12,16,24,0.76)] border border-white/8 rounded-xl px-3 py-2 text-sm text-text-primary shadow-[0_12px_30px_rgba(0,0,0,0.4)]"
              >
                <option value="all">Все площадки</option>
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
                <option value="null">Без привязки</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as 'all' | 'opex' | 'capex')}
                className="bg-[rgba(12,16,24,0.76)] border border-white/8 rounded-xl px-3 py-2 text-sm text-text-primary shadow-[0_12px_30px_rgba(0,0,0,0.4)]"
              >
                <option value="all">Все</option>
                <option value="opex">OPEX</option>
                <option value="capex">CAPEX</option>
              </select>
            </div>
            <input
              value={table.searchQuery}
              onChange={(e) => table.setSearchQuery(e.target.value)}
              placeholder="Поиск по категории или площадке"
              className="bg-[rgba(12,16,24,0.8)] border border-white/8 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/60 focus:ring-1 focus:ring-accent-primary/30 shadow-[0_12px_30px_rgba(0,0,0,0.42)]"
            />
          </div>
          <Table framed={false}>
            <thead className="text-xs uppercase text-text-secondary">
              <tr>
                <th className="text-left py-2 cursor-pointer" onClick={() => table.requestSort('date')}>
                  Дата {table.sortConfig.key === 'date' ? (table.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="text-left py-2">Тип</th>
                <th className="text-left py-2 cursor-pointer" onClick={() => table.requestSort('category')}>
                  Категория {table.sortConfig.key === 'category' ? (table.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="text-left py-2">Площадка</th>
                <th className="text-left py-2 cursor-pointer" onClick={() => table.requestSort('amountRub')}>
                  Сумма {table.sortConfig.key === 'amountRub' ? (table.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {table.sortedAndFiltered.map((record) => (
                <tr key={record.id} className="border-t border-base-800">
                  <td className="py-2 pr-4 text-text-primary">{new Date(record.date).toLocaleDateString('ru-RU')}</td>
                  <td className="py-2 pr-4 text-text-secondary">{record.type}</td>
                  <td className="py-2 pr-4 text-text-secondary">{record.category}</td>
                  <td className="py-2 pr-4 text-text-primary">{record.siteId ?? '—'}</td>
                  <td className="py-2 pr-4 text-text-primary">{record.amountRub.toLocaleString('ru-RU')} ₽</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card title="Сводка">
          <div className="space-y-4">
            <div className="flex flex-col gap-1 text-right">
              <div className="text-xs text-text-muted">Total OPEX</div>
              <div className="text-lg font-semibold text-text-primary">{totalOpex.toLocaleString('ru-RU')} ₽</div>

              <div className="text-xs text-text-muted mt-3">Total CAPEX</div>
              <div className="text-lg font-semibold text-text-primary">{totalCapex.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={48}
                    strokeWidth={2}
                    cornerRadius={8}
                    labelLine={false}
                    label={({ name, x, y }) => (
                      <text x={x} y={y} fill={LABEL_COLOR} textAnchor="middle" dominantBaseline="central" fontSize={12}>
                        {name}
                      </text>
                    )}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: '#0B0F16',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12,
                      color: '#A1A5B0'
                    }}
                    itemStyle={{ color: '#A1A5B0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
