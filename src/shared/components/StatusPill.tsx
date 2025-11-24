import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'md' | 'sm';
}

export function StatusPill({ label, tone = 'neutral', size = 'md' }: StatusPillProps) {
  const toneClass = {
    neutral: 'bg-status-neutral/12 text-text-primary border-status-neutral/35',
    success: 'bg-status-ok/12 text-[#c9e7d7] border-status-ok/35',
    warning: 'bg-status-warning/12 text-[#edd7ad] border-status-warning/40',
    danger: 'bg-status-danger/12 text-[#edc7cb] border-status-danger/40',
    info: 'bg-accent-muted/12 text-[#d5e0f8] border-accent-muted/35'
  }[tone];

  const sizeClass = size === 'sm' ? 'px-3 h-7 text-[12px]' : 'px-3.5 h-8 text-[13px]';

  return (
    <span
      className={clsx(
        'rounded-[6px] font-medium border transition inline-flex items-center gap-2 tracking-tight',
        sizeClass,
        toneClass
      )}
    >
      {label}
    </span>
  );
}
