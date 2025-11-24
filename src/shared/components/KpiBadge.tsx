import clsx from 'clsx';

interface KpiBadgeProps {
  label: string;
  value: string | number;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export function KpiBadge({ label, value, tone = 'neutral' }: KpiBadgeProps) {
  const toneClass = {
    neutral: 'text-text-primary border-border-subtle bg-bg-surface/90',
    success: 'text-[#b9e2d6] border-status-ok/45 bg-status-ok/14',
    warning: 'text-[#e2c68f] border-status-warning/45 bg-status-warning/14',
    danger: 'text-[#e9c0c5] border-status-danger/45 bg-status-danger/14',
    info: 'text-[#c7d6f6] border-accent-muted/45 bg-accent-muted/14'
  }[tone];

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-full border px-4 py-2 inline-flex items-center gap-3 shadow-soft transition-colors duration-150',
        toneClass
      )}
    >
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] uppercase tracking-wide text-text-dim">{label}</span>
        <span className="text-lg font-semibold leading-tight">{value}</span>
      </div>
    </div>
  );
}
