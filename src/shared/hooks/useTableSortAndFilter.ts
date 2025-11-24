import { useMemo, useState } from 'react';

type SortDirection = 'asc' | 'desc';

type SortConfig<T> = {
  key: keyof T | null;
  direction: SortDirection;
};

export function useTableSortAndFilter<T extends Record<string, unknown>>(
  data: T[],
  searchFields: (keyof T)[],
  initialKey: keyof T | null = null
) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({ key: initialKey, direction: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const sortedAndFiltered = useMemo(() => {
    const filtered = data.filter((item) => {
      if (!normalizedQuery) return true;
      return searchFields.some((field) => {
        const value = item[field];
        if (value === undefined || value === null) return false;
        return String(value).toLowerCase().includes(normalizedQuery);
      });
    });

    if (!sortConfig.key) return filtered;

    const directionMultiplier = sortConfig.direction === 'asc' ? 1 : -1;

    return [...filtered].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof T];
      const bVal = b[sortConfig.key as keyof T];

      if (aVal instanceof Date && bVal instanceof Date) {
        return (aVal.getTime() - bVal.getTime()) * directionMultiplier;
      }

      const aNum = typeof aVal === 'number' ? aVal : undefined;
      const bNum = typeof bVal === 'number' ? bVal : undefined;
      if (aNum !== undefined && bNum !== undefined) {
        return (aNum - bNum) * directionMultiplier;
      }

      const aStr = String(aVal ?? '').toLowerCase();
      const bStr = String(bVal ?? '').toLowerCase();
      return aStr.localeCompare(bStr) * directionMultiplier;
    });
  }, [data, normalizedQuery, searchFields, sortConfig.direction, sortConfig.key]);

  const requestSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  return {
    sortedAndFiltered,
    sortConfig,
    searchQuery,
    setSearchQuery,
    requestSort
  };
}
