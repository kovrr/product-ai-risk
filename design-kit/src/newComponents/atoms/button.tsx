import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[15px] text-[16px] font-[600] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:opacity-90',
        destructive: 'bg-destructive text-text-base-invert hover:opacity-90',
        outline: 'border border-input bg-transparent text-text-base-primary',
        secondary: 'bg-secondary text-text-base-primary',
        ghost: 'bg-transparent hover:bg-fill-base-n1',
        link: 'bg-transparent underline underline-offset-4',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-[15px] px-3',
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        aria-busy={loading}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <span className="relative inline-flex items-center gap-[8px]">
            <span className="h-[16px] w-[16px] animate-spin rounded-full border-2 border-fill-base-4 border-t-transparent" />
            <span className="opacity-80">{children}</span>
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export interface TabButtonProps
  extends Omit<ButtonProps, 'variant'> {
  active?: boolean;
}

export const TabButton = React.forwardRef<HTMLButtonElement, TabButtonProps>(
  ({ active = false, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        className={cn(
          'rounded-[15px] px-4 py-2',
          active ? 'bg-fill-brand-primary text-text-base-invert' : 'text-text-base-secondary'
        )}
        {...props}
      />
    );
  }
);
TabButton.displayName = 'TabButton';


