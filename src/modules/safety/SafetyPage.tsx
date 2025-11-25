import { useEffect, useRef, useState } from 'react';
import { Card } from '../../shared/components/Card';
import { Table } from '../../shared/components/Table';
import { safetyEvents } from '../../shared/data/safetyEvents';
import { staffMembers } from '../../shared/data/staff';
import { StatusPill } from '../../shared/components/StatusPill';
import { strings } from '../../shared/lib/strings';
import { getStatusLabel, getStatusTone } from '../../shared/lib/status';
import { useLocation } from 'react-router-dom';

export function SafetyPage() {
  const location = useLocation();
  const locationState = location.state as { filter?: 'open' } | undefined;
  const [activeOnly, setActiveOnly] = useState(false);
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (locationState?.filter === 'open') {
      setActiveOnly(true);
      eventsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [locationState?.filter]);

  const visibleEvents = activeOnly ? safetyEvents.filter((event) => event.status !== 'done') : safetyEvents;

  return (
    <div className="space-y-6">
      <Card title="События безопасности">
        <div className="flex items-center justify-between mb-4" ref={eventsRef}>
          {activeOnly ? (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white border border-white/20 backdrop-blur-[12px]">
                Фильтр: в работе и просрочено
              </span>
              <button
                type="button"
                className="text-xs text-accent-primary hover:text-white transition"
                onClick={() => setActiveOnly(false)}
              >
                Сбросить
              </button>
            </div>
          ) : (
            <span className="text-xs text-text-muted">Все события по охране труда</span>
          )}
        </div>
        <Table framed={false}>
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
            {visibleEvents.map((event) => {
              const staff = staffMembers.find((s) => s.id === event.responsibleStaffId);
              return (
                <tr key={event.id} className="border-t border-white/5">
                  <td className="py-2 pr-4 text-text-secondary">{event.type}</td>
                  <td className="py-2 pr-4 text-text-primary">{event.title}</td>
                  <td className="py-2 pr-4 text-text-secondary">{event.siteId ?? 'Общий'}</td>
                  <td className="py-2 pr-4 text-text-secondary">{new Date(event.date).toLocaleDateString('ru-RU')}</td>
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
