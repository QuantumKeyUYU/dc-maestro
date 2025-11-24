import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-bg-surface/95 to-bg-surfaceSoft/92 shadow-[0_10px_28px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.03)] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_70%)] transition duration-300 animate-section p-[1px]',
        interactive && 'hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.62)] cursor-pointer',
        className
      )}
    >
      <div
        className={clsx(
          'relative rounded-2xl bg-gradient-to-b from-bg-surface/98 to-bg-surfaceSoft/96 px-6 py-5 border border-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition-transform duration-300',
          interactive && 'group-hover:-translate-y-0.5'
        )}
      >
        {(title || subtitle) && (
          <div className="mb-4 space-y-2">
            {title && <div className="text-2xl font-semibold text-text-primary drop-shadow-sm">{title}</div>}
            {subtitle && <div className="text-sm text-text-muted">{subtitle}</div>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
