import { PropsWithChildren, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

type InfoTooltipProps = PropsWithChildren<{ label: string; className?: string; triggerArea?: 'icon' | 'container'; id?: string; resetKey?: string | number }>;

export function scheduleTooltipHide(
  hideTimerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>,
  setOpen: (next: boolean) => void,
  setCoords: (next: { top: number; left: number } | null) => void,
  delay = 120
) {
  if (hideTimerRef.current) {
    clearTimeout(hideTimerRef.current);
  }
  hideTimerRef.current = setTimeout(() => {
    setOpen(false);
    setCoords(null);
    hideTimerRef.current = null;
  }, delay);
}

export function InfoTooltip({ label, children, className, triggerArea = 'icon', id, resetKey }: InfoTooltipProps) {
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

  useEffect(() => {
    if (resetKey === undefined) return;

    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }

    if (open || coords) {
      setOpen(false);
      setCoords(null);
    }
  }, [resetKey, open, coords]);

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
    scheduleTooltipHide(hideTimer, setOpen, setCoords);
  };

  return (
    <div
      ref={triggerRef}
      className={
        triggerArea === 'container'
          ? clsx('relative', className)
          : clsx('relative inline-flex items-center gap-2 text-xs text-text-secondary', className)
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
          className="inline-flex items-center justify-center w-5 h-5 rounded-[6px] border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.08)] text-text-muted transition hover:text-white hover:border-white/30 focus:outline-none focus:ring-1 focus:ring-accent-primary/35 backdrop-blur-[12px] shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
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
                className="max-w-sm rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-sm text-text-primary shadow-[0_18px_48px_rgba(0,0,0,0.55)] backdrop-blur-[18px]"
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
