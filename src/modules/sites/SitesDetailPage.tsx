import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../shared/components/Card';
import { SectionHeader } from '../../shared/components/SectionHeader';
import { sites } from '../../shared/data/sites';
import { incidents } from '../../shared/data/incidents';
import { assets } from '../../shared/data/assets';
import { workOrders } from '../../shared/data/workOrders';
import { financialRecords } from '../../shared/data/financialRecords';
import { capacityLoadIndex, reliabilityScore, siteFinancialHealth, uptimePercent } from '../../shared/lib/kpi';
import { StatusPill } from '../../shared/components/StatusPill';
import { Table } from '../../shared/components/Table';
import { KpiBadge } from '../../shared/components/KpiBadge';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { InfoTooltip } from '../../shared/components/InfoTooltip';
import { strings } from '../../shared/lib/strings';
import { getStatusLabel, getStatusTone } from '../../shared/lib/status';

const CAPACITY_COLORS = ['#4fb7ad', '#506684'];
const FINANCE_COLORS = ['#2f8f76', '#c4833a', '#7f6fb8', '#b27c34', '#a65862'];

type TabKey = 'overview' | 'incidents' | 'maintenance' | 'finance';

export function SitesDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const site = sites.find((s) => s.id === id) ?? sites[0];
  const [tab, setTab] = useState<TabKey>('overview');

  const siteIncidents = useMemo(
    () => incidents.filter((i) => i.siteId === site.id).sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime()),
    [site.id]
  );
  const siteAssets = useMemo(() => assets.filter((a) => a.siteId === site.id), [site.id]);
  const siteWorkOrders = useMemo(() => workOrders.filter((wo) => wo.siteId === site.id), [site.id]);
  const siteFinances = useMemo(() => financialRecords.filter((r) => r.siteId === site.id), [site.id]);

  const opexTotal = siteFinances.filter((r) => r.type === 'opex').reduce((sum, r) => sum + r.amountRub, 0);
  const capexTotal = siteFinances.filter((r) => r.type === 'capex').reduce((sum, r) => sum + r.amountRub, 0);
  const opexByCategory = Object.entries(
    siteFinances.filter((r) => r.type === 'opex').reduce<Record<string, number>>((acc, record) => {
      acc[record.category] = (acc[record.category] ?? 0) + record.amountRub;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const capacityData = [
    { name: 'Использовано', value: site.usedCapacityKw },
    { name: 'Свободно', value: Math.max(site.totalCapacityKw - site.usedCapacityKw, 0) }
  ];

  const energyBars = [
    { name: 'Мощность', value: (site.usedCapacityKw / site.totalCapacityKw) * 100 },
    { name: 'Стойки', value: (site.usedRacks / site.totalRacks) * 100 }
  ];

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'overview', label: strings.sites.overviewTab },
    { key: 'incidents', label: strings.sites.incidentsTab },
    { key: 'maintenance', label: strings.sites.maintenanceTab },
    { key: 'finance', label: strings.sites.financeTab }
  ];

  const financialHealth = siteFinancialHealth(site, siteFinances);

  return (
    <div className="space-y-8">
      <div className="text-sm text-text-muted flex items-center gap-2">
        <button
          onClick={() => navigate('/sites')}
          className="hover:text-accent-azure transition inline-flex items-center gap-1"
        >
          Площадки ЦОД
        </button>
        <span className="text-text-muted">/</span>
        <span className="text-text-primary">{site.name}</span>
      </div>
      <SectionHeader
        title={`${site.name}: детализация`}
        subtitle="Полный контекст по площадке: инциденты, активы, финансы"
        action={
          <button
            onClick={() => navigate('/sites')}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary hover:border-accent-azure/60 backdrop-blur"
          >
            ← Назад к списку
          </button>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold text-white drop-shadow-sm">{site.name}</div>
            <div className="text-sm text-text-secondary">{site.region}</div>
          </div>
          <StatusPill label={getStatusLabel(site.status)} tone={getStatusTone(site.status)} />
        </div>
        <div className="flex gap-3 mt-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-xl text-sm border transition backdrop-blur ${
                tab === t.key
                  ? 'border-accent-azure/60 bg-accent-azure/10 text-white shadow-glow'
                  : 'border-white/10 bg-white/5 text-text-secondary hover:border-accent-azure/40'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      {tab === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <InfoTooltip label="Доступность за период мониторинга">
                <KpiBadge label="Uptime" value={`${uptimePercent(site).toFixed(2)}%`} tone="info" />
              </InfoTooltip>
              <InfoTooltip label="Индекс надёжности: аптайм + скорость восстановления">
                <KpiBadge label="Reliability" value={reliabilityScore(site).toFixed(1)} tone="success" />
              </InfoTooltip>
              <InfoTooltip label="Загрузка мощностей: энергопотребление и стойки">
                <KpiBadge label="Capacity" value={`${capacityLoadIndex(site).toFixed(1)}%`} tone="warning" />
              </InfoTooltip>
              <InfoTooltip label="Финансовое здоровье по OPEX и доле энергии">
                <KpiBadge label="Financial" value={`${financialHealth.toFixed(1)}%`} tone="neutral" />
              </InfoTooltip>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card title="Нагрузка на мощность" className="bg-white/5">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie dataKey="value" data={capacityData} innerRadius={50} outerRadius={90} paddingAngle={3}>
                        {capacityData.map((entry, index) => (
                          <Cell key={entry.name} fill={CAPACITY_COLORS[index % CAPACITY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#0f1828', border: '1px solid rgba(62,236,226,0.3)', borderRadius: 12, color: '#e5eaf3' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card title="Загрузка по подсистемам" className="bg-white/5">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={energyBars}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" tick={{ fill: '#c7d2e9', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} />
                      <YAxis tick={{ fill: '#c7d2e9', fontSize: 12 }} domain={[0, 100]} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} />
                      <Tooltip contentStyle={{ background: '#0f1828', border: '1px solid rgba(62,236,226,0.3)', borderRadius: 12, color: '#e5eaf3' }} cursor={{ fill: 'rgba(62,236,226,0.06)' }} />
                      <Bar dataKey="value" fill="#7c8cfb" stroke="#5f6ed8" strokeWidth={1.5} radius={[10, 10, 6, 6]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-100">
              <Card className="bg-white/5" title="Кратко о площадке" subtitle="Основные параметры">
                <ul className="space-y-2 text-neutral-400">
                  <li>Регион: {site.region}</li>
                  <li>Всего стоек: {site.totalRacks}, использовано: {site.usedRacks}</li>
                  <li>Мощность: {site.usedCapacityKw} / {site.totalCapacityKw} кВт</li>
                  <li>Энергия за период: {site.energyConsumedKwh.toLocaleString('ru-RU')} кВт·ч</li>
                </ul>
              </Card>
            </div>
          </Card>
          <Card title="Инциденты по площадке">
            <div className="space-y-3">
              {siteIncidents.slice(0, 4).map((incident) => (
                <div key={incident.id} className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-neutral-100">{incident.category}</div>
                    <StatusPill
                      label={incident.severity === 'critical' ? 'Критично' : incident.severity === 'major' ? 'Важно' : 'Минор'}
                      tone={incident.severity === 'critical' ? 'danger' : incident.severity === 'major' ? 'warning' : 'info'}
                    />
                  </div>
                  <p className="text-sm text-neutral-400 mt-1">{incident.description}</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {new Date(incident.startedAt).toLocaleString('ru-RU')}
                    {incident.resolvedAt ? ` → ${new Date(incident.resolvedAt).toLocaleString('ru-RU')}` : ' (в работе)'}
                  </p>
                </div>
              ))}
              {siteIncidents.length === 0 && <p className="text-sm text-neutral-400">Нет инцидентов.</p>}
            </div>
          </Card>
        </div>
      )}

      {tab === 'incidents' && (
        <Card title="Инциденты">
          <Table framed={false}>
            <thead className="text-xs uppercase text-neutral-400">
              <tr>
                <th className="text-left py-2">Категория</th>
                <th className="text-left py-2">Описание</th>
                <th className="text-left py-2">Начало</th>
                <th className="text-left py-2">Статус</th>
              </tr>
            </thead>
            <tbody>
              {siteIncidents.map((incident) => (
                <tr key={incident.id} className="border-t border-white/5">
                  <td className="py-2 pr-4">{incident.category}</td>
                  <td className="py-2 pr-4 text-neutral-400">{incident.description}</td>
                  <td className="py-2 pr-4">{new Date(incident.startedAt).toLocaleString('ru-RU')}</td>
                  <td className="py-2 pr-4">
                    <StatusPill
                      label={incident.resolvedAt ? 'Закрыто' : 'В работе'}
                      tone={incident.resolvedAt ? 'success' : 'warning'}
                    />
                  </td>
                </tr>
              ))}
              {siteIncidents.length === 0 && (
                <tr>
                  <td className="py-2 pr-4 text-neutral-400" colSpan={4}>
                    Нет инцидентов.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      )}

      {tab === 'maintenance' && (
        <div className="space-y-5">
          <Card title="Активы">
            <Table framed={false}>
              <thead className="text-xs uppercase text-neutral-400">
                <tr>
                  <th className="text-left py-2">Название</th>
                  <th className="text-left py-2">Тип</th>
                  <th className="text-left py-2">Критичность</th>
                  <th className="text-left py-2">Следующее ТО</th>
                </tr>
              </thead>
              <tbody>
                {siteAssets.map((asset) => (
                  <tr key={asset.id} className="border-t border-white/5">
                    <td className="py-2 pr-4">{asset.name}</td>
                    <td className="py-2 pr-4 text-neutral-400">{asset.type}</td>
                    <td className="py-2 pr-4">{asset.criticality}</td>
                    <td className="py-2 pr-4 text-neutral-400">
                      {asset.nextPlannedMaintenanceDate
                        ? new Date(asset.nextPlannedMaintenanceDate).toLocaleDateString('ru-RU')
                        : '—'}
                    </td>
                  </tr>
                ))}
                {siteAssets.length === 0 && (
                  <tr>
                    <td className="py-2 pr-4 text-neutral-400" colSpan={4}>
                      Нет активов для этой площадки.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>

          <Card title="Заявки на ТО">
            <Table framed={false}>
              <thead className="text-xs uppercase text-neutral-400">
                <tr>
                  <th className="text-left py-2">ID</th>
                  <th className="text-left py-2">Тип</th>
                  <th className="text-left py-2">Статус</th>
                  <th className="text-left py-2">Приоритет</th>
                  <th className="text-left py-2">Дедлайн</th>
                </tr>
              </thead>
              <tbody>
                {siteWorkOrders.map((wo) => {
                  const isOverdue = wo.dueDate && wo.status !== 'done' && wo.dueDate < new Date();
                  return (
                    <tr key={wo.id} className={`border-t border-white/5 ${isOverdue ? 'bg-danger/10' : ''}`}>
                      <td className="py-2 pr-4">{wo.id}</td>
                      <td className="py-2 pr-4 text-neutral-400">{wo.type}</td>
                      <td className="py-2 pr-4">
                        <StatusPill
                          label={wo.status === 'done' ? 'Завершено' : wo.status === 'in_progress' ? 'В работе' : 'Открыто'}
                          tone={
                            wo.status === 'done' ? 'success' : wo.status === 'in_progress' ? 'info' : isOverdue ? 'danger' : 'warning'
                          }
                        />
                      </td>
                      <td className="py-2 pr-4">{wo.priority}</td>
                      <td className="py-2 pr-4 text-neutral-400">
                        {wo.dueDate ? new Date(wo.dueDate).toLocaleDateString('ru-RU') : '—'}
                      </td>
                    </tr>
                  );
                })}
                {siteWorkOrders.length === 0 && (
                  <tr>
                    <td className="py-2 pr-4 text-neutral-400" colSpan={5}>
                      Нет заявок.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </div>
      )}

      {tab === 'finance' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <Card className="xl:col-span-2" title="Финансовые записи">
            <Table framed={false}>
              <thead className="text-xs uppercase text-neutral-400">
                <tr>
                  <th className="text-left py-2">Дата</th>
                  <th className="text-left py-2">Тип</th>
                  <th className="text-left py-2">Категория</th>
                  <th className="text-left py-2">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {siteFinances.map((record) => (
                  <tr key={record.id} className="border-t border-white/5">
                    <td className="py-2 pr-4">{new Date(record.date).toLocaleDateString('ru-RU')}</td>
                    <td className="py-2 pr-4 text-neutral-400">{record.type.toUpperCase()}</td>
                    <td className="py-2 pr-4 text-neutral-400">{record.category}</td>
                    <td className="py-2 pr-4">{record.amountRub.toLocaleString('ru-RU')} ₽</td>
                  </tr>
                ))}
                {siteFinances.length === 0 && (
                  <tr>
                    <td className="py-2 pr-4 text-neutral-400" colSpan={4}>
                      Финансовые записи отсутствуют.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
          <Card title="Сводка по OPEX/CAPEX">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 text-sm">OPEX за период</span>
                <span className="text-lg font-semibold">{opexTotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 text-sm">CAPEX за период</span>
                <span className="text-lg font-semibold">{capexTotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie dataKey="value" data={opexByCategory} cx="50%" cy="50%" outerRadius={90} label>
                      {opexByCategory.map((entry, index) => (
                        <Cell key={entry.name} fill={FINANCE_COLORS[index % FINANCE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0f1828', border: '1px solid rgba(62,236,226,0.3)', borderRadius: 12, color: '#e5eaf3' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
