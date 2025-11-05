import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../atoms';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-[64px] px-[32px]', className)}>
      {icon && (
        <div className="w-[64px] h-[64px] mb-[20px] text-text-base-tertiary">
          {icon}
        </div>
      )}
      <h3 className="text-[18px] font-[600] text-text-base-primary mb-[8px]">
        {title}
      </h3>
      {description && (
        <p className="text-[14px] text-text-base-secondary text-center max-w-[400px] mb-[24px]">
          {description}
        </p>
      )}
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};
