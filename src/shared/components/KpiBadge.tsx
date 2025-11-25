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

  const glow =
    accentTone === 'ok'
      ? 'after:bg-[radial-gradient(circle_at_30%_10%,rgba(59,216,161,0.18),transparent_55%)]'
      : accentTone === 'warn'
        ? 'after:bg-[radial-gradient(circle_at_30%_10%,rgba(232,176,74,0.18),transparent_55%)]'
        : accentTone === 'danger'
          ? 'after:bg-[radial-gradient(circle_at_30%_10%,rgba(255,92,92,0.2),transparent_55%)]'
          : 'after:bg-[radial-gradient(circle_at_30%_10%,rgba(76,184,255,0.24),transparent_55%)]';

  const toneLine =
    accentTone === 'ok'
      ? 'before:bg-status-ok/70'
      : accentTone === 'warn'
        ? 'before:bg-status-warn/70'
        : accentTone === 'danger'
          ? 'before:bg-status-danger/70'
          : 'before:bg-accent-primary/70';

  return (
    <Card
      className={clsx(
        'relative flex flex-col gap-3 px-5 py-5 overflow-hidden isolate',
        'bg-gradient-to-br from-white/10 via-white/0 to-white/5',
        "before:content-[''] before:absolute before:left-5 before:right-5 before:top-3 before:h-[2px] before:rounded-full",
        'after:content-[""] after:absolute after:inset-0 after:opacity-70 after:blur-2xl',
        toneLine,
        glow,
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
