import React from 'react';
import { Clock, User } from 'lucide-react';
import type { ActivityLog } from '../../data/mock-activity';
import { getActionIcon, getActionColor } from '../../data/mock-activity';

interface ActivityTimelineProps {
  activities: ActivityLog[];
  className?: string;
  maxItems?: number;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ 
  activities, 
  className = '',
  maxItems 
}) => {
  const displayActivities = maxItems ? activities.slice(0, maxItems) : activities;

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  const formatFullTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (displayActivities.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-4xl mb-2">📋</div>
        <div className="text-sm text-text-base-secondary">No activity yet</div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {displayActivities.map((activity, index) => (
        <div key={activity.id} className="relative">
          {/* Timeline line */}
          {index < displayActivities.length - 1 && (
            <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-stroke-base-secondary" />
          )}

          {/* Activity item */}
          <div className="flex gap-3">
            {/* Icon */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActionColor(activity.action)}`}>
              <span className="text-sm">{getActionIcon(activity.action)}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-base-primary">
                    {activity.description}
                  </div>
                  {activity.field_changed && activity.old_value && activity.new_value && (
                    <div className="text-xs text-text-base-secondary mt-1">
                      <span className="font-medium">{activity.field_changed}:</span>{' '}
                      <span className="line-through opacity-60">{activity.old_value}</span>
                      {' → '}
                      <span className="font-semibold">{activity.new_value}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-text-base-tertiary flex-shrink-0">
                  <Clock size={12} />
                  <span title={formatFullTimestamp(activity.timestamp)}>
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-text-base-secondary">
                <User size={12} />
                <span>{activity.user_name}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {maxItems && activities.length > maxItems && (
        <div className="text-center pt-2">
          <button className="text-xs text-fill-brand-primary hover:underline">
            View all {activities.length} activities
          </button>
        </div>
      )}
    </div>
  );
};
