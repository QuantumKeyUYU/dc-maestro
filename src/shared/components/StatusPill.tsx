import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'md' | 'sm';
}

export function StatusPill({ label, tone = 'neutral', size = 'md' }: StatusPillProps) {
  const toneClass = {
    neutral: 'bg-white/[0.05] text-text-primary border-white/10',
    success: 'bg-[rgba(42,143,115,0.14)] text-[#8fc7b7] border-[rgba(63,177,165,0.3)]',
    warning: 'bg-[rgba(129,94,38,0.16)] text-[#d5b176] border-[rgba(201,154,70,0.28)]',
    danger: 'bg-[rgba(120,55,64,0.16)] text-[#e2b3b8] border-[rgba(168,79,89,0.3)]',
    info: 'bg-[rgba(64,101,153,0.16)] text-[#b5c5e6] border-[rgba(77,140,207,0.3)]'
  }[tone];

  const sizeClass = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';

  return (
    <span
      className={clsx(
        'rounded-full font-semibold border transition inline-flex items-center gap-1 px-0.5',
        sizeClass,
        toneClass
      )}
    >
      {label}
    </span>
  );
}
