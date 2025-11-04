import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[15px] text-sm font-[600] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-fill-brand-primary text-text-base-invert hover:opacity-90',
        destructive:
          'bg-fill-information-error text-text-base-invert hover:opacity-90',
        outline:
          'border-2 border-fill-brand-primary text-text-brand-primary hover:bg-fill-brand-primary hover:text-text-base-invert',
        secondary:
          'bg-fill-base-1 text-text-base-primary hover:bg-fill-base-2',
        ghost: 'text-text-brand-primary hover:bg-fill-brand-primary-transparent',
        link: 'text-text-brand-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-[10px] px-3',
        lg: 'h-11 rounded-[15px] px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

// TabButton variant for tab navigation
const TabButton = React.forwardRef(
  ({ className, active, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        className={cn(
          'rounded-[10px] font-[600]',
          active && 'bg-fill-brand-primary text-text-base-invert hover:bg-fill-brand-primary hover:opacity-90',
          className
        )}
        {...props}
      />
    );
  }
);
TabButton.displayName = 'TabButton';

export { Button, TabButton, buttonVariants };
