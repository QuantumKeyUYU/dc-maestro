import clsx from 'clsx';

interface KpiBadgeProps {
  label: string;
  value: string | number;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export function KpiBadge({ label, value, tone = 'neutral' }: KpiBadgeProps) {
  const toneClass = {
    neutral: 'bg-gray-800 text-gray-100 border-gray-700',
    success: 'bg-success/10 text-success border-success/40',
    warning: 'bg-warning/10 text-warning border-warning/50',
    danger: 'bg-danger/15 text-danger border-danger/50',
    info: 'bg-primary/10 text-primary border-primary/40'
  }[tone];

  return (
    <div className={clsx('rounded-xl border px-3 py-2 flex flex-col gap-1 shadow-inner', toneClass)}>
      <span className="text-[11px] uppercase tracking-wide text-gray-400">{label}</span>
      <span className="text-xl font-semibold leading-tight">{value}</span>
    </div>
  );
}
