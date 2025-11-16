// Mock Risk Scenarios Data - Complete Data Model
// Based on AI Risk Register design specs (Nov 4, 2025)

export type RiskCategory = 
  | 'Privacy Risk'
  | 'Security Risk'
  | 'Bias/Fairness Risk'
  | 'Safety Risk'
  | 'Legal/Compliance Risk'
  | 'Performance Risk'
  | 'Ethical Risk';

export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';

export type ImpactLevel = 'Severe' | 'Significant' | 'Moderate' | 'Minor' | 'Negligible';

export type LikelihoodLevel = 'Expected' | 'Likely' | 'Possible' | 'Unlikely' | 'Rare';

export type RiskStatus = 
  | 'Identified'
  | 'Under Assessment'
  | 'Plan in Progress'
  | 'Response Plan Decided'
  | 'Closed';

export type ResponsePlan = 'Mitigate' | 'Avoid' | 'Transfer' | 'Accept';

export interface RiskScenario {
  // Basic Information
  id: number;
  risk_id: string;                    // AIR-001, AIR-002, etc.
  name: string;
  description: string;
  category: RiskCategory;
  owner_id: number;
  owner_name: string;                 // For display
  
  // Risk Assessment
  priority: Priority;
  impact_level: ImpactLevel;
  likelihood_level: LikelihoodLevel;
  status: RiskStatus;
  response_plan: ResponsePlan;
  
  // MITRE ATLAS Mapping
  mitre_tactics: string[];
  mitre_techniques: string[];
  
  // Impact Details
  financial_impact: number;           // In dollars
  reputational_impact: string;
  regulatory_impact: string;
  operational_impact: string;

  // Additional Classification (for UI sidebar)
  cyber_event_types: string[];        // e.g. Data Exfiltration, Model Integrity
  impact_types: string[];             // e.g. Privacy Violation, Regulatory Non-Compliance
  risk_subcategories: string[];       // e.g. Biometric Misuse, GDPR Violations
  
  // Mitigation
  current_controls: number[];         // Control IDs
  planned_controls: number[];         // Control IDs
  mitigation_timeline: string;        // ISO date string
  residual_risk_level: string;

  // Response metadata (ticketing, review, cost)
  ticket_url?: string;
  review_date?: string;               // ISO date string
  mitigation_cost?: number;           // In dollars
  mitigation_currency?: 'USD' | 'EUR' | 'NIS' | 'GBP';
  
  // Data Exposure
  records_at_risk: number;
  data_types: string[];               // PII, Financial, Health, etc.
  jurisdictions: string[];            // US, EU, UK, CA
  regulatory_frameworks: string[];    // GDPR, CCPA, HIPAA
  
  // Quantification (for Phase 4)
  expected_annual_loss?: number;
  value_at_risk_95?: number;
  maximum_probable_loss?: number;
  loss_distribution?: {
    percentile: number;
    loss_amount: number;
    probability: number;
  }[];
  
  // Metadata
  created_at: string;
  updated_at: string;
  created_by: number;
  last_assessed_at: string;
}

