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
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  action,
  label,
  as: HeadingTag = 'h2',
  className
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border-subtle/70 bg-bg-surface px-5 py-4 shadow-[0_8px_20px_rgba(0,0,0,0.32)]',
        className
      )}
    >
      <div className="space-y-1 max-w-4xl">
        {label ? <p className="text-[11px] font-normal text-text-dim uppercase tracking-[0.12em]">{label}</p> : null}
        <div className="flex flex-wrap items-center gap-2">
          <HeadingTag className="text-[22px] font-semibold text-text-primary tracking-tight leading-tight">{title}</HeadingTag>
          {badge}
        </div>
        {subtitle && <p className="text-[14px] text-text-muted leading-snug">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0 w-full sm:w-auto sm:max-w-md">{action}</div>}
    </div>
  );
}
