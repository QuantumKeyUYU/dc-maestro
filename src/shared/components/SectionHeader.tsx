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
          "relative overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[rgba(7,10,16,0.96)] px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-[18px] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_18%_-8%,rgba(255,255,255,0.08),transparent_48%)] before:opacity-80 before:content-['']",
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
