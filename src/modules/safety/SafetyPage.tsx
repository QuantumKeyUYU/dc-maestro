import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { Table } from '../../shared/components/Table';
import { safetyEvents } from '../../shared/data/safetyEvents';
import { staffMembers } from '../../shared/data/staff';
import { StatusPill } from '../../shared/components/StatusPill';
import { strings } from '../../shared/lib/strings';

export function SafetyPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title={strings.safety.title} description={strings.safety.description} />

      <Card title="События безопасности">
        <Table>
          <thead className="text-xs uppercase text-gray-400">
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
              const overdue = event.status === 'overdue';
              return (
                <tr key={event.id} className={`border-t border-gray-800 ${overdue ? 'bg-red-900/20' : ''}`}>
                  <td className="py-2 pr-4">{event.type}</td>
                  <td className="py-2 pr-4 text-gray-300">{event.title}</td>
                  <td className="py-2 pr-4">{event.siteId ?? 'Общий'}</td>
                  <td className="py-2 pr-4">{new Date(event.date).toLocaleDateString('ru-RU')}</td>
                  <td className="py-2 pr-4">
                    <StatusPill
                      label={event.status === 'overdue' ? 'Просрочено' : event.status === 'scheduled' ? 'Запланировано' : 'Завершено'}
                      tone={event.status === 'overdue' ? 'danger' : event.status === 'scheduled' ? 'warning' : 'success'}
                    />
                  </td>
                  <td className="py-2 pr-4 text-gray-300">{staff?.fullName ?? '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
