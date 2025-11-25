import { useMemo, useState, useEffect } from 'react';
import { Card } from '../../shared/components/Card';
import { Table } from '../../shared/components/Table';
import { staffMembers } from '../../shared/data/staff';
import { shifts } from '../../shared/data/shifts';
import { sites } from '../../shared/data/sites';
import { opsLoadIndex } from '../../shared/lib/kpi';
import { StatusPill } from '../../shared/components/StatusPill';
import { strings } from '../../shared/lib/strings';
import { useTableSortAndFilter } from '../../shared/hooks/useTableSortAndFilter';
import { useLocation } from 'react-router-dom';
import { InfoTooltip } from '../../shared/components/InfoTooltip';

const roles = [
  { key: 'all', label: 'Все' },
  { key: 'technician', label: 'Техник' },
  { key: 'engineer', label: 'Инженер' },
  { key: 'shift_lead', label: 'Старший смены' },
  { key: 'manager', label: 'Менеджер' }
] as const;

export function PersonnelPage() {
  const location = useLocation();
  const locationState = location.state as { siteId?: string } | undefined;
  const [roleFilter, setRoleFilter] = useState<(typeof roles)[number]['key']>('all');
  const [selectedSite, setSelectedSite] = useState<string>(locationState?.siteId ?? 'msk-1');

  const filteredByRole = useMemo(
    () => staffMembers.filter((member) => roleFilter === 'all' || member.role === roleFilter),
    [roleFilter]
  );

  const { sortedAndFiltered, requestSort, sortConfig, searchQuery, setSearchQuery } = useTableSortAndFilter(
    filteredByRole,
    ['fullName', 'role', 'grade'],
    'fullName'
  );

  useEffect(() => {
    if (locationState?.siteId) {
      setSelectedSite(locationState.siteId);
    }
  }, [locationState?.siteId]);

  const siteShifts = shifts.filter((shift) => shift.siteId === selectedSite);
  const site = sites.find((s) => s.id === selectedSite) ?? sites[0];
  const opsIndex = opsLoadIndex(site, shifts);

  return (
    <div className="space-y-8">
      <Card title="Персонал" subtitle="Фильтры и поиск по людям">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
          <div className="flex gap-2 flex-wrap">
            {roles.map((role) => (
              <button
                key={role.key}
                onClick={() => setRoleFilter(role.key)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  roleFilter === role.key
                    ? 'border-accent/50 bg-accent/10 text-accent shadow-focus'
                    : 'border-white/5 bg-ink-900/70 text-neutral-400 hover:border-accent/30'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по имени, роли, грейду"
            className="bg-gradient-to-b from-bg-surface/90 to-bg-surfaceSoft/88 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-accent/60 focus:shadow-[0_0_0_2px_rgba(62,236,226,0.12)] transition"
          />
        </div>
        <Table framed={false}>
          <thead>
            <tr>
              <th className="text-left py-2 cursor-pointer" onClick={() => requestSort('fullName')}>
                Имя {sortConfig.key === 'fullName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left py-2 cursor-pointer" onClick={() => requestSort('role')}>
                Роль {sortConfig.key === 'role' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left py-2 cursor-pointer" onClick={() => requestSort('grade')}>
                Грейд {sortConfig.key === 'grade' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left py-2">Площадки</th>
              <th className="text-left py-2">Ставка</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFiltered.map((member) => (
              <tr key={member.id} className="border-t border-white/10">
                <td className="py-2 pr-4">{member.fullName}</td>
                <td className="py-2 pr-4 text-neutral-400">{member.role}</td>
                <td className="py-2 pr-4">{member.grade}</td>
                <td className="py-2 pr-4 text-neutral-400">{member.assignedSiteIds.join(', ')}</td>
                <td className="py-2 pr-4">{member.hourlyRate.toLocaleString('ru-RU')} ₽/ч</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card className="xl:col-span-2" title="Смены">
          <div className="flex gap-3 mb-3 flex-wrap">
            <select
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              className="bg-gradient-to-b from-bg-surface/90 to-bg-surfaceSoft/88 border border-white/10 rounded-xl px-3 py-2 text-sm text-neutral-100"
            >
              {sites.map((siteItem) => (
                <option key={siteItem.id} value={siteItem.id}>
                  {siteItem.name}
                </option>
              ))}
            </select>
          </div>
          <Table framed={false}>
            <thead>
              <tr>
                <th className="text-left py-2">Дата</th>
                <th className="text-left py-2">Начало</th>
                <th className="text-left py-2">Конец</th>
                <th className="text-left py-2">План</th>
                <th className="text-left py-2">Факт</th>
                <th className="text-left py-2">Переработка</th>
              </tr>
            </thead>
            <tbody>
              {siteShifts.map((shift) => (
                <tr key={shift.id} className="border-t border-white/10">
                  <td className="py-2 pr-4">{shift.date}</td>
                  <td className="py-2 pr-4">{shift.startTime}</td>
                  <td className="py-2 pr-4">{shift.endTime}</td>
                  <td className="py-2 pr-4">{shift.plannedStaffIds.length}</td>
                  <td className="py-2 pr-4">{shift.actualStaffIds.length}</td>
                  <td className="py-2 pr-4">{shift.overtimeHoursTotal.toFixed(1)} ч</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card title="Ops Load Index" subtitle={site?.name}>
          <div className="flex flex-col gap-3">
            <div className="text-4xl font-bold text-neutral-100">{opsIndex.toFixed(1)}</div>
            <StatusPill
              label={opsIndex > 80 ? 'Высокая нагрузка' : opsIndex > 60 ? 'Повышенная' : 'Комфортно'}
              tone={opsIndex > 80 ? 'danger' : opsIndex > 60 ? 'warning' : 'success'}
            />
            <InfoTooltip label="Ops Load Index: плановые vs фактические часы смен + переработка">
              <p className="text-sm text-neutral-400">Расчёт по плановым/фактическим часам и переработке.</p>
            </InfoTooltip>
          </div>
        </Card>
      </div>
    </div>
  );
}
