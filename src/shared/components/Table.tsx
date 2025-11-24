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
          framed
            ? 'border border-[rgba(255,255,255,0.04)] bg-[#0b1118] shadow-[0_6px_18px_rgba(0,0,0,0.24)] px-4 py-4'
            : 'px-4 py-4',
          className
        )}
      >
        <table
          className="min-w-full text-[13px] text-text-primary border-collapse [&>thead>tr>th]:py-3 [&>thead>tr>th]:px-4 [&>thead>tr>th]:text-[12px] [&>thead>tr>th]:font-semibold [&>thead]:text-text-primary [&>thead]:bg-[#0b1118] [&>tbody>tr]:border-b [&>tbody>tr]:border-white/6 [&>tbody>tr:last-child]:border-b-0 [&>tbody>tr>td]:py-3 [&>tbody>tr>td]:px-4 [&>tbody>tr>td]:align-middle [&>tbody>tr]:transition-colors [&>tbody>tr]:duration-150 [&>tbody>tr:hover]:bg-white/2"
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
        clickable ? 'cursor-pointer hover:bg-white/[0.03]' : 'hover:bg-white/[0.02]',
        className
      )}
    >
      {children}
    </tr>
  );
}
