import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

const Form = ({ className, ...props }: React.FormHTMLAttributes<HTMLFormElement>) => (
  <form className={cn('space-y-sm', className)} {...props} />
);

const FormItem = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('space-y-xs', className)} {...props} />
);

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn('text-sm font-[600] text-text-base-primary', className)} {...props} />
));
FormLabel.displayName = 'FormLabel';

const FormControl = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('', className)} {...props} />
);

const FormDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-xs text-text-base-tertiary', className)} {...props} />
);

const FormMessage = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-xs text-text-information-error', className)} {...props} />
);

// Note: FormField is typically provided by react-hook-form controller layer in app code

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage };


