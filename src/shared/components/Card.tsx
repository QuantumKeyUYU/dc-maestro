import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-[8px] border border-[rgba(255,255,255,0.04)] bg-[#0b1118] shadow-[0_6px_18px_rgba(0,0,0,0.24)] transition duration-150 p-6',
        interactive && 'hover:bg-white/[0.02] cursor-pointer',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-4 space-y-1.5">
          {title && <div className="text-lg font-semibold text-text-primary tracking-tight leading-tight">{title}</div>}
          {subtitle && <div className="text-[13px] text-text-muted leading-snug">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
