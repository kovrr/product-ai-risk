import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, TrendingUp, CheckCircle, Lightbulb, ArrowRight, Target } from 'lucide-react';
import type { RiskScenario } from '../../data/mock-risks';

interface AIRecommendationsProps {
  risks: RiskScenario[];
  className?: string;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ risks, className = '' }) => {
  const navigate = useNavigate();

  // Generate AI-powered insights
  const insights = useMemo(() => {
    const criticalRisks = risks.filter(r => r.priority === 'Critical');
    const highRisks = risks.filter(r => r.priority === 'High');
    const expectedLikelihood = risks.filter(r => r.likelihood_level === 'Expected');
    const totalEAL = risks.reduce((sum, r) => sum + (r.expected_annual_loss || 0), 0);
    const overdueRisks = risks.filter(r => 
      r.mitigation_timeline && new Date(r.mitigation_timeline) < new Date()
    );
    const plannedRisks = risks.filter(r => r.status === 'Response Plan Decided');

    // Top priority risk
    const topRisk = risks.sort((a, b) => {
      const scoreA = (a.financial_impact || 0) * (a.likelihood_level === 'Expected' ? 5 : 3);
      const scoreB = (b.financial_impact || 0) * (b.likelihood_level === 'Expected' ? 5 : 3);
      return scoreB - scoreA;
    })[0];

    return {
      criticalRisks,
      highRisks,
      expectedLikelihood,
      totalEAL,
      overdueRisks,
      plannedRisks,
      topRisk,
    };
  }, [risks]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toFixed(0)}`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-4">
          <Lightbulb className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-text-base-primary mb-2">
          Kovrr AI Insights
        </h2>
        <p className="text-text-base-secondary">
          AI-powered risk analysis and strategic recommendations
        </p>
      </div>

      {/* Top Priority Recommendation */}
      {insights.topRisk && (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-[15px] p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-red-700 uppercase tracking-wide">
                  Top Priority
                </span>
                <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">
                  Action Required
                </span>
              </div>
              <h3 className="text-lg font-bold text-red-900 mb-2">
                {insights.topRisk.name}
              </h3>
              <p className="text-sm text-red-800 mb-4">
                <strong>Risk ID:</strong> {insights.topRisk.risk_id} • 
                <strong className="ml-2">Financial Impact:</strong> {formatCurrency(insights.topRisk.financial_impact)} • 
                <strong className="ml-2">Likelihood:</strong> {insights.topRisk.likelihood_level}
              </p>
              <div className="bg-white bg-opacity-60 rounded-lg p-4 mb-4">
                <div className="text-sm font-semibold text-red-900 mb-2">💡 AI Recommendation:</div>
                <div className="text-sm text-red-800">
                  This risk represents the highest combined threat based on financial impact and likelihood. 
                  Immediate mitigation could reduce your Expected Annual Loss by up to{' '}
                  {formatCurrency(insights.topRisk.expected_annual_loss || 0)}.
                </div>
              </div>
              <button
                onClick={() => navigate(`/risk-register/${insights.topRisk.id}`)}
                className="btn btn-primary bg-red-600 hover:bg-red-700 text-white"
              >
                View Risk Details
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Critical Risks Alert */}
        <div className="bg-orange-50 border border-orange-200 rounded-[10px] p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="text-white" size={16} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-orange-900 mb-1">
                High-Risk Portfolio Alert
              </div>
              <div className="text-sm text-orange-800 mb-3">
                You have <strong>{insights.criticalRisks.length} Critical</strong> and{' '}
                <strong>{insights.highRisks.length} High</strong> priority risks requiring immediate attention.
              </div>
              <div className="text-xs text-orange-700">
                <strong>Impact:</strong> Combined EAL of {formatCurrency(insights.totalEAL)}
              </div>
            </div>
          </div>
        </div>

        {/* Likelihood Trend */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-[10px] p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="text-white" size={16} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-yellow-900 mb-1">
                Likelihood Trend Analysis
              </div>
              <div className="text-sm text-yellow-800 mb-3">
                <strong>{insights.expectedLikelihood.length} risks</strong> have "Expected" likelihood - 
                these events are highly probable within the next 12 months.
              </div>
              <div className="text-xs text-yellow-700">
                <strong>Recommendation:</strong> Prioritize preventive controls
              </div>
            </div>
          </div>
        </div>

        {/* Progress Update */}
        <div className="bg-green-50 border border-green-200 rounded-[10px] p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="text-white" size={16} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-green-900 mb-1">
                Mitigation Progress
              </div>
              <div className="text-sm text-green-800 mb-3">
                <strong>{insights.plannedRisks.length} risks</strong> have response plans decided - 
                you're on track for Q4 2025 mitigation goals.
              </div>
              <div className="text-xs text-green-700">
                <strong>Status:</strong> {Math.round((insights.plannedRisks.length / risks.length) * 100)}% of risks have action plans
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Alert */}
        {insights.overdueRisks.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-[10px] p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-red-900 mb-1">
                  Overdue Mitigations
                </div>
                <div className="text-sm text-red-800 mb-3">
                  <strong>{insights.overdueRisks.length} risks</strong> have passed their mitigation 
                  deadlines and require immediate review.
                </div>
                <div className="text-xs text-red-700">
                  <strong>Action:</strong> Schedule mitigation review meeting
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Strategic Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-[10px] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="text-blue-600" size={20} />
          <h3 className="font-semibold text-blue-900">Strategic Recommendations</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              1
            </div>
            <div className="text-sm text-blue-800">
              <strong>Immediate (0-30 days):</strong> Focus on the {insights.criticalRisks.length} critical 
              risks. Implement DLP controls and enable comprehensive audit logging across all AI systems.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              2
            </div>
            <div className="text-sm text-blue-800">
              <strong>Short-term (1-3 months):</strong> Conduct security assessments for high-risk assets 
              (ChatGPT, GitHub Copilot). Deploy monitoring dashboards and establish incident response procedures.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              3
            </div>
            <div className="text-sm text-blue-800">
              <strong>Long-term (3-6 months):</strong> Build comprehensive AI governance framework. 
              Implement automated compliance checks and establish regular risk review cadence.
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white bg-opacity-60 rounded-lg">
          <div className="text-xs font-semibold text-blue-900 mb-1">
            📊 Estimated Impact
          </div>
          <div className="text-xs text-blue-800">
            Full implementation could reduce your risk exposure by 65-75% and achieve ROI break-even in 8-12 months.
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-text-base-tertiary">
        AI insights are generated based on your current risk portfolio and industry best practices.
        Recommendations are updated in real-time as your risk landscape evolves.
      </div>
    </div>
  );
};
