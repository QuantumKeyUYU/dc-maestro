import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export function StatusPill({ label, tone = 'neutral' }: StatusPillProps) {
  const toneClass = {
    neutral: 'bg-gray-800 text-gray-200 border-gray-700',
    success: 'bg-green-900/60 text-green-100 border-green-700',
    warning: 'bg-amber-900/60 text-amber-100 border-amber-700',
    danger: 'bg-red-900/60 text-red-100 border-red-700',
    info: 'bg-sky-900/60 text-sky-100 border-sky-700'
  }[tone];

  return (
    <span className={clsx('px-3 py-1 rounded-full text-xs font-semibold border', toneClass)}>
      {label}
    </span>
  );
}
