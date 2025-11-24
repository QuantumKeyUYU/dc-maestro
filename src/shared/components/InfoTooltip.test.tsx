import { describe, expect, it, vi } from 'vitest';
import { scheduleTooltipHide } from './InfoTooltip';

describe('scheduleTooltipHide', () => {
  it('resets open state and coordinates after the delay', () => {
    vi.useFakeTimers();

    const hideTimer = { current: null as ReturnType<typeof setTimeout> | null };
    const setOpen = vi.fn();
    const setCoords = vi.fn();

    scheduleTooltipHide(hideTimer, setOpen, setCoords, 120);

    expect(hideTimer.current).not.toBeNull();

    vi.advanceTimersByTime(130);

    expect(setOpen).toHaveBeenCalledWith(false);
    expect(setCoords).toHaveBeenCalledWith(null);
    expect(hideTimer.current).toBeNull();

    vi.useRealTimers();
  });
});
