import { useMemo, useState, useEffect } from 'react';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { Table } from '../../shared/components/Table';
import { assets } from '../../shared/data/assets';
import { workOrders } from '../../shared/data/workOrders';
import { StatusPill } from '../../shared/components/StatusPill';
import { strings } from '../../shared/lib/strings';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';
import { useLocation } from 'react-router-dom';

const types = ['all', 'UPS', 'Generator', 'CRAC', 'PDU', 'Rack', 'FireSystem', 'Other'] as const;
const criticalities = ['all', 1, 2, 3] as const;

export function MaintenancePage() {
  const location = useLocation();
  const locationState = location.state as { siteId?: string; workOrderId?: string } | undefined;
  const [typeFilter, setTypeFilter] = useState<(typeof types)[number]>('all');
  const [critFilter, setCritFilter] = useState<(typeof criticalities)[number]>('all');

  const filteredAssets = useMemo(
    () =>
      assets.filter(
        (asset) => (typeFilter === 'all' || asset.type === typeFilter) && (critFilter === 'all' || asset.criticality === critFilter)
      ),
    [typeFilter, critFilter]
  );

  const assetsTable = useTableSortAndFilter(filteredAssets, ['name', 'type', 'siteId'], 'name');
  const workOrdersTable = useTableSortAndFilter(workOrders, ['id', 'type', 'siteId'], 'dueDate');

  useEffect(() => {
    if (locationState?.siteId) {
      assetsTable.setSearchQuery(locationState.siteId);
      workOrdersTable.setSearchQuery(locationState.siteId);
    }
  }, [locationState?.siteId, assetsTable.setSearchQuery, workOrdersTable.setSearchQuery]);

  return (
    <div className="space-y-6">
      <SectionHeader title={strings.maintenance.title} description={strings.maintenance.description} />

      <Card title="Активы">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
          <div className="flex gap-3 flex-wrap">
            <select
              className="bg-bg-surfaceSoft border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as (typeof types)[number])}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'Все типы' : type}
                </option>
              ))}
            </select>
            <select
              className="bg-bg-surfaceSoft border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary"
              value={critFilter}
              onChange={(e) => setCritFilter((e.target.value === 'all' ? 'all' : Number(e.target.value)) as (typeof criticalities)[number])}
            >
              {criticalities.map((crit) => (
                <option key={crit} value={crit}>
                  {crit === 'all' ? 'Все уровни' : `Критичность ${crit}`}
                </option>
              ))}
            </select>
          </div>
          <input
            value={assetsTable.searchQuery}
            onChange={(e) => assetsTable.setSearchQuery(e.target.value)}
            placeholder="Поиск по названию, типу, площадке"
            className="bg-bg-surfaceSoft border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent-primary/60 focus:shadow-focus transition"
          />
        </div>
        <Table>
          <thead>
            <tr>
              <th className="text-left py-2 cursor-pointer" onClick={() => assetsTable.requestSort('name')}>
                Название {assetsTable.sortConfig.key === 'name' ? (assetsTable.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left py-2 cursor-pointer" onClick={() => assetsTable.requestSort('type')}>
                Тип {assetsTable.sortConfig.key === 'type' ? (assetsTable.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left py-2 cursor-pointer" onClick={() => assetsTable.requestSort('criticality')}>
                Критичность {assetsTable.sortConfig.key === 'criticality' ? (assetsTable.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left py-2">Площадка</th>
              <th className="text-left py-2">Следующее ТО</th>
            </tr>
          </thead>
          <tbody>
            {assetsTable.sortedAndFiltered.map((asset) => (
              <tr key={asset.id} className="border-t border-border-subtle/40">
                <td className="py-2 pr-4">{asset.name}</td>
                <td className="py-2 pr-4 text-text-muted">{asset.type}</td>
                <td className="py-2 pr-4">{asset.criticality}</td>
                <td className="py-2 pr-4 text-text-muted">{asset.siteId}</td>
                <td className="py-2 pr-4 text-text-muted">
                  {asset.nextPlannedMaintenanceDate
                    ? new Date(asset.nextPlannedMaintenanceDate).toLocaleDateString('ru-RU')
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Card title="Заявки на ТО">
        <div className="flex justify-end mb-3">
          <input
            value={workOrdersTable.searchQuery}
            onChange={(e) => workOrdersTable.setSearchQuery(e.target.value)}
            placeholder="Поиск по ID, типу или площадке"
            className="bg-bg-surfaceSoft border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent-primary/60 focus:shadow-focus transition"
          />
        </div>
        <Table>
          <thead>
            <tr>
              <th className="text-left py-2 cursor-pointer" onClick={() => workOrdersTable.requestSort('id')}>
                ID {workOrdersTable.sortConfig.key === 'id' ? (workOrdersTable.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left py-2">Тип</th>
              <th className="text-left py-2">Статус</th>
              <th className="text-left py-2 cursor-pointer" onClick={() => workOrdersTable.requestSort('priority')}>
                Приоритет {workOrdersTable.sortConfig.key === 'priority' ? (workOrdersTable.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left py-2">Актив</th>
              <th className="text-left py-2">Площадка</th>
              <th className="text-left py-2 cursor-pointer" onClick={() => workOrdersTable.requestSort('dueDate')}>
                Дедлайн {workOrdersTable.sortConfig.key === 'dueDate' ? (workOrdersTable.sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {workOrdersTable.sortedAndFiltered.map((wo) => {
              const isOverdue = wo.dueDate && wo.status !== 'done' && wo.dueDate < new Date();
              return (
                <tr key={wo.id} className={`border-t border-border-subtle/40 ${isOverdue ? 'bg-status-danger/10' : ''}`}>
                  <td className="py-2 pr-4">{wo.id}</td>
                  <td className="py-2 pr-4 text-text-muted">{wo.type}</td>
                  <td className="py-2 pr-4">
                    <StatusPill
                      label={wo.status === 'done' ? 'Завершено' : wo.status === 'in_progress' ? 'В работе' : isOverdue ? 'Просрочено' : 'Открыто'}
                      tone={
                        wo.status === 'done'
                          ? 'success'
                          : wo.status === 'in_progress'
                            ? 'info'
                            : isOverdue
                              ? 'danger'
                              : 'warning'
                      }
                    />
                  </td>
                  <td className="py-2 pr-4">{wo.priority}</td>
                  <td className="py-2 pr-4 text-text-muted">{wo.assetId}</td>
                  <td className="py-2 pr-4 text-text-muted">{wo.siteId}</td>
                  <td className="py-2 pr-4 text-text-muted">
                    {wo.dueDate ? new Date(wo.dueDate).toLocaleDateString('ru-RU') : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
