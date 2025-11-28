import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Clock, CheckCircle, Target, BarChart3, Circle, Info } from 'lucide-react';
import TabNavigation from '../components/organisms/TabNavigation';
import PortfolioHealthCards from '../components/organisms/PortfolioHealthCards';
import KovrrInsightsCards from '../components/organisms/KovrrInsightsCards';
import DotMatrixChart from '../components/visualizations/DotMatrixChart';
import SankeyDiagram from '../components/visualizations/SankeyDiagram';
import QuadrantChart from '../components/visualizations/QuadrantChart';
import TreemapChart from '../components/visualizations/TreemapChart';
import AIRiskUniverseMap from '../components/visualizations/AIRiskUniverseMap';
import { ActionModal } from '../components/organisms/ActionModal';
import ComplianceNewsFeed from '../components/ComplianceNewsFeed';
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
  const [selectedAction, setSelectedAction] = useState(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [completedActions, setCompletedActions] = useState([]);

  // Get current user (in real app, this would come from auth context)
  const currentUser = 'or@kovrr.com'; // Default user for demo

  // Load action progress from localStorage or use initial data (per user)
  const [actionProgress, setActionProgress] = useState(() => {
    const storageKey = `actionProgress_${currentUser}`;
    const versionKey = 'actionProgressVersion';
    const currentVersion = '1.0'; // Increment this to reset all user data

    // Check version - if mismatch, clear all old data
    const savedVersion = localStorage.getItem(versionKey);
    if (savedVersion !== currentVersion) {
      // Clear all old action progress data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('actionProgress_')) {
          localStorage.removeItem(key);
        }
      });
      localStorage.setItem(versionKey, currentVersion);
    }

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      return JSON.parse(saved);
    }
    // Initialize from dashboard data
    const initial = {};
    cisoBriefData.topActions.forEach(action => {
      initial[action.id] = action.completedSteps || [];
    });
    return initial;
  });

  const tabs = [
    { id: 'brief', label: 'CISO Brief' },
    { id: 'intelligence', label: 'Risk Intelligence' },
    { id: 'portfolio', label: 'Portfolio Health' },
    { id: 'insights', label: 'Kovrr Insights' }
  ];

  // Listen for logout/login events to reset action progress
  React.useEffect(() => {
    // Check if logout flag is set (set by logout button in top pane)
    const logoutFlag = localStorage.getItem('logoutTriggered');

    if (logoutFlag === 'true') {
      // Clear the logout flag
      localStorage.removeItem('logoutTriggered');

      // Clear all action progress
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('actionProgress_')) {
          localStorage.removeItem(key);
        }
      });

      // Reset to initial state
      const initial = {};
      cisoBriefData.topActions.forEach(action => {
        initial[action.id] = action.completedSteps || [];
      });
      setActionProgress(initial);
    }

    // Listen for custom logout event
    const handleLogout = () => {
      // Set logout flag
      localStorage.setItem('logoutTriggered', 'true');

      // Clear all action progress
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('actionProgress_')) {
          localStorage.removeItem(key);
        }
      });
    };

    window.addEventListener('userLogout', handleLogout);
    return () => window.removeEventListener('userLogout', handleLogout);
  }, []);

  // Map action titles to types for the modal
  const getActionType = (title) => {
    if (title.includes('data retention')) return 'review-data-retention';
    if (title.includes('Risk Assessment')) return 'risk-assessment';
    if (title.includes('Policy')) return 'update-policy';
    return 'review-data-retention';
  };

  const handleActionClick = (action) => {
    const actionWithType = {
      ...action,
      type: getActionType(action.title),
      completedSteps: actionProgress[action.id] || []
    };
    setSelectedAction(actionWithType);
    setIsActionModalOpen(true);
  };

  const handleStepToggle = (actionId, stepId, isCompleted) => {
    setActionProgress(prev => {
      const current = prev[actionId] || [];
      const updated = isCompleted
        ? [...current, stepId]
        : current.filter(id => id !== stepId);

      const newProgress = { ...prev, [actionId]: updated };
      const storageKey = `actionProgress_${currentUser}`;
      localStorage.setItem(storageKey, JSON.stringify(newProgress));

      // Update selectedAction if it's the same action being toggled
      if (selectedAction && selectedAction.id === actionId) {
        setSelectedAction({
          ...selectedAction,
          completedSteps: updated
        });
      }

      return newProgress;
    });
  };

  const handleActionComplete = (actionId, notes) => {
    setCompletedActions([...completedActions, actionId]);
    console.log(`Action ${actionId} completed with notes:`, notes);
    // In a real app, this would save to backend
  };

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
          <div className="h-[calc(100vh-180px)] flex flex-col gap-[16px]">
            {/* Row 1: Map, Actions, Portfolio, News Feed */}
            <div className="grid grid-cols-[612px_288px_1fr_1fr] gap-[16px] flex-1 min-h-0">
              {/* Left: AI Risk Universe Map - Reduced height */}
              <div className="bg-white rounded-[12px] p-[16px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)] flex flex-col">
                <div className="mb-[12px] pb-[8px] border-b-2 border-[rgb(220,229,242)]">
                  <div className="text-[14px] font-[700] text-[rgb(26,32,44)] mb-[4px]">
                    AI Risk Universe Map
                  </div>
                  <div className="text-[11px] text-[rgb(74,85,104)]">
                    Click any asset to view details • Size = Business Impact
                  </div>
                </div>
                <div className="flex-1" style={{ minHeight: '280px', maxHeight: '280px' }}>
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

              {/* Top Actions - Compact */}
              <div className="bg-white rounded-[12px] p-[14px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)]">
                <div className="text-[13px] font-[700] text-[rgb(26,32,44)] mb-[12px] flex items-center gap-[6px]">
                  <Target size={14} className="text-[rgb(85,81,247)]" />
                  <span>TOP ACTIONS</span>
                </div>
                <div className="space-y-[10px]">
                  {cisoBriefData.topActions.map((action) => {
                    const isCompleted = completedActions.includes(action.id);
                    const progress = actionProgress[action.id] || [];
                    const totalSteps = 5; // All actions have 5 steps
                    const progressPercent = (progress.length / totalSteps) * 100;

                    return (
                      <div
                        key={action.id}
                        className={`p-[12px] rounded-[8px] border cursor-pointer transition-all ${isCompleted
                          ? 'border-green-500 bg-green-50 opacity-75'
                          : 'border-[rgb(220,229,242)] hover:border-[rgb(85,81,247)] hover:bg-[rgb(245,247,255)]'
                          }`}
                        onClick={() => handleActionClick(action)}
                      >
                        <div className="flex items-start gap-[8px]">
                          {action.status === 'overdue' && <AlertTriangle size={16} className="text-[rgb(255,35,35)] mt-[2px] flex-shrink-0" />}
                          {action.status === 'due_soon' && <Clock size={16} className="text-[rgb(255,153,0)] mt-[2px] flex-shrink-0" />}
                          {action.status === 'upcoming' && <CheckCircle size={16} className="text-[rgb(74,85,104)] mt-[2px] flex-shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <div className="text-[14px] font-[600] text-[rgb(26,32,44)] mb-[4px]">
                              {action.title}
                            </div>
                            <div className="flex items-center gap-[8px] text-[12px] text-[rgb(74,85,104)]">
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
                            {/* Progress indicator */}
                            {progress.length > 0 && (
                              <div className="mt-[8px]">
                                <div className="flex items-center justify-between text-[11px] text-[rgb(74,85,104)] mb-[4px]">
                                  <span>{progress.length} of {totalSteps} steps</span>
                                  <span>{Math.round(progressPercent)}%</span>
                                </div>
                                <div className="h-[4px] bg-[rgb(237,242,247)] rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[rgb(85,81,247)] transition-all duration-300"
                                    style={{ width: `${progressPercent}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Show More Button - Disabled */}
                <button
                  disabled
                  className="w-full mt-[12px] py-[8px] text-[12px] font-[600] text-neutral-400 border border-neutral-200 rounded-[6px] cursor-not-allowed opacity-60"
                >
                  Show More
                </button>
              </div>

              {/* Right: Portfolio Health with This Week Target - Merged */}
              <div className="bg-white rounded-[12px] p-[16px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)] flex flex-col overflow-auto">
                {/* Portfolio Health Score */}
                <div className="bg-gradient-to-br from-[rgb(85,81,247)] to-[rgb(97,94,251)] rounded-[10px] p-[14px] text-white mb-[12px]">
                  <div className="text-[10px] font-[600] uppercase tracking-[0.5px] opacity-80 mb-[4px]">
                    Portfolio Health Score
                  </div>
                  <div className="flex items-baseline gap-[4px] mb-[6px]">
                    <div className="text-[36px] font-[700] leading-none">{cisoBriefData.portfolioHealth.score}</div>
                    <div className="text-[14px] opacity-80">/100</div>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <TrendingUp size={12} />
                    <span className="text-[12px] font-[600]">{cisoBriefData.portfolioHealth.trend} from last month</span>
                  </div>
                </div>

                {/* Score Breakdown - Right after Portfolio Health Score */}
                <div className="space-y-[8px] mb-[12px] pb-[12px] border-b border-[rgb(220,229,242)]">
                  <div className="text-[12px] font-[700] text-[rgb(26,32,44)] mb-[6px]">
                    Score Breakdown
                  </div>

                  {/* Governance Readiness */}
                  <div>
                    <div className="flex justify-between items-center mb-[4px]">
                      <div className="flex items-center gap-[4px] group relative">
                        <span className="text-[12px] text-[rgb(74,85,104)]">Governance Readiness</span>
                        <Info size={12} className="text-[rgb(74,85,104)] cursor-help" />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-[240px] bg-[rgb(26,32,44)] text-white text-[11px] p-[10px] rounded-[6px] shadow-lg z-10">
                          Percentage of required AI governance controls that have been implemented and are actively maintained
                        </div>
                      </div>
                      <span className="text-[12px] font-[600] text-[rgb(26,32,44)]">68%</span>
                    </div>
                    <div className="h-[4px] bg-[rgb(237,242,247)] rounded-full overflow-hidden">
                      <div className="h-full bg-[rgb(85,81,247)]" style={{ width: '68%' }} />
                    </div>
                  </div>

                  {/* Risk Mitigation */}
                  <div>
                    <div className="flex justify-between items-center mb-[4px]">
                      <div className="flex items-center gap-[4px] group relative">
                        <span className="text-[12px] text-[rgb(74,85,104)]">Risk Mitigation</span>
                        <Info size={12} className="text-[rgb(74,85,104)] cursor-help" />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-[240px] bg-[rgb(26,32,44)] text-white text-[11px] p-[10px] rounded-[6px] shadow-lg z-10">
                          Percentage of identified AI risks that have active mitigation plans and assigned controls
                        </div>
                      </div>
                      <span className="text-[12px] font-[600] text-[rgb(26,32,44)]">82%</span>
                    </div>
                    <div className="h-[4px] bg-[rgb(237,242,247)] rounded-full overflow-hidden">
                      <div className="h-full bg-fill-information-success" style={{ width: '82%' }} />
                    </div>
                  </div>

                  {/* Shadow AI Ratio */}
                  <div>
                    <div className="flex justify-between items-center mb-[4px]">
                      <div className="flex items-center gap-[4px] group relative">
                        <span className="text-[12px] text-[rgb(74,85,104)]">Shadow AI Ratio</span>
                        <Info size={12} className="text-[rgb(74,85,104)] cursor-help" />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-[240px] bg-[rgb(26,32,44)] text-white text-[11px] p-[10px] rounded-[6px] shadow-lg z-10">
                          Percentage of AI assets operating without formal governance oversight or approval
                        </div>
                      </div>
                      <span className="text-[12px] font-[600] text-[rgb(255,35,35)]">33%</span>
                    </div>
                    <div className="h-[4px] bg-[rgb(237,242,247)] rounded-full overflow-hidden">
                      <div className="h-full bg-[rgb(255,35,35)]" style={{ width: '33%' }} />
                    </div>
                  </div>
                </div>

                {/* This Week Target Section - Now at the bottom */}
                <div className="space-y-[8px] flex-1">
                  <div className="text-[13px] font-[700] text-[rgb(26,32,44)] mb-[10px] flex items-center gap-[6px]">
                    <Target size={14} className="text-[rgb(85,81,247)]" />
                    <span>THIS WEEK TARGET</span>
                  </div>
                  <div className="space-y-[8px]">
                    <div>
                      <div className="flex justify-between items-center mb-[4px]">
                        <span className="text-[11px] text-[rgb(74,85,104)]">Controls Closed (Actual/Target)</span>
                        <span className="text-[12px] font-[700] text-[rgb(26,32,44)]">{cisoBriefData.thisWeek.controlsClosed}/5</span>
                      </div>
                      <div className="h-[4px] bg-[rgb(237,242,247)] rounded-full overflow-hidden">
                        <div className="h-full bg-fill-information-success transition-all" style={{ width: `${(cisoBriefData.thisWeek.controlsClosed / 5) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-[4px]">
                        <span className="text-[11px] text-[rgb(74,85,104)]">Risks Mitigated (Actual/Target)</span>
                        <span className="text-[12px] font-[700] text-[rgb(26,32,44)]">{cisoBriefData.thisWeek.risksMitigated}/8</span>
                      </div>
                      <div className="h-[4px] bg-[rgb(237,242,247)] rounded-full overflow-hidden">
                        <div className="h-full bg-fill-information-success transition-all" style={{ width: `${(cisoBriefData.thisWeek.risksMitigated / 8) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-[4px]">
                        <span className="text-[11px] text-[rgb(74,85,104)]">Assets Sanctioned (Actual/Target)</span>
                        <span className="text-[12px] font-[700] text-[rgb(26,32,44)]">{cisoBriefData.thisWeek.assetsSanctioned}/4</span>
                      </div>
                      <div className="h-[4px] bg-[rgb(237,242,247)] rounded-full overflow-hidden">
                        <div className="h-full bg-[rgb(85,81,247)] transition-all" style={{ width: `${(cisoBriefData.thisWeek.assetsSanctioned / 4) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance News Feed */}
              <div className="bg-white rounded-[12px] p-[16px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)] overflow-auto">
                <ComplianceNewsFeed />
              </div>

            </div>

            {/* Row 2: 4 Metric Cards */}
            <div className="grid grid-cols-4 gap-[20px]">
              {/* Critical Card */}
              <div
                className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border-2 border-[rgb(220,229,242)] hover:border-[rgb(255,35,35)] cursor-pointer transition-all"
                onClick={() => navigate('/assets?risk_tier=critical')}
              >
                <div className="text-[12px] font-[600] text-[rgb(74,85,104)] uppercase tracking-[0.5px] mb-[12px] flex items-center gap-[6px]">
                  <Circle size={12} className="fill-[rgb(255,35,35)] text-[rgb(255,35,35)]" />
                  CRITICAL
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
                onClick={() => navigate('/assets?risk_tier=high')}
              >
                <div className="text-[12px] font-[600] text-[rgb(74,85,104)] uppercase tracking-[0.5px] mb-[12px] flex items-center gap-[6px]">
                  <AlertTriangle size={12} className="text-[rgb(255,153,0)]" />
                  HIGH RISK
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
                <div className="text-[12px] font-[600] text-[rgb(74,85,104)] uppercase tracking-[0.5px] mb-[12px] flex items-center gap-[6px]">
                  <Clock size={12} className="text-[rgb(85,81,247)]" />
                  IN PROGRESS
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
                <div className="text-[12px] font-[600] text-[rgb(74,85,104)] uppercase tracking-[0.5px] mb-[12px] flex items-center gap-[6px]">
                  <CheckCircle size={12} className="text-fill-information-success" />
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

      {/* Action Modal */}
      <ActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        action={selectedAction}
        onComplete={handleActionComplete}
        onStepToggle={handleStepToggle}
      />
    </div >
  );
};

export default DashboardNew;
