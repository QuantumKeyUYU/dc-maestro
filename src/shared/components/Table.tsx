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
            ? 'border border-white/5 bg-ink-900/80 px-3 py-3 shadow-luxe-card backdrop-blur-md'
            : 'px-3 py-3',
          className
        )}
      >
        <table
          className="min-w-full text-[13px] text-neutral-100 border-collapse [&>thead>tr>th]:py-3 [&>thead>tr>th]:px-3 [&>thead>tr>th]:text-xs [&>thead>tr>th]:font-semibold [&>thead>tr>th]:uppercase [&>thead>tr>th]:tracking-[0.14em] [&>thead>tr>th]:text-neutral-500 [&>thead]:bg-ink-900 [&>thead]:border-b [&>thead]:border-white/5 [&>tbody>tr]:border-b [&>tbody>tr]:border-white/5 [&>tbody>tr:last-child]:border-b-0 [&>tbody>tr>td]:py-2.5 [&>tbody>tr>td]:px-3 [&>tbody>tr>td]:align-middle [&>tbody>tr]:transition-all [&>tbody>tr]:duration-150 [&>tbody>tr:hover]:bg-ink-800/60"
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
        clickable
          ? 'group cursor-pointer hover:bg-ink-800/60 hover:-translate-y-[1px]'
          : 'hover:bg-ink-800/60',
        className
      )}
    >
      {children}
    </tr>
  );
}
