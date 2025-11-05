import React from 'react';
import { cn } from '../../lib/utils';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className,
  error,
  id,
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn('flex flex-col gap-[4px]', className)}>
      <div className="flex items-center gap-[8px]">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          id={checkboxId}
          onClick={() => !disabled && onChange(!checked)}
          disabled={disabled}
          className={cn(
            'w-[20px] h-[20px] flex items-center justify-center',
            'border-2 rounded-[6px] transition-all',
            'focus:outline-none focus:ring-2 focus:ring-fill-brand-primary focus:ring-opacity-50',
            checked
              ? 'bg-fill-brand-primary border-fill-brand-primary'
              : 'bg-fill-base-primary border-stroke-base-secondary hover:border-stroke-base-primary',
            disabled && 'opacity-50 cursor-not-allowed',
            error && 'border-fill-error'
          )}
        >
          {checked && (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              'text-text-base-primary text-[14px] font-[400] cursor-pointer select-none',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => !disabled && onChange(!checked)}
          >
            {label}
          </label>
        )}
      </div>

      {error && (
        <p className="text-fill-error text-[12px] font-[400] ml-[28px]">{error}</p>
      )}
    </div>
  );
};
