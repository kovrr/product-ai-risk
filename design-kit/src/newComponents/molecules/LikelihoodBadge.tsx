import * as React from 'react';
import { cn } from '@/lib/utils';

type Likelihood = 'Expected' | 'Likely' | 'Possible' | 'Unlikely' | 'Rare';

const MAP: Record<Likelihood, string> = {
  Expected: 'bg-viz-likelihood-tags-expected',
  Likely: 'bg-viz-likelihood-tags-likely',
  Possible: 'bg-viz-likelihood-tags-possible',
  Unlikely: 'bg-viz-likelihood-tags-unlikely',
  Rare: 'bg-viz-likelihood-tags-rare',
};

export const LikelihoodBadge: React.FC<{ value: Likelihood; className?: string }> = ({ value, className }) => {
  return (
    <span className={cn('inline-flex rounded-[10px] px-2 py-0.5 text-xs text-text-base-invert', MAP[value], className)}>
      {value}
    </span>
  );
};


