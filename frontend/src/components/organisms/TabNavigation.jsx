import React from 'react';

/**
 * TabNavigation Component
 * Matches the exact styling from hero-dashboard-final.html
 */
const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex gap-[8px] mb-[30px] border-b-[2px] border-[rgb(220,229,242)] pb-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            bg-transparent border-none px-[24px] py-[12px] 
            text-[15px] font-[600] cursor-pointer
            border-b-[3px] border-b-transparent mb-[-2px]
            transition-all duration-200
            font-['Source_Sans_Pro',sans-serif]
            ${
              activeTab === tab.id
                ? 'text-[rgb(85,81,247)] border-b-[rgb(85,81,247)]'
                : 'text-[rgb(74,85,104)] hover:text-[rgb(26,32,44)] hover:bg-[rgba(150,160,180,0.08)]'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
