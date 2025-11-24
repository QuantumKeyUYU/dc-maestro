import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-xl border border-border-subtle/80 bg-bg-surface shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition duration-150 p-6',
        interactive && 'hover:bg-white/[0.03] cursor-pointer hover:shadow-[0_10px_26px_rgba(0,0,0,0.38)]',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-5 space-y-1.5">
          {title && <div className="text-lg font-semibold text-text-primary tracking-tight leading-tight">{title}</div>}
          {subtitle && <div className="text-[13px] text-text-muted leading-snug">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
