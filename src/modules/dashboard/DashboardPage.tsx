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

  const networkVariant = networkTone === 'success' ? 'ok' : networkTone === 'warning' ? 'warn' : 'danger';

  const osiTone = osi.category === 'critical' ? 'danger' : osi.category === 'watch' ? 'warning' : 'success';
  const osiState = osi.category === 'critical' ? 'Критично' : osi.category === 'watch' ? 'Повышенная нагрузка' : 'Стабильно';
  const osiVariant = osiTone === 'success' ? 'ok' : osiTone === 'warning' ? 'warn' : 'danger';
  const osiDescriptor =
    osiTone === 'danger'
      ? 'Критический диапазон — требуется немедленная реакция'
      : osiTone === 'warning'
        ? 'Повышенная нагрузка — усиливаем контроль'
        : 'Стабильная зона — поддерживаем тренд';

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

  type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

  type MetricCard = { label: string; value: string | number; tone?: StatusTone; helperText?: string; onClick?: () => void };

  const metricCards: MetricCard[] = [
    { label: 'Средний uptime', value: `${networkUptime.toFixed(2)}%`, tone: 'success', helperText: 'SLA по площадкам' },
    { label: 'Ops load index', value: `${avgOpsLoad.toFixed(1)} / 100`, tone: avgOpsLoad > 60 ? 'warning' : 'info', helperText: 'Загрузка смен' },
    {
      label: 'Позиции на минимуме',
      value: inventoryItems.filter((item) => item.quantityOnHand <= item.minThreshold).length,
      tone: 'warning',
      helperText: 'Склад'
    },
    {
      label: 'Просроченная безопасность',
      value: safetyEvents.filter((e) => e.status === 'overdue').length,
      tone: 'danger',
      helperText: 'События'
    },
    ...summaryCards
      .slice(0, 4)
      .map((card) => ({ label: card.label, value: card.value, tone: card.tone, helperText: 'См. детали', onClick: card.onClick }))
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
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.6fr,1fr] items-stretch">
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-[0.16em] text-text-muted">Обзор состояния сети</div>
            <StatusPill variant={networkVariant} label={networkStatusText.replace('Сеть в целом: ', '')} />
          </div>
          <p className="text-sm text-text-secondary max-w-2xl">
            Ключевые сигналы по отказоустойчивости, загрузке и операционным рискам.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-text-secondary">
            <span>Средний uptime: {networkUptime.toFixed(2)}%</span>
            <span className="text-text-muted">•</span>
            <span>Ops load: {avgOpsLoad.toFixed(1)} / 100</span>
            <span className="text-text-muted">•</span>
            <span>OSI: {osi.value.toFixed(1)}</span>
          </div>
        </Card>
        <InfoTooltip label={`Operational Strain Index · ${osiDescriptor}`} triggerArea="container" className="h-full">
          <Card className="h-full flex flex-col gap-3 bg-base-panelSoft">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-[0.14em] text-text-muted">OSI</div>
                <div className="text-[34px] font-semibold leading-none text-text-primary">{osi.value.toFixed(1)}</div>
                <div className="text-sm text-text-secondary">Operational Strain Index</div>
              </div>
              <StatusPill label={osiState} variant={osiVariant} size="sm" />
            </div>
            <div className="text-sm text-text-secondary leading-relaxed">{osiDescriptor}</div>
          </Card>
        </InfoTooltip>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric, idx) => (
          <button
            key={`${metric.label}-${idx}`}
            type="button"
            onClick={metric.onClick}
            className={clsx('text-left focus:outline-none h-full', metric.onClick && 'group')}
          >
            <div
              className={clsx(
                'rounded-card border border-border-soft bg-base-panel px-5 py-5 shadow-elevation-card transition-transform h-full backdrop-blur-2xl',
                metric.onClick && 'group-hover:scale-[1.01]'
              )}
            >
              <div className="space-y-3">
                <div className="text-[11px] uppercase tracking-[0.16em] text-text-muted">{metric.label}</div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[30px] font-semibold text-text-primary leading-tight">{metric.value}</div>
                  <StatusPill
                    label={metric.value === 0 ? 'Норма' : 'Внимание'}
                    variant={
                      metric.tone === 'danger'
                        ? 'danger'
                        : metric.tone === 'warning'
                          ? 'warn'
                          : metric.tone === 'success'
                            ? 'ok'
                            : 'neutral'
                    }
                    size="sm"
                  />
                </div>
                {metric.helperText ? <div className="text-sm text-text-secondary">{metric.helperText}</div> : null}
                <div className="mt-1 h-[2px] w-10 rounded-full bg-border-soft" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr,1fr] items-start" ref={warningsRef}>
        <Card title="Текущие предупреждения" subtitle="Инциденты, ТО, склад и безопасность" className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            {alertFilter ? (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white border border-white/20 backdrop-blur-[14px]">
                  {alertFilterLabels[alertFilter]}
                </span>
                <button
                  type="button"
                  className="text-xs text-accent-primary hover:text-white transition"
                  onClick={() => setAlertFilter(null)}
                >
                  Сбросить
                </button>
              </div>
            ) : (
              <span className="text-xs text-text-muted">Живые предупреждения по всем потокам</span>
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
                    className="border-b border-white/6"
                  >
                    <td className="pr-4 font-medium text-white">{alert.type}</td>
                    <td className="pr-4 text-text-primary">{alert.description}</td>
                    <td className="pr-4 text-center text-text-secondary">{alert.siteId}</td>
                    <td className="pr-4">
                      <StatusPill
                        label={alert.priority}
                        variant={tone === 'danger' ? 'danger' : tone === 'warning' ? 'warn' : 'neutral'}
                        size="sm"
                      />
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
                  <td className="pr-4 text-text-secondary" colSpan={5}>
                    Нет предупреждений на сегодня.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
        <Card className="flex flex-col gap-4" title="Риски и акценты" subtitle="Обновляется по данным за сутки">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <KpiBadge label="Площадок вне нормы" value={problemSites} helperText="Контроль SLA и инженерии" tone={problemSites === 0 ? 'neutral' : 'warn'} />
            <KpiBadge label="Просроченные заявки ТО" value={overdueWorkOrders} helperText="Оперативное реагирование" tone={overdueWorkOrders === 0 ? 'neutral' : 'warn'} />
            <KpiBadge label="Критические инциденты" value={incidents.filter((i) => i.severity === 'critical' && !i.resolvedAt).length} helperText="Live incidents" tone={incidents.some((i) => i.severity === 'critical' && !i.resolvedAt) ? 'danger' : 'neutral'} />
            <KpiBadge label="Месячный OPEX" value={`₽${monthlyOpex.toLocaleString('ru-RU')}`} helperText="Последние 30 дней" />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr,1fr] items-start">
        <Card className="xl:col-span-1" title="Состояние сети" subtitle="Uptime по площадкам">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.68)', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.35)' }} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.68)', fontSize: 12 }} domain={[90, 100]} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.35)' }} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(7,11,17,0.96)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    borderRadius: 14,
                    color: 'rgba(255,255,255,0.94)',
                    boxShadow: '0 18px 48px rgba(0,0,0,0.55)'
                  }}
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                />
                <Bar
                  dataKey="uptime"
                  fill="url(#uptimeGradient)"
                  stroke="#4FB4FF"
                  strokeWidth={1.6}
                  radius={[10, 10, 6, 6]}
                />
                <defs>
                  <linearGradient id="uptimeGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8CD1FF" />
                    <stop offset="100%" stopColor="#4FB4FF" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
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
                    <div className="font-medium text-white">{site.name}</div>
                  </td>
                  <td className="text-center text-text-secondary">{site.region}</td>
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

      <div className="grid gap-6 xl:grid-cols-[2fr,1fr] items-start">
        <Card title="Быстрый переход по ролям" subtitle="Навигация по ключевым потокам">
          <div className="grid grid-cols-1 gap-4">
            {roleShortcuts.map((role) => (
              <div key={role.title} className="flex items-center justify-between rounded-card border border-border-soft bg-base-panelSoft px-5 py-4 shadow-elevation-card">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-white leading-snug max-w-[260px]">{role.title}</div>
                  <p className="text-xs text-text-secondary leading-snug max-w-[360px]">{role.metric}</p>
                </div>
                <CtaLink to={role.to} icon={<ArrowRight />} size="lg" className="shrink-0">
                  Перейти
                </CtaLink>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Площадки" subtitle="Uptime, reliability и capacity">
          <div className="flex flex-col gap-4">
            {withScores.slice(0, 3).map((site) => (
              <div key={site.id} className="flex items-center justify-between rounded-card border border-border-soft bg-base-panelSoft px-5 py-4 shadow-elevation-card gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="text-sm font-semibold text-white leading-tight max-w-[220px]">{site.name}</div>
                  <div className="text-xs text-text-secondary leading-snug">{site.region}</div>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end min-w-[220px]">
                  <StatusPill label={`Uptime ${site.uptime.toFixed(1)}%`} variant="ok" size="sm" />
                  <StatusPill label={`Reliab. ${site.reliability.toFixed(1)}`} variant="ok" size="sm" />
                  <StatusPill label={`Cap ${site.capacity.toFixed(1)}%`} variant="warn" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
