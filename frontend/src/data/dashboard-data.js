/**
 * Mock data for Hero Dashboard visualizations
 * Matches data structure from hero-dashboard-final.html
 */

// Dot Matrix Data - Risk-Control Coverage
export const dotMatrixData = {
  risks: [
    { id: 'AIR-001', name: 'Payment Fraud' },
    { id: 'AIR-002', name: 'Biased Pricing' },
    { id: 'AIR-003', name: 'Supply Chain' },
    { id: 'AIR-004', name: 'Prompt Injection' },
    { id: 'AIR-005', name: 'Med Hallucination' }
  ],
  controls: [
    { id: 'GOVERN 1.1', gap: 1.0 },
    { id: 'GOVERN 1.6', gap: 3.0 },
    { id: 'GOVERN 2.2', gap: 1.0 },
    { id: 'MAP 3.1', gap: 0 },
    { id: 'MEASURE 2.1', gap: 1.0 },
    { id: 'MEASURE 2.7', gap: 3.0 },
    { id: 'MEASURE 2.11', gap: 3.0 },
    { id: 'MANAGE 4.1', gap: 2.0 }
  ],
  coverage: {
    'AIR-001': ['GOVERN 2.2', 'MAP 3.1', 'MEASURE 2.1', 'MANAGE 4.1'],
    'AIR-002': ['GOVERN 1.1', 'MEASURE 2.11'],
    'AIR-003': ['GOVERN 2.2', 'MEASURE 2.1'],
    'AIR-004': ['GOVERN 1.1', 'MAP 3.1'],
    'AIR-005': ['GOVERN 1.6', 'MEASURE 2.7', 'MANAGE 4.1']
  }
};

// Sankey Data - Asset Risk Flow
export const sankeyData = {
  nodes: [
    { name: 'GPT-4 (78)', layer: 0, status: 'Sanctioned', score: 78, aal: 6200000 },
    { name: 'Llama (82)', layer: 0, status: 'Shadow IT', score: 82 },
    { name: 'HuggingFace (92)', layer: 0, status: 'Shadow IT', score: 92 },
    { name: 'Fraud ML (85)', layer: 0, status: 'Sanctioned', score: 85 },
    { name: 'Security', layer: 1 },
    { name: 'Bias/Fairness', layer: 1 },
    { name: 'Legal', layer: 1 },
    { name: 'AIR-001 (4.5)', layer: 2, priority: 'Critical', lxi: 4.5 },
    { name: 'AIR-002 (4.0)', layer: 2, priority: 'Critical', lxi: 4.0 },
    { name: 'AIR-003 (3.5)', layer: 2, priority: 'Critical', lxi: 3.5 },
    { name: 'AIR-004 (3.0)', layer: 2, priority: 'High', lxi: 3.0 },
    { name: 'AIR-006 (2.5)', layer: 2, priority: 'Medium', lxi: 2.5 }
  ],
  links: [
    { source: 0, target: 4, value: 78 },
    { source: 0, target: 6, value: 78 },
    { source: 1, target: 5, value: 82 },
    { source: 2, target: 4, value: 92 },
    { source: 3, target: 4, value: 85 },
    { source: 4, target: 7, value: 85 },
    { source: 4, target: 9, value: 92 },
    { source: 4, target: 10, value: 70 },
    { source: 5, target: 8, value: 82 },
    { source: 6, target: 11, value: 78 }
  ]
};

