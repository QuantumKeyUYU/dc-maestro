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
        'relative flex flex-col gap-2 px-5 py-4 overflow-hidden isolate rounded-[12px] bg-base-panelSoft',
        accentTone === 'ok'
          ? 'border border-emerald-300/35 shadow-[0_14px_32px_rgba(0,0,0,0.34)]'
          : accentTone === 'warn'
            ? 'border border-amber-200/35 shadow-[0_14px_32px_rgba(0,0,0,0.34)]'
            : accentTone === 'danger'
              ? 'border border-rose-300/35 shadow-[0_14px_32px_rgba(0,0,0,0.34)]'
              : 'border border-border-soft/80 shadow-[0_14px_32px_rgba(0,0,0,0.3)]'
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
