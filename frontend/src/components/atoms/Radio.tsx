import React from 'react';
import { cn } from '../../lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface RadioProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const Radio: React.FC<RadioProps> = ({
  options,
  value,
  onChange,
  name,
  disabled = false,
  className,
  error,
  orientation = 'vertical',
}) => {
  return (
    <div className={cn('flex flex-col gap-[4px]', className)}>
      <div
        className={cn(
          'flex gap-[16px]',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
        )}
        role="radiogroup"
      >
        {options.map((option) => {
          const isSelected = value === option.value;
          const isDisabled = disabled || option.disabled;
          const radioId = `${name}-${option.value}`;

          return (
            <div key={option.value} className="flex items-start gap-[8px]">
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                id={radioId}
                onClick={() => !isDisabled && onChange(option.value)}
                disabled={isDisabled}
                className={cn(
                  'w-[20px] h-[20px] flex items-center justify-center flex-shrink-0',
                  'border-2 rounded-full transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-fill-brand-primary focus:ring-opacity-50',
                  isSelected
                    ? 'border-fill-brand-primary'
                    : 'border-stroke-base-secondary hover:border-stroke-base-primary',
                  isDisabled && 'opacity-50 cursor-not-allowed',
                  error && 'border-fill-error',
                  'mt-[2px]' // Align with text
                )}
              >
                {isSelected && (
                  <div className="w-[10px] h-[10px] rounded-full bg-fill-brand-primary" />
                )}
              </button>

              <div className="flex-1">
                <label
                  htmlFor={radioId}
                  className={cn(
                    'text-text-base-primary text-[14px] font-[400] cursor-pointer select-none block',
                    isDisabled && 'opacity-50 cursor-not-allowed'
                  )}
                  onClick={() => !isDisabled && onChange(option.value)}
                >
                  {option.label}
                </label>
                {option.description && (
                  <p className="text-text-base-tertiary text-[12px] font-[400] mt-[4px]">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-fill-error text-[12px] font-[400] mt-[4px]">{error}</p>
      )}
    </div>
  );
};

// Single Radio Button Component (for custom layouts)
export interface RadioButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className,
  id,
}) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn('flex items-center gap-[8px]', className)}>
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        id={radioId}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={cn(
          'w-[20px] h-[20px] flex items-center justify-center',
          'border-2 rounded-full transition-all',
          'focus:outline-none focus:ring-2 focus:ring-fill-brand-primary focus:ring-opacity-50',
          checked
            ? 'border-fill-brand-primary'
            : 'border-stroke-base-secondary hover:border-stroke-base-primary',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {checked && (
          <div className="w-[10px] h-[10px] rounded-full bg-fill-brand-primary" />
        )}
      </button>

      {label && (
        <label
          htmlFor={radioId}
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
  );
};