// 10 Risk Scenarios from HTML Demo
export const mockRisks: RiskScenario[] = [
  {
    id: 1,
    risk_id: 'AIR-001',
    name: 'Real-Time Payment Fraud Detection Failure',
    description: 'AI fraud detection system experiences catastrophic false negative rate during peak transaction period, allowing coordinated attack to process $2.3M in fraudulent wire transfers before manual intervention.',
    category: 'Security Risk',
    owner_id: 6,
    owner_name: 'sarah@kovrr.com',
    priority: 'Critical',
    impact_level: 'Severe',
    likelihood_level: 'Expected',
    status: 'Response Plan Decided',
    response_plan: 'Mitigate',
    mitre_tactics: ['AML.T0052 - Phishing', 'AML.T0043 - Data Exfiltration'],
    mitre_techniques: ['T1566 - Phishing', 'T1530 - Data from Cloud Storage'],
    financial_impact: 2400000,
    reputational_impact: 'High - Loss of customer trust, negative media coverage',
    regulatory_impact: 'GDPR violations, potential fines up to €20M or 4% of revenue',
    operational_impact: 'System shutdown, forensic investigation, customer notification',
    cyber_event_types: ['Data Exfiltration', 'Model Integrity'],
    impact_types: ['Privacy Violation', 'Regulatory Non-Compliance', 'Reputational Damage', 'Financial Loss'],
    risk_subcategories: ['Biometric Misuse', 'GDPR Violations'],
    current_controls: [1, 2, 5],
    planned_controls: [7, 9],
    mitigation_timeline: '2025-12-31',
    residual_risk_level: 'Medium',
    records_at_risk: 125000,
    data_types: ['PII', 'Biometric', 'Financial'],
    jurisdictions: ['US', 'EU', 'UK'],
    regulatory_frameworks: ['GDPR', 'CCPA', 'BIPA'],
    expected_annual_loss: 2400000,
    value_at_risk_95: 8700000,
    maximum_probable_loss: 15200000,
    ticket_url: undefined,
    review_date: '2025-11-15T00:00:00Z',
    mitigation_cost: 75000,
    mitigation_currency: 'USD',
    created_at: '2025-01-15T10:00:00Z',
    updated_at: '2025-11-01T14:30:00Z',
    created_by: 1,
    last_assessed_at: '2025-10-28T09:15:00Z',
  },
  {
    id: 2,
    risk_id: 'AIR-002',
    name: 'Biased Insurance Premium Pricing',
    description: 'AI-powered insurance pricing algorithm systematically charges higher premiums to protected demographic groups, leading to regulatory violations and discrimination claims.',
    category: 'Bias/Fairness Risk',
    owner_id: 7,
    owner_name: 'mike@kovrr.com',
    priority: 'Critical',
    impact_level: 'Significant',
    likelihood_level: 'Expected',
    status: 'Plan in Progress',
    response_plan: 'Mitigate',
    mitre_tactics: ['AML.T0020 - AI Supply Chain: Model', 'AML.T0018 - Backdoor ML Model'],
    mitre_techniques: ['T1195 - Supply Chain Compromise', 'T1204 - User Execution'],
    financial_impact: 5000000,
    reputational_impact: 'Critical - Loss of market confidence, customer churn',
    regulatory_impact: 'Potential regulatory scrutiny, mandatory disclosure',
    operational_impact: 'Model retraining, service disruption, security audit',
    cyber_event_types: ['Model Integrity'],
    impact_types: ['Security Incident', 'Operational Disruption'],
    risk_subcategories: ['Model Poisoning'],
    current_controls: [3, 4],
    planned_controls: [6, 8, 10],
    mitigation_timeline: '2025-11-30',
    residual_risk_level: 'High',
    records_at_risk: 0,
    data_types: ['Model Parameters', 'Training Data'],
    jurisdictions: ['US', 'Global'],
    regulatory_frameworks: ['SOC 2', 'ISO 27001'],
    expected_annual_loss: 5000000,
    value_at_risk_95: 12000000,
    maximum_probable_loss: 25000000,
    ticket_url: undefined,
    review_date: undefined,
    mitigation_cost: undefined,
    mitigation_currency: undefined,
    created_at: '2025-02-01T08:00:00Z',
    updated_at: '2025-11-02T16:45:00Z',
    created_by: 6,
    last_assessed_at: '2025-11-02T10:00:00Z',
  },
  {
    id: 3,
    risk_id: 'AIR-003',
    name: 'Supply Chain Model Poisoning',
    description: 'Third-party ML model from vendor contains backdoor allowing adversary to trigger malicious behavior, compromising critical business processes.',
    category: 'Security Risk',
    owner_id: 1,
    owner_name: 'or@kovrr.com',
    priority: 'Critical',
    impact_level: 'Severe',
    likelihood_level: 'Possible',
    status: 'Under Assessment',
    response_plan: 'Mitigate',
    mitre_tactics: ['AML.T0051 - Evade AI Model'],
    mitre_techniques: ['T1498 - Algorithmic Bias'],
    financial_impact: 3500000,
    reputational_impact: 'High - Brand damage, loss of diverse talent',
    regulatory_impact: 'EEOC violations, class action lawsuits, consent decrees',
    operational_impact: 'Hiring freeze, model audit, process redesign',
    cyber_event_types: ['Algorithmic Bias'],
    impact_types: ['Regulatory Non-Compliance', 'Reputational Damage'],
    risk_subcategories: ['EEOC / Fair Hiring'],
    current_controls: [1, 5],
    planned_controls: [2, 7],
    mitigation_timeline: '2026-03-31',
    residual_risk_level: 'Medium',
    records_at_risk: 50000,
    data_types: ['PII', 'Employment Records'],
    jurisdictions: ['US'],
    regulatory_frameworks: ['EEOC', 'Title VII'],
    expected_annual_loss: 3500000,
    value_at_risk_95: 7800000,
    maximum_probable_loss: 18000000,
    ticket_url: undefined,
    review_date: undefined,
    mitigation_cost: undefined,
    mitigation_currency: undefined,
    created_at: '2025-03-10T11:30:00Z',
    updated_at: '2025-10-30T13:20:00Z',
    created_by: 7,
    last_assessed_at: '2025-10-25T15:00:00Z',
  },
  {
    id: 4,
    risk_id: 'AIR-004',
    name: 'Prompt Injection Data Exfiltration',
    description: 'Malicious prompts bypass AI safety controls, causing the model to leak sensitive customer information from its training data or context.',
    category: 'Security Risk',
    owner_id: 8,
    owner_name: 'alex@kovrr.com',
    priority: 'High',
    impact_level: 'Significant',
    likelihood_level: 'Possible',
    status: 'Response Plan Decided',
    response_plan: 'Mitigate',
    mitre_tactics: ['AML.T0052 - Phishing', 'AML.T0051 - Evade AI Model'],
    mitre_techniques: ['T1059 - Command Injection', 'T1557 - Adversarial ML'],
    financial_impact: 1800000,
    reputational_impact: 'Medium - Customer concern, security incident disclosure',
    regulatory_impact: 'Data breach notification requirements, potential fines',
    operational_impact: 'Prompt filtering implementation, model fine-tuning',
    cyber_event_types: ['Data Exfiltration'],
    impact_types: ['Privacy Violation', 'Regulatory Non-Compliance'],
    risk_subcategories: ['Prompt Injection'],
    current_controls: [3],
    planned_controls: [4, 6, 9],
    mitigation_timeline: '2025-12-15',
    residual_risk_level: 'Medium',
    records_at_risk: 75000,
    data_types: ['PII', 'Confidential Business Data'],
    jurisdictions: ['US', 'EU'],
    regulatory_frameworks: ['GDPR', 'CCPA'],
    expected_annual_loss: 1800000,
    value_at_risk_95: 4200000,
    maximum_probable_loss: 9500000,
    ticket_url: undefined,
    review_date: undefined,
    mitigation_cost: undefined,
    mitigation_currency: undefined,
    created_at: '2025-04-05T09:00:00Z',
    updated_at: '2025-11-03T11:00:00Z',
    created_by: 8,
    last_assessed_at: '2025-10-20T14:30:00Z',
  },
  {
    id: 5,
    risk_id: 'AIR-005',
    name: 'Medical Diagnosis Hallucination',
    description: 'AI diagnostic assistant generates false or dangerous medical diagnoses, potentially causing patient harm and regulatory violations.',
    category: 'Safety Risk',
    owner_id: 9,
    owner_name: 'jen@kovrr.com',
    priority: 'Critical',
    impact_level: 'Severe',
    likelihood_level: 'Unlikely',
    status: 'Response Plan Decided',
    response_plan: 'Avoid',
    mitre_tactics: ['AML.T0048 - Model Inversion'],
    mitre_techniques: ['T1499 - AI Hallucination'],
    financial_impact: 10000000,
    reputational_impact: 'Critical - Loss of medical credibility, patient trust erosion',
    regulatory_impact: 'FDA enforcement, medical malpractice claims, license revocation',
    operational_impact: 'Service suspension, clinical review, liability insurance claims',
    cyber_event_types: ['AI System Failure'],
    impact_types: ['Safety Risk', 'Regulatory Non-Compliance', 'Financial Loss'],
    risk_subcategories: ['Medical Advice Hallucination'],
    current_controls: [1, 2, 3, 5],
    planned_controls: [8, 10],
    mitigation_timeline: '2025-11-15',
    residual_risk_level: 'Low',
    records_at_risk: 200000,
    data_types: ['Health Records', 'PII'],
    jurisdictions: ['US', 'EU'],
    regulatory_frameworks: ['HIPAA', 'FDA', 'GDPR'],
    expected_annual_loss: 10000000,
    value_at_risk_95: 25000000,
    maximum_probable_loss: 50000000,
    ticket_url: undefined,
    review_date: undefined,
    mitigation_cost: undefined,
    mitigation_currency: undefined,
    created_at: '2025-01-20T10:00:00Z',
    updated_at: '2025-10-31T16:00:00Z',
    created_by: 9,
    last_assessed_at: '2025-10-31T12:00:00Z',
  },
  {
    id: 6,
    risk_id: 'AIR-006',
    name: 'Training Data Copyright Violation',
    description: 'AI models trained on copyrighted content without authorization, exposing organization to intellectual property lawsuits and licensing requirements.',
    category: 'Legal/Compliance Risk',
    owner_id: 1,
    owner_name: 'or@kovrr.com',
    priority: 'Medium',
    impact_level: 'Moderate',
    likelihood_level: 'Expected',
    status: 'Under Assessment',
    response_plan: 'Transfer',
    mitre_tactics: ['AML.T0052 - Phishing', 'AML.T0054 - Social Engineering'],
    mitre_techniques: ['T1566 - Phishing', 'T1598 - Phishing for Information'],
    financial_impact: 8000000,
    reputational_impact: 'High - Loss of stakeholder confidence, media attention',
    regulatory_impact: 'SEC disclosure requirements, fraud investigation',
    operational_impact: 'Enhanced verification protocols, employee training',
    cyber_event_types: ['Social Engineering'],
    impact_types: ['Financial Loss', 'Reputational Damage'],
    risk_subcategories: ['Deepfake Fraud'],
    current_controls: [1, 4, 5],
    planned_controls: [6, 7],
    mitigation_timeline: '2025-12-01',
    residual_risk_level: 'Low',
    records_at_risk: 0,
    data_types: ['Financial Data', 'Executive Communications'],
    jurisdictions: ['US', 'Global'],
    regulatory_frameworks: ['SOX', 'SEC'],
    expected_annual_loss: 8000000,
    value_at_risk_95: 15000000,
    maximum_probable_loss: 30000000,
    ticket_url: undefined,
    review_date: undefined,
    mitigation_cost: undefined,
    mitigation_currency: undefined,
    created_at: '2025-02-15T14:00:00Z',
    updated_at: '2025-11-01T10:30:00Z',
    created_by: 6,
    last_assessed_at: '2025-10-29T11:00:00Z',
  },
  {
    id: 7,
    risk_id: 'AIR-007',
    name: 'Model Performance Degradation',
    description: 'Production AI model experiences gradual accuracy decline due to data drift, leading to increased error rates and customer dissatisfaction.',
    category: 'Performance Risk',
    owner_id: 7,
    owner_name: 'mike@kovrr.com',
    priority: 'Medium',
    impact_level: 'Moderate',
    likelihood_level: 'Unlikely',
    status: 'Identified',
    response_plan: 'Mitigate',
    mitre_tactics: ['AML.T0020 - AI Supply Chain: Model'],
    mitre_techniques: ['T1195 - Supply Chain Compromise'],
    financial_impact: 2000000,
    reputational_impact: 'Medium - Industry criticism, creator backlash',
    regulatory_impact: 'Copyright infringement lawsuits, licensing requirements',
    operational_impact: 'Model retraining, content filtering, legal review',
    cyber_event_types: ['Model Integrity'],
    impact_types: ['Legal/Compliance Risk'],
    risk_subcategories: ['Copyright Infringement'],
    current_controls: [2],
    planned_controls: [3, 5, 8],
    mitigation_timeline: '2026-06-30',
    residual_risk_level: 'Low',
    records_at_risk: 0,
    data_types: ['Training Data', 'Generated Content'],
    jurisdictions: ['US', 'EU'],
    regulatory_frameworks: ['DMCA', 'EU Copyright Directive'],
    expected_annual_loss: 2000000,
    value_at_risk_95: 5000000,
    maximum_probable_loss: 12000000,
    ticket_url: undefined,
    review_date: undefined,
    mitigation_cost: undefined,
    mitigation_currency: undefined,
    created_at: '2025-03-01T09:00:00Z',
    updated_at: '2025-11-02T15:00:00Z',
    created_by: 1,
    last_assessed_at: '2025-10-27T10:00:00Z',
  },
  {
    id: 8,
    risk_id: 'AIR-008',
    name: 'Chatbot Inappropriate Content Generation',
    description: 'Customer service chatbot generates offensive or inappropriate responses, causing reputational damage and customer complaints.',
    category: 'Ethical Risk',
    owner_id: 8,
    owner_name: 'alex@kovrr.com',
    priority: 'Low',
    impact_level: 'Minor',
    likelihood_level: 'Possible',
    status: 'Plan in Progress',
    response_plan: 'Accept',
    mitre_tactics: ['AML.T0051 - Evade AI Model'],
    mitre_techniques: ['T1498 - Algorithmic Bias'],
    financial_impact: 4500000,
    reputational_impact: 'High - Regulatory scrutiny, consumer advocacy campaigns',
    regulatory_impact: 'ECOA violations, CFPB enforcement, consent orders',
    operational_impact: 'Model audit, fairness testing, process remediation',
    cyber_event_types: ['Algorithmic Bias'],
    impact_types: ['Regulatory Non-Compliance', 'Financial Loss'],
    risk_subcategories: ['Credit Decision Bias'],
    current_controls: [1, 2],
    planned_controls: [5, 7, 9],
    mitigation_timeline: '2026-02-28',
    residual_risk_level: 'Medium',
    records_at_risk: 100000,
    data_types: ['PII', 'Financial Data', 'Credit History'],
    jurisdictions: ['US'],
    regulatory_frameworks: ['ECOA', 'FCRA', 'CFPB'],
    expected_annual_loss: 4500000,
    value_at_risk_95: 9000000,
    maximum_probable_loss: 20000000,
    ticket_url: undefined,
    review_date: undefined,
    mitigation_cost: undefined,
    mitigation_currency: undefined,
    created_at: '2025-04-10T13:00:00Z',
    updated_at: '2025-10-29T14:00:00Z',
    created_by: 7,
    last_assessed_at: '2025-10-26T16:00:00Z',
  },
  {
    id: 9,
    risk_id: 'AIR-009',
    name: 'Translation Service Nuance Loss',
    description: 'AI translation service loses cultural nuances and context, leading to miscommunication in critical business negotiations.',
    category: 'Performance Risk',
    owner_id: 9,
    owner_name: 'jen@kovrr.com',
    priority: 'Low',
    impact_level: 'Minor',
    likelihood_level: 'Rare',
    status: 'Identified',
    response_plan: 'Accept',
    mitre_tactics: ['AML.T0043 - Data Exfiltration'],
    mitre_techniques: ['T1530 - Data from Cloud Storage'],
    financial_impact: 1200000,
    reputational_impact: 'Medium - Customer complaints, negative reviews',
    regulatory_impact: 'Privacy breach notification, potential fines',
    operational_impact: 'Bot suspension, conversation logging, security patch',
    cyber_event_types: ['Data Exfiltration'],
    impact_types: ['Privacy Violation', 'Regulatory Non-Compliance'],
    risk_subcategories: ['Chatbot Privacy Leak'],
    current_controls: [3, 4],
    planned_controls: [6, 9],
    mitigation_timeline: '2026-01-31',
    residual_risk_level: 'Low',
    records_at_risk: 80000,
    data_types: ['PII', 'Customer Communications'],
    jurisdictions: ['US', 'EU', 'CA'],
    regulatory_frameworks: ['GDPR', 'CCPA', 'PIPEDA'],
    expected_annual_loss: 1200000,
    value_at_risk_95: 3000000,
    maximum_probable_loss: 7000000,
    ticket_url: undefined,
    review_date: undefined,
    mitigation_cost: undefined,
    mitigation_currency: undefined,
    created_at: '2025-05-01T10:00:00Z',
    updated_at: '2025-11-03T09:00:00Z',
    created_by: 8,
    last_assessed_at: '2025-10-24T11:00:00Z',
  },
  {
    id: 10,
    risk_id: 'AIR-010',
    name: 'Email Classification Mislabeling',
    description: 'AI email classification system incorrectly labels important messages as spam, causing missed business opportunities.',
    category: 'Performance Risk',
    owner_id: 6,
    owner_name: 'sarah@kovrr.com',
    priority: 'Low',
    impact_level: 'Negligible',
    likelihood_level: 'Rare',
    status: 'Closed',
    response_plan: 'Accept',
    mitre_tactics: ['AML.T0048 - Model Inversion', 'AML.T0051 - Evade AI Model'],
    mitre_techniques: ['T1499 - AI System Failure'],
    financial_impact: 50000000,
    reputational_impact: 'Critical - Brand destruction, loss of public trust',
    regulatory_impact: 'NHTSA investigation, product recalls, criminal liability',
    operational_impact: 'Fleet recall, software update, safety certification',
    cyber_event_types: ['AI System Failure'],
    impact_types: ['Safety Risk', 'Regulatory Non-Compliance', 'Financial Loss'],
    risk_subcategories: ['Autonomous Vehicle Failure'],
    current_controls: [1, 2, 3, 4, 5],
    planned_controls: [6, 7, 8, 9, 10],
    mitigation_timeline: '2025-11-30',
    residual_risk_level: 'Very Low',
    records_at_risk: 0,
    data_types: ['Sensor Data', 'Vehicle Telemetry'],
    jurisdictions: ['US', 'EU', 'Global'],
    regulatory_frameworks: ['NHTSA', 'FMVSS', 'UN R155'],
    expected_annual_loss: 50000000,
    value_at_risk_95: 100000000,
    maximum_probable_loss: 500000000,
    ticket_url: undefined,
    review_date: undefined,
    mitigation_cost: undefined,
    mitigation_currency: undefined,
    created_at: '2025-01-10T08:00:00Z',
    updated_at: '2025-10-30T17:00:00Z',
    created_by: 9,
    last_assessed_at: '2025-10-30T14:00:00Z',
  },
];

