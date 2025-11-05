import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  title: React.ReactNode;
  right?: React.ReactNode;
};

export const TableHeaderCell: React.FC<Props> = ({ title, right, className, ...props }) => (
  <div className={cn('flex items-center justify-between text-text-base-secondary font-[600]', className)} {...props}>
    <span>{title}</span>
    {right ? <span className="ml-sm">{right}</span> : null}
  </div>
);


