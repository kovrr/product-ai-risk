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
    <div className={`flex flex-col gap-[20px] ${className}`}>
      {/* Card 1: Top AI Assets by Risk Count */}
      {metrics.topAssets.length > 0 && (
        <div className="bg-white p-[20px] rounded-[12px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
          <div className="text-[14px] font-[600] text-[rgb(74,85,104)] mb-[12px]">
            Top AI Assets by Risk Count
          </div>
          {metrics.topAssets.slice(0, 3).map((item) => (
            <div
              key={item.asset!.id}
              className="flex items-center justify-between py-[8px] border-b border-[rgb(237,242,247)] last:border-b-0 text-[13px]"
            >
              <span className="text-[rgb(48,48,69)]">{item.asset!.name}</span>
              <span className="font-[600] text-[rgb(85,81,247)]">{item.riskCount} risks</span>
            </div>
          ))}
        </div>
      )}

      {/* Card 2: Most Common MITRE ATLAS Tactics */}
      <div className="bg-white p-[20px] rounded-[12px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
        <div className="text-[14px] font-[600] text-[rgb(74,85,104)] mb-[12px]">
          Most Common MITRE ATLAS Tactics
        </div>
        <div className="flex items-center justify-between py-[8px] border-b border-[rgb(237,242,247)] text-[13px]">
          <span className="text-[rgb(48,48,69)]">Phishing (AML.T0052)</span>
          <span className="font-[600] text-[rgb(85,81,247)]">3</span>
        </div>
        <div className="flex items-center justify-between py-[8px] border-b border-[rgb(237,242,247)] text-[13px]">
          <span className="text-[rgb(48,48,69)]">AI Supply Chain: Model</span>
          <span className="font-[600] text-[rgb(85,81,247)]">2</span>
        </div>
        <div className="flex items-center justify-between py-[8px] text-[13px]">
          <span className="text-[rgb(48,48,69)]">Evade AI Model</span>
          <span className="font-[600] text-[rgb(85,81,247)]">3</span>
        </div>
      </div>

      {/* Card 3: Impact Type Distribution */}
      <div className="bg-white p-[20px] rounded-[12px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
        <div className="text-[14px] font-[600] text-[rgb(74,85,104)] mb-[12px]">
          Impact Type Distribution
        </div>
        <div className="flex items-center justify-between py-[8px] border-b border-[rgb(237,242,247)] text-[13px]">
          <span className="text-[rgb(48,48,69)]">Financial Loss</span>
          <span className="font-[600] text-[rgb(85,81,247)]">7</span>
        </div>
        <div className="flex items-center justify-between py-[8px] border-b border-[rgb(237,242,247)] text-[13px]">
          <span className="text-[rgb(48,48,69)]">Privacy Violation</span>
          <span className="font-[600] text-[rgb(85,81,247)]">4</span>
        </div>
        <div className="flex items-center justify-between py-[8px] text-[13px]">
          <span className="text-[rgb(48,48,69)]">Regulatory Non-Compliance</span>
          <span className="font-[600] text-[rgb(85,81,247)]">9</span>
        </div>
      </div>

      {/* Card 4: Controls Mapped to Multiple Scenarios */}
      <div className="bg-white p-[20px] rounded-[12px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
        <div className="text-[14px] font-[600] text-[rgb(74,85,104)] mb-[12px]">
          Controls Mapped to Multiple Scenarios
        </div>
        <div className="flex items-center justify-between py-[8px] border-b border-[rgb(237,242,247)] text-[13px]">
          <span className="text-[rgb(48,48,69)]">GOVERN 1.1 (NIST AI RMF)</span>
          <span className="font-[600] text-[rgb(85,81,247)]">5 scenarios</span>
        </div>
        <div className="flex items-center justify-between py-[8px] border-b border-[rgb(237,242,247)] text-[13px]">
          <span className="text-[rgb(48,48,69)]">MAP 1.1 (NIST AI RMF)</span>
          <span className="font-[600] text-[rgb(85,81,247)]">4 scenarios</span>
        </div>
        <div className="flex items-center justify-between py-[8px] text-[13px]">
          <span className="text-[rgb(48,48,69)]">MEASURE 2.3 (NIST AI RMF)</span>
          <span className="font-[600] text-[rgb(85,81,247)]">3 scenarios</span>
        </div>
      </div>
    </div>
  );
};
