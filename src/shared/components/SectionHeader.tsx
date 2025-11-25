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
          "relative overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] px-5 py-4 shadow-[0_18px_55px_rgba(0,0,0,0.55)] backdrop-blur-[20px] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[rgba(255,255,255,0.08)] before:content-['']",
        className
      )}
    >
      <div className="space-y-1 max-w-4xl">
        {label ? <p className="text-[11px] font-semibold text-text-muted uppercase tracking-[0.18em]">{label}</p> : null}
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
