import clsx from 'clsx';
import { Card } from './Card';

interface KpiBadgeProps {
  label: string;
  value: string | number;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  helperText?: string;
}

const toneSurface: Record<NonNullable<KpiBadgeProps['tone']>, string> = {
  neutral: 'border-white/5 bg-base-850/80',
  success: 'border-status-ok/30 bg-status-ok/10',
  warning: 'border-status-warn/30 bg-status-warn/10',
  danger: 'border-status-danger/30 bg-status-danger/10',
  info: 'border-accent-azure/30 bg-accent-azure/10'
};

const toneValue: Record<NonNullable<KpiBadgeProps['tone']>, string> = {
  neutral: 'text-white',
  success: 'text-status-ok',
  warning: 'text-status-warn',
  danger: 'text-status-danger',
  info: 'text-accent-azure'
};

export function KpiBadge({ label, value, tone = 'neutral', helperText }: KpiBadgeProps) {
  return (
    <Card
      className={clsx(
        'inline-flex min-w-[180px] flex-col gap-2 px-5 py-4 transition-all hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.55)]',
        toneSurface[tone]
      )}
    >
      <div className="flex flex-col gap-1 leading-tight">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">{label}</span>
        <span className={clsx('text-3xl font-semibold tracking-tight text-white', toneValue[tone])}>{value}</span>
        {helperText ? <span className="text-sm text-text-secondary">{helperText}</span> : null}
      </div>
    </Card>
  );
}
