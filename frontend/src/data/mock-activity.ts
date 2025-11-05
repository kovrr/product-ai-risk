/**
 * Mock Activity Log Data
 * Tracks changes and actions on risk scenarios
 */

export interface ActivityLog {
  id: number;
  risk_id: number;
  user_id: number;
  user_name: string;
  action: ActivityAction;
  field_changed?: string;
  old_value?: string;
  new_value?: string;
  description: string;
  timestamp: string;
}

export type ActivityAction = 
  | 'created'
  | 'updated'
  | 'status_changed'
  | 'priority_changed'
  | 'assigned'
  | 'commented'
  | 'mitigation_added'
  | 'control_added'
  | 'assessment_updated'
  | 'exported';

// Mock activity logs
export const mockActivityLogs: ActivityLog[] = [
  {
    id: 1,
    risk_id: 1,
    user_id: 1,
    user_name: 'Or Authora',
    action: 'created',
    description: 'Created risk scenario "Unauthorized Data Access via ChatGPT"',
    timestamp: '2025-01-15T09:30:00Z',
  },
  {
    id: 2,
    risk_id: 1,
    user_id: 2,
    user_name: 'Sarah Connor',
    action: 'updated',
    field_changed: 'financial_impact',
    old_value: '$8,000,000',
    new_value: '$12,000,000',
    description: 'Updated financial impact based on new assessment',
    timestamp: '2025-01-16T14:20:00Z',
  },
  {
    id: 3,
    risk_id: 1,
    user_id: 1,
    user_name: 'Or Authora',
    action: 'status_changed',
    field_changed: 'status',
    old_value: 'Identified',
    new_value: 'Under Assessment',
    description: 'Moved to assessment phase',
    timestamp: '2025-01-17T10:15:00Z',
  },
  {
    id: 4,
    risk_id: 1,
    user_id: 3,
    user_name: 'Mike Ross',
    action: 'mitigation_added',
    description: 'Added mitigation control: Data Loss Prevention (DLP) integration',
    timestamp: '2025-01-18T11:45:00Z',
  },
  {
    id: 5,
    risk_id: 1,
    user_id: 2,
    user_name: 'Sarah Connor',
    action: 'commented',
    description: 'Added comment: "Need to review with legal team before finalizing mitigation plan"',
    timestamp: '2025-01-19T15:30:00Z',
  },
  {
    id: 6,
    risk_id: 2,
    user_id: 1,
    user_name: 'Or Authora',
    action: 'created',
    description: 'Created risk scenario "Model Poisoning Attack"',
    timestamp: '2025-01-20T09:00:00Z',
  },
  {
    id: 7,
    risk_id: 2,
    user_id: 4,
    user_name: 'Alex Turner',
    action: 'priority_changed',
    field_changed: 'priority',
    old_value: 'High',
    new_value: 'Critical',
    description: 'Escalated to critical priority due to recent incidents',
    timestamp: '2025-01-21T13:20:00Z',
  },
  {
    id: 8,
    risk_id: 1,
    user_id: 1,
    user_name: 'Or Authora',
    action: 'status_changed',
    field_changed: 'status',
    old_value: 'Under Assessment',
    new_value: 'Response Plan Decided',
    description: 'Mitigation plan approved and scheduled',
    timestamp: '2025-01-22T16:00:00Z',
  },
  {
    id: 9,
    risk_id: 3,
    user_id: 2,
    user_name: 'Sarah Connor',
    action: 'created',
    description: 'Created risk scenario "Prompt Injection Attack"',
    timestamp: '2025-01-23T10:30:00Z',
  },
  {
    id: 10,
    risk_id: 3,
    user_id: 3,
    user_name: 'Mike Ross',
    action: 'control_added',
    description: 'Added current control: Input validation and sanitization',
    timestamp: '2025-01-24T14:15:00Z',
  },
  {
    id: 11,
    risk_id: 1,
    user_id: 5,
    user_name: 'Jennifer Lopez',
    action: 'assessment_updated',
    description: 'Updated impact assessment: Added regulatory compliance concerns',
    timestamp: '2025-01-25T11:00:00Z',
  },
  {
    id: 12,
    risk_id: 2,
    user_id: 1,
    user_name: 'Or Authora',
    action: 'assigned',
    field_changed: 'owner',
    old_value: 'Unassigned',
    new_value: 'Sarah Connor',
    description: 'Assigned risk owner to Sarah Connor',
    timestamp: '2025-01-26T09:45:00Z',
  },
];

// Helper functions
export const getActivityLogsByRisk = (riskId: number): ActivityLog[] => {
  return mockActivityLogs
    .filter(log => log.risk_id === riskId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getRecentActivity = (limit: number = 10): ActivityLog[] => {
  return [...mockActivityLogs]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

export const getActivityByUser = (userId: number): ActivityLog[] => {
  return mockActivityLogs
    .filter(log => log.user_id === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getActionIcon = (action: ActivityAction): string => {
  const icons: Record<ActivityAction, string> = {
    created: '✨',
    updated: '📝',
    status_changed: '🔄',
    priority_changed: '⚠️',
    assigned: '👤',
    commented: '💬',
    mitigation_added: '🛡️',
    control_added: '🔒',
    assessment_updated: '📊',
    exported: '📤',
  };
  return icons[action] || '📌';
};

export const getActionColor = (action: ActivityAction): string => {
  const colors: Record<ActivityAction, string> = {
    created: 'text-green-600 bg-green-50',
    updated: 'text-blue-600 bg-blue-50',
    status_changed: 'text-purple-600 bg-purple-50',
    priority_changed: 'text-red-600 bg-red-50',
    assigned: 'text-indigo-600 bg-indigo-50',
    commented: 'text-gray-600 bg-gray-50',
    mitigation_added: 'text-teal-600 bg-teal-50',
    control_added: 'text-cyan-600 bg-cyan-50',
    assessment_updated: 'text-orange-600 bg-orange-50',
    exported: 'text-pink-600 bg-pink-50',
  };
  return colors[action] || 'text-gray-600 bg-gray-50';
};
