import { useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../../shared/components/Card';
import { StatusPill } from '../../shared/components/StatusPill';
import { KpiBadge } from '../../shared/components/KpiBadge';
import { Table, TableRow } from '../../shared/components/Table';
import { sites } from '../../shared/data/sites';
import { reliabilityScore, capacityLoadIndex, uptimePercent, opsLoadIndex, globalOperationalStrainIndex } from '../../shared/lib/kpi';
import { incidents } from '../../shared/data/incidents';
import { workOrders } from '../../shared/data/workOrders';
import { inventoryItems } from '../../shared/data/inventory';
import { safetyEvents } from '../../shared/data/safetyEvents';
import { strings } from '../../shared/lib/strings';
import { useNavigate } from 'react-router-dom';
import { InfoTooltip } from '../../shared/components/InfoTooltip';
import { shifts } from '../../shared/data/shifts';
import { financialRecords } from '../../shared/data/financialRecords';
import { ArrowRight } from '../../shared/icons';
import { getStatusLabel, getStatusTone } from '../../shared/lib/status';
import { CtaButton, CtaLink } from '../../shared/components/CtaPill';

const chartData = sites.map((site) => ({ name: site.name, uptime: Number(uptimePercent(site).toFixed(2)) }));

type AlertFilter = 'critical-incidents' | 'maintenance-overdue' | 'inventory-low' | 'safety-overdue' | null;

export function DashboardPage() {
  const navigate = useNavigate();
  const today = new Date();
  const warningsRef = useRef<HTMLDivElement>(null);
  const [alertFilter, setAlertFilter] = useState<AlertFilter>(null);

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

  const osi = useMemo(() => globalOperationalStrainIndex(sites, shifts, sites, financialRecords), []);

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

  const osiTone = osi.category === 'critical' ? 'danger' : osi.category === 'watch' ? 'warning' : 'success';
  const osiState = osi.category === 'critical' ? 'Критично' : osi.category === 'watch' ? 'Повышенная нагрузка' : 'Стабильно';

  const problemSites = sites.filter((site) => site.status !== 'healthy').length;

  const overdueWorkOrders = workOrders.filter((wo) => wo.status !== 'done' && wo.dueDate && wo.dueDate < today).length;
  const monthlyOpex = useMemo(() => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return financialRecords
      .filter((r) => r.type === 'opex' && r.date >= lastMonth)
      .reduce((sum, r) => sum + r.amountRub, 0);
  }, []);

  const summaryCards: {
    label: string;
    value: number;
    tone: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
    onClick?: () => void;
  }[] = [
    {
      label: 'Критических инцидентов',
      value: incidents.filter((i) => i.severity === 'critical' && !i.resolvedAt).length,
      tone: incidents.some((i) => i.severity === 'critical' && !i.resolvedAt) ? 'danger' : 'neutral',
      onClick: () => {
        setAlertFilter('critical-incidents');
        warningsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    {
      label: 'Просроченных заявок на ТО',
      value: workOrders.filter((wo) => wo.status !== 'done' && wo.dueDate && wo.dueDate < today).length,
      tone: workOrders.some((wo) => wo.status !== 'done' && wo.dueDate && wo.dueDate < today) ? 'warning' : 'neutral',
      onClick: () => navigate('/maintenance', { state: { filter: 'overdue' } })
    },
    {
      label: 'Позиции на минимуме/ниже',
      value: inventoryItems.filter((item) => item.quantityOnHand <= item.minThreshold).length,
      tone: inventoryItems.some((item) => item.quantityOnHand <= item.minThreshold) ? 'warning' : 'neutral',
      onClick: () => navigate('/inventory', { state: { filter: 'lowStock' } })
    },
    {
      label: 'Просроченных событий безопасности',
      value: safetyEvents.filter((e) => e.status === 'overdue').length,
      tone: safetyEvents.some((e) => e.status === 'overdue') ? 'danger' : 'neutral',
      onClick: () => navigate('/safety', { state: { filter: 'open' } })
    }
  ];

  const worstSites = [...withScores].sort((a, b) => a.reliability - b.reliability).slice(0, 3);

  type AlertRow = {
    id: string;
    type: string;
    description: string;
    siteId: string;
    priority: string;
    category: 'incident' | 'maintenance' | 'inventory' | 'safety';
    link?: () => void;
  };

  const alerts: AlertRow[] = [
    ...incidents
      .filter((i) => i.severity === 'critical' && !i.resolvedAt)
      .map((i) => ({
        id: i.id,
        type: 'Инцидент',
        description: i.description,
        siteId: i.siteId,
        priority: 'Критично',
        link: () => navigate('/sites', { state: { siteId: i.siteId } }),
        category: 'incident' as const
      })),
    ...workOrders
      .filter((wo) => wo.status !== 'done' && wo.dueDate && wo.dueDate < today)
      .map((wo) => ({
        id: wo.id,
        type: 'ТО',
        description: wo.description ?? wo.type,
        siteId: wo.siteId,
        priority: 'Просрочено',
        link: () => navigate('/maintenance', { state: { siteId: wo.siteId, workOrderId: wo.id } }),
        category: 'maintenance' as const
      })),
    ...inventoryItems
      .filter((item) => item.quantityOnHand <= item.minThreshold)
      .map((item) => ({
        id: item.id,
        type: 'Склад',
        description: `${item.name} (${item.sku}) на минимуме`,
        siteId: item.siteId ?? 'Центральный',
        priority: 'Низкий остаток',
        link: () => navigate('/inventory', { state: { siteId: item.siteId } }),
        category: 'inventory' as const
      })),
    ...safetyEvents
      .filter((event) => event.status === 'overdue')
      .map((event) => ({
        id: event.id,
        type: 'Безопасность',
        description: event.title,
        siteId: event.siteId ?? 'Общий',
        priority: 'Просрочено',
        link: () => navigate('/safety', { state: { siteId: event.siteId } }),
        category: 'safety' as const
      }))
  ];

  const filteredAlerts = useMemo(() => {
    if (!alertFilter) return alerts;
    switch (alertFilter) {
      case 'critical-incidents':
        return alerts.filter((alert) => alert.category === 'incident');
      case 'maintenance-overdue':
        return alerts.filter((alert) => alert.category === 'maintenance');
      case 'inventory-low':
        return alerts.filter((alert) => alert.category === 'inventory');
      case 'safety-overdue':
        return alerts.filter((alert) => alert.category === 'safety');
      default:
        return alerts;
    }
  }, [alerts, alertFilter]);

  const alertFilterLabels: Record<Exclude<AlertFilter, null>, string> = {
    'critical-incidents': 'Фильтр: критические инциденты',
    'maintenance-overdue': 'Фильтр: просроченные заявки ТО',
    'inventory-low': 'Фильтр: позиции на минимуме',
    'safety-overdue': 'Фильтр: просроченные события безопасности'
  };

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
      <div className="rounded-[14px] border border-border-subtle bg-bg-surface/90 p-6 shadow-soft">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p className="text-[13px] uppercase tracking-[0.14em] text-text-dim">Дашборд</p>
            <h1 className="text-3xl font-semibold text-text-primary leading-tight">Обзор состояния сети и эксплуатационных рисков</h1>
            <p className="text-sm text-text-muted max-w-3xl">Ключевые сигналы по отказоустойчивости, загрузке и операционным рискам для быстрой реакции.</p>
          </div>
          <InfoTooltip label="Операционный индекс нагрузки рассчитывается как взвешенная метрика по инцидентам, загрузке смен и финансовым рискам." triggerArea="container">
            <div className="flex items-center gap-4 rounded-[12px] border border-border-subtle bg-bg-surfaceMuted/80 px-5 py-4 shadow-soft min-w-[260px]">
              <div className="space-y-1">
                <div className="text-[12px] uppercase tracking-[0.14em] text-text-dim">OSI</div>
                <div className="text-4xl font-semibold text-text-primary">{osi.value.toFixed(1)}</div>
                <div className="text-xs text-text-muted">Operational Strain Index</div>
              </div>
              <StatusPill label={osiState} tone={osiTone} />
            </div>
          </InfoTooltip>
        </div>
      </div>

      <Card title="Состояние сети сейчас" subtitle="Главные индикаторы доступности и риска в текущую смену">
        <div className="grid gap-6 lg:grid-cols-[1.1fr,1fr] items-start">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-[12px] border border-border-subtle bg-bg-surfaceMuted/80 px-5 py-4 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-[12px] uppercase tracking-[0.14em] text-text-dim">Operational Strain Index</span>
                <StatusPill label={osiState} tone={osiTone} size="sm" />
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-semibold text-text-primary leading-none">{osi.value.toFixed(1)}</span>
                <span className="text-text-muted">/ 100</span>
              </div>
              <p className="text-sm text-text-muted leading-snug">Средний аптайм сети: {networkUptime.toFixed(2)}% · Ops load index: {avgOpsLoad.toFixed(1)} / 100</p>
            </div>
            <div className="rounded-[12px] border border-border-subtle bg-bg-surfaceMuted/60 px-5 py-4 shadow-soft space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Площадок вне нормы</span>
                <StatusPill label={problemSites === 0 ? 'Норма' : 'Требует внимания'} tone={problemSites === 0 ? 'success' : 'warning'} size="sm" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-text-primary">{problemSites}</span>
                <span className="text-sm text-text-muted">площадок</span>
              </div>
              <p className="text-sm text-text-muted leading-snug">Просроченных заявок ТО: {overdueWorkOrders}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {summaryCards.map((card) => (
              <button
                key={card.label}
                type="button"
                onClick={card.onClick}
                className="text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary/45 rounded-[12px] border border-border-subtle bg-bg-surface/85 px-4 py-3 shadow-soft hover:bg-white/4 transition"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-1">
                    <p className="text-[12px] uppercase tracking-wide text-text-dim">{card.label}</p>
                    <p className="text-2xl font-semibold text-text-primary leading-tight">{card.value}</p>
                  </div>
                  <StatusPill label={card.value === 0 ? 'Норма' : 'Внимание'} tone={card.tone === 'danger' ? 'danger' : card.tone === 'warning' ? 'warning' : 'neutral'} size="sm" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div ref={warningsRef}>
        <Card title="Текущие предупреждения" subtitle="Инциденты, ТО, склад и безопасность" className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            {alertFilter ? (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-bg-surfaceMuted/80 px-3 py-1 text-xs text-text-primary border border-border-subtle">
                  {alertFilterLabels[alertFilter]}
                </span>
                <button
                  type="button"
                  className="text-xs text-accent-primary hover:text-text-primary transition"
                  onClick={() => setAlertFilter(null)}
                >
                  Сбросить
                </button>
              </div>
            ) : (
              <span className="text-xs text-text-dim">Живые предупреждения по всем потокам</span>
            )}
          </div>
          <Table<AlertRow> isRowClickable onRowClick={(alert) => alert.link?.()} framed={false}>
            <thead>
              <tr>
                <th className="text-left">Тип</th>
                <th className="text-left">Описание</th>
                <th className="text-center">Площадка</th>
                <th className="text-left">Приоритет</th>
                <th className="text-right">Действие</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((alert) => {
                const tone = alert.priority.includes('Крит') ? 'danger' : alert.priority.includes('Проср') ? 'warning' : 'warning';
                return (
                  <TableRow
                    key={`${alert.type}-${alert.id}`}
                    row={alert}
                    className={clsx(tone === 'danger' ? 'bg-status-danger/8' : tone === 'warning' ? 'bg-status-warning/8' : '')}
                  >
                    <td className="pr-4 font-medium text-text-primary">{alert.type}</td>
                    <td className="pr-4 text-text-primary">{alert.description}</td>
                    <td className="pr-4 text-center text-text-muted">{alert.siteId}</td>
                    <td className="pr-4">
                      <StatusPill label={alert.priority} tone={tone} size="sm" />
                    </td>
                    <td className="pr-2 text-right">
                      <CtaButton
                        onClick={(e) => {
                          e.stopPropagation();
                          alert.link?.();
                        }}
                        icon={<ArrowRight aria-hidden />}
                      >
                        Перейти
                      </CtaButton>
                    </td>
                  </TableRow>
                );
              })}
              {filteredAlerts.length === 0 && (
                <tr>
                  <td className="pr-4 text-text-muted" colSpan={5}>
                    Нет предупреждений на сегодня.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </div>

      <div className="grid gap-7 xl:grid-cols-[2fr,1fr] items-start">
        <Card className="xl:col-span-1" title="Обзор надёжности и нагрузки сети ЦОД" subtitle="Сигналы SLA и эксплуатационных рисков">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-[10px] border border-border-subtle bg-bg-surface/80 p-4">
              <span className="text-xs uppercase tracking-[0.12em] text-text-dim">Uptime</span>
              <span className="text-2xl font-semibold text-text-primary">{networkUptime.toFixed(2)}%</span>
              <p className="text-[13px] text-text-muted leading-snug">Средний SLA по площадкам</p>
            </div>
            <div className="flex flex-col gap-2 rounded-[10px] border border-border-subtle bg-bg-surface/80 p-4">
              <span className="text-xs uppercase tracking-[0.12em] text-text-dim">Ops load</span>
              <span className="text-2xl font-semibold text-text-primary">{avgOpsLoad.toFixed(1)} / 100</span>
              <p className="text-[13px] text-text-muted leading-snug">Загрузка смен и команд</p>
            </div>
            <div className="flex flex-col gap-2 rounded-[10px] border border-border-subtle bg-bg-surface/80 p-4">
              <span className="text-xs uppercase tracking-[0.12em] text-text-dim">Статус сети</span>
              <StatusPill label={networkStatusText.replace('Сеть в целом: ', '')} tone={networkTone} />
              <p className="text-[13px] text-text-muted leading-snug">Контроль нагрузки и рисков</p>
            </div>
          </div>
        </Card>

        <Card title={`${strings.dashboard.worstSites} (Reliability)`} subtitle="Площадки, требующие внимания">
          <Table framed={false}>
            <thead>
              <tr>
                <th className="text-left">Площадка</th>
                <th className="text-center">Регион</th>
                <th className="text-right">Reliability</th>
                <th className="text-right">Статус</th>
              </tr>
            </thead>
            <tbody>
              {worstSites.map((site) => (
                <tr key={site.id}>
                  <td className="pr-4">
                    <div className="font-medium text-text-primary">{site.name}</div>
                  </td>
                  <td className="text-center text-text-muted">{site.region}</td>
                  <td className="text-right font-semibold">{site.reliability.toFixed(1)}</td>
                  <td className="text-right">
                    <StatusPill label={getStatusLabel(site.status)} tone={getStatusTone(site.status)} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>

      <div className="grid gap-7 xl:grid-cols-[2fr,1fr] items-start">
        <Card className="xl:col-span-1" title="Состояние сети" subtitle="Uptime по площадкам">
          <div className="h-80 bg-bg-surfaceMuted/50 rounded-[12px] border border-border-subtle p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#b6c1d3', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} />
                <YAxis tick={{ fill: '#b6c1d3', fontSize: 12 }} domain={[90, 100]} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} />
                <Tooltip
                  contentStyle={{
                    background: '#0c1119',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    color: '#dde7f5',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.28)'
                  }}
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                />
                <Bar dataKey="uptime" fill="#4fb7ad" stroke="#4fb7ad" strokeWidth={1} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Быстрый переход по ролям" subtitle="Навигация по ключевым потокам" className="bg-bg-surface/85">
          <div className="grid grid-cols-1 gap-3">
            {roleShortcuts.map((role) => (
              <div key={role.title} className="flex items-center justify-between rounded-[12px] border border-border-subtle bg-bg-surfaceMuted/60 px-4 py-3">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-text-primary">{role.title}</div>
                  <p className="text-xs text-text-muted">{role.metric}</p>
                </div>
                <CtaLink to={role.to} icon={<ArrowRight />} size="lg" className="shrink-0">
                  Перейти
                </CtaLink>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {withScores.map((site) => (
          <Card key={site.id} interactive>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="text-lg font-semibold text-text-primary">{site.name}</div>
                <div className="text-sm text-text-muted">{site.region}</div>
              </div>
              <StatusPill label={getStatusLabel(site.status)} tone={getStatusTone(site.status)} />
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
