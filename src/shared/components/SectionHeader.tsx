import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="block h-10 w-1 rounded-full bg-gradient-to-b from-accent-primary/70 via-accent-primary/40 to-transparent shadow-[0_0_18px_rgba(62,236,226,0.5)]" />
          <h2 className="text-2xl font-semibold text-text-primary tracking-tight drop-shadow-sm">{title}</h2>
        </div>
        {description && <p className="text-sm text-text-muted max-w-3xl leading-relaxed">{description}</p>}
      </div>
      {action}
    </div>
  );
}
