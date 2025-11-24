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
    <div className={clsx('flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between', className)}>
      <div className="space-y-1 max-w-4xl">
        {label ? (
          <p className="whitespace-nowrap text-[11px] font-normal text-text-muted leading-tight">{label}</p>
        ) : null}
        <div className="flex items-center gap-2.5">
          <span className="block h-8 w-[2px] rounded-full bg-accent-primary/35" />
          <div className="flex flex-wrap items-center gap-2">
            <HeadingTag className="text-[26px] font-semibold text-[#dce2e8] tracking-tight leading-tight">{title}</HeadingTag>
            {badge}
          </div>
        </div>
        {subtitle && <p className="text-[15px] text-text-muted leading-snug">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
