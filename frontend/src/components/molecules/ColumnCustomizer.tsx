import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Button, Checkbox } from '../atoms';

export interface ColumnConfig {
  key: string;
  label: string;
  visible: boolean;
  locked?: boolean;
}

export interface ColumnCustomizerProps {
  columns: ColumnConfig[];
  onSave: (columns: ColumnConfig[]) => void;
  onClose: () => void;
  className?: string;
}

export const ColumnCustomizer: React.FC<ColumnCustomizerProps> = ({
  columns,
  onSave,
  onClose,
  className,
}) => {
  const [localColumns, setLocalColumns] = useState<ColumnConfig[]>(columns);

  const handleToggle = (key: string) => {
    setLocalColumns((prev) =>
      prev.map((col) =>
        col.key === key && !col.locked ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSelectAll = () => {
    setLocalColumns((prev) =>
      prev.map((col) => (col.locked ? col : { ...col, visible: true }))
    );
  };

  const handleDeselectAll = () => {
    setLocalColumns((prev) =>
      prev.map((col) => (col.locked ? col : { ...col, visible: false }))
    );
  };

  const handleSave = () => {
    onSave(localColumns);
    onClose();
  };

  const visibleCount = localColumns.filter((col) => col.visible).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={cn(
          'bg-fill-base-primary rounded-[15px] shadow-xl',
          'w-full max-w-[500px]',
          className
        )}
      >
        {/* Header */}
        <div className="p-[24px] border-b border-stroke-base-secondary">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-[600] text-text-base-primary">
              Customize Columns
            </h2>
            <button
              onClick={onClose}
              className="text-text-base-secondary hover:text-text-base-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p className="text-[14px] text-text-base-secondary mt-[8px]">
            Select which columns to display in the table
          </p>
        </div>

        {/* Quick Actions */}
        <div className="px-[24px] pt-[16px] flex gap-[12px]">
          <button
            onClick={handleSelectAll}
            className="text-[12px] text-fill-brand-primary hover:underline"
          >
            Select All
          </button>
          <span className="text-text-base-tertiary">•</span>
          <button
            onClick={handleDeselectAll}
            className="text-[12px] text-fill-brand-primary hover:underline"
          >
            Deselect All
          </button>
        </div>

        {/* Column List */}
        <div className="p-[24px] max-h-[400px] overflow-y-auto">
          <div className="space-y-[12px]">
            {localColumns.map((column) => (
              <div
                key={column.key}
                className={cn(
                  'flex items-center gap-[12px] p-[12px] rounded-[8px]',
                  'border border-stroke-base-secondary',
                  column.locked && 'bg-fill-base-secondary opacity-60'
                )}
              >
                <Checkbox
                  checked={column.visible}
                  onChange={() => handleToggle(column.key)}
                  disabled={column.locked}
                />
                <div className="flex-1">
                  <span className="text-[14px] text-text-base-primary">
                    {column.label}
                  </span>
                  {column.locked && (
                    <span className="ml-[8px] text-[11px] text-text-base-tertiary">
                      (Required)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-[24px] border-t border-stroke-base-secondary flex items-center justify-between">
          <span className="text-[14px] text-text-base-secondary">
            {visibleCount} of {localColumns.length} columns visible
          </span>
          <div className="flex gap-[12px]">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
