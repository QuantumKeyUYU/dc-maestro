import clsx from 'clsx';

interface KpiBadgeProps {
  label: string;
  value: string | number;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export function KpiBadge({ label, value, tone = 'neutral' }: KpiBadgeProps) {
  const toneClass = {
    neutral: 'text-text-primary border-border-subtle bg-bg-surfaceMuted/80',
    success: 'text-[#c9e7d7] border-status-ok/35 bg-status-ok/10',
    warning: 'text-[#edd7ad] border-status-warning/35 bg-status-warning/10',
    danger: 'text-[#edc7cb] border-status-danger/35 bg-status-danger/10',
    info: 'text-[#d5e0f8] border-accent-muted/35 bg-accent-muted/10'
  }[tone];

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-[8px] border px-3.5 py-2 inline-flex items-center gap-3 transition-colors duration-150 bg-bg-surfaceSoft',
        toneClass
      )}
    >
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-medium tracking-[0.08em] text-text-dim uppercase">{label}</span>
        <span className="text-base font-semibold leading-tight">{value}</span>
      </div>
    </div>
  );
}
