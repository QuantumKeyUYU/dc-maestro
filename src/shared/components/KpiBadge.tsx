import clsx from 'clsx';

interface KpiBadgeProps {
  label: string;
  value: string | number;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export function KpiBadge({ label, value, tone = 'neutral' }: KpiBadgeProps) {
  const toneClass = {
    neutral: 'from-bg-surface to-bg-surfaceSoft text-text-primary border-border-subtle',
    success: 'from-status-success/20 to-status-success/10 text-status-success border-status-success/40',
    warning: 'from-status-warning/20 to-status-warning/10 text-status-warning border-status-warning/40',
    danger: 'from-status-danger/25 to-status-danger/10 text-status-danger border-status-danger/40',
    info: 'from-status-info/20 to-status-info/10 text-status-info border-status-info/40'
  }[tone];

  return (
    <div
      className={clsx(
        'rounded-2xl border px-4 py-3 flex flex-col gap-1 shadow-inner bg-gradient-to-br transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lifted',
        toneClass
      )}
    >
      <span className="text-[11px] uppercase tracking-wide text-text-dim">{label}</span>
      <span className="text-2xl font-semibold leading-tight">{value}</span>
    </div>
  );
}
