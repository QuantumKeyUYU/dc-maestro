import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

type InfoTooltipProps = PropsWithChildren<{ label: string; className?: string }>;

export function InfoTooltip({ label, children, className }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useMemo(
    () =>
      () => {
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          setCoords({
            top: rect.bottom + 10 + window.scrollY,
            left: rect.left + rect.width / 2 + window.scrollX
          });
        }
      },
    []
  );

  useEffect(() => {
    if (!open) return;
    updatePosition();

    const handleReposition = () => updatePosition();
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [open, updatePosition]);

  return (
    <div
      ref={triggerRef}
      className={clsx('relative inline-flex items-center gap-2 text-xs text-text-muted', className)}
    >
      {children}
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/10 bg-white/5 text-text-primary/70 shadow-soft transition hover:text-text-primary hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
        aria-label="Пояснение"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-1.5 2.25c0-.414.336-.75.75-.75h.5a.75.75 0 01.75.75v4c0 .414-.336.75-.75.75h-.5a.75.75 0 01-.75-.75v-4z" />
        </svg>
      </button>
      {open && coords
        ? createPortal(
            <div
              className="fixed z-50 drop-shadow-2xl"
              style={{ top: coords.top, left: coords.left, transform: 'translateX(-50%)' }}
            >
              <div className="max-w-sm rounded-xl border border-white/12 bg-bg-surface/95 px-4 py-3 text-sm text-text-primary shadow-ambient backdrop-blur-xl">
                <p className="leading-snug">{label}</p>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
