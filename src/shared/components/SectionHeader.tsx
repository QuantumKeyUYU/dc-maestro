import clsx from 'clsx';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  action?: ReactNode;
  label?: string | null;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  framed?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  action,
  label,
  as: HeadingTag = 'h2',
  className,
  framed = true
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        framed &&
          'relative overflow-hidden rounded-2xl border border-white/8 bg-[rgba(12,16,24,0.72)] px-5 py-4 shadow-[0_18px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/10 before:content-[""]',
        className
      )}
    >
      <div className="space-y-1 max-w-4xl">
        {label ? <p className="text-xs font-semibold text-text-muted uppercase tracking-[0.14em]">{label}</p> : null}
        <div className="flex flex-wrap items-center gap-2">
          <HeadingTag className="text-2xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
            {title}
          </HeadingTag>
          {badge}
        </div>
        {subtitle && <p className="text-sm text-text-secondary leading-snug max-w-xl">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0 w-full sm:w-auto sm:max-w-md">{action}</div>}
    </div>
  );
}
