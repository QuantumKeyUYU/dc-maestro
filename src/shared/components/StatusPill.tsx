import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export function StatusPill({ label, tone = 'neutral' }: StatusPillProps) {
  const toneClass = {
    neutral: 'bg-gray-800 text-gray-200 border-gray-700',
    success: 'bg-success/15 text-success border-success/50',
    warning: 'bg-warning/20 text-warning border-warning/60',
    danger: 'bg-danger/20 text-danger border-danger/50',
    info: 'bg-primary/15 text-primary border-primary/40'
  }[tone];

  return (
    <span className={clsx('px-3 py-1 rounded-full text-xs font-semibold border shadow-sm', toneClass)}>
      {label}
    </span>
  );
}
