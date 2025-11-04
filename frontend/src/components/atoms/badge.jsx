import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded px-2 py-1 text-xs font-[600] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-fill-brand-primary text-text-base-invert hover:opacity-90',
        secondary:
          'bg-fill-base-2 text-text-base-primary hover:bg-fill-base-3',
        destructive:
          'bg-fill-information-error/10 text-text-information-error',
        success:
          'bg-fill-information-success/10 text-text-information-success',
        warning:
          'bg-fill-information-warning/10 text-fill-information-warning',
        info:
          'bg-fill-information-info/10 text-text-information-info',
        outline: 'border border-input text-text-base-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
