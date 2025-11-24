import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type TableProps = PropsWithChildren<{ className?: string }>;

export function Table({ children, className }: TableProps) {
  return (
    <div className={clsx('overflow-x-auto scrollbar-thin', className)}>
      <table className="min-w-full text-sm text-gray-200">
        {children}
      </table>
    </div>
  );
}
