import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RiskScenario } from '../../data/mock-risks';
import { getAssetById, getRiskAssets } from '../../data';

interface RiskMetricsSidebarProps {
  risks: RiskScenario[];
  className?: string;
}

export const RiskMetricsSidebar: React.FC<RiskMetricsSidebarProps> = ({ risks, className = '' }) => {
  const navigate = useNavigate();

  // Calculate metrics
  const metrics = useMemo(() => {
    // Priority breakdown
    const priorityBreakdown = risks.reduce((acc, risk) => {
      acc[risk.priority] = (acc[risk.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Category breakdown
    const categoryBreakdown = risks.reduce((acc, risk) => {
      acc[risk.category] = (acc[risk.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Status breakdown
    const statusBreakdown = risks.reduce((acc, risk) => {
      acc[risk.status] = (acc[risk.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Top assets by risk count
    const assetRiskCounts: Record<number, { count: number; assetId: number }> = {};
    risks.forEach(risk => {
      const assetIds = getRiskAssets(risk.id);
      assetIds.forEach(assetId => {
        if (!assetRiskCounts[assetId]) {
          assetRiskCounts[assetId] = { count: 0, assetId };
        }
        assetRiskCounts[assetId].count++;
      });
    });

    const topAssets = Object.values(assetRiskCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(item => ({
        asset: getAssetById(item.assetId),
        riskCount: item.count,
      }))
      .filter(item => item.asset);

    // Total financial exposure
    const totalFinancialImpact = risks.reduce((sum, risk) => sum + (risk.financial_impact || 0), 0);
    const totalEAL = risks.reduce((sum, risk) => sum + (risk.expected_annual_loss || 0), 0);

    // Mitigation timeline - risks by quarter
    const now = new Date();
    const upcomingMitigations = risks
      .filter(risk => risk.mitigation_timeline && new Date(risk.mitigation_timeline) > now)
      .sort((a, b) => new Date(a.mitigation_timeline!).getTime() - new Date(b.mitigation_timeline!).getTime())
      .slice(0, 5);

    return {
      priorityBreakdown,
      categoryBreakdown,
      statusBreakdown,
      topAssets,
      totalFinancialImpact,
      totalEAL,
      upcomingMitigations,
      totalRisks: risks.length,
    };
  }, [risks]);

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'Critical': 'text-red-700 bg-red-100',
      'High': 'text-orange-700 bg-orange-100',
      'Medium': 'text-yellow-700 bg-yellow-100',
      'Low': 'text-gray-700 bg-gray-100',
    };
    return colors[priority] || 'text-gray-700 bg-gray-100';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Identified': 'text-blue-700 bg-blue-100',
      'Under Assessment': 'text-purple-700 bg-purple-100',
      'Plan in Progress': 'text-orange-700 bg-orange-100',
      'Response Plan Decided': 'text-green-700 bg-green-100',
    };
    return colors[status] || 'text-gray-700 bg-gray-100';
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Total Risks Card */}
      <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-4">
        <div className="text-xs font-semibold text-text-base-secondary mb-1">Total Risk Scenarios</div>
        <div className="text-3xl font-bold text-text-base-primary">{metrics.totalRisks}</div>
      </div>

      {/* Financial Exposure Card */}
      <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-4">
        <div className="text-xs font-semibold text-text-base-secondary mb-3">Financial Exposure</div>
        <div className="space-y-2">
          <div>
            <div className="text-xs text-text-base-tertiary">Total Impact</div>
            <div className="text-xl font-bold text-text-base-primary">
              {formatCurrency(metrics.totalFinancialImpact)}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-base-tertiary">Expected Annual Loss</div>
            <div className="text-xl font-bold text-orange-600">
              {formatCurrency(metrics.totalEAL)}
            </div>
          </div>
        </div>
      </div>

      {/* Priority Breakdown Card */}
      <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-4">
        <div className="text-xs font-semibold text-text-base-secondary mb-3">Priority Breakdown</div>
        <div className="space-y-2">
          {['Critical', 'High', 'Medium', 'Low'].map(priority => {
            const count = metrics.priorityBreakdown[priority] || 0;
            const percentage = metrics.totalRisks > 0 ? (count / metrics.totalRisks) * 100 : 0;
            
            return (
              <div key={priority}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-base-secondary">{priority}</span>
                  <span className="text-xs font-semibold text-text-base-primary">{count}</span>
                </div>
                <div className="w-full bg-fill-base-tertiary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getPriorityColor(priority)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Distribution Card */}
      <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-4">
        <div className="text-xs font-semibold text-text-base-secondary mb-3">Risk Categories</div>
        <div className="space-y-2">
          {Object.entries(metrics.categoryBreakdown)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-xs text-text-base-secondary truncate flex-1">{category}</span>
                <span className="text-xs font-semibold text-text-base-primary ml-2">{count}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Status Overview Card */}
      <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-4">
        <div className="text-xs font-semibold text-text-base-secondary mb-3">Status Overview</div>
        <div className="space-y-2">
          {Object.entries(metrics.statusBreakdown).map(([status, count]) => (
            <div key={status} className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(status)}`}>
                {status}
              </span>
              <span className="text-xs font-semibold text-text-base-primary">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Assets by Risk Card */}
      {metrics.topAssets.length > 0 && (
        <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-4">
          <div className="text-xs font-semibold text-text-base-secondary mb-3">
            Top Assets by Risk Count
          </div>
          <div className="space-y-2">
            {metrics.topAssets.map((item, index) => (
              <div
                key={item.asset!.id}
                className="flex items-center justify-between p-2 hover:bg-fill-base-secondary rounded cursor-pointer transition-colors"
                onClick={() => navigate(`/assets/${item.asset!.id}`)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-fill-brand-primary text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-xs text-text-base-primary truncate">
                    {item.asset!.name}
                  </span>
                </div>
                <span className="text-xs font-semibold text-text-base-primary ml-2 flex-shrink-0">
                  {item.riskCount} risks
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Mitigations Card */}
      {metrics.upcomingMitigations.length > 0 && (
        <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-4">
          <div className="text-xs font-semibold text-text-base-secondary mb-3">
            Upcoming Mitigations
          </div>
          <div className="space-y-2">
            {metrics.upcomingMitigations.map(risk => (
              <div
                key={risk.id}
                className="p-2 hover:bg-fill-base-secondary rounded cursor-pointer transition-colors"
                onClick={() => navigate(`/risk-register/${risk.id}`)}
              >
                <div className="text-xs font-semibold text-text-base-primary truncate">
                  {risk.risk_id} - {risk.name}
                </div>
                <div className="text-xs text-text-base-tertiary mt-1">
                  Due: {new Date(risk.mitigation_timeline!).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
