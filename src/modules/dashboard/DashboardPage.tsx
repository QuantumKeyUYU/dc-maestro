import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { StatusPill } from '../../shared/components/StatusPill';
import { KpiBadge } from '../../shared/components/KpiBadge';
import { Table } from '../../shared/components/Table';
import { sites } from '../../shared/data/sites';
import { reliabilityScore, capacityLoadIndex, uptimePercent } from '../../shared/lib/kpi';
import { incidents } from '../../shared/data/incidents';
import { workOrders } from '../../shared/data/workOrders';
import { inventoryItems } from '../../shared/data/inventory';
import { safetyEvents } from '../../shared/data/safetyEvents';
import { strings } from '../../shared/lib/strings';
import { useNavigate } from 'react-router-dom';
import { InfoTooltip } from '../../shared/components/InfoTooltip';

const chartData = sites.map((site) => ({ name: site.name, uptime: Number(uptimePercent(site).toFixed(2)) }));

export function DashboardPage() {
  const navigate = useNavigate();
  const today = new Date();

  const withScores = useMemo(
    () =>
      sites.map((site) => ({
        ...site,
        uptime: uptimePercent(site),
        reliability: reliabilityScore(site),
        capacity: capacityLoadIndex(site)
      })),
    []
  );

  const summaryCards = [
    {
      label: 'Критических инцидентов',
      value: incidents.filter((i) => i.severity === 'critical' && !i.resolvedAt).length,
      tone: incidents.some((i) => i.severity === 'critical' && !i.resolvedAt) ? 'danger' : 'neutral'
    },
    {
      label: 'Просроченных заявок на ТО',
      value: workOrders.filter((wo) => wo.status !== 'done' && wo.dueDate && wo.dueDate < today).length,
      tone: workOrders.some((wo) => wo.status !== 'done' && wo.dueDate && wo.dueDate < today) ? 'warning' : 'neutral'
    },
    {
      label: 'Позиции на минимуме/ниже',
      value: inventoryItems.filter((item) => item.quantityOnHand <= item.minThreshold).length,
      tone: inventoryItems.some((item) => item.quantityOnHand <= item.minThreshold) ? 'warning' : 'neutral'
    },
    {
      label: 'Просроченных событий безопасности',
      value: safetyEvents.filter((e) => e.status === 'overdue').length,
      tone: safetyEvents.some((e) => e.status === 'overdue') ? 'danger' : 'neutral'
    }
  ];

  const worstSites = [...withScores].sort((a, b) => a.reliability - b.reliability).slice(0, 3);

  const alerts = [
    ...incidents
      .filter((i) => i.severity === 'critical' && !i.resolvedAt)
      .map((i) => ({
        id: i.id,
        type: 'Инцидент',
        description: i.description,
        siteId: i.siteId,
        priority: 'Критично',
        link: () => navigate('/sites', { state: { siteId: i.siteId } })
      })),
    ...workOrders
      .filter((wo) => wo.status !== 'done' && wo.dueDate && wo.dueDate < today)
      .map((wo) => ({
        id: wo.id,
        type: 'ТО',
        description: wo.description ?? wo.type,
        siteId: wo.siteId,
        priority: 'Просрочено',
        link: () => navigate('/maintenance', { state: { siteId: wo.siteId, workOrderId: wo.id } })
      })),
    ...inventoryItems
      .filter((item) => item.quantityOnHand <= item.minThreshold)
      .map((item) => ({
        id: item.id,
        type: 'Склад',
        description: `${item.name} (${item.sku}) на минимуме`,
        siteId: item.siteId ?? 'Центральный',
        priority: 'Низкий остаток',
        link: () => navigate('/inventory', { state: { siteId: item.siteId } })
      })),
    ...safetyEvents
      .filter((event) => event.status === 'overdue')
      .map((event) => ({
        id: event.id,
        type: 'Безопасность',
        description: event.title,
        siteId: event.siteId ?? 'Общий',
        priority: 'Просрочено',
        link: () => navigate('/safety', { state: { siteId: event.siteId } })
      }))
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title={strings.dashboard.title} description={strings.dashboard.description} />

      <Card title={strings.dashboard.todayReport}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <KpiBadge key={card.label} label={card.label} value={card.value} tone={card.tone} />
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2" title="Uptime по площадкам">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} domain={[90, 100]} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1f2937' }} />
                <Bar dataKey="uptime" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={`${strings.dashboard.worstSites} (Reliability)`}>
          <Table>
            <thead className="text-xs uppercase text-gray-400">
              <tr>
                <th className="text-left py-2">Площадка</th>
                <th className="text-right py-2">Reliability</th>
                <th className="text-right py-2">Статус</th>
              </tr>
            </thead>
            <tbody>
              {worstSites.map((site) => (
                <tr key={site.id} className="border-t border-gray-800">
                  <td className="py-3 pr-4">
                    <div className="font-medium text-gray-100">{site.name}</div>
                    <div className="text-xs text-gray-400">{site.region}</div>
                  </td>
                  <td className="py-3 text-right">{site.reliability.toFixed(1)}</td>
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
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card title="Текущие предупреждения">
          <Table>
            <thead className="text-xs uppercase text-gray-400">
              <tr>
                <th className="text-left py-2">Тип</th>
                <th className="text-left py-2">Описание</th>
                <th className="text-left py-2">Площадка</th>
                <th className="text-left py-2">Приоритет</th>
                <th className="text-left py-2">Действие</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={`${alert.type}-${alert.id}`} className="border-t border-gray-800">
                  <td className="py-3 pr-4">{alert.type}</td>
                  <td className="py-3 pr-4 text-gray-200">{alert.description}</td>
                  <td className="py-3 pr-4 text-gray-300">{alert.siteId}</td>
                  <td className="py-3 pr-4">
                    <StatusPill
                      label={alert.priority}
                      tone={alert.priority.includes('Крит') ? 'danger' : alert.priority.includes('Проср') ? 'warning' : 'warning'}
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <button onClick={alert.link} className="text-primary hover:underline text-sm">
                      Перейти
                    </button>
                  </td>
                </tr>
              ))}
              {alerts.length === 0 && (
                <tr>
                  <td className="py-3 pr-4 text-gray-400" colSpan={5}>
                    Нет предупреждений на сегодня.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {withScores.map((site) => (
          <Card key={site.id}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-semibold text-gray-100">{site.name}</div>
                <div className="text-sm text-gray-400">{site.region}</div>
              </div>
              <StatusPill
                label={site.status === 'healthy' ? 'Стабильно' : site.status === 'warning' ? 'Предупреждение' : 'Критично'}
                tone={site.status === 'healthy' ? 'success' : site.status === 'warning' ? 'warning' : 'danger'}
              />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <InfoTooltip label="Uptime за период мониторинга площадки">
                <KpiBadge label="Uptime" value={`${site.uptime.toFixed(2)}%`} tone="info" />
              </InfoTooltip>
              <InfoTooltip label="Индекс надёжности: сочетает аптайм и среднее время восстановления. Чем ближе к 100, тем лучше.">
                <KpiBadge label="Reliability" value={`${site.reliability.toFixed(1)}`} tone="success" />
              </InfoTooltip>
              <InfoTooltip label="Индекс загрузки мощностей и стоек">
                <KpiBadge label="Capacity" value={`${site.capacity.toFixed(1)}%`} tone="warning" />
              </InfoTooltip>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
