import { PropsWithChildren, createContext, useContext } from 'react';
import clsx from 'clsx';

type TableProps<T> = PropsWithChildren<{ className?: string; onRowClick?: (row: T) => void; isRowClickable?: boolean }>;

const TableContext = createContext<{ onRowClick?: (row: unknown) => void; isRowClickable?: boolean }>({});

export function Table<T = unknown>({ children, className, onRowClick, isRowClickable }: TableProps<T>) {
  return (
    <TableContext.Provider value={{ onRowClick: onRowClick as (row: unknown) => void, isRowClickable }}>
      <div className={clsx('overflow-x-auto scrollbar-thin', className)}>
        <table
          className="min-w-full text-[13px] text-text-primary border-collapse [&>thead>tr>th]:py-3 [&>thead>tr>th]:px-4 [&>thead>tr>th]:text-xs [&>thead>tr>th]:tracking-[0.12em] [&>thead]:uppercase [&>thead]:text-text-muted [&>thead]:sticky [&>thead]:top-0 [&>thead]:bg-bg-surface/80 [&>thead]:backdrop-blur-xl [&>thead]:z-10 [&>tbody>tr]:border-b [&>tbody>tr]:border-white/5 [&>tbody>tr>td]:py-3.5 [&>tbody>tr>td]:px-4 [&>tbody>tr>td]:align-middle"
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

type TableRowProps<T> = PropsWithChildren<{ row: T; className?: string }>;

export function TableRow<T = unknown>({ row, className, children }: TableRowProps<T>) {
  const { onRowClick, isRowClickable } = useContext(TableContext);
  const clickable = Boolean(isRowClickable && onRowClick);

  return (
    <tr
      onClick={() => clickable && onRowClick?.(row)}
      className={clsx(
        'transition-colors',
        clickable ? 'cursor-pointer hover:bg-white/8 hover:border-white/10' : 'hover:bg-white/5',
        className
      )}
    >
      {children}
    </tr>
  );
}
