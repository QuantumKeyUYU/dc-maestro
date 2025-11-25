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
            ? 'border border-white/5 bg-surface-card/90 px-3 py-3 shadow-luxe-card backdrop-blur-xl'
            : 'px-3 py-3',
          className
        )}
      >
        <table
          className="min-w-full text-[13px] text-text-primary border-collapse [&>thead>tr>th]:py-3 [&>thead>tr>th]:px-4 [&>thead>tr>th]:text-[11px] [&>thead>tr>th]:font-medium [&>thead>tr>th]:uppercase [&>thead>tr>th]:tracking-[0.16em] [&>thead>tr>th]:text-text-muted [&>thead]:bg-surface-soft [&>thead]:border-b [&>thead]:border-white/5 [&>tbody>tr]:border-b [&>tbody>tr]:border-white/5 [&>tbody>tr:last-child]:border-b-0 [&>tbody>tr>td]:py-2.5 [&>tbody>tr>td]:px-4 [&>tbody>tr>td]:align-middle [&>tbody>tr]:transition-colors [&>tbody>tr]:duration-150 [&>tbody>tr:hover]:bg-surface-raised/40"
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
        'group transition-all duration-150',
        clickable ? 'cursor-pointer hover:bg-surface-raised/40' : 'hover:bg-surface-raised/40',
        className
      )}
    >
      {children}
    </tr>
  );
}
