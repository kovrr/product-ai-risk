import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === bVal) return 0;
      
      const comparison = aVal > bVal ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortKey, sortDirection]);

  if (loading) {
    return (
      <div className="w-full p-[48px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fill-brand-primary" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full p-[48px] text-center">
        <p className="text-text-base-tertiary text-[14px]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-stroke-base-secondary">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-[16px] py-[12px] text-left',
                  'text-text-base-secondary text-[12px] font-[600] uppercase tracking-wider',
                  column.sortable && 'cursor-pointer hover:text-text-base-primary',
                  column.width && `w-[${column.width}]`
                )}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-[4px]">
                  <span>{column.label}</span>
                  {column.sortable && sortKey === column.key && (
                    <span className="text-[10px]">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={index}
              className={cn(
                'border-b border-stroke-base-secondary',
                'hover:bg-fill-base-secondary transition-colors',
                onRowClick && 'cursor-pointer'
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-[16px] py-[12px] text-text-base-primary text-[14px]"
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
