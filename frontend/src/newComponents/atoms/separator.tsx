import * as React from 'react';
import { cn } from '@/lib/utils';

export const Separator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('h-[1px] w-full bg-fill-specific-divider', className)} {...props} />
);


