import { useMemo, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Card } from '../../shared/components/Card';
import { Table } from '../../shared/components/Table';
import { financialRecords } from '../../shared/data/financialRecords';
import { sites } from '../../shared/data/sites';
import { strings } from '../../shared/lib/strings';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';

const COLORS = ['rgba(76,184,255,1)', 'rgba(76,184,255,0.75)', 'rgba(76,184,255,0.5)', 'rgba(76,184,255,0.25)'];
const LABEL_COLOR = 'rgba(255,255,255,0.7)';
const SEGMENT_SEPARATOR = 'rgba(8,12,18,0.9)';

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
                className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-[14px] px-3.5 py-2 text-sm text-text-primary shadow-[0_18px_48px_rgba(0,0,0,0.45)] backdrop-blur-[16px]"
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
                className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-[14px] px-3.5 py-2 text-sm text-text-primary shadow-[0_18px_48px_rgba(0,0,0,0.45)] backdrop-blur-[16px]"
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
              className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-[14px] px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/70 focus:ring-1 focus:ring-accent-primary/30 shadow-[0_18px_48px_rgba(0,0,0,0.45)] backdrop-blur-[16px]"
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
          <div className="space-y-4">
            <div className="flex flex-col gap-1 text-right">
              <div className="text-xs text-text-muted">Total OPEX</div>
              <div className="text-lg font-semibold text-text-primary">{totalOpex.toLocaleString('ru-RU')} ₽</div>

              <div className="text-xs text-text-muted mt-3">Total CAPEX</div>
              <div className="text-lg font-semibold text-text-primary">{totalCapex.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div className="h-64 rounded-[18px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-[20px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={92}
                    innerRadius={54}
                    strokeWidth={3}
                    cornerRadius={8}
                    labelLine={false}
                    paddingAngle={2}
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
                        strokeWidth={1.2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(8,11,16,0.92)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 14,
                      color: '#EAF1FF'
                    }}
                    itemStyle={{ color: '#EAF1FF' }}
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
