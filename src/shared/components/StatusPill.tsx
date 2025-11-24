import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'md' | 'sm';
}

export function StatusPill({ label, tone = 'neutral', size = 'md' }: StatusPillProps) {
  const toneClass = {
    neutral: 'bg-status-neutral/18 text-text-primary border-status-neutral/40',
    success: 'bg-status-ok/18 text-[#b9e2d6] border-status-ok/45',
    warning: 'bg-status-warning/18 text-[#e2c68f] border-status-warning/45',
    danger: 'bg-status-danger/18 text-[#e9c0c5] border-status-danger/45',
    info: 'bg-accent-muted/18 text-[#c7d6f6] border-accent-muted/40'
  }[tone];

  const sizeClass = size === 'sm' ? 'px-3 py-[7px] text-[12px]' : 'px-3.5 py-2 text-[13px]';

  return (
    <span
      className={clsx(
        'rounded-full font-medium border transition inline-flex items-center gap-2 tracking-tight',
        sizeClass,
        toneClass
      )}
    >
      {label}
    </span>
  );
}
