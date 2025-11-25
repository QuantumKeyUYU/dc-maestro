import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-surface-card/95 border border-white/5 rounded-2xl',
        'shadow-[0_14px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl',
        'transition-transform duration-150 px-6 py-5',
        interactive && 'hover:-translate-y-[1px] cursor-pointer',
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
