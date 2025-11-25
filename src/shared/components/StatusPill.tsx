import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  variant?: 'neutral' | 'ok' | 'warn' | 'danger';
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'md' | 'sm';
}

export function StatusPill({ label, tone = 'neutral', variant, size = 'md' }: StatusPillProps) {
  const base =
    'inline-flex items-center rounded-full border font-medium text-[12px] leading-none bg-white/5 text-text-primary border-border-soft shadow-[0_8px_22px_rgba(0,0,0,0.35)]';

  const variants = {
    ok: 'bg-emerald-500/15 text-emerald-100 border-emerald-400/50',
    warn: 'bg-amber-400/15 text-amber-100 border-amber-300/50',
    danger: 'bg-rose-500/15 text-rose-100 border-rose-400/50',
    neutral: 'bg-white/5 text-text-primary border-border-soft'
  } as const;

  const toneToVariant: Record<NonNullable<StatusPillProps['tone']>, keyof typeof variants> = {
    success: 'ok',
    warning: 'warn',
    danger: 'danger',
    info: 'warn',
    neutral: 'neutral'
  };

  const resolvedVariant: keyof typeof variants = variant ?? toneToVariant[tone];

  const sizeClass = size === 'sm' ? 'h-6 px-2.5 text-[11px]' : 'h-7 px-3.5';

  return (
    <span className={clsx(base, variants[resolvedVariant], sizeClass)}>
      {label}
    </span>
  );
}
