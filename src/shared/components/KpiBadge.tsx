import clsx from 'clsx';

interface KpiBadgeProps {
  label: string;
  value: string | number;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export function KpiBadge({ label, value, tone = 'neutral' }: KpiBadgeProps) {
  const toneClass = {
    neutral: 'from-bg-surface/60 to-bg-surfaceSoft/80 text-text-primary border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]',
    success: 'from-status-success/20 to-status-success/5 text-status-success border-status-success/40 shadow-[0_0_0_1px_rgba(52,211,153,0.35)]',
    warning: 'from-status-warning/20 to-status-warning/5 text-status-warning border-status-warning/50 shadow-[0_0_0_1px_rgba(251,191,36,0.35)]',
    danger: 'from-status-danger/25 to-status-danger/10 text-status-danger border-status-danger/50 shadow-[0_0_0_1px_rgba(248,113,113,0.35)]',
    info: 'from-status-info/18 to-status-info/6 text-status-info border-status-info/40 shadow-[0_0_0_1px_rgba(96,165,250,0.32)]'
  }[tone];

  return (
    <div
      className={clsx(
        'rounded-2xl border px-4 py-3 flex flex-col gap-1 shadow-inner bg-gradient-to-br transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lifted animate-chip backdrop-blur',
        toneClass
      )}
    >
      <span className="text-[11px] uppercase tracking-wide text-text-dim">{label}</span>
      <span className="text-2xl font-semibold leading-tight">{value}</span>
    </div>
  );
}
