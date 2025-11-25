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
        'relative flex flex-col gap-2 px-4 py-4',
        'before:content-[" "] before:absolute before:left-4 before:right-4 before:top-3 before:h-[2px] before:rounded-full',
        accentTone === 'ok'
          ? 'before:bg-status-ok/60'
          : accentTone === 'warn'
            ? 'before:bg-status-warn/60'
            : accentTone === 'danger'
              ? 'before:bg-status-danger/60'
              : 'before:bg-accent-primary/50'
      )}
    >
      <div className="pt-2 space-y-1">
        <div className="text-[11px] uppercase tracking-[0.16em] text-text-muted">{label}</div>
        <div className="text-2xl font-semibold text-text-primary">{value}</div>
        {helperText && <div className="text-xs text-text-secondary">{helperText}</div>}
      </div>
    </Card>
  );
}
