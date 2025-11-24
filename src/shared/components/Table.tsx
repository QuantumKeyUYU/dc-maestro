import { PropsWithChildren, createContext, useContext } from 'react';
import clsx from 'clsx';

type TableProps<T> = PropsWithChildren<{ className?: string; onRowClick?: (row: T) => void; isRowClickable?: boolean; framed?: boolean }>;

const TableContext = createContext<{ onRowClick?: (row: unknown) => void; isRowClickable?: boolean }>({});

export function Table<T = unknown>({ children, className, onRowClick, isRowClickable, framed = true }: TableProps<T>) {
  return (
    <TableContext.Provider value={{ onRowClick: onRowClick as (row: unknown) => void, isRowClickable }}>
      <div
        className={clsx(
          'overflow-x-auto scrollbar-thin',
          framed
            ? 'rounded-2xl border border-white/5 bg-gradient-to-b from-bg-surface/95 to-bg-surfaceSoft/92 shadow-[0_10px_28px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.03)] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_70%)] px-4 py-4'
            : 'rounded-2xl px-4 py-4',
          className
        )}
      >
        <table
          className="min-w-full text-[13px] text-text-primary border-collapse [&>thead>tr>th]:py-3 [&>thead>tr>th]:px-4 [&>thead>tr>th]:text-[12px] [&>thead>tr>th]:font-medium [&>thead>tr>th]:tracking-[0.16em] [&>thead]:uppercase [&>thead]:text-white/70 [&>thead]:sticky [&>thead]:top-0 [&>thead]:bg-bg-surface/88 [&>thead]:backdrop-blur-xl [&>thead]:z-10 [&>tbody>tr]:border-b [&>tbody>tr]:border-white/5 [&>tbody>tr:last-child]:border-b-0 [&>tbody>tr>td]:py-3 [&>tbody>tr>td]:px-4 [&>tbody>tr>td]:align-middle [&>tbody>tr:nth-child(odd)]:bg-white/[0.015] [&>tbody>tr:nth-child(even)]:bg-white/[0.03] [&>tbody>tr:hover]:bg-white/5 [&>tbody>tr]:transition-colors [&>tbody>tr]:duration-150"
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
        'transition-colors duration-200',
        clickable
          ? 'cursor-pointer hover:bg-white/6 hover:shadow-[inset_0_0_0_1px_rgba(62,236,226,0.12)]'
          : 'hover:bg-white/5 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]',
        className
      )}
    >
      {children}
    </tr>
  );
}
