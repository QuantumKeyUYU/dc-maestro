import clsx from 'clsx';

interface KpiBadgeProps {
  label: string;
  value: string | number;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export function KpiBadge({ label, value, tone = 'neutral' }: KpiBadgeProps) {
  const toneClass = {
    neutral: 'text-text-primary border-border-subtle/80 bg-bg-surface/80',
    success: 'text-[#a9d6cc] border-status-ok/45 bg-status-ok/10',
    warning: 'text-[#e3c489] border-status-warning/45 bg-status-warning/12',
    danger: 'text-[#f0c2c7] border-status-danger/45 bg-status-danger/12',
    info: 'text-[#c3d3f5] border-accent-muted/45 bg-accent-muted/10'
  }[tone];

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-full border px-4 py-2 inline-flex items-center gap-3 shadow-[0_6px_16px_rgba(0,0,0,0.26)] backdrop-blur-sm transition-colors duration-150',
        toneClass
      )}
    >
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-[11px] uppercase tracking-wide text-text-dim">
        •
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] uppercase tracking-wide text-text-dim">{label}</span>
        <span className="text-lg font-semibold leading-tight">{value}</span>
      </div>
    </div>
  );
}
