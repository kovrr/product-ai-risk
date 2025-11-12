import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RiskScenario, ImpactLevel, LikelihoodLevel } from '../../data/mock-risks';
import { 
  getHeatMapColor, 
  getHeatMapTextColor, 
  getImpactIndex, 
  getLikelihoodIndex,
  HEAT_MAP_STYLES 
} from '../../utils/heatMapColors';

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

  // Map impact/likelihood to numeric values for positioning (1-based for risk score calculation)
  const getImpactScore = (impact: ImpactLevel): number => {
    return getImpactIndex(impact) + 1;
  };

  const getLikelihoodScore = (likelihood: LikelihoodLevel): number => {
    return getLikelihoodIndex(likelihood) + 1;
  };

  // Calculate risk score (1-25)
  const getRiskScore = (impact: ImpactLevel, likelihood: LikelihoodLevel): number => {
    return getImpactScore(impact) * getLikelihoodScore(likelihood);
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
    <div className={className}>
      {/* Matrix Title */}
      <h3 className="text-[20px] font-[600] text-[rgb(26,32,44)] mb-[20px]">
        Risk Prioritization Matrix (5×5)
      </h3>

      {/* Matrix Grid - CSS Grid Layout matching HTML */}
      <div 
        className="grid gap-[2px] mt-[20px]"
        style={{
          gridTemplateColumns: '100px repeat(5, 1fr)',
          gridTemplateRows: '40px repeat(5, 90px)',
        }}
      >
        {/* Empty top-left corner */}
        <div></div>

        {/* Header Row (Likelihood labels) */}
        {likelihoodLevels.map((level) => (
          <div 
            key={level} 
            className="bg-[rgb(237,242,247)] flex items-center justify-center text-[11px] font-[600] text-[rgb(74,85,104)] uppercase"
          >
            {level === 'Very Rare' ? 'RARE' : level.toUpperCase()}
          </div>
        ))}

        {/* Matrix Rows (from Severe to Negligible - top to bottom) */}
        {[...impactLevels].reverse().map((impactLevel, rowIndex) => {
          const actualImpactIndex = impactLevels.length - 1 - rowIndex;
          
          return (
            <React.Fragment key={impactLevel}>
              {/* Impact label (vertical text) */}
              <div 
                className="bg-[rgb(237,242,247)] flex items-center justify-center text-[11px] font-[600] text-[rgb(74,85,104)] uppercase"
                style={{
                  writingMode: 'vertical-lr',
                  transform: 'rotate(180deg)',
                }}
              >
                {impactLevel.toUpperCase()}
              </div>

              {/* Matrix cells */}
              {likelihoodLevels.map((likelihoodLevel, colIndex) => {
                  const cellKey = `${actualImpactIndex + 1}-${colIndex + 1}`;
                  const cellRisks = risksByPosition[cellKey] || [];
                  const cellColor = getHeatMapColor(actualImpactIndex, colIndex);
                  const riskScore = (actualImpactIndex + 1) * (colIndex + 1);
                  const isSelected = selectedCell?.impact === impactLevel && selectedCell?.likelihood === likelihoodLevel;

                  return (
                    <div
                      key={`${impactLevel}-${likelihoodLevel}`}
                      onClick={() => onCellClick?.(impactLevel, likelihoodLevel)}
                      style={{ backgroundColor: cellColor }}
                      className={`relative border border-[rgb(220,229,242)] flex items-center justify-center p-[8px] text-[rgb(48,48,69)] cursor-pointer transition-all group
                        ${isSelected ? 'border-[rgb(85,81,247)] shadow-[0_0_0_2px_rgba(85,81,247,0.1)]' : 'hover:border-[rgb(85,81,247)] hover:shadow-[0_0_0_2px_rgba(85,81,247,0.1)]'}`}
                    >
                      {/* Risk Count Badge */}
                      {cellRisks.length > 0 && (
                        <span className="absolute top-[4px] right-[4px] bg-[rgb(85,81,247)] text-white rounded-[10px] px-[6px] py-[2px] text-[10px] font-[600]">
                          {cellRisks.length}
                        </span>
                      )}

                      {/* Cell Scenarios */}
                      {cellRisks.length > 0 && (
                        <div className="text-[10px] text-[rgb(48,48,69)] text-center leading-[1.3]">
                          {cellRisks.slice(0, 3).map(risk => (
                            <div key={risk.id}>{risk.risk_id}</div>
                          ))}
                          {cellRisks.length > 3 && <div>+{cellRisks.length - 3}</div>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
      </div>

      {/* Instructions */}
      {selectedCell && (
        <div className="mt-4 text-center">
          <button
            onClick={() => onCellClick?.(selectedCell.impact, selectedCell.likelihood)}
            className="text-xs px-3 py-1 bg-[rgb(85,81,247)] text-white rounded-full hover:bg-[rgb(97,94,251)] transition-colors"
          >
            Clear Filter ({selectedCell.impact} × {selectedCell.likelihood})
          </button>
        </div>
      )}
    </div>
  );
});
