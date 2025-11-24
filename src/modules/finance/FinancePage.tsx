import { useMemo, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { Table } from '../../shared/components/Table';
import { financialRecords } from '../../shared/data/financialRecords';
import { sites } from '../../shared/data/sites';
import { strings } from '../../shared/lib/strings';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';

const COLORS = ['#38bdf8', '#22c55e', '#f97316', '#a855f7', '#eab308', '#f43f5e'];

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
      <SectionHeader title={strings.finance.title} description={strings.finance.description} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2" title="Финансовые записи">
          <div className="flex gap-3 mb-3 flex-wrap items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <select
                value={siteFilter}
                onChange={(e) => setSiteFilter(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
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
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
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
              className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary/60"
            />
          </div>
          <Table>
            <thead className="text-xs uppercase text-gray-400">
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
                <tr key={record.id} className="border-t border-gray-800">
                  <td className="py-2 pr-4">{new Date(record.date).toLocaleDateString('ru-RU')}</td>
                  <td className="py-2 pr-4 text-gray-300">{record.type}</td>
                  <td className="py-2 pr-4 text-gray-300">{record.category}</td>
                  <td className="py-2 pr-4">{record.siteId ?? '—'}</td>
                  <td className="py-2 pr-4">{record.amountRub.toLocaleString('ru-RU')} ₽</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card title="Сводка">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Total OPEX</span>
              <span className="text-lg font-semibold">{totalOpex.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Total CAPEX</span>
              <span className="text-lg font-semibold">{totalCapex.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={90} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
