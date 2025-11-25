import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-xl border border-white/8',
        'bg-[rgba(15,20,28,0.96)] backdrop-blur-xl p-6',
        'shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition-transform duration-150',
        'before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.07),transparent_55%)] before:content-[""]',
        interactive && 'hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(0,0,0,0.55)] cursor-pointer',
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
