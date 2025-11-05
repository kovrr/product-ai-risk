import React from 'react';
import { cn } from '../../lib/utils';

export type AssetStatus = 'sanctioned' | 'shadow' | 'under_review' | 'blocked' | 'retired';

export interface StatusBadgeProps {
  status: AssetStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  sanctioned: {
    label: 'Sanctioned',
    color: 'bg-fill-success/10 text-fill-success border-fill-success/20',
    icon: '✓',
  },
  shadow: {
    label: 'Shadow AI',
    color: 'bg-fill-error/10 text-fill-error border-fill-error/20',
    icon: '⚠',
  },
  under_review: {
    label: 'Under Review',
    color: 'bg-fill-warning/10 text-fill-warning border-fill-warning/20',
    icon: '◷',
  },
  blocked: {
    label: 'Blocked',
    color: 'bg-fill-error/10 text-fill-error border-fill-error/20',
    icon: '✕',
  },
  retired: {
    label: 'Retired',
    color: 'bg-fill-base-tertiary text-text-base-tertiary border-stroke-base-secondary',
    icon: '◯',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  className,
}) => {
  const config = statusConfig[status];

  const sizeClasses = {
    sm: 'px-[8px] py-[2px] text-[11px]',
    md: 'px-[10px] py-[4px] text-[12px]',
    lg: 'px-[12px] py-[6px] text-[14px]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-[4px] rounded-[6px] font-[600] border',
        config.color,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <span>{config.icon}</span>}
      <span>{config.label}</span>
    </span>
  );
};
