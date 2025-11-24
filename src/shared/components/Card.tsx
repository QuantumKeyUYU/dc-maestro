import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string; interactive?: boolean }>;

export function Card({ children, className, title, subtitle, interactive = false }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-bg-surface/90 border border-border-subtle rounded-2xl p-6 shadow-soft backdrop-blur transition duration-200',
        interactive &&
          'hover:shadow-lifted hover:bg-bg-surfaceSoft/80 hover:-translate-y-0.5 hover:border-accent-primary/40 cursor-pointer transition-transform',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-4 space-y-1">
          {title && <div className="text-2xl font-semibold text-text-primary">{title}</div>}
          {subtitle && <div className="text-sm text-text-muted">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
