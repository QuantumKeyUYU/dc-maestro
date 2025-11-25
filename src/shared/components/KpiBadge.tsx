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

  const toneRing =
    accentTone === 'ok'
      ? 'ring-[rgba(59,216,161,0.3)]'
      : accentTone === 'warn'
        ? 'ring-[rgba(242,192,99,0.28)]'
        : accentTone === 'danger'
          ? 'ring-[rgba(255,92,103,0.32)]'
          : 'ring-[rgba(79,180,255,0.26)]';

  return (
    <Card
      className={clsx(
        'relative flex flex-col gap-3 px-5 py-5 overflow-hidden isolate',
        'ring-1 ring-inset',
        toneRing,
        'border-[rgba(255,255,255,0.08)]'
      )}
    >
      <div className="pt-1 space-y-1">
        <div className="text-[11px] uppercase tracking-[0.18em] text-text-muted">{label}</div>
        <div className="text-[26px] font-semibold text-text-primary leading-tight">{value}</div>
        {helperText && <div className="text-xs text-text-secondary">{helperText}</div>}
      </div>
    </Card>
  );
}
