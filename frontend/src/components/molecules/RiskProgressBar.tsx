import React from 'react';

export interface RiskProgressBarProps {
  score: number;
  tier: 'low' | 'medium' | 'high' | 'critical';
  showScore?: boolean;
}

/**
 * RiskProgressBar - Shows risk score as a progress bar
 * Matches ai-assets-list.html styling
 */
export const RiskProgressBar: React.FC<RiskProgressBarProps> = ({
  score,
  tier,
  showScore = true
}) => {
  const getColorClass = (tier: string) => {
    const colors = {
      low: 'bg-[rgb(13,199,131)]',
      medium: 'bg-[rgb(255,153,0)]',
      high: 'bg-[rgb(224,80,43)]',
      critical: 'bg-[rgb(255,35,35)]'
    };
    return colors[tier as keyof typeof colors] || colors.low;
  };

  return (
    <div className="flex items-center gap-[8px]">
      {/* Progress Bar */}
      <div className="flex-1 h-[8px] bg-[rgb(237,242,247)] rounded-[4px] overflow-hidden">
        <div 
          className={`h-full rounded-[4px] transition-all duration-300 ${getColorClass(tier)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      
      {/* Score */}
      {showScore && (
        <span className="text-[14px] font-[600] text-[rgb(48,48,69)] min-w-[30px]">
          {Math.round(score)}
        </span>
      )}
    </div>
  );
};
