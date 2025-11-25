import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-xl border border-white/10',
        'bg-[rgba(255,255,255,0.04)] backdrop-blur-xl p-5',
        'shadow-[0_15px_35px_rgba(0,0,0,0.45)] transition-transform duration-150',
        'before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-white/10 before:content-[""]',
        interactive && 'hover:-translate-y-[1px] hover:shadow-[0_20px_48px_rgba(0,0,0,0.55)] cursor-pointer',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-5 space-y-1">
          {title && <div className="text-[17px] font-semibold text-text-primary tracking-tight leading-tight">{title}</div>}
          {subtitle && <div className="text-[13px] text-text-secondary leading-snug">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
