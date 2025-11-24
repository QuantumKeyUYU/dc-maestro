import clsx from 'clsx';

interface KpiBadgeProps {
  label: string;
  value: string | number;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export function KpiBadge({ label, value, tone = 'neutral' }: KpiBadgeProps) {
  const toneClass = {
    neutral: 'text-text-primary border-white/12',
    success: 'text-[#8fc7b7] border-[rgba(63,177,165,0.32)]',
    warning: 'text-[#d5b176] border-[rgba(201,154,70,0.32)]',
    danger: 'text-[#e2b3b8] border-[rgba(168,79,89,0.34)]',
    info: 'text-[#b5c5e6] border-[rgba(77,140,207,0.32)]'
  }[tone];

  const stripeClass = {
    neutral: 'bg-white/10',
    success: 'bg-[rgba(63,177,165,0.55)]',
    warning: 'bg-[rgba(201,154,70,0.55)]',
    danger: 'bg-[rgba(168,79,89,0.6)]',
    info: 'bg-[rgba(77,140,207,0.6)]'
  }[tone];

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-[8px] border px-4 py-3 flex flex-col gap-1 bg-[#0b1118] transition-colors duration-150 hover:bg-white/[0.02]',
        toneClass
      )}
    >
      <span className={clsx('absolute inset-y-0 left-0 w-[3px]', stripeClass)} aria-hidden />
      <span className="text-[11px] uppercase tracking-wide text-text-dim">{label}</span>
      <span className="text-xl font-semibold leading-tight">{value}</span>
    </div>
  );
}
