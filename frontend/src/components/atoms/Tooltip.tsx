import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  className,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const timeoutRef = useRef<number | undefined>(undefined);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newPosition = position;

      // Check if tooltip goes off screen and adjust position
      if (position === 'top' && triggerRect.top - tooltipRect.height < 0) {
        newPosition = 'bottom';
      } else if (position === 'bottom' && triggerRect.bottom + tooltipRect.height > viewportHeight) {
        newPosition = 'top';
      } else if (position === 'left' && triggerRect.left - tooltipRect.width < 0) {
        newPosition = 'right';
      } else if (position === 'right' && triggerRect.right + tooltipRect.width > viewportWidth) {
        newPosition = 'left';
      }

      setTooltipPosition(newPosition);
    }
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-[8px]',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-[8px]',
    left: 'right-full top-1/2 -translate-y-1/2 mr-[8px]',
    right: 'left-full top-1/2 -translate-y-1/2 ml-[8px]',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-fill-base-inverse border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-fill-base-inverse border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-fill-base-inverse border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-fill-base-inverse border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {children}
      </div>

      {isVisible && !disabled && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={cn(
            'absolute z-50 px-[12px] py-[8px]',
            'bg-fill-base-inverse text-text-base-inverse',
            'text-[12px] font-[400] leading-[16px]',
            'rounded-[8px] shadow-lg',
            'whitespace-nowrap max-w-[300px]',
            'pointer-events-none',
            'animate-in fade-in-0 zoom-in-95 duration-200',
            positionClasses[tooltipPosition],
            className
          )}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn(
              'absolute w-0 h-0',
              'border-[6px]',
              arrowClasses[tooltipPosition]
            )}
          />
        </div>
      )}
    </div>
  );
};
