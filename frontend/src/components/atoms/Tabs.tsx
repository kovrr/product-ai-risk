import React from 'react';
import { cn } from '../../lib/utils';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'default' | 'pills';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'default',
}) => {
  return (
    <div
      className={cn(
        'flex items-center',
        variant === 'default' ? 'border-b border-stroke-base-secondary' : 'gap-[8px]',
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
            className={cn(
              'flex items-center gap-[8px] px-[20px] py-[12px]',
              'text-[14px] font-[600] transition-all',
              'focus:outline-none focus:ring-2 focus:ring-fill-brand-primary focus:ring-opacity-50',
              variant === 'default' && [
                'border-b-2 -mb-[1px]',
                isActive
                  ? 'border-fill-brand-primary text-fill-brand-primary'
                  : 'border-transparent text-text-base-secondary hover:text-text-base-primary hover:border-stroke-base-primary',
              ],
              variant === 'pills' && [
                'rounded-[10px]',
                isActive
                  ? 'bg-fill-brand-primary text-white'
                  : 'bg-fill-base-secondary text-text-base-secondary hover:bg-fill-base-tertiary hover:text-text-base-primary',
              ],
              tab.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'px-[8px] py-[2px] rounded-[12px] text-[12px] font-[600]',
                  isActive && variant === 'pills'
                    ? 'bg-white/20 text-white'
                    : 'bg-fill-base-tertiary text-text-base-secondary'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// Tab Panel Component
export interface TabPanelProps {
  tabId: string;
  activeTab: string;
  children: React.ReactNode;
  className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  tabId,
  activeTab,
  children,
  className,
}) => {
  if (tabId !== activeTab) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${tabId}`}
      aria-labelledby={`tab-${tabId}`}
      className={cn('py-[20px]', className)}
    >
      {children}
    </div>
  );
};
