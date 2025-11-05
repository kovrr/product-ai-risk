import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  searchable = false,
  className,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

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

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={selectRef} className={cn('relative w-full', className)}>
      {/* Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between',
          'px-[16px] py-[10px]',
          'bg-fill-base-primary border border-stroke-base-secondary rounded-[10px]',
          'text-text-base-primary text-[14px] font-[400]',
          'hover:border-stroke-base-primary transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-fill-brand-primary focus:ring-opacity-50',
          disabled && 'opacity-50 cursor-not-allowed',
          error && 'border-fill-error',
          'text-left'
        )}
      >
        <span className={cn(!selectedOption && 'text-text-base-tertiary')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
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
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    'w-full px-[16px] py-[10px] text-left',
                    'text-text-base-primary text-[14px] font-[400]',
                    'hover:bg-fill-base-secondary transition-colors',
                    option.value === value && 'bg-fill-base-secondary font-[600]',
                    option.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {option.label}
                </button>
              ))
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
