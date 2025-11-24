import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { StatusPill } from '../../shared/components/StatusPill';
import { KpiBadge } from '../../shared/components/KpiBadge';
import { Table } from '../../shared/components/Table';
import { sites } from '../../shared/data/sites';
import { reliabilityScore, capacityLoadIndex, uptimePercent, opsLoadIndex } from '../../shared/lib/kpi';
import { incidents } from '../../shared/data/incidents';
import { workOrders } from '../../shared/data/workOrders';
import { inventoryItems } from '../../shared/data/inventory';
import { safetyEvents } from '../../shared/data/safetyEvents';
import { strings } from '../../shared/lib/strings';
import { Link, useNavigate } from 'react-router-dom';
import { InfoTooltip } from '../../shared/components/InfoTooltip';
import { shifts } from '../../shared/data/shifts';
import { financialRecords } from '../../shared/data/financialRecords';
import { ArrowRight } from '../../shared/icons';

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

  const networkUptime = useMemo(
    () => withScores.reduce((sum, site) => sum + site.uptime, 0) / Math.max(withScores.length, 1),
    [withScores]
  );

  const avgOpsLoad = useMemo(
    () => sites.reduce((sum, site) => sum + opsLoadIndex(site, shifts), 0) / Math.max(sites.length, 1),
    []
  );

  const networkTone = networkUptime > 98 && avgOpsLoad < 55 ? 'success' : networkUptime > 96 ? 'warning' : 'danger';
  const networkStatusText =
    networkTone === 'success'
      ? 'Сеть в целом: Стабильно'
      : networkTone === 'warning'
        ? 'Сеть в целом: Предупреждение'
        : 'Сеть в целом: Критично';

  const overdueWorkOrders = workOrders.filter((wo) => wo.status !== 'done' && wo.dueDate && wo.dueDate < today).length;
  const monthlyOpex = useMemo(() => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return financialRecords
      .filter((r) => r.type === 'opex' && r.date >= lastMonth)
      .reduce((sum, r) => sum + r.amountRub, 0);
  }, []);

  const summaryCards: { label: string; value: number; tone: 'neutral' | 'success' | 'warning' | 'danger' | 'info' }[] = [
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

  const roleShortcuts = [
    {
      title: 'Надёжность и аптайм (SLA)',
      metric: `Средний uptime сети: ${networkUptime.toFixed(2)}%`,
      to: '/sites'
    },
    {
      title: 'Люди и смены',
      metric: `Ops load index: ${avgOpsLoad.toFixed(1)} / 100`,
      to: '/personnel'
    },
    {
      title: 'ТО и активы',
      metric: `Открытых заявок: ${workOrders.filter((wo) => wo.status !== 'done').length}, просрочено: ${overdueWorkOrders}`,
      to: '/maintenance'
    },
    {
      title: 'Финансы и расходы',
      metric: `OPEX за месяц: ₽${monthlyOpex.toLocaleString('ru-RU')}`,
      to: '/finance'
    }
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title={strings.dashboard.title} description={strings.dashboard.description} />

      <Card className="border-none bg-gradient-to-br from-[#102037]/90 via-[#0e1a2d]/85 to-[#0c1323]/80 shadow-glow">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.18em] text-text-dim">DC Maestro / Operations Cockpit</p>
            <div className="flex items-center gap-3">
              <span className="block h-12 w-1 rounded-full bg-gradient-to-b from-accent-primary via-accent-muted/80 to-transparent shadow-[0_0_22px_rgba(62,236,226,0.65)]" />
              <div>
                <h3 className="text-3xl font-semibold text-text-primary drop-shadow">Главная панель мониторинга</h3>
                <p className="text-sm text-text-muted mt-2 leading-relaxed">
                  Быстрый взгляд на аптайм, инциденты и нагрузку. Обновлённая визуализация с глубокими оттенками и стеклянными блоками
                  помогает быстрее почувствовать обстановку по сети.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 text-right">
            <StatusPill label={networkStatusText} tone={networkTone} />
            <div className="text-lg font-semibold text-text-primary drop-shadow-sm">Средний аптайм сети: {networkUptime.toFixed(2)}%</div>
            <p className="text-xs text-text-muted">Подсветка по всему периметру ЦОД</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[2fr,1fr]">
        <Card className="xl:col-span-2" title={strings.dashboard.todayReport}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryCards.map((card) => (
              <KpiBadge key={card.label} label={card.label} value={card.value} tone={card.tone} />
            ))}
          </div>
        </Card>

        <Card
          className="xl:col-span-2"
          title="Быстрый переход по ролям"
          subtitle="Shortcut-туры под собеседование для Вис Энергия"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {roleShortcuts.map((role) => (
              <Card key={role.title} interactive className="bg-white/5">
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-text-primary">{role.title}</div>
                  <p className="text-sm text-text-muted">{role.metric}</p>
                </div>
                <Link
                  to={role.to}
                  className="inline-flex items-center gap-2 text-accent-primary font-medium text-sm mt-3 transition-transform hover:translate-x-0.5"
                >
                  Перейти
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="xl:col-span-1" title="Состояние сети" subtitle="Uptime по площадкам">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: '#c7d2e9', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} />
                <YAxis tick={{ fill: '#c7d2e9', fontSize: 12 }} domain={[90, 100]} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} />
                <Tooltip contentStyle={{ background: '#0f1828', border: '1px solid rgba(62,236,226,0.3)', borderRadius: 12, color: '#e5eaf3', boxShadow: '0 20px 50px -30px rgba(0,0,0,0.7)' }} cursor={{ fill: 'rgba(62,236,226,0.06)' }} />
                <Bar dataKey="uptime" fill="#3eece2" stroke="#25cfc6" strokeWidth={1.5} radius={[10, 10, 6, 6]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={`${strings.dashboard.worstSites} (Reliability)`} subtitle="Площадки, требующие внимания">
          <Table>
            <thead>
              <tr>
                <th className="text-left">Площадка</th>
                <th className="text-right">Reliability</th>
                <th className="text-right">Статус</th>
              </tr>
            </thead>
            <tbody>
              {worstSites.map((site) => (
                <tr key={site.id} className="border-t border-border-subtle/40">
                  <td className="pr-4">
                    <div className="font-medium text-text-primary">{site.name}</div>
                    <div className="text-xs text-text-muted">{site.region}</div>
                  </td>
                  <td className="text-right">{site.reliability.toFixed(1)}</td>
                  <td className="text-right">
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

      <Card title="Текущие предупреждения" subtitle="Инциденты, ТО, склад и безопасность" className="xl:col-span-2">
        <Table>
          <thead>
            <tr>
              <th className="text-left">Тип</th>
              <th className="text-left">Описание</th>
              <th className="text-left">Площадка</th>
              <th className="text-left">Приоритет</th>
              <th className="text-left">Действие</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={`${alert.type}-${alert.id}`} className="border-t border-border-subtle/40">
                <td className="pr-4 font-medium text-text-primary">{alert.type}</td>
                <td className="pr-4 text-text-primary">{alert.description}</td>
                <td className="pr-4 text-text-muted">{alert.siteId}</td>
                <td className="pr-4">
                  <StatusPill
                    label={alert.priority}
                    tone={alert.priority.includes('Крит') ? 'danger' : alert.priority.includes('Проср') ? 'warning' : 'warning'}
                  />
                </td>
                <td className="pr-4">
                  <button
                    onClick={alert.link}
                    className="text-accent-primary hover:text-accent-muted text-sm inline-flex items-center gap-2 transition-transform hover:translate-x-0.5"
                  >
                    Перейти <ArrowRight className="w-4 h-4" aria-hidden />
                  </button>
                </td>
              </tr>
            ))}
            {alerts.length === 0 && (
              <tr>
                <td className="pr-4 text-text-muted" colSpan={5}>
                  Нет предупреждений на сегодня.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {withScores.map((site) => (
          <Card key={site.id} interactive>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="text-lg font-semibold text-text-primary">{site.name}</div>
                <div className="text-sm text-text-muted">{site.region}</div>
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
