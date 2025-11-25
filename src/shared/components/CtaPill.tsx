import clsx from 'clsx';
import { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

const baseClasses =
  'group inline-flex items-center gap-2 font-semibold rounded-full bg-white/[0.04] border border-border-soft/80 text-text-primary transition-all hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary/30 focus-visible:ring-offset-0 active:scale-[0.99] backdrop-blur-xl shadow-[0_12px_26px_rgba(0,0,0,0.32)]';

const sizeClasses = {
  sm: 'h-9 px-4 text-[13px] leading-none',
  lg: 'h-10 px-5 text-sm'
};

const iconClasses = 'w-4 h-4 text-text-muted group-hover:text-white transition';

type ButtonProps = PropsWithChildren<{
  icon?: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  size?: keyof typeof sizeClasses;
}>;

type CtaLinkProps = PropsWithChildren<{
  to: LinkProps['to'];
  icon?: ReactNode;
  className?: string;
  size?: keyof typeof sizeClasses;
}>;

export function CtaButton({ children, icon, className, onClick, type = 'button', size = 'sm' }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={clsx(baseClasses, sizeClasses[size], className)}>
      <span>{children}</span>
      {icon ? <span className={iconClasses}>{icon}</span> : null}
    </button>
  );
}

export function CtaLink({ children, icon, to, className, size = 'sm' }: CtaLinkProps) {
  return (
    <Link to={to} className={clsx(baseClasses, sizeClasses[size], className)}>
      <span>{children}</span>
      {icon ? <span className={iconClasses}>{icon}</span> : null}
    </Link>
  );
}
