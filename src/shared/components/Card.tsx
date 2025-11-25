import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-card border border-border-soft',
        'bg-[linear-gradient(165deg,rgba(9,12,18,0.95),rgba(11,16,24,0.98))] backdrop-blur-2xl p-6',
        'shadow-elevation-card transition-transform duration-150',
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent)] before:opacity-[0.35] before:content-['']",
        interactive &&
          'hover:border-border-strong hover:bg-[linear-gradient(165deg,rgba(11,15,22,0.98),rgba(13,18,26,0.98))] hover:scale-[1.01] cursor-pointer',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-4 space-y-1">
          {title && <div className="text-[17px] font-semibold text-text-primary tracking-tight leading-tight">{title}</div>}
          {subtitle && <div className="text-[13px] text-text-secondary leading-snug">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
