import clsx from 'clsx';
import { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

const baseClasses =
  'group inline-flex items-center gap-1.5 font-medium rounded-full bg-white/10 text-text-primary transition-all hover:bg-white/16 hover:shadow-[0_0_12px_rgba(62,236,226,0.25)] hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

const sizeClasses = {
  sm: 'h-6 px-2.5 text-[13px] leading-none',
  lg: 'h-8 px-3.5 text-sm'
};

const iconClasses = 'w-4 h-4 text-accent-primary opacity-90 transition-transform duration-200 group-hover:translate-x-[1px]';

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
