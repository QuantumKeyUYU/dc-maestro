import { useMemo, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Card } from '../../shared/components/Card';
import { Table } from '../../shared/components/Table';
import { financialRecords } from '../../shared/data/financialRecords';
import { sites } from '../../shared/data/sites';
import { strings } from '../../shared/lib/strings';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';

const COLORS = ['#6FB7F0', '#59C2D5', '#7AC7F0', '#4DA7C1'];
const LABEL_COLOR = 'rgba(236,242,255,0.78)';
const SEGMENT_SEPARATOR = 'rgba(10,15,22,0.92)';

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2" title="Финансовые записи">
          <div className="flex gap-3 mb-4 flex-wrap items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <select
                value={siteFilter}
                onChange={(e) => setSiteFilter(e.target.value)}
                className="bg-base-panelSoft border border-border-soft rounded-card px-3.5 py-2 text-sm text-text-primary shadow-elevation-card backdrop-blur-xl"
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
                className="bg-base-panelSoft border border-border-soft rounded-card px-3.5 py-2 text-sm text-text-primary shadow-elevation-card backdrop-blur-xl"
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
              className="bg-base-panelSoft border border-border-soft rounded-card px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 shadow-elevation-card backdrop-blur-xl"
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
                <tr key={record.id} className="border-t border-white/10">
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
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-[1fr,1fr] md:items-center">
              <div className="flex flex-col gap-2 text-left md:text-right">
                <div className="text-xs text-text-muted">Total OPEX</div>
                <div className="text-2xl font-semibold text-text-primary leading-tight">{totalOpex.toLocaleString('ru-RU')} ₽</div>

                <div className="text-xs text-text-muted pt-2">Total CAPEX</div>
                <div className="text-2xl font-semibold text-text-primary leading-tight">{totalCapex.toLocaleString('ru-RU')} ₽</div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={92}
                      innerRadius={56}
                      strokeWidth={3}
                      cornerRadius={10}
                      labelLine={false}
                      paddingAngle={3}
                      label={({ name, x, y }) => (
                        <text x={x} y={y} fill={LABEL_COLOR} textAnchor="middle" dominantBaseline="central" fontSize={11}>
                          {name}
                        </text>
                      )}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${entry.name}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke={SEGMENT_SEPARATOR}
                          strokeWidth={1}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(8,12,19,0.96)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 14,
                        color: 'rgba(236,242,255,0.9)',
                        boxShadow: '0 16px 38px rgba(0,0,0,0.5)'
                      }}
                      itemStyle={{ color: 'rgba(236,242,255,0.9)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {pieData.length ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {pieData.map((entry, index) => (
                  <div
                    key={entry.name}
                    className="flex items-center justify-between rounded-[12px] border border-border-soft/70 bg-white/[0.03] px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm text-text-primary leading-tight">{entry.name}</span>
                    </div>
                    <span className="text-sm text-text-secondary">{entry.value.toLocaleString('ru-RU')} ₽</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
}
