import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'md' | 'sm';
}

export function StatusPill({ label, tone = 'neutral', size = 'md' }: StatusPillProps) {
  const toneClass = {
    neutral: 'bg-white/5 text-text-primary border-white/15',
    success: 'bg-status-ok/10 text-status-ok border-status-ok/30',
    warning: 'bg-status-warn/10 text-status-warn border-status-warn/30',
    danger: 'bg-status-danger/10 text-status-danger border-status-danger/30',
    info: 'bg-accent-azure/10 text-accent-azure border-accent-azure/30'
  }[tone];

  const sizeClass = size === 'sm' ? 'px-3 py-1 text-xs' : 'px-3.5 py-1.5 text-[13px]';

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border text-xs font-medium tracking-tight transition bg-opacity-10 text-opacity-90 border-opacity-30',
        sizeClass,
        toneClass
      )}
    >
      {label}
    </span>
  );
}