// Helper functions
export const getRiskById = (id: number): RiskScenario | undefined => {
  return mockRisks.find(risk => risk.id === id);
};

export const getRiskByRiskId = (riskId: string): RiskScenario | undefined => {
  return mockRisks.find(risk => risk.risk_id === riskId);
};

export const getRisksByCategory = (category: RiskCategory): RiskScenario[] => {
  return mockRisks.filter(risk => risk.category === category);
};

export const getRisksByPriority = (priority: Priority): RiskScenario[] => {
  return mockRisks.filter(risk => risk.priority === priority);
};

export const getRisksByStatus = (status: RiskStatus): RiskScenario[] => {
  return mockRisks.filter(risk => risk.status === status);
};

export const getRisksByOwner = (ownerId: number): RiskScenario[] => {
  return mockRisks.filter(risk => risk.owner_id === ownerId);
};

export const searchRisks = (query: string): RiskScenario[] => {
  const lowerQuery = query.toLowerCase();
  return mockRisks.filter(risk => 
    risk.name.toLowerCase().includes(lowerQuery) ||
    risk.description.toLowerCase().includes(lowerQuery) ||
    risk.risk_id.toLowerCase().includes(lowerQuery)
  );
};

// Get all unique categories
export const getAllCategories = (): RiskCategory[] => {
  return Array.from(new Set(mockRisks.map(risk => risk.category)));
};

// Get all unique priorities
export const getAllPriorities = (): Priority[] => {
  return ['Critical', 'High', 'Medium', 'Low'];
};

// Get all unique statuses
export const getAllStatuses = (): RiskStatus[] => {
  return ['Identified', 'Under Assessment', 'Plan in Progress', 'Response Plan Decided'];
};

// Calculate priority score for sorting (Critical=4, High=3, Medium=2, Low=1)
export const getPriorityScore = (priority: Priority): number => {
  const scores: Record<Priority, number> = {
    'Critical': 4,
    'High': 3,
    'Medium': 2,
    'Low': 1,
  };
  return scores[priority];
};

// Sort risks by priority (highest first)
export const sortRisksByPriority = (risks: RiskScenario[]): RiskScenario[] => {
  return [...risks].sort((a, b) => getPriorityScore(b.priority) - getPriorityScore(a.priority));
};
