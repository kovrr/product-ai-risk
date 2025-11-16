import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import TabNavigation from '../components/organisms/TabNavigation';
import PortfolioHealthCards from '../components/organisms/PortfolioHealthCards';
import KovrrInsightsCards from '../components/organisms/KovrrInsightsCards';
import DotMatrixChart from '../components/visualizations/DotMatrixChart';
import SankeyDiagram from '../components/visualizations/SankeyDiagram';
import QuadrantChart from '../components/visualizations/QuadrantChart';
import TreemapChart from '../components/visualizations/TreemapChart';
import AIRiskUniverseMap from '../components/visualizations/AIRiskUniverseMap';
import {
  dotMatrixData,
  sankeyData,
  quadrantData,
  treemapData,
  portfolioData,
  insightsData,
  aiRiskUniverseData,
  cisoBriefData
} from '../data/dashboard-data';

/**
 * Hero Dashboard - Complete rebuild matching hero-dashboard-final.html
 * Features 4 tabs: CISO Brief (default), Risk Intelligence, Portfolio Health, Kovrr Insights
 */
const DashboardNew = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('brief');

  const tabs = [
    { id: 'brief', label: 'CISO Brief' },
    { id: 'intelligence', label: 'Risk Intelligence' },
    { id: 'portfolio', label: 'Portfolio Health' },
    { id: 'insights', label: 'Kovrr Insights' }
  ];

  return (
    <div className="space-y-[32px]">
      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="tab-content">
        {/* CISO Brief Tab */}
        {activeTab === 'brief' && (
          <div className="space-y-[24px]">
            {/* Main Content Grid - 3 Columns */}
            <div className="grid grid-cols-[600px_320px_1fr] gap-[24px]">
              {/* Left: AI Risk Universe Map */}
              <div className="bg-white rounded-[15px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)] flex flex-col">
                <div className="mb-[16px] pb-[12px] border-b-2 border-[rgb(220,229,242)]">
                  <div className="text-[16px] font-[700] text-[rgb(26,32,44)] mb-[8px]">
                    AI Risk Universe Map
                  </div>
                  <div className="text-[12px] text-[rgb(74,85,104)]">
                    Click any asset to view details • Size = Business Impact
                  </div>
                </div>
                <div className="flex-1" style={{ minHeight: '350px' }}>
                  <AIRiskUniverseMap data={aiRiskUniverseData} />
                </div>
                {/* Legend - Below the chart */}
                <div className="flex items-center justify-center gap-[20px] mt-[16px] pt-[12px] border-t border-[rgb(220,229,242)]">
                  <div className="flex items-center gap-[6px]">
                    <div className="w-[12px] h-[12px] rounded-full bg-[rgb(255,35,35)]" />
                    <span className="text-[11px] text-[rgb(74,85,104)]">Critical</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div className="w-[12px] h-[12px] rounded-full bg-[rgb(255,153,0)]" />
                    <span className="text-[11px] text-[rgb(74,85,104)]">High</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div className="w-[12px] h-[12px] rounded-full bg-[rgb(251,188,9)]" />
                    <span className="text-[11px] text-[rgb(74,85,104)]">Medium</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div className="w-[12px] h-[12px] rounded-full bg-fill-information-success" />
                    <span className="text-[11px] text-[rgb(74,85,104)]">Low</span>
                  </div>
                  <div className="w-[1px] h-[16px] bg-[rgb(220,229,242)]" />
                  <span className="text-[11px] text-[rgb(74,85,104)]">Size = Business Impact</span>
                </div>
              </div>

              {/* Middle: Top Actions + This Week */}
              <div className="space-y-[20px]">
                {/* Top Actions */}
                <div className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)]">
                  <div className="text-[14px] font-[700] text-[rgb(26,32,44)] mb-[16px] flex items-center gap-[8px]">
                    🎯 TOP ACTIONS
                  </div>
                  <div className="space-y-[12px]">
                    {cisoBriefData.topActions.map((action) => (
                      <div
                        key={action.id}
                        className="p-[12px] rounded-[8px] border border-[rgb(220,229,242)] hover:border-[rgb(85,81,247)] hover:bg-[rgb(245,247,255)] cursor-pointer transition-all"
                        onClick={() => navigate(action.link || '/ai-assurance-plan')}
                      >
                        <div className="flex items-start gap-[8px]">
                          {action.status === 'overdue' && <AlertTriangle size={16} className="text-[rgb(255,35,35)] mt-[2px] flex-shrink-0" />}
                          {action.status === 'due_soon' && <Clock size={16} className="text-[rgb(255,153,0)] mt-[2px] flex-shrink-0" />}
                          {action.status === 'upcoming' && <CheckCircle size={16} className="text-[rgb(74,85,104)] mt-[2px] flex-shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-[600] text-[rgb(26,32,44)] mb-[4px]">
                              {action.title}
                            </div>
                            <div className="flex items-center gap-[8px] text-[11px] text-[rgb(74,85,104)]">
                              {action.status === 'overdue' && (
                                <span className="text-[rgb(255,35,35)] font-[600]">Overdue {action.daysOverdue}d</span>
                              )}
                              {action.status === 'due_soon' && (
                                <span className="text-[rgb(255,153,0)] font-[600]">Due {action.dueDate}</span>
                              )}
                              {action.status === 'upcoming' && (
                                <span>Due {action.dueDate}</span>
                              )}
                              <span>•</span>
                              <span>{action.owner}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* This Week */}
                <div className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)]">
                  <div className="text-[14px] font-[700] text-[rgb(26,32,44)] mb-[16px] flex items-center gap-[8px]">
                    📈 THIS WEEK
                  </div>
                  <div className="space-y-[12px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-[rgb(74,85,104)]">✅ Controls closed</span>
                      <span className="text-[16px] font-[700] text-[rgb(26,32,44)]">{cisoBriefData.thisWeek.controlsClosed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-[rgb(74,85,104)]">✅ Risks mitigated</span>
                      <span className="text-[16px] font-[700] text-[rgb(26,32,44)]">{cisoBriefData.thisWeek.risksMitigated}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-[rgb(74,85,104)]">✅ Assets sanctioned</span>
                      <span className="text-[16px] font-[700] text-[rgb(26,32,44)]">{cisoBriefData.thisWeek.assetsSanctioned}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-[rgb(74,85,104)]">🔄 Assessments started</span>
                      <span className="text-[16px] font-[700] text-[rgb(26,32,44)]">{cisoBriefData.thisWeek.assessmentsStarted}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Portfolio Health with Breakdown */}
              <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)] flex flex-col">
                <div className="bg-gradient-to-br from-[rgb(85,81,247)] to-[rgb(97,94,251)] rounded-[12px] p-[20px] text-white mb-[20px]">
                  <div className="text-[11px] font-[600] uppercase tracking-[0.5px] opacity-80 mb-[6px]">
                    Portfolio Health Score
                  </div>
                  <div className="flex items-baseline gap-[6px] mb-[8px]">
                    <div className="text-[48px] font-[700] leading-none">{cisoBriefData.portfolioHealth.score}</div>
                    <div className="text-[18px] opacity-80">/100</div>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <TrendingUp size={14} />
                    <span className="text-[12px] font-[600]">{cisoBriefData.portfolioHealth.trend} from last month</span>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-[14px] flex-1">
                  <div className="text-[13px] font-[700] text-[rgb(26,32,44)] mb-[10px]">
                    Score Breakdown
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-[6px]">
                      <span className="text-[12px] text-[rgb(74,85,104)]">Compliance Maturity</span>
                      <span className="text-[13px] font-[600] text-[rgb(26,32,44)]">68%</span>
                    </div>
                    <div className="h-[6px] bg-[rgb(237,242,247)] rounded-full overflow-hidden">
                      <div className="h-full bg-[rgb(85,81,247)]" style={{ width: '68%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-[6px]">
                      <span className="text-[12px] text-[rgb(74,85,104)]">Risk Coverage</span>
                      <span className="text-[13px] font-[600] text-[rgb(26,32,44)]">82%</span>
                    </div>
                    <div className="h-[6px] bg-[rgb(237,242,247)] rounded-full overflow-hidden">
                      {/* Success bar uses design-system success green */}
                      <div className="h-full bg-fill-information-success" style={{ width: '82%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-[6px]">
                      <span className="text-[12px] text-[rgb(74,85,104)]">Shadow AI Ratio</span>
                      <span className="text-[13px] font-[600] text-[rgb(255,35,35)]">33%</span>
                    </div>
                    <div className="h-[6px] bg-[rgb(237,242,247)] rounded-full overflow-hidden">
                      <div className="h-full bg-[rgb(255,35,35)]" style={{ width: '33%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: 4 Metric Cards */}
            <div className="grid grid-cols-4 gap-[20px]">
              {/* Critical Card */}
              <div
                className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border-2 border-[rgb(220,229,242)] hover:border-[rgb(255,35,35)] cursor-pointer transition-all"
                onClick={() => navigate('/ai-assurance-plan')}
              >
                <div className="text-[12px] font-[600] text-[rgb(74,85,104)] uppercase tracking-[0.5px] mb-[12px]">
                  🚨 CRITICAL
                </div>
                <div className="text-[48px] font-[700] text-[rgb(26,32,44)] leading-none mb-[8px]">
                  {cisoBriefData.metrics.critical.value}
                </div>
                <div className="text-[13px] text-[rgb(74,85,104)] mb-[8px]">Need Attention</div>
                <div className="flex items-center gap-[4px] text-[12px] font-[600] text-[rgb(255,35,35)]">
                  <TrendingUp size={14} />
                  <span>{cisoBriefData.metrics.critical.trend} this week</span>
                </div>
              </div>

              {/* High Risk Card */}
              <div
                className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border-2 border-[rgb(220,229,242)] hover:border-[rgb(255,153,0)] cursor-pointer transition-all"
                onClick={() => navigate('/assets?risk=high')}
              >
                <div className="text-[12px] font-[600] text-[rgb(74,85,104)] uppercase tracking-[0.5px] mb-[12px]">
                  ⚠️ HIGH RISK
                </div>
                <div className="text-[48px] font-[700] text-[rgb(26,32,44)] leading-none mb-[8px]">
                  {cisoBriefData.metrics.highRisk.value}
                </div>
                <div className="text-[13px] text-[rgb(74,85,104)] mb-[8px]">Assets</div>
                <div className="flex items-center gap-[4px] text-[12px] font-[600] text-text-information-success">
                  <TrendingDown size={14} />
                  <span>{cisoBriefData.metrics.highRisk.trend} this week</span>
                </div>
              </div>

              {/* In Progress Card */}
              <div
                className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border-2 border-[rgb(220,229,242)] hover:border-[rgb(85,81,247)] cursor-pointer transition-all"
                onClick={() => navigate('/ai-assurance-plan')}
              >
                <div className="text-[12px] font-[600] text-[rgb(74,85,104)] uppercase tracking-[0.5px] mb-[12px]">
                  🔄 IN PROGRESS
                </div>
                <div className="text-[48px] font-[700] text-[rgb(26,32,44)] leading-none mb-[8px]">
                  {cisoBriefData.metrics.inProgress.value}
                </div>
                <div className="text-[13px] text-[rgb(74,85,104)] mb-[8px]">Active</div>
                <div className="flex items-center gap-[4px] text-[12px] font-[600] text-[rgb(74,85,104)]">
                  <Minus size={14} />
                  <span>Due this month</span>
                </div>
              </div>

              {/* Compliant Card */}
              <div
                className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border-2 border-[rgb(220,229,242)] hover:border-fill-information-success cursor-pointer transition-all"
                onClick={() => navigate('/compliance-readiness')}
              >
                <div className="text-[12px] font-[600] text-[rgb(74,85,104)] uppercase tracking-[0.5px] mb-[12px]">
                  COMPLIANT
                </div>
                <div className="text-[48px] font-[700] text-[rgb(26,32,44)] leading-none mb-[8px]">
                  {cisoBriefData.metrics.maturity.value}%
                </div>
                <div className="text-[13px] text-[rgb(74,85,104)] mb-[8px]">Maturity</div>
                <div className="flex items-center gap-[4px] text-[12px] font-[600] text-text-information-success">
                  <TrendingUp size={14} />
                  <span>{cisoBriefData.metrics.maturity.trend} this qtr</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Intelligence Tab */}
        {activeTab === 'intelligence' && (
          <div className="grid grid-cols-2 gap-[24px] mb-[30px]">
            {/* Card 1: Risk-Control Coverage Matrix */}
            <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)] min-h-[500px]">
              <div className="flex justify-between items-start mb-[20px] pb-[16px] border-b-2 border-[rgb(220,229,242)]">
                <div>
                  <div className="text-[18px] font-[700] text-[rgb(26,32,44)]">
                    Risk-Control Coverage Matrix
                  </div>
                  <div className="text-[13px] text-[rgb(74,85,104)] mt-[4px]">
                    Dot = Coverage | Color = Gap Status
                  </div>
                </div>
                <span className="inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px] text-[12px] font-[600] bg-[rgba(255,35,35,0.1)] text-[rgb(255,35,35)]">
                  3 critical gaps
                </span>
              </div>
              <div className="h-[400px]">
                <DotMatrixChart data={dotMatrixData} />
              </div>
            </div>

            {/* Card 2: Asset Risk Flow */}
            <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)] min-h-[500px]">
              <div className="flex justify-between items-start mb-[20px] pb-[16px] border-b-2 border-[rgb(220,229,242)]">
                <div>
                  <div className="text-[18px] font-[700] text-[rgb(26,32,44)]">
                    Asset Risk Flow
                  </div>
                  <div className="text-[13px] text-[rgb(74,85,104)] mt-[4px]">
                    How assets contribute to risk scenarios
                  </div>
                </div>
                <span className="inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px] text-[12px] font-[600] bg-[rgba(255,153,0,0.1)] text-[rgb(255,153,0)]">
                  Shadow IT = 70% exposure
                </span>
              </div>
              <div className="h-[400px]">
                <SankeyDiagram data={sankeyData} />
              </div>
            </div>

            {/* Card 3: Assurance Priorities */}
            <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)] min-h-[500px]">
              <div className="flex justify-between items-start mb-[20px] pb-[16px] border-b-2 border-[rgb(220,229,242)]">
                <div>
                  <div className="text-[18px] font-[700] text-[rgb(26,32,44)]">
                    Assurance Priorities
                  </div>
                  <div className="text-[13px] text-[rgb(74,85,104)] mt-[4px]">
                    Gap severity vs. risk impact
                  </div>
                </div>
                <span className="inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px] text-[12px] font-[600] bg-[rgba(255,153,0,0.1)] text-[rgb(255,153,0)]">
                  5 urgent gaps
                </span>
              </div>
              <div className="h-[400px]">
                <QuadrantChart data={quadrantData} />
              </div>
            </div>

            {/* Card 4: GenAI Module Exposure */}
            <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)] min-h-[500px]">
              <div className="flex justify-between items-start mb-[20px] pb-[16px] border-b-2 border-[rgb(220,229,242)]">
                <div>
                  <div className="text-[18px] font-[700] text-[rgb(26,32,44)]">
                    GenAI Module Exposure
                  </div>
                  <div className="text-[13px] text-[rgb(74,85,104)] mt-[4px]">
                    AAL breakdown by AI model/asset
                  </div>
                </div>
                <span className="inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px] text-[12px] font-[600] bg-[rgba(255,35,35,0.1)] text-[rgb(255,35,35)]">
                  $9.1M total
                </span>
              </div>
              <div className="h-[400px]">
                <TreemapChart data={treemapData} />
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Health Tab */}
        {activeTab === 'portfolio' && (
          <div>
            <h2 className="text-[20px] font-[700] text-[rgb(26,32,44)] my-[20px]">
              Portfolio Health
            </h2>
            <PortfolioHealthCards data={portfolioData} />
          </div>
        )}

        {/* Kovrr Insights Tab */}
        {activeTab === 'insights' && (
          <KovrrInsightsCards insights={insightsData} />
        )}
      </div>
    </div>
  );
};

export default DashboardNew;
