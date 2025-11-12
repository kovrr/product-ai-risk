import React, { useState } from 'react';
import TabNavigation from '../components/organisms/TabNavigation';
import PortfolioHealthCards from '../components/organisms/PortfolioHealthCards';
import KovrrInsightsCards from '../components/organisms/KovrrInsightsCards';
import DotMatrixChart from '../components/visualizations/DotMatrixChart';
import SankeyDiagram from '../components/visualizations/SankeyDiagram';
import QuadrantChart from '../components/visualizations/QuadrantChart';
import TreemapChart from '../components/visualizations/TreemapChart';
import {
  dotMatrixData,
  sankeyData,
  quadrantData,
  treemapData,
  portfolioData,
  insightsData
} from '../data/dashboard-data';

/**
 * Hero Dashboard - Complete rebuild matching hero-dashboard-final.html
 * Features 3 tabs: Risk Intelligence, Portfolio Health, Kovrr Insights
 */
const DashboardNew = () => {
  const [activeTab, setActiveTab] = useState('intelligence');

  const tabs = [
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
