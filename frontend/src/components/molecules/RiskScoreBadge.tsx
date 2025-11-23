import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../atoms';

export type RiskTier = 'low' | 'medium' | 'high' | 'critical';

export interface RiskScoreBadgeProps {
  tier: RiskTier;
  score?: number;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const tierConfig = {
  low: {
    label: 'Low',
    color: 'bg-[rgb(13,199,131)] text-white',
    dotColor: 'bg-[rgb(13,199,131)]',
  },
  medium: {
    label: 'Medium',
    color: 'bg-[rgb(251,188,9)] text-white',
    dotColor: 'bg-[rgb(251,188,9)]',
  },
  high: {
    label: 'High',
    color: 'bg-[rgb(255,153,0)] text-white',
    dotColor: 'bg-[rgb(255,153,0)]',
  },
  critical: {
    label: 'Critical',
    color: 'bg-[rgb(255,35,35)] text-white',
    dotColor: 'bg-[rgb(255,35,35)]',
  },
};

export const RiskScoreBadge: React.FC<RiskScoreBadgeProps> = ({
  tier,
  score,
  showScore = false,
  size = 'md',
  className,
}) => {
  const config = tierConfig[tier];

  const sizeClasses = {
    sm: 'px-[8px] py-[2px] text-[11px]',
    md: 'px-[10px] py-[4px] text-[12px]',
    lg: 'px-[12px] py-[6px] text-[14px]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-[6px] rounded-[6px] font-[600]',
        config.color,
        sizeClasses[size],
        className
      )}
    >
      <span className={cn('w-[6px] h-[6px] rounded-full', config.dotColor)} />
      <span>{config.label}</span>
      {showScore && score !== undefined && (
        <span className="opacity-90">({score})</span>
      )}
    </span>
  );
};

// Progress bar variant
export interface RiskScoreProgressProps {
  score: number; // 0-100
  tier?: RiskTier;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RiskScoreProgress: React.FC<RiskScoreProgressProps> = ({
  score,
  tier,
  showLabel = true,
  size = 'md',
  className,
}) => {
  // Auto-determine tier if not provided
  const autoTier: RiskTier = tier || (
    score >= 75 ? 'critical' :
    score >= 50 ? 'high' :
    score >= 25 ? 'medium' : 'low'
  );

  const config = tierConfig[autoTier];
  const percentage = Math.min(Math.max(score, 0), 100);

  const heights = {
    sm: 'h-[4px]',
    md: 'h-[6px]',
    lg: 'h-[8px]',
  };

  return (
    <div className={cn('flex items-center gap-[8px]', className)}>
      {showLabel && (
        <span className="text-[12px] font-[600] text-text-base-primary min-w-[32px]">
          {Math.round(score)}
        </span>
      )}
      <div className="flex-1 flex items-center gap-[8px]">
        <div
          className={cn(
            'flex-1 bg-fill-base-secondary rounded-full overflow-hidden',
            heights[size]
          )}
        >
          <div
            className={cn('h-full rounded-full transition-all', config.dotColor)}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <RiskScoreBadge tier={autoTier} size="sm" />
      </div>
    </div>
  );
};
