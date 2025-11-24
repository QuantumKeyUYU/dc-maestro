import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = (props: IconProps): IconProps => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor' as const,
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  ...props
});

export function LayoutDashboard(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </svg>
  );
}

export function Cpu(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="6" y="6" width="12" height="12" rx="3" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M6 2v2M18 2v2M6 20v2M18 20v2" />
    </svg>
  );
}

export function Users(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M8 13c-2.5 0-4.5 1.3-5 3.5C3.5 18.5 6 20 8.5 20" />
      <path d="M16 13c2.5 0 4.5 1.3 5 3.5C20.5 18.5 18 20 15.5 20" />
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
    </svg>
  );
}

export function Wrench(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M20.4 7.6a5 5 0 00-6-6l3 3-5 5-3-3a5 5 0 006 6l5-5z" />
      <path d="M4 20l4-4" />
    </svg>
  );
}

export function Boxes(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 7v7l9 4 9-4V7" />
      <path d="M12 11v7" />
    </svg>
  );
}

export function Wallet(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M17 12h4" />
      <circle cx="16" cy="12" r="1" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 3l7 3v6c0 3.5-3 6.7-7 9-4-2.3-7-5.5-7-9V6z" />
      <path d="M9 12l2 2 4-5" />
    </svg>
  );
}

export function Briefcase(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
      <path d="M3 12h18" />
      <path d="M12 12v3" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 12h12" />
      <path d="M13 7l5 5-5 5" />
    </svg>
  );
}
