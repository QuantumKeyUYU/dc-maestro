import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{ className?: string; title?: string; subtitle?: string }>;

export function Card({ children, className, title, subtitle }: CardProps) {
  return (
    <div className={clsx('bg-surface/80 border border-gray-800 rounded-xl p-4 shadow-lg', className)}>
      {(title || subtitle) && (
        <div className="mb-3">
          {title && <div className="text-lg font-semibold text-gray-100">{title}</div>}
          {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
