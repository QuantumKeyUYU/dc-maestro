import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-[20px] border border-white/10',
        'bg-[linear-gradient(165deg,rgba(10,14,22,0.85),rgba(8,10,18,0.94))] backdrop-blur-2xl p-6',
        'shadow-[0_24px_70px_rgba(0,0,0,0.65)] transition-transform duration-200',
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(145deg,rgba(255,255,255,0.14),transparent_50%,rgba(255,255,255,0.04))] before:opacity-70 before:content-['']",
        "after:pointer-events-none after:absolute after:inset-x-4 after:top-[10px] after:h-[1px] after:bg-white/25 after:rounded-full after:content-['']",
        "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.12)]",
        interactive &&
          'hover:border-white/20 hover:shadow-[0_30px_80px_rgba(0,0,0,0.68),0_0_0_1px_rgba(255,255,255,0.04)] hover:scale-[1.015] cursor-pointer',
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
