import React from 'react';

/**
 * KovrrInsightsCards - 6 AI-powered recommendation cards
 * Matches hero-dashboard-final.html insights tab
 */
const KovrrInsightsCards = ({ insights }) => {
  const getBadgeClass = (priority) => {
    const classes = {
      Critical: 'bg-[rgba(255,35,35,0.1)] text-[rgb(255,35,35)]',
      High: 'bg-[rgba(255,153,0,0.1)] text-[rgb(255,153,0)]',
      Medium: 'bg-[rgba(251,188,9,0.1)] text-[rgb(159,60,0)]',
      Low: 'bg-[rgba(169,180,188,0.1)] text-[rgb(74,85,104)]'
    };
    return classes[priority] || classes.Low;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-[8px] mb-[20px]">
        <div className="w-[28px] h-[28px] bg-gradient-to-br from-[rgb(150,160,180)] to-[rgb(170,180,200)] rounded-[8px] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] stroke-white fill-none stroke-[2]">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <h2 className="text-[24px] font-[700] text-[rgb(26,32,44)]">Kovrr Insights</h2>
        <span className="text-[13px] text-[rgb(74,85,104)] ml-auto">AI-powered recommendations</span>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[20px]">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className="bg-white rounded-[12px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)]"
          >
            {/* Card Header */}
            <div className="flex justify-between items-start mb-[16px] pb-[12px] border-b border-[rgb(220,229,242)]">
              <div className="text-[16px] font-[700] text-[rgb(26,32,44)]">
                {insight.module}
              </div>
              <div className={`inline-flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] text-[12px] font-[600] ${getBadgeClass(insight.priority)}`}>
                {insight.priority}
              </div>
            </div>

            {/* Actionable Steps */}
            <ul className="list-none p-0 m-0">
              {insight.steps.map((step, stepIndex) => (
                <li 
                  key={stepIndex}
                  className="text-[13px] text-[rgb(48,48,69)] py-[8px] pl-[20px] relative leading-[1.4] before:content-['→'] before:absolute before:left-0 before:text-[rgb(85,81,247)] before:font-[600]"
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KovrrInsightsCards;
