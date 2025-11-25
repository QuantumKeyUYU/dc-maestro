import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  variant?: 'neutral' | 'ok' | 'warn' | 'danger';
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'md' | 'sm';
}

export function StatusPill({ label, tone = 'neutral', variant, size = 'md' }: StatusPillProps) {
  const base = 'inline-flex items-center rounded-full text-xs font-medium border backdrop-blur-sm';

  const variants = {
    ok: 'bg-[rgba(39,196,143,0.12)] text-[#27C48F] border-[#27C48F]/40',
    warn: 'bg-[rgba(217,166,58,0.14)] text-[#D9A63A] border-[#D9A63A]/40',
    danger: 'bg-[rgba(201,74,74,0.16)] text-[#C94A4A] border-[#C94A4A]/40',
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

  const sizeClass = size === 'sm' ? 'px-2.5 py-[5px] text-[11px]' : 'px-3.5 py-1.5 text-[13px]';

  return (
    <span className={clsx(base, variants[resolvedVariant], sizeClass)}>
      {label}
    </span>
  );
}
