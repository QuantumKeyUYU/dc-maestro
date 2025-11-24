import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'md' | 'sm';
}

export function StatusPill({ label, tone = 'neutral', size = 'md' }: StatusPillProps) {
  const toneClass = {
    neutral: 'bg-status-neutral/15 text-text-primary border-status-neutral/35',
    success: 'bg-status-ok/15 text-[#a9d6cc] border-status-ok/40',
    warning: 'bg-status-warning/18 text-[#e3c489] border-status-warning/45',
    danger: 'bg-status-danger/18 text-[#f0c2c7] border-status-danger/45',
    info: 'bg-accent-muted/15 text-[#c3d3f5] border-accent-muted/35'
  }[tone];

  const sizeClass = size === 'sm' ? 'px-3 py-1 text-[12px]' : 'px-3.5 py-1.5 text-[13px]';

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
