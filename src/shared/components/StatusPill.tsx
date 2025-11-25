import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  variant?: 'neutral' | 'ok' | 'warn' | 'danger';
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'md' | 'sm';
}

export function StatusPill({ label, tone = 'neutral', variant, size = 'md' }: StatusPillProps) {
  const base =
    'inline-flex items-center rounded-full border backdrop-blur-sm font-medium uppercase tracking-[0.08em] text-[11px]';

  const variants = {
    ok: 'bg-[#27C48F1F] text-[#27C48F] border-[#27C48F]/40',
    warn: 'bg-[#D9A63A1F] text-[#D9A63A] border-[#D9A63A]/40',
    danger: 'bg-[#C94A4A1F] text-[#C94A4A] border-[#C94A4A]/40',
    neutral: 'bg-white/5 text-text-secondary border-white/12'
  } as const;

  const toneToVariant: Record<NonNullable<StatusPillProps['tone']>, keyof typeof variants> = {
    success: 'ok',
    warning: 'warn',
    danger: 'danger',
    info: 'warn',
    neutral: 'neutral'
  };

  const resolvedVariant: keyof typeof variants = variant ?? toneToVariant[tone];

  const sizeClass = size === 'sm' ? 'h-[22px] px-2.5 text-[10px]' : 'h-[24px] px-3 text-[11px]';

  return (
    <span className={clsx(base, variants[resolvedVariant], sizeClass)}>
      {label}
    </span>
  );
}
