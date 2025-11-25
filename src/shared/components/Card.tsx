import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-[16px] border border-border-soft/80 bg-[#0c1119] px-6 py-5',
        'shadow-elevation-card transition-transform duration-150 backdrop-blur-lg',
        interactive && 'hover:translate-y-[-1px] hover:shadow-[0_20px_48px_rgba(0,0,0,0.46)] cursor-pointer',
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
