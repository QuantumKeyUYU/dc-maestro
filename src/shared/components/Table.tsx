import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type TableProps = PropsWithChildren<{ className?: string }>;

export function Table({ children, className }: TableProps) {
  return (
    <div className={clsx('overflow-x-auto scrollbar-thin', className)}>
      <table
        className="min-w-full text-sm text-text-primary border-collapse [&>thead>tr>th]:py-3 [&>thead>tr>th]:px-4 [&>thead]:text-xs [&>thead]:uppercase [&>thead]:tracking-wide [&>thead]:text-text-dim [&>thead]:sticky [&>thead]:top-0 [&>thead]:bg-bg-surface/95 [&>thead]:backdrop-blur [&>thead]:z-10 [&>tbody>tr]:transition-colors [&>tbody>tr:hover]:bg-bg-surfaceSoft/70 [&>tbody>tr:nth-child(odd)]:bg-bg-surface [&>tbody>tr:nth-child(even)]:bg-bg-surfaceSoft [&>tbody>tr>td]:py-3 [&>tbody>tr>td]:px-4"
      >
        {children}
      </table>
    </div>
  );
}
