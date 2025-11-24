import { PropsWithChildren, useState } from 'react';
import clsx from 'clsx';

type InfoTooltipProps = PropsWithChildren<{ label: string; className?: string }>;

export function InfoTooltip({ label, children, className }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx('relative inline-flex items-center gap-1 text-xs text-gray-300', className)}>
      {children}
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-800 text-primary border border-gray-700"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-1.5 2.25c0-.414.336-.75.75-.75h.5a.75.75 0 01.75.75v4c0 .414-.336.75-.75.75h-.5a.75.75 0 01-.75-.75v-4z" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 p-3 rounded-lg bg-surface border border-gray-700 shadow-xl z-20">
          <p className="text-xs text-gray-200 leading-snug">{label}</p>
        </div>
      )}
    </div>
  );
}
