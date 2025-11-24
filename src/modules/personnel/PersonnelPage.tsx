import { useMemo, useState } from 'react';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { Table } from '../../shared/components/Table';
import { staffMembers } from '../../shared/data/staff';
import { shifts } from '../../shared/data/shifts';
import { sites } from '../../shared/data/sites';
import { opsLoadIndex } from '../../shared/lib/kpi';
import { StatusPill } from '../../shared/components/StatusPill';

const roles = ['all', 'technician', 'engineer', 'shift_lead', 'manager'] as const;

export function PersonnelPage() {
  const [roleFilter, setRoleFilter] = useState<(typeof roles)[number]>('all');
  const [selectedSite, setSelectedSite] = useState<string>('msk-1');

  const filteredStaff = useMemo(
    () => staffMembers.filter((member) => roleFilter === 'all' || member.role === roleFilter),
    [roleFilter]
  );

  const siteShifts = shifts.filter((shift) => shift.siteId === selectedSite);
  const site = sites.find((s) => s.id === selectedSite) ?? sites[0];
  const opsIndex = opsLoadIndex(site, shifts);

  return (
    <div className="space-y-6">
      <SectionHeader title="Personnel" description="Роли, смены и загрузка" />

      <Card title="Сотрудники" subtitle="Фильтр по роли">
        <div className="flex gap-2 mb-3 flex-wrap">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1 rounded-full text-sm border ${
                roleFilter === role ? 'border-sky-500 bg-sky-900/40 text-sky-100' : 'border-gray-700 bg-gray-900/60'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        <Table>
          <thead className="text-xs uppercase text-gray-400">
            <tr>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Role</th>
              <th className="text-left py-2">Grade</th>
              <th className="text-left py-2">Sites</th>
              <th className="text-left py-2">Rate</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((member) => (
              <tr key={member.id} className="border-t border-gray-800">
                <td className="py-2 pr-4">{member.fullName}</td>
                <td className="py-2 pr-4 text-gray-300">{member.role}</td>
                <td className="py-2 pr-4">{member.grade}</td>
                <td className="py-2 pr-4 text-gray-300">{member.assignedSiteIds.join(', ')}</td>
                <td className="py-2 pr-4">{member.hourlyRate.toLocaleString('ru-RU')} ₽/ч</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2" title="Смены">
          <div className="flex gap-3 mb-3">
            <select
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
            >
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>
          <Table>
            <thead className="text-xs uppercase text-gray-400">
              <tr>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Start</th>
                <th className="text-left py-2">End</th>
                <th className="text-left py-2">Planned</th>
                <th className="text-left py-2">Actual</th>
                <th className="text-left py-2">Overtime</th>
              </tr>
            </thead>
            <tbody>
              {siteShifts.map((shift) => (
                <tr key={shift.id} className="border-t border-gray-800">
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
            <div className="text-4xl font-bold">{opsIndex.toFixed(1)}</div>
            <StatusPill
              label={opsIndex > 80 ? 'High load' : opsIndex > 60 ? 'Elevated' : 'Comfortable'}
              tone={opsIndex > 80 ? 'danger' : opsIndex > 60 ? 'warning' : 'success'}
            />
            <p className="text-sm text-gray-400">Расчет по плановым/фактическим часам и переработке.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
