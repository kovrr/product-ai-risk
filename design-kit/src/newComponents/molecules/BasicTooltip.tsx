import * as React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/newComponents/atoms/tooltip';

type Props = {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export const BasicTooltip: React.FC<Props> = ({ content, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{children}</span>
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};


