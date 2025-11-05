import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps {
  value: number; // 0-100
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  showLabel?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  className,
  animated = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Determine color based on variant or value
  const getColor = () => {
    if (variant !== 'default') {
      return {
        success: 'bg-fill-success',
        warning: 'bg-fill-warning',
        error: 'bg-fill-error',
        info: 'bg-fill-info',
      }[variant];
    }

    // Auto color based on value (for risk scores)
    if (percentage >= 75) return 'bg-fill-error';
    if (percentage >= 50) return 'bg-fill-warning';
    if (percentage >= 25) return 'bg-fill-info';
    return 'bg-fill-success';
  };

  const heights = {
    sm: 'h-[6px]',
    md: 'h-[8px]',
    lg: 'h-[12px]',
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Label */}
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-[8px]">
          <span className="text-text-base-primary text-[14px] font-[600]">
            {label || `${Math.round(percentage)}%`}
          </span>
          {showLabel && !label && (
            <span className="text-text-base-secondary text-[12px] font-[400]">
              {value} / {max}
            </span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div
        className={cn(
          'w-full bg-fill-base-secondary rounded-full overflow-hidden',
          heights[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            getColor(),
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Circular Progress Component
export interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  showLabel?: boolean;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 80,
  strokeWidth = 8,
  variant = 'default',
  showLabel = true,
  className,
}) => {
  const percentage = Math.min(Math.max(value, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (variant !== 'default') {
      return {
        success: 'rgb(13, 199, 131)',
        warning: 'rgb(255, 171, 0)',
        error: 'rgb(255, 77, 79)',
        info: 'rgb(85, 81, 247)',
      }[variant];
    }

    if (percentage >= 75) return 'rgb(255, 77, 79)';
    if (percentage >= 50) return 'rgb(255, 171, 0)';
    if (percentage >= 25) return 'rgb(85, 81, 247)';
    return 'rgb(13, 199, 131)';
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(var(--fill-base-secondary))"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-text-base-primary text-[16px] font-[700]">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};
