import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.07)]',
        'bg-[rgba(255,255,255,0.03)] backdrop-blur-[20px] p-6',
        'shadow-[0_20px_60px_rgba(0,0,0,0.55)] transition-transform duration-150',
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_12%_-4%,rgba(76,184,255,0.12),transparent_42%)] before:content-['']",
        interactive && 'hover:-translate-y-[1px] hover:shadow-[0_24px_70px_rgba(0,0,0,0.6)] cursor-pointer',
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
