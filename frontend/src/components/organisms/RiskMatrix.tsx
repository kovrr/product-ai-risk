import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RiskScenario, ImpactLevel, LikelihoodLevel } from '../../data/mock-risks';

interface RiskMatrixProps {
  risks: RiskScenario[];
  onRiskClick?: (risk: RiskScenario) => void;
  onCellClick?: (impactLevel: ImpactLevel, likelihoodLevel: LikelihoodLevel) => void;
  selectedCell?: { impact: ImpactLevel; likelihood: LikelihoodLevel } | null;
  className?: string;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = React.memo(({ 
  risks, 
  onRiskClick, 
  onCellClick,
  selectedCell,
  className = '' 
}) => {
  const navigate = useNavigate();

  // Define matrix dimensions (5x5)
  const impactLevels: ImpactLevel[] = ['Negligible', 'Minor', 'Moderate', 'Significant', 'Severe'];
  const likelihoodLevels: LikelihoodLevel[] = ['Very Rare', 'Rare', 'Unlikely', 'Possible', 'Expected'];

  // Map impact/likelihood to numeric values for positioning
  const getImpactScore = (impact: ImpactLevel): number => {
    const scores: Record<ImpactLevel, number> = {
      'Negligible': 1,
      'Minor': 2,
      'Moderate': 3,
      'Significant': 4,
      'Severe': 5,
    };
    return scores[impact] || 3;
  };

  const getLikelihoodScore = (likelihood: LikelihoodLevel): number => {
    const scores: Record<LikelihoodLevel, number> = {
      'Very Rare': 1,
      'Rare': 2,
      'Unlikely': 3,
      'Possible': 4,
      'Expected': 5,
    };
    return scores[likelihood] || 3;
  };

  // Calculate risk score (1-25)
  const getRiskScore = (impact: ImpactLevel, likelihood: LikelihoodLevel): number => {
    return getImpactScore(impact) * getLikelihoodScore(likelihood);
  };

  // Get cell color based on risk score
  const getCellColor = (impactIndex: number, likelihoodIndex: number): string => {
    const score = (impactIndex + 1) * (likelihoodIndex + 1);
    
    if (score >= 20) return 'bg-red-600';      // Critical (20-25)
    if (score >= 15) return 'bg-red-500';      // High (15-19)
    if (score >= 10) return 'bg-orange-500';   // High-Medium (10-14)
    if (score >= 6) return 'bg-yellow-500';    // Medium (6-9)
    return 'bg-green-500';                     // Low (1-5)
  };

  // Get text color for contrast
  const getTextColor = (impactIndex: number, likelihoodIndex: number): string => {
    const score = (impactIndex + 1) * (likelihoodIndex + 1);
    return score >= 6 ? 'text-white' : 'text-gray-800';
  };

  // Group risks by their position in the matrix
  const risksByPosition = useMemo(() => {
    const grouped: Record<string, RiskScenario[]> = {};
    
    risks.forEach(risk => {
      const impactScore = getImpactScore(risk.impact_level);
      const likelihoodScore = getLikelihoodScore(risk.likelihood_level);
      const key = `${impactScore}-${likelihoodScore}`;
      
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(risk);
    });
    
    return grouped;
  }, [risks]);

  const handleRiskClick = (risk: RiskScenario) => {
    if (onRiskClick) {
      onRiskClick(risk);
    } else {
      navigate(`/risk-register/${risk.id}`);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Matrix Container */}
      <div className="relative">
        {/* Y-axis label (Impact) */}
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90">
          <div className="text-sm font-semibold text-text-base-secondary whitespace-nowrap">
            Impact →
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="ml-4">
          {/* Header Row (Likelihood labels) */}
          <div className="flex mb-2">
            <div className="w-24"></div>
            {likelihoodLevels.map((level, index) => (
              <div key={level} className="flex-1 text-center">
                <div className="text-xs font-semibold text-text-base-secondary">
                  {level}
                </div>
              </div>
            ))}
          </div>

          {/* Matrix Rows (from Severe to Negligible - top to bottom) */}
          {[...impactLevels].reverse().map((impactLevel, rowIndex) => {
            const actualImpactIndex = impactLevels.length - 1 - rowIndex;
            
            return (
              <div key={impactLevel} className="flex mb-2">
                {/* Impact label */}
                <div className="w-24 flex items-center justify-end pr-3">
                  <div className="text-xs font-semibold text-text-base-secondary text-right">
                    {impactLevel}
                  </div>
                </div>

                {/* Matrix cells */}
                {likelihoodLevels.map((likelihoodLevel, colIndex) => {
                  const cellKey = `${actualImpactIndex + 1}-${colIndex + 1}`;
                  const cellRisks = risksByPosition[cellKey] || [];
                  const cellColor = getCellColor(actualImpactIndex, colIndex);
                  const textColor = getTextColor(actualImpactIndex, colIndex);
                  const riskScore = (actualImpactIndex + 1) * (colIndex + 1);
                  const isSelected = selectedCell?.impact === impactLevel && selectedCell?.likelihood === likelihoodLevel;

                  return (
                    <div
                      key={`${impactLevel}-${likelihoodLevel}`}
                      onClick={() => onCellClick?.(impactLevel, likelihoodLevel)}
                      className={`flex-1 aspect-square border-2 rounded-lg ${cellColor} ${textColor} 
                        flex flex-col items-center justify-center p-2 relative group transition-all 
                        hover:scale-105 hover:z-10 hover:shadow-lg cursor-pointer
                        ${isSelected ? 'border-gray-900 ring-4 ring-gray-900 ring-opacity-50 scale-105 z-10' : 'border-white'}`}
                    >
                      {/* Risk Score */}
                      <div className="text-xs font-bold opacity-50 mb-1">
                        {riskScore}
                      </div>

                      {/* Risk Count */}
                      {cellRisks.length > 0 && (
                        <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-800">
                            {cellRisks.length}
                          </span>
                        </div>
                      )}

                      {/* Risk Pills (on hover) */}
                      {cellRisks.length > 0 && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity 
                          bg-gray-900 bg-opacity-95 rounded-lg p-2 overflow-y-auto z-20">
                          <div className="space-y-1">
                            {cellRisks.map(risk => (
                              <button
                                key={risk.id}
                                onClick={() => handleRiskClick(risk)}
                                className="w-full text-left px-2 py-1 bg-white bg-opacity-10 hover:bg-opacity-20 
                                  rounded text-xs text-white transition-colors"
                              >
                                <div className="font-semibold truncate">{risk.risk_id}</div>
                                <div className="truncate opacity-80">{risk.name}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* X-axis label (Likelihood) */}
          <div className="text-center mt-2">
            <div className="text-sm font-semibold text-text-base-secondary">
              ← Likelihood
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-xs text-text-base-secondary">Low (1-5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-xs text-text-base-secondary">Medium (6-9)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-xs text-text-base-secondary">High-Medium (10-14)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-xs text-text-base-secondary">High (15-19)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span className="text-xs text-text-base-secondary">Critical (20-25)</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center">
        <div className="text-xs text-text-base-tertiary">
          Click cells to filter risks • Hover to see details • Click risk name to view full details
        </div>
        {selectedCell && (
          <button
            onClick={() => onCellClick?.(selectedCell.impact, selectedCell.likelihood)}
            className="mt-2 text-xs px-3 py-1 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
          >
            Clear Filter ({selectedCell.impact} × {selectedCell.likelihood})
          </button>
        )}
      </div>
    </div>
  );
});
