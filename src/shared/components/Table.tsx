import { PropsWithChildren, createContext, useContext } from 'react';
import clsx from 'clsx';

type TableProps<T> = PropsWithChildren<{ className?: string; onRowClick?: (row: T) => void; isRowClickable?: boolean; framed?: boolean }>;

const TableContext = createContext<{ onRowClick?: (row: unknown) => void; isRowClickable?: boolean }>({});

export function Table<T = unknown>({ children, className, onRowClick, isRowClickable, framed = true }: TableProps<T>) {
  return (
    <TableContext.Provider value={{ onRowClick: onRowClick as (row: unknown) => void, isRowClickable }}>
      <div
        className={clsx(
          'overflow-x-auto scrollbar-thin rounded-[8px]',
          framed ? 'border border-border-subtle bg-bg-surface px-3 py-3' : 'px-3 py-3',
          className
        )}
      >
        <table
          className="min-w-full text-[13px] text-text-primary border-collapse [&>thead>tr>th]:py-3 [&>thead>tr>th]:px-3 [&>thead>tr>th]:text-[12px] [&>thead>tr>th]:font-semibold [&>thead>tr>th]:text-text-muted [&>thead]:bg-bg-surfaceSoft [&>thead]:border-b [&>thead]:border-border-subtle [&>tbody>tr]:border-b [&>tbody>tr]:border-border-subtle/60 [&>tbody>tr:last-child]:border-b-0 [&>tbody>tr>td]:py-3 [&>tbody>tr>td]:px-3 [&>tbody>tr>td]:align-middle [&>tbody>tr]:transition-colors [&>tbody>tr]:duration-150 [&>tbody>tr:hover]:bg-white/[0.03]"
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
        'transition-colors duration-150',
        clickable ? 'cursor-pointer hover:bg-white/[0.04]' : 'hover:bg-white/[0.03]',
        className
      )}
    >
      {children}
    </tr>
  );
}