// Quadrant Chart Data - Assurance Priorities
export const quadrantData = [
  { name: 'GOVERN 1.6', gap: 3.0, impact: 95, size: 1, status: 'Draft' },
  { name: 'MEASURE 2.11', gap: 3.0, impact: 90, size: 1, status: 'In Progress' },
  { name: 'GOVERN 3.1', gap: 2.0, impact: 90, size: 1, status: 'In Progress' },
  { name: 'MANAGE 2.1', gap: 2.0, impact: 85, size: 1, status: 'Draft' },
  { name: 'MANAGE 4.1', gap: 2.0, impact: 95, size: 2, status: 'Completed' },
  { name: 'MAP 3.1', gap: 0, impact: 95, size: 2, status: 'Completed' },
  { name: 'GOVERN 1.1', gap: 1.0, impact: 75, size: 2, status: 'In Progress' },
  { name: 'MEASURE 2.1', gap: 1.0, impact: 70, size: 5, status: 'In Progress' },
  { name: 'GOVERN 2.2', gap: 1.0, impact: 88, size: 2, status: 'In Progress' },
  { name: 'MAP 2.2', gap: 1.0, impact: 80, size: 2, status: 'In Progress' }
];

// Treemap Data - GenAI Module Exposure
export const treemapData = {
  name: 'GenAI Modules',
  children: [
    {
      name: 'GPT-4 Turbo',
      fullName: 'OpenAI GPT-4 Turbo',
      value: 6200000,
      aal: 6.2,
      percentage: 68,
      status: 'Sanctioned',
      riskScore: 78,
      coverage: 'medium'
    },
    {
      name: 'Claude 3',
      fullName: 'Anthropic Claude 3',
      value: 1800000,
      aal: 1.8,
      percentage: 20,
      status: 'Sanctioned',
      riskScore: 72,
      coverage: 'good'
    },
    {
      name: 'Llama 3.1',
      fullName: 'Meta Llama 3.1',
      value: 800000,
      aal: 0.8,
      percentage: 9,
      status: 'Shadow IT',
      riskScore: 82,
      coverage: 'poor'
    },
    {
      name: 'Gemini Pro',
      fullName: 'Google Gemini Pro',
      value: 300000,
      aal: 0.3,
      percentage: 3,
      status: 'Sanctioned',
      riskScore: 65,
      coverage: 'good'
    }
  ]
};

// Portfolio Health Data
export const portfolioData = {
  assets: {
    total: 12,
    sanctioned: 8,
    shadow: 4,
    highRisk: 3,
    avgRiskScore: 70
  },
  risks: {
    total: 10,
    critical: 5,
    high: 1,
    medium: 2,
    low: 2
  },
  compliance: {
    maturity: 68,
    assessed: 73,
    criticalGaps: 5,
    target: 85
  },
  assurance: {
    total: 19,
    completed: 12,
    inProgress: 5,
    draft: 2,
    avgGap: 1.4
  },
  genai: {
    aal: 6200000,
    model: 'OpenAI GPT-4 Turbo',
    lastEvaluated: 'Nov 8, 2025',
    loss100Year: 85000000,
    likelihood: 68
  }
};

// Kovrr Insights Data
export const insightsData = [
  {
    module: 'Assets Visibility',
    priority: 'Critical',
    steps: [
      'Investigate 4 Shadow IT assets detected in recent discovery scan',
      'Implement automated asset tagging for GenAI tools',
      'Review high-risk asset GPT-4 API for policy violations'
    ]
  },
  {
    module: 'Risk Register',
    priority: 'Critical',
    steps: [
      'Address 2 "Severe/Expected" scenarios requiring immediate mitigation',
      'Update likelihood assessment for Data Leakage scenario based on recent incidents',
      'Assign owners to 2 unassigned critical risk scenarios'
    ]
  },
  {
    module: 'Compliance Readiness',
    priority: 'High',
    steps: [
      'Close 5 critical control gaps to reach 75% maturity milestone',
      'Focus on GOVERN function: 3 of 5 gaps are governance-related',
      'Schedule Q1 2026 readiness review with compliance team'
    ]
  },
  {
    module: 'Assurance Plan',
    priority: 'Medium',
    steps: [
      'Complete 5 in-progress control assessments before month-end',
      'Prioritize controls mapped to Critical risks (4 controls pending)',
      'Review gap analysis for 11 controls not meeting target maturity'
    ]
  },
  {
    module: 'GenAI Exposure',
    priority: 'Critical',
    steps: [
      '$6.2M annual exposure concentrated in Prompt Injection ($2.8M) and Data Leakage ($2.1M)',
      'Implement technical controls: only 2 of 19 assessed controls address GenAI risks',
      '68% annual likelihood suggests incident within next 12 months'
    ]
  },
  {
    module: 'Integration Health',
    priority: 'Low',
    steps: [
      'Renew 2 expiring API tokens before they impact data sync',
      'Complete setup for 2 pending integrations (Jira, Slack)',
      'All connected systems operational with healthy API status'
    ]
  }
];

