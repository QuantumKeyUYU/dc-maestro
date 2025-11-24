import { useEffect, useState } from 'react';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { Table } from '../../shared/components/Table';
import { StatusPill } from '../../shared/components/StatusPill';
import { sites } from '../../shared/data/sites';
import { capacityLoadIndex, reliabilityScore, uptimePercent } from '../../shared/lib/kpi';
import { strings } from '../../shared/lib/strings';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';
import { KpiBadge } from '../../shared/components/KpiBadge';
import { InfoTooltip } from '../../shared/components/InfoTooltip';

export function SitesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { siteId?: string } | undefined;
  const [focusedSiteId, setFocusedSiteId] = useState<string | undefined>(state?.siteId);

  const { sortedAndFiltered, requestSort, sortConfig, searchQuery, setSearchQuery } = useTableSortAndFilter(
    sites,
    ['name', 'region', 'status'],
    'name'
  );

  useEffect(() => {
    if (state?.siteId) {
      setFocusedSiteId(state.siteId);
    }
  }, [state?.siteId]);

  return (
    <div className="space-y-6">
      <SectionHeader title={strings.sites.title} description={strings.sites.description} />

      <Card title={strings.sites.allSites} subtitle="Кликните по строке, чтобы раскрыть детализацию площадки">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по названию, региону или статусу"
            className="bg-bg-surfaceSoft border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent-primary/60 focus:shadow-focus transition"
          />
          <div className="flex gap-2 text-xs text-gray-400">
            <InfoTooltip label="Uptime — доступность за период мониторинга" />
            <InfoTooltip label="Reliability — индекс надёжности площадки" />
            <InfoTooltip label="Capacity — загрузка мощностей и стоек" />
          </div>
        </div>
        <Table>
          <thead>
            <tr>
              <th className="text-left py-2 cursor-pointer" onClick={() => requestSort('name')}>
                Площадка {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left py-2 cursor-pointer" onClick={() => requestSort('region')}>
                Регион {sortConfig.key === 'region' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-right py-2">Uptime</th>
              <th className="text-right py-2">Reliability</th>
              <th className="text-right py-2">Capacity</th>
              <th className="text-right py-2 cursor-pointer" onClick={() => requestSort('status')}>
                Статус {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFiltered.map((site) => (
              <tr
                key={site.id}
                className={`border-t border-border-subtle/40 cursor-pointer transition ${
                  focusedSiteId === site.id ? 'bg-accent-muted/5 border-accent-primary/40' : 'hover:bg-bg-surfaceSoft/70'
                }`}
                onClick={() => navigate(`/sites/${site.id}`)}
              >
                <td className="py-3 pr-4">{site.name}</td>
                <td className="py-3 pr-4 text-text-muted">{site.region}</td>
                <td className="py-3 text-right">{uptimePercent(site).toFixed(2)}%</td>
                <td className="py-3 text-right">{reliabilityScore(site).toFixed(1)}</td>
                <td className="py-3 text-right">{capacityLoadIndex(site).toFixed(1)}%</td>
                <td className="py-3 text-right">
                  <StatusPill
                    label={site.status === 'healthy' ? 'Стабильно' : site.status === 'warning' ? 'Предупреждение' : 'Критично'}
                    tone={site.status === 'healthy' ? 'success' : site.status === 'warning' ? 'warning' : 'danger'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Card title="Быстрые показатели" subtitle="Оценка общей доступности, надёжности и загрузки">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KpiBadge
            label="Средний Uptime"
            value={`${(
              sortedAndFiltered.reduce((sum, s) => sum + uptimePercent(s), 0) / Math.max(sortedAndFiltered.length, 1)
            ).toFixed(2)}%`}
            tone="info"
          />
          <KpiBadge
            label="Средняя надёжность"
            value={`${(
              sortedAndFiltered.reduce((sum, s) => sum + reliabilityScore(s), 0) / Math.max(sortedAndFiltered.length, 1)
            ).toFixed(1)}`}
            tone="success"
          />
          <KpiBadge
            label="Средняя загрузка"
            value={`${(
              sortedAndFiltered.reduce((sum, s) => sum + capacityLoadIndex(s), 0) / Math.max(sortedAndFiltered.length, 1)
            ).toFixed(1)}%`}
            tone="warning"
          />
        </div>
      </Card>
    </div>
  );
}
