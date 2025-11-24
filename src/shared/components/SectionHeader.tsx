import clsx from 'clsx';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  action?: ReactNode;
  label?: string;
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
    <div className={clsx('flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between', className)}>
      <div className="space-y-1.5 max-w-4xl">
        {label ? (
          <p className="whitespace-nowrap text-[11px] font-medium tracking-[0.04em] text-text-dim leading-none">{label}</p>
        ) : null}
        <div className="flex items-center gap-3">
          <span className="block h-10 w-1 rounded-full bg-gradient-to-b from-accent-primary/80 via-accent-primary/45 to-transparent shadow-[0_0_18px_rgba(62,236,226,0.5)]" />
          <div className="flex flex-wrap items-center gap-2.5">
            <HeadingTag className="text-3xl font-semibold text-text-primary tracking-tight drop-shadow-sm leading-tight">{title}</HeadingTag>
            {badge}
          </div>
        </div>
        {subtitle && <p className="text-base text-text-muted leading-relaxed">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