// AI Risk Universe Map Data - For CISO Brief
// Maps real mock assets to bubble chart format
// Control maturity calculated as: 100 - (risk_score / inherent_risk_score * 100)
// This shows how much control reduces the inherent risk
export const aiRiskUniverseData = [
  // Critical Assets - Shadow AI with high risk
  { id: 21, name: 'ChatGPT', riskScore: 85, controlMaturity: 10, businessImpact: 'High', size: 25, tier: 'critical', status: 'shadow' },

  // High Risk Assets
  { id: 22, name: 'Claude AI', riskScore: 72, controlMaturity: 12, businessImpact: 'Medium', size: 20, tier: 'high', status: 'shadow' },
  { id: 26, name: 'Poe', riskScore: 70, controlMaturity: 13, businessImpact: 'Medium', size: 18, tier: 'high', status: 'shadow' },
  { id: 27, name: 'Bard', riskScore: 66, controlMaturity: 13, businessImpact: 'Medium', size: 18, tier: 'high', status: 'shadow' },
  { id: 31, name: 'Fireflies.ai', riskScore: 64, controlMaturity: 14, businessImpact: 'Medium', size: 16, tier: 'high', status: 'under_review' },
  { id: 23, name: 'Midjourney', riskScore: 62, controlMaturity: 14, businessImpact: 'Low', size: 14, tier: 'medium', status: 'shadow' },
  { id: 6, name: 'Internal Fraud Detection', riskScore: 60, controlMaturity: 86, businessImpact: 'High', size: 28, tier: 'high', status: 'sanctioned' },
  { id: 4, name: 'Zendesk AI Agent', riskScore: 58, controlMaturity: 85, businessImpact: 'High', size: 24, tier: 'high', status: 'sanctioned' },
  { id: 24, name: 'Perplexity AI', riskScore: 58, controlMaturity: 15, businessImpact: 'Low', size: 12, tier: 'medium', status: 'shadow' },

  // Medium Risk Assets
  { id: 25, name: 'Character.AI', riskScore: 54, controlMaturity: 16, businessImpact: 'Low', size: 10, tier: 'medium', status: 'shadow' },
  { id: 8, name: 'Workday AI', riskScore: 48, controlMaturity: 83, businessImpact: 'Medium', size: 20, tier: 'medium', status: 'sanctioned' },
  { id: 29, name: 'You.com', riskScore: 48, controlMaturity: 17, businessImpact: 'Low', size: 10, tier: 'medium', status: 'shadow' },
  { id: 30, name: 'Runway ML', riskScore: 48, controlMaturity: 17, businessImpact: 'Low', size: 10, tier: 'medium', status: 'shadow' },
  { id: 1, name: 'GitHub Copilot', riskScore: 45, controlMaturity: 82, businessImpact: 'High', size: 22, tier: 'medium', status: 'sanctioned' },
  { id: 3, name: 'Salesforce Einstein', riskScore: 42, controlMaturity: 81, businessImpact: 'High', size: 24, tier: 'medium', status: 'sanctioned' },
  { id: 10, name: 'Microsoft 365 Copilot', riskScore: 40, controlMaturity: 80, businessImpact: 'High', size: 26, tier: 'medium', status: 'sanctioned' },
  { id: 7, name: 'HubSpot AI', riskScore: 38, controlMaturity: 79, businessImpact: 'Medium', size: 18, tier: 'medium', status: 'sanctioned' },

  // Low Risk Assets
  { id: 5, name: 'Tableau AI', riskScore: 32, controlMaturity: 76, businessImpact: 'Medium', size: 16, tier: 'low', status: 'sanctioned' },
  { id: 2, name: 'Grammarly Business', riskScore: 28, controlMaturity: 74, businessImpact: 'Low', size: 12, tier: 'low', status: 'sanctioned' },
  { id: 9, name: 'Zoom AI Companion', riskScore: 25, controlMaturity: 71, businessImpact: 'Low', size: 12, tier: 'low', status: 'sanctioned' },
  { id: 28, name: 'Phind', riskScore: 22, controlMaturity: 69, businessImpact: 'Low', size: 8, tier: 'low', status: 'shadow' },
];

