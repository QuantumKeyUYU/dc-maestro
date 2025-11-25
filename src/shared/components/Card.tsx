import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-[18px] border border-border-soft/80',
        'bg-[radial-gradient(circle_at_18%_-10%,rgba(255,255,255,0.06),transparent_52%)] bg-[#0c1119]/95 px-6 sm:px-7 py-6 sm:py-7',
        'shadow-[0_16px_40px_rgba(0,0,0,0.55)] transition-transform duration-200 backdrop-blur-xl',
        interactive &&
          'hover:translate-y-[-2px] hover:shadow-[0_26px_64px_rgba(0,0,0,0.6)] hover:border-white/14 cursor-pointer',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-4 space-y-1.5">
          {title && <div className="text-[17px] sm:text-[18px] font-semibold text-text-primary tracking-tight leading-tight">{title}</div>}
          {subtitle && <div className="text-[13px] sm:text-sm text-text-secondary leading-snug">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
