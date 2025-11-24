import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { Table } from '../../shared/components/Table';
import { safetyEvents } from '../../shared/data/safetyEvents';
import { staffMembers } from '../../shared/data/staff';
import { StatusPill } from '../../shared/components/StatusPill';
import { strings } from '../../shared/lib/strings';
import { getStatusLabel, getStatusTone } from '../../shared/lib/status';

export function SafetyPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title={strings.safety.title} subtitle={strings.safety.subtitle} />

      <Card title="События безопасности">
        <Table>
          <thead>
            <tr>
              <th className="text-left py-2">Тип</th>
              <th className="text-left py-2">Заголовок</th>
              <th className="text-left py-2">Площадка</th>
              <th className="text-left py-2">Дата</th>
              <th className="text-left py-2">Статус</th>
              <th className="text-left py-2">Ответственный</th>
            </tr>
          </thead>
          <tbody>
            {safetyEvents.map((event) => {
              const staff = staffMembers.find((s) => s.id === event.responsibleStaffId);
              return (
                <tr key={event.id} className="border-t border-border-subtle/40">
                  <td className="py-2 pr-4 text-text-muted">{event.type}</td>
                  <td className="py-2 pr-4 text-text-primary">{event.title}</td>
                  <td className="py-2 pr-4 text-text-muted">{event.siteId ?? 'Общий'}</td>
                  <td className="py-2 pr-4 text-text-muted">{new Date(event.date).toLocaleDateString('ru-RU')}</td>
                  <td className="py-2 pr-4">
                    <StatusPill label={getStatusLabel(event.status)} tone={getStatusTone(event.status)} />
                  </td>
                  <td className="py-2 pr-4 text-text-primary">{staff?.fullName ?? '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
