import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  variant?: 'neutral' | 'ok' | 'warn' | 'danger';
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'md' | 'sm';
}

export function StatusPill({ label, tone = 'neutral', variant, size = 'md' }: StatusPillProps) {
  const resolvedVariant = variant ??
    {
      success: 'ok',
      warning: 'warn',
      danger: 'danger',
      info: 'warn',
      neutral: 'neutral'
    }[tone];

  const base = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border backdrop-blur-sm';

  const variants = {
    ok: 'bg-status-ok/10 text-status-ok border-status-ok/40',
    warn: 'bg-status-warn/10 text-status-warn border-status-warn/40',
    danger: 'bg-status-danger/10 text-status-danger border-status-danger/40',
    neutral: 'bg-[rgba(255,255,255,0.03)] text-text-secondary border-white/10'
  } as const;

  const sizeClass = size === 'sm' ? 'px-2.5 py-[5px] text-[11px]' : 'px-3.5 py-1.5 text-[13px]';

  return (
    <span className={clsx(base, variants[resolvedVariant], sizeClass)}>
      {label}
    </span>
  );
}
