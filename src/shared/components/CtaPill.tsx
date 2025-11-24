import clsx from 'clsx';
import { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

const baseClasses =
  'group inline-flex items-center gap-1.5 font-medium rounded-full bg-[rgba(14,138,85,0.18)] border border-[rgba(14,138,85,0.32)] text-emerald-50/90 transition-colors hover:bg-[rgba(14,138,85,0.22)] hover:border-[rgba(14,138,85,0.38)] hover:text-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

const sizeClasses = {
  sm: 'h-6 px-2.5 text-[13px] leading-none',
  lg: 'h-8 px-3.5 text-sm'
};

const iconClasses = 'w-4 h-4 text-emerald-200 opacity-90 transition-transform duration-200 group-hover:translate-x-[0.25px]';

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
