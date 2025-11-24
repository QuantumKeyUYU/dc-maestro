import clsx from 'clsx';
import { ReactNode } from 'react';
import { strings } from '../lib/strings';

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
  label = strings.headers.appTitle,
  as: HeadingTag = 'h2',
  className
}: SectionHeaderProps) {
  return (
    <div className={clsx('flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between', className)}>
      <div className="space-y-2 max-w-4xl">
        <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-text-dim sm:text-[11px] sm:tracking-[0.16em]">{label}</p>
        <div className="flex items-center gap-3">
          <span className="block h-10 w-1 rounded-full bg-gradient-to-b from-accent-primary/80 via-accent-primary/45 to-transparent shadow-[0_0_18px_rgba(62,236,226,0.5)]" />
          <div className="flex flex-wrap items-center gap-3">
            <HeadingTag className="text-3xl font-semibold text-text-primary tracking-tight drop-shadow-sm">{title}</HeadingTag>
            {badge}
          </div>
        </div>
        {subtitle && <p className="text-base text-text-muted leading-relaxed">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
