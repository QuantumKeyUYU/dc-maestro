import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'glass-shell group transition duration-300 animate-section',
        interactive && 'hover:-translate-y-1 hover:shadow-glow cursor-pointer',
        className
      )}
    >
      <div
        className={clsx(
          'glass-inner transition-transform duration-300',
          interactive && 'group-hover:-translate-y-0.5'
        )}
      >
        {(title || subtitle) && (
          <div className="mb-4 space-y-1">
            {title && <div className="text-2xl font-semibold text-text-primary drop-shadow-sm">{title}</div>}
            {subtitle && <div className="text-sm text-text-muted">{subtitle}</div>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
