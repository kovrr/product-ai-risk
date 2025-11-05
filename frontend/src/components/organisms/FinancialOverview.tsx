import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, Target, PieChart } from 'lucide-react';
import type { RiskScenario } from '../../data/mock-risks';

interface FinancialOverviewProps {
  risks: RiskScenario[];
  className?: string;
}

export const FinancialOverview: React.FC<FinancialOverviewProps> = ({ risks, className = '' }) => {
  const financialMetrics = useMemo(() => {
    // Total Financial Impact
    const totalImpact = risks.reduce((sum, r) => sum + (r.financial_impact || 0), 0);
    
    // Expected Annual Loss (EAL)
    const totalEAL = risks.reduce((sum, r) => sum + (r.expected_annual_loss || 0), 0);
    
    // Value at Risk (VaR) - 95th percentile
    const totalVaR = risks.reduce((sum, r) => sum + (r.value_at_risk_95 || 0), 0);
    
    // Maximum Probable Loss (MPL)
    const totalMPL = risks.reduce((sum, r) => sum + (r.maximum_probable_loss || 0), 0);
    
    // Average per risk
    const avgImpact = risks.length > 0 ? totalImpact / risks.length : 0;
    
    // By priority
    const criticalImpact = risks
      .filter(r => r.priority === 'Critical')
      .reduce((sum, r) => sum + (r.financial_impact || 0), 0);
    
    const highImpact = risks
      .filter(r => r.priority === 'High')
      .reduce((sum, r) => sum + (r.financial_impact || 0), 0);
    
    // By category
    const categoryBreakdown = risks.reduce((acc, risk) => {
      const impact = risk.financial_impact || 0;
      acc[risk.category] = (acc[risk.category] || 0) + impact;
      return acc;
    }, {} as Record<string, number>);
    
    // Top 3 risks by financial impact
    const topRisks = [...risks]
      .sort((a, b) => (b.financial_impact || 0) - (a.financial_impact || 0))
      .slice(0, 3);
    
    // Mitigation cost estimate (10% of total impact)
    const estimatedMitigationCost = totalImpact * 0.1;
    
    // Potential savings (70% of EAL if all risks mitigated)
    const potentialSavings = totalEAL * 0.7;
    
    // ROI calculation
    const roi = estimatedMitigationCost > 0 
      ? ((potentialSavings - estimatedMitigationCost) / estimatedMitigationCost) * 100 
      : 0;
    
    return {
      totalImpact,
      totalEAL,
      totalVaR,
      totalMPL,
      avgImpact,
      criticalImpact,
      highImpact,
      categoryBreakdown,
      topRisks,
      estimatedMitigationCost,
      potentialSavings,
      roi,
    };
  }, [risks]);

  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const formatPercent = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-text-base-primary mb-2">
          Financial Quantification Overview
        </h2>
        <p className="text-sm text-text-base-secondary">
          Comprehensive financial analysis of {risks.length} risk scenarios
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Financial Impact */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-[10px] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-semibold text-red-700 uppercase tracking-wide">
              Total Impact
            </div>
            <DollarSign className="text-red-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-red-900 mb-1">
            {formatCurrency(financialMetrics.totalImpact)}
          </div>
          <div className="text-xs text-red-700">
            Avg: {formatCurrency(financialMetrics.avgImpact)} per risk
          </div>
        </div>

        {/* Expected Annual Loss */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-[10px] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
              Expected Annual Loss
            </div>
            <TrendingDown className="text-orange-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-orange-900 mb-1">
            {formatCurrency(financialMetrics.totalEAL)}
          </div>
          <div className="text-xs text-orange-700">
            {formatPercent((financialMetrics.totalEAL / financialMetrics.totalImpact) * 100)} of total impact
          </div>
        </div>

        {/* Value at Risk (VaR) */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-[10px] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
              Value at Risk (95%)
            </div>
            <AlertCircle className="text-purple-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-purple-900 mb-1">
            {formatCurrency(financialMetrics.totalVaR)}
          </div>
          <div className="text-xs text-purple-700">
            95th percentile loss
          </div>
        </div>

        {/* Maximum Probable Loss */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-[10px] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Maximum Probable Loss
            </div>
            <Target className="text-blue-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-blue-900 mb-1">
            {formatCurrency(financialMetrics.totalMPL)}
          </div>
          <div className="text-xs text-blue-700">
            Worst-case scenario
          </div>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Critical & High Risks */}
        <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-4">
          <h3 className="text-sm font-semibold text-text-base-primary mb-4">
            High-Priority Risk Exposure
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-text-base-secondary">Critical Priority</span>
                <span className="text-sm font-bold text-red-700">
                  {formatCurrency(financialMetrics.criticalImpact)}
                </span>
              </div>
              <div className="w-full bg-fill-base-tertiary rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ 
                    width: `${(financialMetrics.criticalImpact / financialMetrics.totalImpact) * 100}%` 
                  }}
                />
              </div>
              <div className="text-xs text-text-base-tertiary mt-1">
                {formatPercent((financialMetrics.criticalImpact / financialMetrics.totalImpact) * 100)} of total
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-text-base-secondary">High Priority</span>
                <span className="text-sm font-bold text-orange-700">
                  {formatCurrency(financialMetrics.highImpact)}
                </span>
              </div>
              <div className="w-full bg-fill-base-tertiary rounded-full h-2">
                <div
                  className="bg-orange-600 h-2 rounded-full"
                  style={{ 
                    width: `${(financialMetrics.highImpact / financialMetrics.totalImpact) * 100}%` 
                  }}
                />
              </div>
              <div className="text-xs text-text-base-tertiary mt-1">
                {formatPercent((financialMetrics.highImpact / financialMetrics.totalImpact) * 100)} of total
              </div>
            </div>
          </div>
        </div>

        {/* ROI Analysis */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-[10px] p-4">
          <h3 className="text-sm font-semibold text-green-900 mb-4">
            Mitigation ROI Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-700">Estimated Mitigation Cost</span>
              <span className="text-sm font-bold text-green-900">
                {formatCurrency(financialMetrics.estimatedMitigationCost)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-700">Potential Annual Savings</span>
              <span className="text-sm font-bold text-green-900">
                {formatCurrency(financialMetrics.potentialSavings)}
              </span>
            </div>
            <div className="border-t border-green-300 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-green-700">Expected ROI</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="text-green-600" size={16} />
                  <span className="text-lg font-bold text-green-900">
                    {formatPercent(financialMetrics.roi)}
                  </span>
                </div>
              </div>
              <div className="text-xs text-green-700 mt-1">
                Break-even in {(100 / financialMetrics.roi * 12).toFixed(1)} months
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-4">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="text-text-base-secondary" size={20} />
          <h3 className="text-sm font-semibold text-text-base-primary">
            Financial Impact by Category
          </h3>
        </div>
        <div className="space-y-2">
          {Object.entries(financialMetrics.categoryBreakdown)
            .sort(([, a], [, b]) => b - a)
            .map(([category, amount]) => {
              const percentage = (amount / financialMetrics.totalImpact) * 100;
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-text-base-secondary truncate flex-1">
                      {category}
                    </span>
                    <span className="text-sm font-bold text-text-base-primary ml-2">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                  <div className="w-full bg-fill-base-tertiary rounded-full h-2">
                    <div
                      className="bg-fill-brand-primary h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-text-base-tertiary mt-1">
                    {formatPercent(percentage)} of total impact
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Top 3 Risks by Financial Impact */}
      <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-4">
        <h3 className="text-sm font-semibold text-text-base-primary mb-4">
          Top 3 Risks by Financial Impact
        </h3>
        <div className="space-y-3">
          {financialMetrics.topRisks.map((risk, index) => (
            <div
              key={risk.id}
              className="flex items-start gap-3 p-3 bg-fill-base-secondary rounded-lg hover:bg-fill-base-tertiary transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-orange-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-text-base-primary truncate">
                  {risk.name}
                </div>
                <div className="text-xs text-text-base-secondary mt-1">
                  {risk.risk_id} • {risk.category}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <div className="text-xs text-text-base-tertiary">Financial Impact</div>
                    <div className="text-sm font-bold text-red-700">
                      {formatCurrency(risk.financial_impact)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-base-tertiary">EAL</div>
                    <div className="text-sm font-bold text-orange-700">
                      {formatCurrency(risk.expected_annual_loss || 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
