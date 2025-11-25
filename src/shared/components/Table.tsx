import { PropsWithChildren, createContext, useContext } from 'react';
import clsx from 'clsx';

type TableProps<T> = PropsWithChildren<{ className?: string; onRowClick?: (row: T) => void; isRowClickable?: boolean; framed?: boolean }>;

const TableContext = createContext<{ onRowClick?: (row: unknown) => void; isRowClickable?: boolean }>({});

export function Table<T = unknown>({ children, className, onRowClick, isRowClickable, framed = true }: TableProps<T>) {
  return (
    <TableContext.Provider value={{ onRowClick: onRowClick as (row: unknown) => void, isRowClickable }}>
      <div
        className={clsx(
          'overflow-x-auto scrollbar-thin rounded-card',
          framed
            ? 'border border-border-soft bg-base-panel px-3 py-3 shadow-elevation-card backdrop-blur-lg'
            : 'px-1 py-1',
          className
        )}
      >
        <table
          className="min-w-full table-auto text-[13px] text-text-primary border-collapse [&>thead>tr>th]:py-3 [&>thead>tr>th]:px-4 [&>thead>tr>th]:text-[11px] [&>thead>tr>th]:font-semibold [&>thead>tr>th]:uppercase [&>thead>tr>th]:tracking-[0.14em] [&>thead>tr>th]:text-text-secondary [&>thead>tr>th]:whitespace-nowrap [&>thead]:bg-white/[0.03] [&>thead]:border-b [&>thead]:border-border-soft [&>tbody>tr]:border-b [&>tbody>tr]:border-border-soft [&>tbody>tr:last-child]:border-b-0 [&>tbody>tr>td]:py-3 [&>tbody>tr>td]:px-4 [&>tbody>tr>td]:align-middle [&>tbody>tr>td]:text-left [&>tbody>tr>td]:break-words [&>tbody>tr>td]:whitespace-normal [&>tbody>tr]:transition-colors [&>tbody>tr]:duration-150 [&>tbody>tr:hover]:bg-white/[0.02]"
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
        'group transition-colors duration-150',
        clickable ? 'cursor-pointer hover:bg-white/[0.03]' : 'hover:bg-white/[0.02]',
        className
      )}
    >
      {children}
    </tr>
  );
}
