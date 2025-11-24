import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string }>;

export function Card({ children, className, title, subtitle }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-surface/80 border border-gray-800 rounded-2xl p-6 shadow-lg backdrop-blur transition hover:border-primary/30 hover:shadow-primary/10 hover:-translate-y-0.5',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <div className="text-xl font-semibold text-gray-100">{title}</div>}
          {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