// CISO Brief Summary Data
export const cisoBriefData = {
  portfolioHealth: {
    score: 78,
    trend: '+5',
    trendDirection: 'up'
  },
  criticalGaps: [
    {
      id: 1,
      name: 'Data Retention Policy',
      gap: 2.8,
      daysOpen: 45,
      owner: 'Shai',
      ownerId: 3,
      category: 'Governance',
      impact: 'High'
    },
    {
      id: 2,
      name: 'Access Control Review',
      gap: 2.5,
      daysOpen: 30,
      owner: 'Yakir',
      ownerId: 4,
      category: 'Security',
      impact: 'High'
    },
    {
      id: 3,
      name: 'Model Testing Protocol',
      gap: 2.2,
      daysOpen: 22,
      owner: 'Naomi',
      ownerId: 5,
      category: 'Technical',
      impact: 'Medium'
    }
  ],
  inProgress: [
    {
      id: 1,
      name: 'Model Testing Framework',
      progress: 75,
      dueDate: 'Dec 1',
      owner: 'Shai',
      status: 'on_track'
    },
    {
      id: 2,
      name: 'Privacy Policy Update',
      progress: 40,
      dueDate: 'Dec 15',
      owner: 'Yakir',
      status: 'at_risk'
    },
    {
      id: 3,
      name: 'Risk Register Review',
      progress: 90,
      dueDate: 'Nov 20',
      owner: 'Naomi',
      status: 'on_track'
    },
    {
      id: 4,
      name: 'Vendor Assessment',
      progress: 60,
      dueDate: 'Dec 5',
      owner: 'Huw',
      status: 'on_track'
    },
    {
      id: 5,
      name: 'Compliance Audit Prep',
      progress: 35,
      dueDate: 'Dec 20',
      owner: 'Alona',
      status: 'at_risk'
    }
  ],
  topActions: [
    {
      id: 1,
      title: 'Review ChatGPT data retention',
      status: 'overdue',
      daysOverdue: 5,
      owner: 'Shai',
      priority: 'critical',
      completedSteps: [1] // Step 1 completed
    },
    {
      id: 2,
      title: 'Complete GitHub Copilot Risk Assessment',
      status: 'due_soon',
      dueDate: 'Monday',
      owner: 'Yakir',
      priority: 'high',
      link: '/assets',
      completedSteps: [1, 2] // Steps 1 and 2 completed
    },
    {
      id: 3,
      title: 'Update ChatGPT Usage Policy',
      status: 'upcoming',
      dueDate: 'Dec 1',
      owner: 'Naomi',
      priority: 'medium',
      link: '/governance-monitoring',
      completedSteps: [1, 2] // Steps 1 and 2 completed
    }
  ],
  thisWeek: {
    controlsClosed: 2,
    risksMitigated: 1,
    assetsSanctioned: 2,
    assessmentsStarted: 3
  },
  metrics: {
    critical: { value: 7, trend: '+2', trendDirection: 'up' },
    highRisk: { value: 7, trend: '-2', trendDirection: 'down' },
    inProgress: { value: 8, trend: '0', trendDirection: 'neutral' },
    maturity: { value: 85, trend: '+5%', trendDirection: 'up' }
  }
};
