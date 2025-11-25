import { useMemo, useState } from 'react';
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
  TooltipProps
} from 'recharts';
import { Card } from '../../shared/components/Card';
import { Table } from '../../shared/components/Table';
import { financialRecords } from '../../shared/data/financialRecords';
import { sites } from '../../shared/data/sites';
import { strings } from '../../shared/lib/strings';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';

const CATEGORY_COLORS: Record<string, string> = {
  energy: '#22c1c3',
  maintenance: '#4f46e5',
  staff: '#0ea5e9'
};

const CATEGORY_LABELS: Record<string, string> = {
  energy: 'Energy',
  maintenance: 'Maintenance',
  staff: 'Staff'
};

function FinancePieTooltip(props: TooltipProps<number, string>) {
  const { active, payload } = props;

  if (!active || !payload || !payload.length) return null;

  const entry = payload[0];
  const name = (entry.name ?? entry.payload?.name ?? '') as string;
  const value = (entry.value ?? entry.payload?.value ?? 0) as number;
  const color =
    (entry.payload && CATEGORY_COLORS[entry.payload.name as string]) ??
    CATEGORY_COLORS[name] ??
    '#3b82f6';

  const label = CATEGORY_LABELS[name] ?? name;

  return (
    <div className="rounded-2xl border border-white/10 bg-[rgba(6,10,20,0.96)] px-3.5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.65)]">
      <div className="flex items-center gap-2 text-[13px] text-text-primary">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="capitalize">{label}</span>
        <span className="ml-auto font-medium whitespace-nowrap">
          {value.toLocaleString('ru-RU')} ₽
        </span>
      </div>
    </div>
  );
}

export function FinancePage() {
  const [siteFilter, setSiteFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'opex' | 'capex'>('all');

  const filtered = useMemo(
    () =>
      financialRecords.filter(
        (r) =>
          (siteFilter === 'all' || r.siteId === siteFilter) &&
          (typeFilter === 'all' || r.type === typeFilter)
      ),
    [siteFilter, typeFilter]
  );

  const table = useTableSortAndFilter(filtered, ['category', 'type', 'siteId'], 'date');

  const totalOpex = filtered
    .filter((r) => r.type === 'opex')
    .reduce((sum, r) => sum + r.amountRub, 0);

  const totalCapex = filtered
    .filter((r) => r.type === 'capex')
    .reduce((sum, r) => sum + r.amountRub, 0);

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
        {/* Таблица */}
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
                onChange={(e) =>
                  setTypeFilter(e.target.value as 'all' | 'opex' | 'capex')
                }
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
                <th
                  className="text-left py-2 cursor-pointer"
                  onClick={() => table.requestSort('date')}
                >
                  Дата{' '}
                  {table.sortConfig.key === 'date'
                    ? table.sortConfig.direction === 'asc'
                      ? '↑'
                      : '↓'
                    : ''}
                </th>
                <th className="text-left py-2">Тип</th>
                <th
                  className="text-left py-2 cursor-pointer"
                  onClick={() => table.requestSort('category')}
                >
                  Категория{' '}
                  {table.sortConfig.key === 'category'
                    ? table.sortConfig.direction === 'asc'
                      ? '↑'
                      : '↓'
                    : ''}
                </th>
                <th className="text-left py-2">Площадка</th>
                <th
                  className="text-left py-2 cursor-pointer"
                  onClick={() => table.requestSort('amountRub')}
                >
                  Сумма{' '}
                  {table.sortConfig.key === 'amountRub'
                    ? table.sortConfig.direction === 'asc'
                      ? '↑'
                      : '↓'
                    : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {table.sortedAndFiltered.map((record) => (
                <tr key={record.id} className="border-t border-white/10">
                  <td className="py-2 pr-4 text-text-primary">
                    {new Date(record.date).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="py-2 pr-4 text-text-secondary">
                    {record.type}
                  </td>
                  <td className="py-2 pr-4 text-text-secondary">
                    {record.category}
                  </td>
                  <td className="py-2 pr-4 text-text-primary">
                    {record.siteId ?? '—'}
                  </td>
                  <td className="py-2 pr-4 text-text-primary">
                    {record.amountRub.toLocaleString('ru-RU')} ₽
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        {/* Сводка — ВСЕГДА одна колонка внутри карточки */}
        <Card title="Сводка">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[11px] uppercase tracking-[0.14em] text-text-muted">
                OPEX / CAPEX структура затрат
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border-soft/80 bg-base-panelSoft/60 px-3 py-1 text-[11px] text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="uppercase tracking-[0.16em]">
                  Фильтр: {typeFilter === 'all' ? 'OPEX + CAPEX' : typeFilter.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Донат по центру */}
            <div className="flex justify-center">
              <div className="relative h-64 w-full max-w-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={96}
                      innerRadius={70}
                      stroke="#020617"
                      strokeWidth={2}
                      labelLine={false}
                      paddingAngle={2}
                    >
                      {pieData.map((entry) => {
                        const fill =
                          CATEGORY_COLORS[entry.name] ?? CATEGORY_COLORS.energy;
                        return <Cell key={`cell-${entry.name}`} fill={fill} />;
                      })}
                    </Pie>
                    <Tooltip
                      content={<FinancePieTooltip />}
                      cursor={{ fill: 'transparent' }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center space-y-0.5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-text-secondary">
                    ВСЕГО
                  </div>
                  <div className="text-lg md:text-xl font-semibold text-text-primary leading-tight">
                    {total.toLocaleString('ru-RU')} ₽
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    OPEX + CAPEX
                  </div>
                </div>
              </div>
            </div>

            {/* Общие суммы */}
            <div className="space-y-2 text-[13px]">
              <div className="flex items-baseline justify-between">
                <span className="uppercase tracking-[0.16em] text-text-muted">
                  Total OPEX
                </span>
                <span className="font-semibold text-text-primary">
                  {totalOpex.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="uppercase tracking-[0.16em] text-text-muted">
                  Total CAPEX
                </span>
                <span className="font-semibold text-text-primary">
                  {totalCapex.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>

            {/* Легенда — тоже на всю ширину, без колонок */}
            {pieData.length ? (
              <div className="space-y-2">
                {pieData.map((entry) => {
                  const fill =
                    CATEGORY_COLORS[entry.name] ?? CATEGORY_COLORS.energy;
                  const label = CATEGORY_LABELS[entry.name] ?? entry.name;
                  const share =
                    totalOpex > 0
                      ? Math.round((entry.value / totalOpex) * 100)
                      : 0;

                  return (
                    <div
                      key={entry.name}
                      className="flex items-center gap-3 rounded-xl border border-border-soft/70 bg-base-panelSoft/80 px-3.5 py-2 text-[13px] text-text-primary shadow-[0_10px_24px_rgba(0,0,0,0.28)]"
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: fill }}
                      />
                      <div className="flex flex-col">
                        <span className="capitalize leading-none">
                          {label}
                        </span>
                        <span className="mt-0.5 text-[11px] text-text-muted">
                          {share}% OPEX
                        </span>
                      </div>
                      <span className="ml-auto whitespace-nowrap text-text-secondary">
                        {entry.value.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-[13px] text-text-muted">
                Нет данных по OPEX для выбранных фильтров.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
