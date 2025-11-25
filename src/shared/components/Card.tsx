import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-2xl border border-white/5 bg-ink-900/90 shadow-luxe-card backdrop-blur-md transition duration-150 px-6 py-5',
        interactive && 'hover:-translate-y-[2px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] cursor-pointer',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-5 space-y-1">
          {title && <div className="text-[17px] font-semibold text-neutral-100 tracking-tight leading-tight">{title}</div>}
          {subtitle && <div className="text-[13px] text-neutral-400 leading-snug">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
