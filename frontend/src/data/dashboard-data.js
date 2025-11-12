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
