import React from 'react';
import clsx from 'clsx';

// --- Card ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, title, subtitle, action }) => {
  return (
    <div className={clsx("glass-panel rounded-xl flex flex-col overflow-hidden transition-all duration-300 hover:border-white/10", className)}>
      {(title || action) && (
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-start">
          <div>
            {title && <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6 h-full">{children}</div>
    </div>
  );
};

// --- Badge ---
interface BadgeProps {
  label: string;
  tone: 'success' | 'warning' | 'danger' | 'neutral' | 'primary';
  size?: 'sm' | 'md';
  pulsing?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ label, tone, size = 'md', pulsing = false }) => {
  const styles = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    neutral: 'bg-gray-700/30 text-gray-300 border-gray-600/30',
    primary: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  const pulseColor = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    neutral: 'bg-gray-400',
    primary: 'bg-blue-500',
  };

  return (
    <span className={clsx(
      "inline-flex items-center border font-medium rounded-full",
      styles[tone],
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs'
    )}>
      {pulsing && (
        <span className="relative flex h-2 w-2 mr-2">
          <span className={clsx("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", pulseColor[tone])}></span>
          <span className={clsx("relative inline-flex rounded-full h-2 w-2", pulseColor[tone])}></span>
        </span>
      )}
      {label}
    </span>
  );
};

// --- Stat Card ---
interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'primary';
  icon?: React.ComponentType<any>;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subtext, tone = 'neutral', icon: Icon }) => {
  const valueColor = {
    neutral: 'text-white',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    danger: 'text-rose-400',
    primary: 'text-blue-400',
  };

  return (
    <div className="glass-panel rounded-xl p-5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        {Icon && <Icon size={64} />}
      </div>
      <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className={clsx("text-3xl font-bold tracking-tight", valueColor[tone])}>{value}</span>
      </div>
      {subtext && <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">{subtext}</p>}
    </div>
  );
};