import React from 'react';
import { cn } from '../../lib/utils';
import { Button, Select, MultiSelect, Input, Label } from '../atoms';

export interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'text' | 'date';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface FilterPanelProps {
  filters: FilterConfig[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onClear: () => void;
  onApply?: () => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  values,
  onChange,
  onClear,
  onApply,
  className,
}) => {
  const activeFilterCount = Object.values(values).filter(
    (v) => v !== '' && v !== null && v !== undefined && (!Array.isArray(v) || v.length > 0)
  ).length;

  return (
    <div
      className={cn(
        'bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-[20px]',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-[20px]">
        <div className="flex items-center gap-[8px]">
          <h3 className="text-[16px] font-[600] text-text-base-primary">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-[8px] py-[2px] bg-fill-brand-primary text-white text-[11px] font-[600] rounded-[12px]">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onClear}
            className="text-[12px] text-text-base-secondary hover:text-text-base-primary transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-[16px]">
        {filters.map((filter) => (
          <div key={filter.key}>
            <Label>{filter.label}</Label>
            {filter.type === 'select' && filter.options && (
              <Select
                options={filter.options}
                value={values[filter.key] || ''}
                onChange={(value) => onChange(filter.key, value)}
                placeholder={filter.placeholder || `Select ${filter.label.toLowerCase()}`}
                searchable
              />
            )}
            {filter.type === 'multiselect' && filter.options && (
              <MultiSelect
                options={filter.options}
                value={values[filter.key] || []}
                onChange={(value) => onChange(filter.key, value)}
                placeholder={filter.placeholder || `Select ${filter.label.toLowerCase()}`}
              />
            )}
            {filter.type === 'text' && (
              <Input
                value={values[filter.key] || ''}
                onChange={(e) => onChange(filter.key, e.target.value)}
                placeholder={filter.placeholder || `Enter ${filter.label.toLowerCase()}`}
              />
            )}
            {filter.type === 'date' && (
              <Input
                type="date"
                value={values[filter.key] || ''}
                onChange={(e) => onChange(filter.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      {onApply && (
        <div className="mt-[20px] pt-[20px] border-t border-stroke-base-secondary">
          <Button variant="primary" onClick={onApply} className="w-full">
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
};
