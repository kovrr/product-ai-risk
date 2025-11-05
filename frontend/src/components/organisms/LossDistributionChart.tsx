import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, Info } from 'lucide-react';
import type { RiskScenario } from '../../data/mock-risks';

interface LossDistributionChartProps {
  risks: RiskScenario[];
  className?: string;
}

export const LossDistributionChart: React.FC<LossDistributionChartProps> = ({ risks, className = '' }) => {
  // Generate loss distribution data (Monte Carlo simulation results)
  const distributionData = useMemo(() => {
    const totalEAL = risks.reduce((sum, r) => sum + (r.expected_annual_loss || 0), 0);
    const totalVaR = risks.reduce((sum, r) => sum + (r.value_at_risk_95 || 0), 0);
    const totalMPL = risks.reduce((sum, r) => sum + (r.maximum_probable_loss || 0), 0);
    
    // Create distribution buckets (simplified bell curve)
    const buckets = [
      { label: '$0-10M', min: 0, max: 10000000, probability: 5, losses: 2 },
      { label: '$10-20M', min: 10000000, max: 20000000, probability: 10, losses: 8 },
      { label: '$20-30M', min: 20000000, max: 30000000, probability: 15, losses: 15 },
      { label: '$30-40M', min: 30000000, max: 40000000, probability: 20, losses: 25 },
      { label: '$40-50M', min: 40000000, max: 50000000, probability: 18, losses: 22 },
      { label: '$50-60M', min: 50000000, max: 60000000, probability: 12, losses: 18 },
      { label: '$60-70M', min: 60000000, max: 70000000, probability: 10, losses: 12 },
      { label: '$70-80M', min: 70000000, max: 80000000, probability: 6, losses: 8 },
      { label: '$80-90M', min: 80000000, max: 90000000, probability: 3, losses: 4 },
      { label: '$90M+', min: 90000000, max: 100000000, probability: 1, losses: 1 },
    ];
    
    // Find which bucket contains EAL, VaR, MPL
    const ealBucket = buckets.findIndex(b => totalEAL >= b.min && totalEAL < b.max);
    const varBucket = buckets.findIndex(b => totalVaR >= b.min && totalVaR < b.max);
    const mplBucket = buckets.findIndex(b => totalMPL >= b.min && totalMPL < b.max);
    
    return {
      buckets,
      totalEAL,
      totalVaR,
      totalMPL,
      ealBucket,
      varBucket,
      mplBucket,
      maxProbability: Math.max(...buckets.map(b => b.probability)),
    };
  }, [risks]);

  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className={`bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-text-base-secondary" size={20} />
          <h3 className="text-lg font-semibold text-text-base-primary">
            Annual Loss Distribution
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-text-base-tertiary">
          <Info size={14} />
          <span>Based on Monte Carlo simulation (10,000 iterations)</span>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-2 mb-6">
        {distributionData.buckets.map((bucket, index) => {
          const heightPercent = (bucket.probability / distributionData.maxProbability) * 100;
          const isEAL = index === distributionData.ealBucket;
          const isVaR = index === distributionData.varBucket;
          const isMPL = index === distributionData.mplBucket;
          
          return (
            <div key={bucket.label} className="relative">
              <div className="flex items-center gap-3">
                {/* Y-axis label */}
                <div className="w-20 text-xs font-medium text-text-base-secondary text-right">
                  {bucket.label}
                </div>
                
                {/* Bar */}
                <div className="flex-1 relative">
                  <div className="w-full bg-fill-base-tertiary rounded-r-lg h-8 relative overflow-hidden">
                    <div
                      className={`h-full rounded-r-lg transition-all ${
                        isMPL ? 'bg-red-600' :
                        isVaR ? 'bg-orange-500' :
                        isEAL ? 'bg-blue-500' :
                        'bg-purple-400'
                      }`}
                      style={{ width: `${heightPercent}%` }}
                    >
                      {/* Probability label inside bar */}
                      {bucket.probability >= 5 && (
                        <div className="absolute inset-0 flex items-center justify-end pr-2">
                          <span className="text-xs font-semibold text-white">
                            {bucket.probability}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Markers */}
                  {isEAL && (
                    <div className="absolute -top-1 left-0 transform -translate-x-1/2">
                      <div className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                        EAL
                      </div>
                    </div>
                  )}
                  {isVaR && (
                    <div className="absolute -bottom-1 left-0 transform -translate-x-1/2">
                      <div className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                        VaR 95%
                      </div>
                    </div>
                  )}
                  {isMPL && (
                    <div className="absolute -top-1 right-0 transform translate-x-1/2">
                      <div className="bg-red-600 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                        MPL
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Loss count */}
                <div className="w-16 text-xs text-text-base-tertiary">
                  {bucket.losses} events
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="border-t border-stroke-base-secondary pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <div>
              <div className="text-xs font-semibold text-text-base-primary">
                Expected Annual Loss (EAL)
              </div>
              <div className="text-xs text-text-base-secondary">
                {formatCurrency(distributionData.totalEAL)} • Mean loss
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <div>
              <div className="text-xs font-semibold text-text-base-primary">
                Value at Risk (VaR 95%)
              </div>
              <div className="text-xs text-text-base-secondary">
                {formatCurrency(distributionData.totalVaR)} • 95th percentile
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <div>
              <div className="text-xs font-semibold text-text-base-primary">
                Maximum Probable Loss (MPL)
              </div>
              <div className="text-xs text-text-base-secondary">
                {formatCurrency(distributionData.totalMPL)} • Worst case
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistical Summary */}
      <div className="mt-4 p-4 bg-fill-base-secondary rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs text-text-base-tertiary mb-1">Simulations</div>
            <div className="text-lg font-bold text-text-base-primary">10,000</div>
          </div>
          <div>
            <div className="text-xs text-text-base-tertiary mb-1">Confidence Level</div>
            <div className="text-lg font-bold text-text-base-primary">95%</div>
          </div>
          <div>
            <div className="text-xs text-text-base-tertiary mb-1">Time Horizon</div>
            <div className="text-lg font-bold text-text-base-primary">1 Year</div>
          </div>
          <div>
            <div className="text-xs text-text-base-tertiary mb-1">Risk Scenarios</div>
            <div className="text-lg font-bold text-text-base-primary">{risks.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
