import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-[12px] border border-border-subtle bg-bg-surface/95 shadow-soft transition duration-150 p-6',
        interactive && 'hover:bg-white/[0.03] cursor-pointer hover:shadow-lifted',
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
