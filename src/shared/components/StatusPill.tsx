import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export function StatusPill({ label, tone = 'neutral' }: StatusPillProps) {
  const toneClass = {
    neutral: 'bg-bg-surfaceSoft text-text-primary border-border-subtle',
    success: 'bg-status-success/15 text-status-success border-status-success/40 shadow-[0_0_0_1px_rgba(52,211,153,0.2)]',
    warning: 'bg-status-warning/15 text-status-warning border-status-warning/50 shadow-[0_0_0_1px_rgba(251,191,36,0.2)]',
    danger: 'bg-status-danger/15 text-status-danger border-status-danger/50 shadow-[0_0_0_1px_rgba(248,113,113,0.25)]',
    info: 'bg-status-info/15 text-status-info border-status-info/40 shadow-[0_0_0_1px_rgba(96,165,250,0.25)]'
  }[tone];

  return (
    <span
      className={clsx(
        'px-3 py-1.5 rounded-full text-xs font-semibold border transition hover:shadow-lifted hover:-translate-y-0.5 inline-flex items-center gap-1',
        toneClass
      )}
    >
      {label}
    </span>
  );
}
