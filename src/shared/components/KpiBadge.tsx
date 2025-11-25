import clsx from 'clsx';
import { Card } from './Card';

interface KpiBadgeProps {
  label: string;
  value: string | number;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  helperText?: string;
}

const toneSurface: Record<NonNullable<KpiBadgeProps['tone']>, string> = {
  neutral: 'border-white/5 bg-ink-900/90',
  success: 'border-status-ok/30 bg-status-ok/5',
  warning: 'border-status-warn/30 bg-status-warn/6',
  danger: 'border-status-danger/30 bg-status-danger/6',
  info: 'border-accent/25 bg-accent-soft/30'
};

const toneValue: Record<NonNullable<KpiBadgeProps['tone']>, string> = {
  neutral: 'text-neutral-100',
  success: 'text-status-ok',
  warning: 'text-status-warn',
  danger: 'text-status-danger',
  info: 'text-accent'
};

export function KpiBadge({ label, value, tone = 'neutral', helperText }: KpiBadgeProps) {
  return (
    <Card
      className={clsx(
        'inline-flex min-w-[180px] flex-col gap-2 px-5 py-4 transition-all hover:-translate-y-[2px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)]',
        toneSurface[tone]
      )}
    >
      <div className="flex flex-col gap-1 leading-tight">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">{label}</span>
        <span className={clsx('text-3xl font-semibold tracking-tight', toneValue[tone])}>{value}</span>
        {helperText ? <span className="text-xs text-neutral-400">{helperText}</span> : null}
      </div>
    </Card>
  );
}
