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
        'flex flex-col gap-1 rounded-2xl border border-white/5 bg-surface-card/95',
        'px-4 py-3 shadow-[0_10px_28px_rgba(0,0,0,0.6)]'
      )}
    >
      <div className="text-[11px] uppercase tracking-[0.16em] text-text-muted">{label}</div>
      <div className="text-2xl font-semibold text-text-primary">{value}</div>
      {helperText && <div className="text-xs text-text-secondary">{helperText}</div>}
      {accentTone !== 'neutral' && (
        <div className="flex items-center gap-2 pt-1">
          <div className="h-[2px] w-8 rounded-full bg-accent-primary/70" />
        </div>
      )}
    </Card>
  );
}
