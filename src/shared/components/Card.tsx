import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.05)] bg-[#0f1825] shadow-[0_18px_40px_rgba(0,0,0,0.6)] transition duration-150 p-6',
        interactive && 'hover:bg-[#111b29] cursor-pointer',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-4 space-y-1.5">
          {title && <div className="text-xl font-semibold text-[#dce2e8] tracking-tight leading-tight">{title}</div>}
          {subtitle && <div className="text-[13px] text-text-muted leading-snug">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
