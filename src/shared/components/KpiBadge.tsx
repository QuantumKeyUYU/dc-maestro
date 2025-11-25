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
          ? 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-[rgba(59,216,161,0.55)] before:content-["" ]'
          : accentTone === 'warn'
            ? 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-[rgba(242,192,99,0.45)] before:content-["" ]'
            : accentTone === 'danger'
              ? 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-[rgba(255,92,103,0.55)] before:content-["" ]'
              : ''
      )}
    >
      <div className="pt-1 space-y-1">
        <div className="text-[11px] uppercase tracking-[0.16em] text-text-muted">{label}</div>
        <div className="text-[32px] font-semibold text-text-primary leading-tight">{value}</div>
        {helperText && <div className="text-sm text-text-secondary leading-snug">{helperText}</div>}
      </div>
    </Card>
  );
}
