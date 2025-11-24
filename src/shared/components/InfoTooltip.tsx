import { PropsWithChildren, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

type InfoTooltipProps = PropsWithChildren<{ label: string; className?: string; triggerArea?: 'icon' | 'container'; id?: string }>;

export function InfoTooltip({ label, children, className, triggerArea = 'icon', id }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = id ?? useId();

  const updatePosition = useMemo(
    () =>
      () => {
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const maxWidth = Math.min(360, viewportWidth - 32);
          const minLeft = maxWidth / 2 + 16;
          const maxLeft = viewportWidth - maxWidth / 2 - 16;
          const clampedCenter = Math.min(Math.max(rect.left + rect.width / 2, minLeft), maxLeft);
          setCoords({
            top: rect.bottom + 10 + window.scrollY,
            left: clampedCenter + window.scrollX
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

  useEffect(
    () => () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    },
    []
  );

  const showTooltip = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setOpen(true);
  };

  const scheduleHide = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }
    hideTimer.current = setTimeout(() => {
      setOpen(false);
      setCoords(null);
      hideTimer.current = null;
    }, 120);
  };

  return (
    <div
      ref={triggerRef}
      className={
        triggerArea === 'container'
          ? clsx('relative', className)
          : clsx('relative inline-flex items-center gap-2 text-xs text-text-muted', className)
      }
      onMouseEnter={showTooltip}
      onMouseLeave={scheduleHide}
      onFocus={showTooltip}
      onBlur={scheduleHide}
      tabIndex={triggerArea === 'container' ? 0 : -1}
      aria-describedby={tooltipId}
    >
      {children}
      {triggerArea === 'icon' && (
        <button
          type="button"
          className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/10 bg-white/5 text-text-primary/70 shadow-soft transition hover:text-text-primary hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
          aria-label="Пояснение"
          aria-describedby={tooltipId}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-1.5 2.25c0-.414.336-.75.75-.75h.5a.75.75 0 01.75.75v4c0 .414-.336.75-.75.75h-.5a.75.75 0 01-.75-.75v-4z" />
          </svg>
        </button>
      )}
      {open && coords
        ? createPortal(
            <div
              className="fixed z-50 drop-shadow-2xl"
              style={{
                top: coords.top,
                left: coords.left,
                transform: 'translateX(-50%)',
                maxWidth: 'min(360px, calc(100vw - 32px))'
              }}
            >
              <div
                id={tooltipId}
                role="tooltip"
                className="max-w-sm rounded-xl border border-white/12 bg-bg-surface/95 px-4 py-3 text-sm text-text-primary shadow-ambient backdrop-blur-xl"
              >
                <p className="leading-snug">{label}</p>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
