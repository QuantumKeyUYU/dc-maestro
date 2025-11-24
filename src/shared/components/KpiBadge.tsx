import clsx from 'clsx';

interface KpiBadgeProps {
  label: string;
  value: string | number;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export function KpiBadge({ label, value, tone = 'neutral' }: KpiBadgeProps) {
  const toneClass = {
    neutral: 'bg-gray-800 text-gray-100 border-gray-700',
    success: 'bg-green-900/50 text-green-200 border-green-700',
    warning: 'bg-amber-900/40 text-amber-200 border-amber-700',
    danger: 'bg-red-900/50 text-red-100 border-red-700',
    info: 'bg-sky-900/40 text-sky-100 border-sky-700'
  }[tone];

  return (
    <div className={clsx('rounded-lg border px-3 py-2 flex flex-col gap-1', toneClass)}>
      <span className="text-xs uppercase tracking-wide text-gray-400">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
}
