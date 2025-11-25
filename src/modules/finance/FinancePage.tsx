import { useMemo, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Card } from '../../shared/components/Card';
import { Table } from '../../shared/components/Table';
import { financialRecords } from '../../shared/data/financialRecords';
import { sites } from '../../shared/data/sites';
import { strings } from '../../shared/lib/strings';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';

const CATEGORY_COLORS: Record<string, string> = {
  energy: '#3b82f6',
  maintenance: '#22c1c3',
  staff: '#2563eb'
};

type PieLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  name?: string;
};

const RADIAN = Math.PI / 180;

function renderSliceLabel({ cx = 0, cy = 0, midAngle = 0, outerRadius = 0, name }: PieLabelProps) {
  const radius = outerRadius + 18;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="rgba(236,242,255,0.88)"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-[12px] font-medium capitalize"
    >
      {name}
    </text>
  );
}

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
  const total = totalOpex + totalCapex;

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
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr),260px] md:items-center">
              <div className="relative h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={92}
                      innerRadius={56}
                      stroke="#0c1119"
                      strokeWidth={2}
                      labelLine={false}
                      label={renderSliceLabel}
                      paddingAngle={2}
                    >
                      {pieData.map((entry) => {
                        const fill = CATEGORY_COLORS[entry.name] ?? CATEGORY_COLORS.energy;
                        return <Cell key={`cell-${entry.name}`} fill={fill} />;
                      })}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(8,12,19,0.95)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 12,
                        color: 'rgba(236,242,255,0.9)',
                        boxShadow: '0 10px 28px rgba(0,0,0,0.4)'
                      }}
                      itemStyle={{ color: 'rgba(236,242,255,0.92)', fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center space-y-1">
                  <div className="text-[11px] uppercase tracking-wide text-text-secondary">Всего OPEX + CAPEX</div>
                  <div className="text-xl font-semibold text-text-primary leading-tight">{total.toLocaleString('ru-RU')} ₽</div>
                </div>
              </div>
              <div className="flex w-full flex-col items-end gap-4 text-right">
                <div className="w-full space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted">Total OPEX</div>
                  <div className="text-[24px] font-semibold text-text-primary leading-tight">{totalOpex.toLocaleString('ru-RU')} ₽</div>
                </div>
                <div className="w-full space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted">Total CAPEX</div>
                  <div className="text-[24px] font-semibold text-text-primary leading-tight">{totalCapex.toLocaleString('ru-RU')} ₽</div>
                </div>
                {pieData.length ? (
                  <div className="flex w-full flex-wrap justify-end gap-2">
                    {pieData.map((entry) => {
                      const fill = CATEGORY_COLORS[entry.name] ?? CATEGORY_COLORS.energy;
                      return (
                        <div
                          key={entry.name}
                          className="inline-flex min-w-[180px] items-center gap-3 rounded-full border border-border-soft/80 bg-base-panelSoft px-3.5 py-2 text-[13px] text-text-primary shadow-[0_12px_26px_rgba(0,0,0,0.28)]"
                        >
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: fill }} />
                          <span className="capitalize leading-none">{entry.name}</span>
                          <span className="ml-auto whitespace-nowrap text-text-secondary">{entry.value.toLocaleString('ru-RU')} ₽</span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
