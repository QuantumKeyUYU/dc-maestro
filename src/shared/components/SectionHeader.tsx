import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}
