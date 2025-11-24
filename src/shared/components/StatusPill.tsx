import clsx from 'clsx';

interface StatusPillProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'md' | 'sm';
}

export function StatusPill({ label, tone = 'neutral', size = 'md' }: StatusPillProps) {
  const toneClass = {
    neutral: 'bg-white/6 text-[#dce2e8] border-white/10',
    success: 'bg-[rgba(14,138,85,0.2)] text-[#7be0b1] border-[rgba(14,138,85,0.38)]',
    warning: 'bg-[rgba(216,153,41,0.22)] text-[#f3d08a] border-[rgba(216,153,41,0.36)]',
    danger: 'bg-[rgba(172,64,64,0.22)] text-[#f0a3a3] border-[rgba(172,64,64,0.38)]',
    info: 'bg-[rgba(66,126,197,0.22)] text-[#b9d3ff] border-[rgba(66,126,197,0.35)]'
  }[tone];

  const sizeClass = size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs';

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
