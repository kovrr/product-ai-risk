import React from 'react';

/**
 * PortfolioHealthCards - 5 metric cards showing portfolio health
 * Matches hero-dashboard-final.html portfolio tab
 */
const PortfolioHealthCards = ({ data }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[20px] mb-[40px]">
      {/* Assets Visibility Card */}
      <div className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
        <div className="text-[14px] font-[600] text-[rgb(74,85,104)] mb-[16px] uppercase tracking-[0.5px]">
          Assets Visibility
        </div>
        <div className="text-[32px] font-[700] text-[rgb(26,32,44)] mb-[8px]">
          {data.assets.total}
        </div>
        <div className="text-[13px] text-[rgb(74,85,104)]">Total AI Assets</div>
        
        {/* Donut Chart */}
        <div className="w-[120px] h-[120px] mx-auto my-[20px] rounded-full"
          style={{
            background: `conic-gradient(
              rgb(160, 190, 170) 0% ${(data.assets.sanctioned / data.assets.total) * 100}%,
              rgb(220, 180, 150) ${(data.assets.sanctioned / data.assets.total) * 100}% 100%
            )`
          }}
        />
        
        {/* Legend */}
        <div className="flex flex-col gap-[8px] mt-[16px]">
          <div className="flex items-center gap-[8px]">
            <div className="w-[12px] h-[12px] rounded-[3px] bg-[rgb(160,190,170)]" />
            <span className="text-[13px] text-[rgb(74,85,104)] flex-1">Sanctioned</span>
            <span className="text-[13px] font-[600] text-[rgb(26,32,44)]">{data.assets.sanctioned}</span>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="w-[12px] h-[12px] rounded-[3px] bg-[rgb(220,180,150)]" />
            <span className="text-[13px] text-[rgb(74,85,104)] flex-1">Shadow IT</span>
            <span className="text-[13px] font-[600] text-[rgb(26,32,44)]">{data.assets.shadow}</span>
          </div>
        </div>
        
        <div className="mt-[16px] pt-[16px] border-t border-[rgb(220,229,242)]">
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">High Risk</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.assets.highRisk}</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">Avg Risk Score</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.assets.avgRiskScore}/100</span>
          </div>
        </div>
      </div>

      {/* Risk Register Card */}
      <div className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
        <div className="text-[14px] font-[600] text-[rgb(74,85,104)] mb-[16px] uppercase tracking-[0.5px]">
          Risk Register
        </div>
        <div className="text-[32px] font-[700] text-[rgb(26,32,44)] mb-[8px]">
          {data.risks.total}
        </div>
        <div className="text-[13px] text-[rgb(74,85,104)]">Total Scenarios</div>
        
        <div className="mt-[16px] pt-[16px] border-t border-[rgb(220,229,242)]">
          <div className="flex justify-between items-center py-[8px]">
            <span className="inline-flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] text-[12px] font-[600] bg-[rgba(255,35,35,0.1)] text-[rgb(255,35,35)]">
              Critical
            </span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.risks.critical}</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="inline-flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] text-[12px] font-[600] bg-[rgba(255,153,0,0.1)] text-[rgb(255,153,0)]">
              High
            </span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.risks.high}</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="inline-flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] text-[12px] font-[600] bg-[rgba(251,188,9,0.1)] text-[rgb(159,60,0)]">
              Medium
            </span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.risks.medium}</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="inline-flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] text-[12px] font-[600] bg-[rgba(169,180,188,0.1)] text-[rgb(74,85,104)]">
              Low
            </span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.risks.low}</span>
          </div>
        </div>
      </div>

      {/* Compliance Readiness Card */}
      <div className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
        <div className="text-[14px] font-[600] text-[rgb(74,85,104)] mb-[16px] uppercase tracking-[0.5px]">
          Compliance Readiness
        </div>
        <div className="text-[32px] font-[700] text-[rgb(26,32,44)] mb-[8px]">
          {data.compliance.maturity}%
        </div>
        <div className="text-[13px] text-[rgb(74,85,104)]">NIST AI RMF Maturity</div>
        
        {/* Progress Bar */}
        <div className="h-[8px] bg-[rgb(237,242,247)] rounded-[4px] overflow-hidden my-[16px]">
          <div 
            className="h-full bg-gradient-to-r from-[rgb(150,160,180)] to-[rgb(170,180,200)]"
            style={{ width: `${data.compliance.maturity}%` }}
          />
        </div>
        
        <div className="mt-[16px] pt-[16px] border-t border-[rgb(220,229,242)]">
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">Controls Assessed</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.compliance.assessed}</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">Critical Gaps</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.compliance.criticalGaps}</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">Target: Q1 2026</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.compliance.target}%</span>
          </div>
        </div>
      </div>

      {/* Assurance Plan Card */}
      <div className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
        <div className="text-[14px] font-[600] text-[rgb(74,85,104)] mb-[16px] uppercase tracking-[0.5px]">
          Assurance Plan
        </div>
        <div className="text-[32px] font-[700] text-[rgb(26,32,44)] mb-[8px]">
          {data.assurance.total}
        </div>
        <div className="text-[13px] text-[rgb(74,85,104)]">Total Controls in Assessment</div>
        
        <div className="mt-[16px] pt-[16px] border-t border-[rgb(220,229,242)]">
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">Completed</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.assurance.completed}</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">In Progress</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.assurance.inProgress}</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">Draft</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.assurance.draft}</span>
          </div>
        </div>
        
        <div className="mt-[16px] pt-[16px] border-t border-[rgb(220,229,242)]">
          <div className="text-[13px] text-[rgb(74,85,104)] mb-[8px]">Gap Analysis</div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">Avg Gap Score</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.assurance.avgGap}</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">At Target</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">8</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">With Gap</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">11</span>
          </div>
        </div>
      </div>

      {/* GenAI Exposure Card */}
      <div className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
        <div className="text-[14px] font-[600] text-[rgb(74,85,104)] mb-[16px] uppercase tracking-[0.5px]">
          GenAI Exposure
        </div>
        <div className="text-[32px] font-[700] text-[rgb(26,32,44)] mb-[8px]">
          ${(data.genai.aal / 1000000).toFixed(1)}M
        </div>
        <div className="text-[13px] text-[rgb(74,85,104)]">Annual Average Loss</div>
        
        <div className="mt-[16px] pt-[16px] border-t border-[rgb(220,229,242)]">
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">Model</span>
            <span className="text-[12px] font-[600] text-[rgb(26,32,44)]">{data.genai.model}</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">Last Evaluated</span>
            <span className="text-[12px] font-[600] text-[rgb(26,32,44)]">{data.genai.lastEvaluated}</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">1-in-100 Year Loss</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">${data.genai.loss100Year / 1000000}M</span>
          </div>
          <div className="flex justify-between items-center py-[8px]">
            <span className="text-[13px] text-[rgb(74,85,104)]">Annual Likelihood</span>
            <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">{data.genai.likelihood}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHealthCards;
