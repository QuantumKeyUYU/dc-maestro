import clsx from 'clsx';
import { Card } from './Card';

interface KpiBadgeProps {
  label: string;
  value: string | number;
  helperText?: string;
  tone?: 'neutral' | 'ok' | 'warn' | 'danger' | 'success' | 'warning' | 'info';
}

export function KpiBadge({ label, value, helperText, tone = 'neutral' }: KpiBadgeProps) {
  const accentTone =
    tone === 'danger'
      ? 'danger'
      : tone === 'warn' || tone === 'warning'
        ? 'warn'
        : tone === 'success' || tone === 'info'
          ? 'ok'
          : 'neutral';

  return (
    <Card
      className={clsx(
        'relative flex flex-col gap-2 px-5 py-5 overflow-hidden isolate',
        accentTone === 'ok'
          ? 'ring-1 ring-emerald-400/30'
          : accentTone === 'warn'
            ? 'ring-1 ring-amber-300/25'
            : accentTone === 'danger'
              ? 'ring-1 ring-rose-400/30'
              : 'ring-1 ring-border-soft/60'
      )}
    >
      <div className="pt-1 space-y-1">
        <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted">{label}</div>
        <div className="text-[30px] font-semibold text-text-primary leading-tight">{value}</div>
        {helperText && <div className="text-sm text-text-secondary leading-snug">{helperText}</div>}
      </div>
    </Card>
  );
}
