import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  variant?: 'neutral' | 'ok' | 'warn' | 'danger';
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'md' | 'sm';
}

export function StatusPill({ label, tone = 'neutral', variant, size = 'md' }: StatusPillProps) {
  const base =
    'inline-flex items-center rounded-full border backdrop-blur-[16px] font-semibold uppercase tracking-[0.14em] text-[10px] bg-[rgba(255,255,255,0.06)] shadow-[0_10px_28px_rgba(0,0,0,0.35)]';

  const variants = {
    ok: 'text-status-ok border-status-ok/60',
    warn: 'text-status-warn border-status-warn/60',
    danger: 'text-status-danger border-status-danger/60',
    neutral: 'text-text-secondary border-white/30'
  } as const;

  const toneToVariant: Record<NonNullable<StatusPillProps['tone']>, keyof typeof variants> = {
    success: 'ok',
    warning: 'warn',
    danger: 'danger',
    info: 'warn',
    neutral: 'neutral'
  };

  const resolvedVariant: keyof typeof variants = variant ?? toneToVariant[tone];

  const sizeClass = size === 'sm' ? 'h-[22px] px-3 text-[9px]' : 'h-[26px] px-3.5 text-[10px]';

  return (
    <span className={clsx(base, variants[resolvedVariant], sizeClass)}>
      {label}
    </span>
  );
}
