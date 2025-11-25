import { PropsWithChildren, createContext, useContext } from 'react';
import clsx from 'clsx';

type TableProps<T> = PropsWithChildren<{ className?: string; onRowClick?: (row: T) => void; isRowClickable?: boolean; framed?: boolean }>;

const TableContext = createContext<{ onRowClick?: (row: unknown) => void; isRowClickable?: boolean }>({});

export function Table<T = unknown>({ children, className, onRowClick, isRowClickable, framed = true }: TableProps<T>) {
  return (
    <TableContext.Provider value={{ onRowClick: onRowClick as (row: unknown) => void, isRowClickable }}>
      <div
        className={clsx(
          'overflow-x-auto scrollbar-thin rounded-2xl',
          framed
            ? 'border border-white/5 bg-base-850/80 px-3 py-3 shadow-luxe-card backdrop-blur-xl'
            : 'px-3 py-3',
          className
        )}
      >
        <table
          className="min-w-full text-[13px] text-text-primary border-collapse [&>thead>tr>th]:py-3 [&>thead>tr>th]:px-3 [&>thead>tr>th]:text-xs [&>thead>tr>th]:font-semibold [&>thead>tr>th]:uppercase [&>thead>tr>th]:tracking-wide [&>thead>tr>th]:text-text-secondary [&>thead]:bg-base-900 [&>thead]:border-b [&>thead]:border-base-800 [&>tbody>tr]:border-b [&>tbody>tr]:border-base-800 [&>tbody>tr:last-child]:border-b-0 [&>tbody>tr>td]:py-2.5 [&>tbody>tr>td]:px-3 [&>tbody>tr>td]:align-middle [&>tbody>tr]:transition-colors [&>tbody>tr]:duration-150 [&>tbody>tr:hover]:bg-base-800/60"
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
        'transition-all duration-150',
        clickable ? 'group cursor-pointer hover:bg-base-800/60' : 'hover:bg-base-800/60',
        className
      )}
    >
      {children}
    </tr>
  );
}
