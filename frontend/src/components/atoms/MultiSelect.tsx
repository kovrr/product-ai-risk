import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
  error?: string;
  maxDisplay?: number;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [],
  onChange,
  placeholder = 'Select options',
  disabled = false,
  searchable = true,
  className,
  error,
  maxDisplay = 3,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <div ref={selectRef} className={cn('relative w-full', className)}>
      {/* Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between gap-[8px]',
          'px-[16px] py-[10px] min-h-[44px]',
          'bg-fill-base-primary border border-stroke-base-secondary rounded-[10px]',
          'text-text-base-primary text-[14px] font-[400]',
          'hover:border-stroke-base-primary transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-fill-brand-primary focus:ring-opacity-50',
          disabled && 'opacity-50 cursor-not-allowed',
          error && 'border-fill-error',
          'text-left'
        )}
      >
        <div className="flex-1 flex flex-wrap gap-[6px]">
          {selectedOptions.length === 0 ? (
            <span className="text-text-base-tertiary">{placeholder}</span>
          ) : (
            <>
              {selectedOptions.slice(0, maxDisplay).map((option) => (
                <span
                  key={option.value}
                  className={cn(
                    'inline-flex items-center gap-[4px]',
                    'px-[8px] py-[4px]',
                    'bg-fill-base-secondary rounded-[6px]',
                    'text-[12px] font-[600]'
                  )}
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => handleRemove(option.value, e)}
                    className="hover:text-fill-error transition-colors"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}
              {selectedOptions.length > maxDisplay && (
                <span className="px-[8px] py-[4px] text-[12px] text-text-base-secondary">
                  +{selectedOptions.length - maxDisplay} more
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-[8px]">
          {selectedOptions.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-text-base-secondary hover:text-text-base-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          <svg
            className={cn(
              'w-4 h-4 transition-transform text-text-base-secondary',
              isOpen && 'transform rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 w-full mt-[4px]',
            'bg-fill-base-primary border border-stroke-base-secondary rounded-[10px]',
            'shadow-lg max-h-[240px] overflow-auto'
          )}
        >
          {/* Search Input */}
          {searchable && (
            <div className="p-[8px] border-b border-stroke-base-secondary">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className={cn(
                  'w-full px-[12px] py-[6px]',
                  'bg-fill-base-secondary border border-stroke-base-secondary rounded-[8px]',
                  'text-text-base-primary text-[14px]',
                  'focus:outline-none focus:ring-2 focus:ring-fill-brand-primary focus:ring-opacity-50'
                )}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Options */}
          <div className="py-[4px]">
            {filteredOptions.length === 0 ? (
              <div className="px-[16px] py-[10px] text-text-base-tertiary text-[14px]">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => !option.disabled && handleToggle(option.value)}
                    disabled={option.disabled}
                    className={cn(
                      'w-full px-[16px] py-[10px] text-left',
                      'flex items-center gap-[12px]',
                      'text-text-base-primary text-[14px] font-[400]',
                      'hover:bg-fill-base-secondary transition-colors',
                      option.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {/* Checkbox */}
                    <div
                      className={cn(
                        'w-[16px] h-[16px] flex items-center justify-center',
                        'border-2 rounded-[4px] transition-colors',
                        isSelected
                          ? 'bg-fill-brand-primary border-fill-brand-primary'
                          : 'border-stroke-base-secondary'
                      )}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className={isSelected ? 'font-[600]' : ''}>{option.label}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-[4px] text-fill-error text-[12px] font-[400]">{error}</p>
      )}
    </div>
  );
};
