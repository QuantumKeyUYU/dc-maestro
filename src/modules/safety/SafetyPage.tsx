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
    <div className="space-y-8">
      <Card title="События безопасности">
        <div className="flex items-center justify-between mb-4" ref={eventsRef}>
          {activeOnly ? (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-100 shadow-inner">
                Фильтр: в работе и просрочено
              </span>
              <button
                type="button"
                className="text-xs text-accent hover:text-accent-muted transition"
                onClick={() => setActiveOnly(false)}
              >
                Сбросить
              </button>
            </div>
          ) : (
            <span className="text-xs text-neutral-500">Все события по охране труда</span>
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
                <tr key={event.id} className="border-t border-white/10">
                  <td className="py-2 pr-4 text-neutral-400">{event.type}</td>
                  <td className="py-2 pr-4 text-neutral-100">{event.title}</td>
                  <td className="py-2 pr-4 text-neutral-400">{event.siteId ?? 'Общий'}</td>
                  <td className="py-2 pr-4 text-neutral-400">{new Date(event.date).toLocaleDateString('ru-RU')}</td>
                  <td className="py-2 pr-4">
                    <StatusPill label={getStatusLabel(event.status)} tone={getStatusTone(event.status)} />
                  </td>
                  <td className="py-2 pr-4 text-neutral-100">{staff?.fullName ?? '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
