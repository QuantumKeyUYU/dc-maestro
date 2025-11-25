import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.08)]',
        'bg-[rgba(7,10,16,0.96)] backdrop-blur-[18px] p-6',
        'shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-transform duration-150',
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_16%_-6%,rgba(255,255,255,0.08),transparent_46%)] before:content-['']",
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
