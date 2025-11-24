import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type TableProps = PropsWithChildren<{ className?: string }>;

export function Table({ children, className }: TableProps) {
  return (
    <div className={clsx('overflow-x-auto scrollbar-thin', className)}>
      <table
        className="min-w-full text-[13px] text-text-primary border-collapse [&>thead>tr>th]:py-3 [&>thead>tr>th]:px-4 [&>thead>tr>th]:text-sm [&>thead>tr>th]:tracking-[0.08em] [&>thead]:uppercase [&>thead]:text-text-muted [&>thead]:sticky [&>thead]:top-0 [&>thead]:bg-bg-surface/80 [&>thead]:backdrop-blur-xl [&>thead]:z-10 [&>tbody>tr]:transition-all [&>tbody>tr:hover]:bg-white/5 [&>tbody>tr]:border-b [&>tbody>tr]:border-white/5 [&>tbody>tr>td]:py-3.5 [&>tbody>tr>td]:px-4 [&>tbody>tr>td]:align-middle"
      >
        {children}
      </table>
    </div>
  );
}
