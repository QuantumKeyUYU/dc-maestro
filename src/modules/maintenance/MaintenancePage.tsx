import { useMemo, useState, useEffect, useRef } from 'react';
import { Card } from '../../shared/components/Card';
import { Table } from '../../shared/components/Table';
import { assets } from '../../shared/data/assets';
import { workOrders } from '../../shared/data/workOrders';
import { StatusPill } from '../../shared/components/StatusPill';
import { strings } from '../../shared/lib/strings';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';
import { useLocation } from 'react-router-dom';
import { getStatusLabel, getStatusTone } from '../../shared/lib/status';

const types = ['all', 'UPS', 'Generator', 'CRAC', 'PDU', 'Rack', 'FireSystem', 'Other'] as const;
const criticalities = ['all', 1, 2, 3] as const;

export function MaintenancePage() {
  const location = useLocation();
  const locationState = location.state as { siteId?: string; workOrderId?: string; filter?: 'overdue' } | undefined;
  const [typeFilter, setTypeFilter] = useState<(typeof types)[number]>('all');
  const [critFilter, setCritFilter] = useState<(typeof criticalities)[number]>('all');
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);
  const workOrdersRef = useRef<HTMLDivElement>(null);

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
    if (locationState?.filter === 'overdue') {
      setShowOverdueOnly(true);
      workOrdersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [locationState?.siteId, locationState?.filter, assetsTable.setSearchQuery, workOrdersTable.setSearchQuery]);

    return (
      <div className="space-y-6">
        <Card title="Активы">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
            <div className="flex gap-3 flex-wrap">
              <select
                className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-[14px] px-3.5 py-2 text-sm text-text-primary backdrop-blur-[14px]"
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
                className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-[14px] px-3.5 py-2 text-sm text-text-primary backdrop-blur-[14px]"
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
              className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-[14px] px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/70 focus:ring-1 focus:ring-accent-primary/30 transition backdrop-blur-[16px]"
            />
          </div>
        <Table framed={false}>
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
                <tr key={asset.id} className="border-t border-white/10">
                  <td className="py-2 pr-4 text-text-primary">{asset.name}</td>
                <td className="py-2 pr-4 text-text-secondary">{asset.type}</td>
                <td className="py-2 pr-4 text-text-primary">{asset.criticality}</td>
                <td className="py-2 pr-4 text-text-secondary">{asset.siteId}</td>
                <td className="py-2 pr-4 text-text-secondary">
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
          <div className="flex justify-between items-center mb-4" ref={workOrdersRef}>
            {showOverdueOnly ? (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white border border-white/20 backdrop-blur-[12px]">
                  Фильтр: просроченные заявки
                </span>
                <button
                type="button"
                className="text-xs text-accent-primary hover:text-white transition"
                onClick={() => setShowOverdueOnly(false)}
              >
                Сбросить
              </button>
            </div>
          ) : (
            <span className="text-xs text-text-muted">Все активные заявки по умолчанию</span>
          )}
            <input
              value={workOrdersTable.searchQuery}
              onChange={(e) => workOrdersTable.setSearchQuery(e.target.value)}
              placeholder="Поиск по ID, типу или площадке"
              className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-[14px] px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/70 focus:ring-1 focus:ring-accent-primary/30 transition backdrop-blur-[16px]"
            />
          </div>
        <Table framed={false}>
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
            {workOrdersTable.sortedAndFiltered
              .filter((wo) => {
                const isOverdue = wo.dueDate && wo.status !== 'done' && wo.dueDate < new Date();
                return showOverdueOnly ? isOverdue : true;
              })
              .map((wo) => {
              const isOverdue = wo.dueDate && wo.status !== 'done' && wo.dueDate < new Date();
                return (
                  <tr key={wo.id} className={`border-t border-white/10 ${isOverdue ? 'bg-status-danger/5' : ''}`}>
                    <td className="py-2 pr-4 text-text-primary">{wo.id}</td>
                  <td className="py-2 pr-4 text-text-secondary">{wo.type}</td>
                  <td className="py-2 pr-4">
                    <StatusPill label={getStatusLabel(isOverdue ? 'overdue' : wo.status)} tone={getStatusTone(isOverdue ? 'overdue' : wo.status)} />
                  </td>
                  <td className="py-2 pr-4 text-text-primary">{wo.priority}</td>
                  <td className="py-2 pr-4 text-text-secondary">{wo.assetId}</td>
                  <td className="py-2 pr-4 text-text-secondary">{wo.siteId}</td>
                  <td className="py-2 pr-4 text-text-secondary">
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
