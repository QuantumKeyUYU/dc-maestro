import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  variant?: 'neutral' | 'ok' | 'warn' | 'danger';
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'md' | 'sm';
}

export function StatusPill({ label, tone = 'neutral', variant, size = 'md' }: StatusPillProps) {
  const base =
    'inline-flex items-center h-[26px] rounded-full border backdrop-blur-xl font-semibold uppercase tracking-[0.08em] text-[11px] bg-[rgba(255,255,255,0.02)] shadow-[0_12px_32px_rgba(0,0,0,0.35)]';

  const variants = {
    ok: 'text-[rgba(217,255,242,0.95)] border-[rgba(59,216,161,0.65)]',
    warn: 'text-[rgba(255,235,210,0.95)] border-[rgba(242,192,99,0.7)]',
    danger: 'text-[rgba(255,208,214,0.95)] border-[rgba(255,92,103,0.65)]',
    neutral: 'text-white/70 border-white/12'
  } as const;

  const toneToVariant: Record<NonNullable<StatusPillProps['tone']>, keyof typeof variants> = {
    success: 'ok',
    warning: 'warn',
    danger: 'danger',
    info: 'warn',
    neutral: 'neutral'
  };

  const resolvedVariant: keyof typeof variants = variant ?? toneToVariant[tone];

  const sizeClass = size === 'sm' ? 'h-[22px] px-2.5 text-[10px]' : 'px-3';

  return (
    <span className={clsx(base, variants[resolvedVariant], sizeClass)}>
      {label}
    </span>
  );
}
