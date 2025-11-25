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
        framed && 'rounded-2xl border border-white/5 bg-ink-900/80 px-5 py-4 shadow-luxe-card backdrop-blur-md',
        className
      )}
    >
      <div className="space-y-1 max-w-4xl">
        {label ? <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.14em]">{label}</p> : null}
        <div className="flex flex-wrap items-center gap-2">
          <HeadingTag className="text-2xl sm:text-[26px] font-semibold text-neutral-100 tracking-tight leading-tight">
            {title}
          </HeadingTag>
          {badge}
        </div>
        {subtitle && <p className="text-sm text-neutral-400 leading-snug max-w-xl">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0 w-full sm:w-auto sm:max-w-md">{action}</div>}
    </div>
  );
}
