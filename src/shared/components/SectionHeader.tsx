import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  action?: ReactNode;
}

export function SectionHeader({ title, subtitle, badge, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-6">
      <div className="space-y-2 max-w-4xl">
        <div className="flex items-center gap-3">
          <span className="block h-10 w-1 rounded-full bg-gradient-to-b from-accent-primary/80 via-accent-primary/45 to-transparent shadow-[0_0_18px_rgba(62,236,226,0.5)]" />
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-semibold text-text-primary tracking-tight drop-shadow-sm">{title}</h2>
            {badge}
          </div>
        </div>
        {subtitle && <p className="text-base text-text-muted leading-relaxed">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
