import { useMemo, useState } from 'react';
// Импорт PieChart, Pie, Cell, Tooltip больше не нужен, т.к. используется CSS
// Но для Tooltip для категорий (внизу) Tooltip нужен, оставляем его, но PieChart/Pie убираем.
import { Tooltip } from 'recharts'; 
import { Card } from '../../shared/components/Card';
import { Table } from '../../shared/components/Table';
import { financialRecords } from '../../shared/data/financialRecords';
import { sites } from '../../shared/data/sites';
import { strings } from '../../shared/lib/strings';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';

const CATEGORY_COLORS: Record<string, string> = {
  energy: '#3b82f6', // Синий
  maintenance: '#22c1c3', // Бирюзовый
  staff: '#2563eb', // Более темный синий
};

export function FinancePage() {
  const [siteFilter, setSiteFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'opex' | 'capex'>('all');

  const filtered = useMemo(
    () =>
      financialRecords.filter(
        (r) =>
          (siteFilter === 'all' || r.siteId === siteFilter) &&
          (typeFilter === 'all' || r.type === typeFilter),
      ),
    [siteFilter, typeFilter],
  );

  // Сортировка и фильтрация
  const table = useTableSortAndFilter(filtered, ['category', 'type', 'siteId'], 'date');

  // Расчеты
  const totalOpex = filtered
    .filter((r) => r.type === 'opex')
    .reduce((sum, r) => sum + r.amountRub, 0);
  const totalCapex = filtered
    .filter((r) => r.type === 'capex')
    .reduce((sum, r) => sum + r.amountRub, 0);
  const total = totalOpex + totalCapex;

  // Данные для списка категорий OPEX (справа)
  const pieData = Object.entries(
    filtered.reduce<Record<string, number>>((acc, r) => {
      if (r.type !== 'opex') return acc;
      // Используем только категории, которые есть в маппинге цветов, или добавляем
      // логику обработки неизвестных категорий, если нужно.
      if (r.category && CATEGORY_COLORS[r.category]) {
        acc[r.category] = (acc[r.category] ?? 0) + r.amountRub;
      }
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ЛЕВАЯ ТАБЛИЦА */}
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
                {/* Исправление: если siteId может быть null в данных, 
                   убедитесь, что 'null' в option корректно обрабатывается. 
                   В React value={null} преобразуется в пустую строку. 
                   Если r.siteId === siteFilter в useMemo работает с r.siteId === null 
                   и siteFilter === 'null', то оставляем так.
                */}
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
                  <td className="py-2 pr-4 text-text-secondary">{record.type}</td>
                  <td className="py-2 pr-4 text-text-secondary">{record.category}</td>
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

        {/* ПРАВАЯ КАРТОЧКА: СВОДКА */}
        <Card
          title="Сводка"
          className="overflow-visible border border-transparent bg-base-panelSoft/90 shadow-elevation-card"
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-8 md:flex-row">
              {/* Левая часть — СТИЛИЗОВАННЫЙ КРУГ (CSS) + общая сумма 
                  Это замена PieChart, чтобы убрать "косяки кривых" и добиться нужного стиля.
              */}
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="relative w-full max-w-[260px] mx-auto">
                  <div className="relative h-56 flex items-center justify-center">
                    {/* Стилизованный круг/пончик для имитации дизайна */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[160px] h-[160px] bg-blue-600 rounded-full flex items-center justify-center overflow-hidden shadow-2xl shadow-blue-500/30">
                        {/* Внутренний круг для создания эффекта "пончика" 
                            Используем цвет фона: #0c1119 (из скриншота/контекста).
                        */}
                        <div className="w-[104px] h-[104px] bg-[#0c1119] rounded-full" /> 
                      </div>
                    </div>
                    
                    {/* Текстовый блок по центру */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center space-y-1">
                      <div className="text-[11px] uppercase tracking-wide text-white/90 font-medium">
                        ВСЕГО OPEX + CAPEX
                      </div>
                      <div className="text-xl font-semibold text-white leading-tight">
                        {total.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Правая часть — Total OPEX/CAPEX + категории */}
              <div className="flex flex-1 flex-col gap-5">
                <div className="flex flex-col items-end text-right space-y-3">
                  <div className="w-full space-y-1 text-right">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
                      Total OPEX
                    </div>
                    <div className="text-2xl font-semibold text-text-primary leading-tight">
                      {totalOpex.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                  <div className="w-full space-y-1 text-right">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
                      Total CAPEX
                    </div>
                    <div className="text-2xl font-semibold text-text-primary leading-tight">
                      {totalCapex.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>

                {pieData.length ? (
                  <div className="flex flex-col gap-2">
                    {pieData.map((entry) => {
                      const fill = CATEGORY_COLORS[entry.name] ?? CATEGORY_COLORS.energy; 
                      return (
                        <div
                          key={entry.name}
                          // Улучшенные стили для чипов-категорий, чтобы они выглядели более "стильно и молодежно"
                          // Убираем 'shadow-[0_10px_24px_rgba(0,0,0,0.26)] backdrop-blur' с чипов 
                          // для более чистого современного вида, оставляя только нужные классы.
                          className="inline-flex items-center justify-between w-full rounded-full bg-white/[0.04] border border-white/5 px-3.5 py-2 text-[13px] text-text-primary"
                        >
                          <span className="flex items-center gap-2 min-w-0">
                            <span
                              className="h-2 w-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: fill }}
                            />
                            <span className="capitalize leading-none truncate font-medium">
                              {entry.name}
                            </span>
                          </span>
                          <span className="ml-4 font-normal whitespace-nowrap text-text-secondary tabular-nums">
                            {entry.value.toLocaleString('ru-RU')} ₽
                          </span>
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
