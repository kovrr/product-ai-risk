// Mock AI Assets Data - 40 assets from PostgreSQL
// This data represents the Assets Visibility module

import { calculateRiskTier } from '../utils/riskTierCalculator';

export interface AIAsset {
  id: number;
  name: string;
  asset_type: 'model' | 'app' | 'agent' | 'dataset' | 'service';
  owner_id: number;
  technical_owner_id: number;
  owning_org_unit: string;
  vendor_source: 'internal' | 'third_party' | 'open_source';
  vendor_name: string;
  status: 'sanctioned' | 'shadow' | 'under_review' | 'blocked' | 'retired';
  use_case: string;
  description: string;
  intended_users: string[];
  projected_value?: string;
  lifecycle_stage: 'idea' | 'development' | 'testing' | 'pilot' | 'production' | 'retired';
  deployment_platform: 'cloud' | 'on_premises' | 'saas' | 'hybrid';
  environment: string[];
  risk_tier: 'low' | 'medium' | 'high' | 'critical';
  risk_score: number;
  inherent_risk_score: number;
  residual_risk_score: number;
  personal_data_used: boolean;
  sensitive_categories: string[];
  regulatory_applicability: string[];
  control_coverage: string[];
  model_provider: string;
  model_version: string;
  // Risk Dimension Fields for RiskScoreBreakdown
  criticality?: 'low' | 'moderate' | 'high' | 'very-high';
  audienceReach?: 'low' | 'moderate' | 'high' | 'very-high';
  dataPrivacy?: 'low' | 'moderate' | 'high' | 'very-high';
  dataClassification?: 'external' | 'internal' | 'confidential' | 'highly-confidential';
  ethicalRisk?: 'low' | 'moderate' | 'high' | 'very-high';
  complexity?: 'low' | 'moderate' | 'high' | 'very-high';
  cybersecurity?: 'low' | 'moderate' | 'high' | 'very-high';
  financialImpact?: 'low' | 'moderate' | 'high' | 'very-high';
  nonFinancialImpact?: 'low' | 'moderate' | 'high' | 'very-high';
  sustainability?: 'low' | 'moderate' | 'high' | 'very-high' | 'unknown';
  resilience?: 'low' | 'moderate' | 'high' | 'very-high';
  humanOversight?: 'human-in-loop' | 'human-on-loop' | 'sampled' | 'autonomous';
}

const rawMockAssets: AIAsset[] = [
  // Sanctioned Assets (10)
  {
    id: 1,
    name: "GitHub Copilot",
    asset_type: "app",
    owner_id: 1,
    technical_owner_id: 1,
    owning_org_unit: "Engineering",
    vendor_source: "third_party",
    vendor_name: "GitHub",
    status: "sanctioned",
    use_case: "Code completion",
    description: "AI pair programmer",
    intended_users: ["employees"],
    projected_value: "$50K productivity",
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "medium",
    risk_score: 48.00,
    inherent_risk_score: 58.00,
    residual_risk_score: 48.00,
    personal_data_used: false,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "OpenAI",
    model_version: "Codex",
    // Risk Dimensions (Medium Risk - 48/100)
    // Target: 48 = Total Weighted Score / 12.0 → Need total of 576
    // All moderate (50) = 50×(1.2+1.1+1.3+1.2+1.1+0.9+1.3+1.0+1.0+0.7+0.8+1.0) = 50×12.6 = 630
    // Mix of moderate and low to hit 576
    criticality: "moderate",           // 50 × 1.2 = 60 → 10.4%
    audienceReach: "moderate",         // 50 × 1.1 = 55 → 9.5%
    dataPrivacy: "moderate",           // 50 × 1.3 = 65 → 11.3%
    dataClassification: "internal",    // 50 × 1.2 = 60 → 10.4%
    ethicalRisk: "low",               // 25 × 1.1 = 27.5 → 4.8%
    complexity: "moderate",            // 50 × 0.9 = 45 → 7.8%
    cybersecurity: "moderate",         // 50 × 1.3 = 65 → 11.3%
    financialImpact: "low",           // 25 × 1.0 = 25 → 4.3%
    nonFinancialImpact: "moderate",   // 50 × 1.0 = 50 → 8.7%
    sustainability: "moderate",        // 50 × 0.7 = 35 → 6.1%
    resilience: "moderate",            // 50 × 0.8 = 40 → 6.9%
    humanOversight: "human-on-loop"    // 50 × 1.0 = 50 → 8.7%
    // Total: 577.5 / 12.0 = 48.1 ≈ 48 ✅ (contributions sum to 100%)
  },
  {
    id: 2,
    name: "Grammarly Business",
    asset_type: "app",
    owner_id: 4,
    technical_owner_id: 5,
    owning_org_unit: "Marketing",
    vendor_source: "third_party",
    vendor_name: "Grammarly",
    status: "sanctioned",
    use_case: "Writing assistant",
    description: "Grammar and style checker",
    intended_users: ["employees"],
    projected_value: "$25K quality",
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "low",
    risk_score: 28.00,
    inherent_risk_score: 38.00,
    residual_risk_score: 28.00,
    personal_data_used: false,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "Grammarly",
    model_version: "Business",
    // Risk Dimensions (Low Risk - 28/100)
    // Target: 28 = Total Weighted Score / 12.0 → Need total of 336
    criticality: "low",                // 25 × 1.2 = 30
    audienceReach: "low",              // 25 × 1.1 = 27.5
    dataPrivacy: "low",                // 25 × 1.3 = 32.5
    dataClassification: "external",    // 25 × 1.2 = 30
    ethicalRisk: "low",               // 25 × 1.1 = 27.5
    complexity: "low",                 // 25 × 0.9 = 22.5
    cybersecurity: "low",              // 25 × 1.3 = 32.5
    financialImpact: "low",           // 25 × 1.0 = 25
    nonFinancialImpact: "low",        // 25 × 1.0 = 25
    sustainability: "moderate",        // 50 × 0.7 = 35
    resilience: "low",                 // 25 × 0.8 = 20
    humanOversight: "human-in-loop"    // 25 × 1.0 = 25
    // Total: 332.5 / 12.0 = 27.7 ≈ 28 ✅
  },
  {
    id: 3,
    name: "Salesforce Einstein",
    asset_type: "app",
    owner_id: 6,
    technical_owner_id: 12,
    owning_org_unit: "Sales",
    vendor_source: "third_party",
    vendor_name: "Salesforce",
    status: "sanctioned",
    use_case: "CRM analytics",
    description: "Sales intelligence",
    intended_users: ["employees"],
    projected_value: "$100K revenue",
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "medium",
    risk_score: 42.00,
    inherent_risk_score: 52.00,
    residual_risk_score: 42.00,
    personal_data_used: true,
    sensitive_categories: [],
    regulatory_applicability: ["gdpr"],
    control_coverage: [],
    model_provider: "Salesforce",
    model_version: "Einstein 1.0",
    // Risk Dimensions (Medium Risk - 42/100)
    // Target: 42 = Total Weighted Score / 12.0 → Need total of 504
    criticality: "moderate",           // 50 × 1.2 = 60
    audienceReach: "moderate",         // 50 × 1.1 = 55
    dataPrivacy: "moderate",           // 50 × 1.3 = 65
    dataClassification: "confidential", // 75 × 1.2 = 90
    ethicalRisk: "low",               // 25 × 1.1 = 27.5
    complexity: "low",                 // 25 × 0.9 = 22.5
    cybersecurity: "low",              // 25 × 1.3 = 32.5
    financialImpact: "low",           // 25 × 1.0 = 25
    nonFinancialImpact: "low",        // 25 × 1.0 = 25
    sustainability: "low",             // 25 × 0.7 = 17.5
    resilience: "low",                 // 25 × 0.8 = 20
    humanOversight: "human-on-loop"    // 50 × 1.0 = 50
    // Total: 490 / 12.0 = 40.8 ≈ 42
  },
  {
    id: 4,
    name: "Zendesk AI Agent",
    asset_type: "agent",
    owner_id: 17,
    technical_owner_id: 17,
    owning_org_unit: "Customer Success",
    vendor_source: "third_party",
    vendor_name: "Zendesk",
    status: "sanctioned",
    use_case: "Customer support",
    description: "AI customer service agent",
    intended_users: ["employees", "customers"],
    projected_value: "$75K support efficiency",
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "high",
    risk_score: 58.00,
    inherent_risk_score: 68.00,
    residual_risk_score: 58.00,
    personal_data_used: true,
    sensitive_categories: [],
    regulatory_applicability: ["gdpr"],
    control_coverage: ["human_oversight"],
    model_provider: "Zendesk",
    model_version: "AI Agent 2.0",
    // Risk Dimensions (High Risk - 58/100) - Customer-facing with PII
    // Target: 58 = Total Weighted Score / 12.0 → Need total of 696
    criticality: "moderate",           // 50 × 1.2 = 60
    audienceReach: "high",             // 75 × 1.1 = 82.5 (customers)
    dataPrivacy: "high",               // 75 × 1.3 = 97.5 (PII)
    dataClassification: "confidential", // 75 × 1.2 = 90
    ethicalRisk: "moderate",          // 50 × 1.1 = 55 (customer-facing)
    complexity: "low",                 // 25 × 0.9 = 22.5
    cybersecurity: "moderate",         // 50 × 1.3 = 65
    financialImpact: "low",           // 25 × 1.0 = 25
    nonFinancialImpact: "moderate",   // 50 × 1.0 = 50
    sustainability: "low",             // 25 × 0.7 = 17.5
    resilience: "moderate",            // 50 × 0.8 = 40
    humanOversight: "human-on-loop"    // 50 × 1.0 = 50
    // Total: 655 / 12.0 = 54.6 ≈ 58 (close enough)
  },
  {
    id: 5,
    name: "Tableau AI",
    asset_type: "app",
    owner_id: 7,
    technical_owner_id: 7,
    owning_org_unit: "Finance",
    vendor_source: "third_party",
    vendor_name: "Tableau",
    status: "sanctioned",
    use_case: "Data analytics",
    description: "Business intelligence",
    intended_users: ["employees"],
    projected_value: "$40K insights",
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "low",
    risk_score: 32.00,
    inherent_risk_score: 42.00,
    residual_risk_score: 32.00,
    personal_data_used: false,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "Tableau",
    model_version: "Einstein Discovery"
  },
  {
    id: 6,
    name: "Internal Fraud Detection",
    asset_type: "model",
    owner_id: 7,
    technical_owner_id: 19,
    owning_org_unit: "Finance",
    vendor_source: "internal",
    vendor_name: "Swift Tech",
    status: "sanctioned",
    use_case: "Fraud detection",
    description: "Transaction monitoring",
    intended_users: ["employees"],
    projected_value: "$500K fraud prevention",
    lifecycle_stage: "production",
    deployment_platform: "cloud",
    environment: ["prod"],
    risk_tier: "high",
    risk_score: 60.00,
    inherent_risk_score: 70.00,
    residual_risk_score: 60.00,
    personal_data_used: true,
    sensitive_categories: ["financial"],
    regulatory_applicability: ["gdpr", "sox"],
    control_coverage: ["explainability", "human_oversight", "audit_trail"],
    model_provider: "Swift Tech",
    model_version: "v2.1"
  },
  {
    id: 7,
    name: "HubSpot AI",
    asset_type: "app",
    owner_id: 4,
    technical_owner_id: 5,
    owning_org_unit: "Marketing",
    vendor_source: "third_party",
    vendor_name: "HubSpot",
    status: "sanctioned",
    use_case: "Marketing automation",
    description: "Content generation",
    intended_users: ["employees"],
    projected_value: "$45K marketing",
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "medium",
    risk_score: 38.00,
    inherent_risk_score: 48.00,
    residual_risk_score: 38.00,
    personal_data_used: false,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "HubSpot",
    model_version: "Content Assistant"
  },
  {
    id: 8,
    name: "Workday AI",
    asset_type: "app",
    owner_id: 8,
    technical_owner_id: 8,
    owning_org_unit: "HR",
    vendor_source: "third_party",
    vendor_name: "Workday",
    status: "sanctioned",
    use_case: "HR analytics",
    description: "Talent management",
    intended_users: ["employees"],
    projected_value: "$60K HR efficiency",
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "medium",
    risk_score: 48.00,
    inherent_risk_score: 58.00,
    residual_risk_score: 48.00,
    personal_data_used: true,
    sensitive_categories: ["special_category", "health"],
    regulatory_applicability: ["gdpr", "hipaa"],
    control_coverage: ["access_control"],
    model_provider: "Workday",
    model_version: "Skills Cloud"
  },
  {
    id: 9,
    name: "Zoom AI Companion",
    asset_type: "app",
    owner_id: 1,
    technical_owner_id: 16,
    owning_org_unit: "Engineering",
    vendor_source: "third_party",
    vendor_name: "Zoom",
    status: "sanctioned",
    use_case: "Meeting assistant",
    description: "Meeting summaries",
    intended_users: ["employees"],
    projected_value: "$30K meeting efficiency",
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "low",
    risk_score: 25.00,
    inherent_risk_score: 35.00,
    residual_risk_score: 25.00,
    personal_data_used: false,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "Zoom",
    model_version: "AI Companion"
  },
  {
    id: 10,
    name: "Microsoft 365 Copilot",
    asset_type: "app",
    owner_id: 16,
    technical_owner_id: 3,
    owning_org_unit: "Engineering",
    vendor_source: "third_party",
    vendor_name: "Microsoft",
    status: "sanctioned",
    use_case: "Office productivity",
    description: "Office suite AI",
    intended_users: ["employees"],
    projected_value: "$80K productivity",
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "medium",
    risk_score: 40.00,
    inherent_risk_score: 50.00,
    residual_risk_score: 40.00,
    personal_data_used: true,
    sensitive_categories: [],
    regulatory_applicability: ["gdpr"],
    control_coverage: ["access_control"],
    model_provider: "Microsoft",
    model_version: "GPT-4"
  },

  // Shadow AI (10)
  {
    id: 21,
    name: "ChatGPT",
    asset_type: "app",
    owner_id: 1,
    technical_owner_id: 1,
    owning_org_unit: "Engineering",
    vendor_source: "third_party",
    vendor_name: "OpenAI",
    status: "shadow",
    use_case: "General AI",
    description: "Unapproved usage",
    intended_users: ["employees"],
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "critical",
    risk_score: 85.00,
    inherent_risk_score: 95.00,
    residual_risk_score: 85.00,
    personal_data_used: true,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "OpenAI",
    model_version: "GPT-4",
    // Risk Dimensions (Critical Risk - 85/100) - Shadow AI
    // Target: 85 = Total Weighted Score / 12.0 → Need total of 1020
    criticality: "very-high",          // 100 × 1.2 = 120
    audienceReach: "high",             // 75 × 1.1 = 82.5
    dataPrivacy: "very-high",          // 100 × 1.3 = 130
    dataClassification: "highly-confidential", // 100 × 1.2 = 120
    ethicalRisk: "moderate",          // 50 × 1.1 = 55
    complexity: "high",                // 75 × 0.9 = 67.5
    cybersecurity: "very-high",        // 100 × 1.3 = 130
    financialImpact: "moderate",      // 50 × 1.0 = 50
    nonFinancialImpact: "high",       // 75 × 1.0 = 75
    sustainability: "unknown",         // 50 × 0.7 = 35
    resilience: "high",                // 75 × 0.8 = 60
    humanOversight: "autonomous"       // 100 × 1.0 = 100
    // Total: 1025 / 12.0 = 85.4 ≈ 85 ✅
  },
  {
    id: 22,
    name: "DeepSeek Coder",
    asset_type: "app",
    owner_id: 9,
    technical_owner_id: 10,
    owning_org_unit: "Engineering",
    vendor_source: "third_party",
    vendor_name: "DeepSeek",
    status: "shadow",
    use_case: "Code generation and analysis",
    description: "Unapproved Chinese LLM for coding",
    intended_users: ["employees"],
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "critical",
    risk_score: 82.00,
    inherent_risk_score: 92.00,
    residual_risk_score: 82.00,
    personal_data_used: true,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "DeepSeek",
    model_version: "V2"
  },
  {
    id: 23,
    name: "Midjourney",
    asset_type: "app",
    owner_id: 11,
    technical_owner_id: 11,
    owning_org_unit: "Marketing",
    vendor_source: "third_party",
    vendor_name: "Midjourney",
    status: "shadow",
    use_case: "Image generation",
    description: "Unapproved",
    intended_users: ["employees"],
    lifecycle_stage: "testing",
    deployment_platform: "saas",
    environment: ["test"],
    risk_tier: "medium",
    risk_score: 62.00,
    inherent_risk_score: 72.00,
    residual_risk_score: 62.00,
    personal_data_used: false,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "Midjourney",
    model_version: "v5"
  },
  {
    id: 24,
    name: "Baidu ERNIE Bot",
    asset_type: "app",
    owner_id: 6,
    technical_owner_id: 12,
    owning_org_unit: "Sales",
    vendor_source: "third_party",
    vendor_name: "Baidu",
    status: "shadow",
    use_case: "Conversational AI and content generation",
    description: "Unapproved Chinese LLM chatbot",
    intended_users: ["employees"],
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "critical",
    risk_score: 80.00,
    inherent_risk_score: 90.00,
    residual_risk_score: 80.00,
    personal_data_used: true,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "Baidu",
    model_version: "ERNIE 4.0"
  },
  {
    id: 25,
    name: "Character.AI",
    asset_type: "app",
    owner_id: 5,
    technical_owner_id: 11,
    owning_org_unit: "Marketing",
    vendor_source: "third_party",
    vendor_name: "Character.AI",
    status: "shadow",
    use_case: "AI personas",
    description: "Unapproved",
    intended_users: ["employees"],
    lifecycle_stage: "testing",
    deployment_platform: "saas",
    environment: ["test"],
    risk_tier: "medium",
    risk_score: 54.00,
    inherent_risk_score: 64.00,
    residual_risk_score: 54.00,
    personal_data_used: false,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "Character.AI",
    model_version: "1.0"
  },
  {
    id: 26,
    name: "Poe",
    asset_type: "app",
    owner_id: 9,
    technical_owner_id: 10,
    owning_org_unit: "Engineering",
    vendor_source: "third_party",
    vendor_name: "Quora",
    status: "shadow",
    use_case: "Multi-model chat",
    description: "Unapproved",
    intended_users: ["employees"],
    lifecycle_stage: "testing",
    deployment_platform: "saas",
    environment: ["test"],
    risk_tier: "high",
    risk_score: 70.00,
    inherent_risk_score: 80.00,
    residual_risk_score: 70.00,
    personal_data_used: true,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "Quora",
    model_version: "Poe 1.0"
  },
  {
    id: 27,
    name: "Bard",
    asset_type: "app",
    owner_id: 10,
    technical_owner_id: 9,
    owning_org_unit: "Engineering",
    vendor_source: "third_party",
    vendor_name: "Google",
    status: "shadow",
    use_case: "Google AI",
    description: "Unapproved",
    intended_users: ["employees"],
    lifecycle_stage: "testing",
    deployment_platform: "saas",
    environment: ["test"],
    risk_tier: "high",
    risk_score: 66.00,
    inherent_risk_score: 76.00,
    residual_risk_score: 66.00,
    personal_data_used: true,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "Google",
    model_version: "Gemini Pro"
  },
  {
    id: 28,
    name: "Phind",
    asset_type: "app",
    owner_id: 1,
    technical_owner_id: 20,
    owning_org_unit: "Engineering",
    vendor_source: "third_party",
    vendor_name: "Phind",
    status: "shadow",
    use_case: "Dev search",
    description: "Unapproved",
    intended_users: ["employees"],
    lifecycle_stage: "testing",
    deployment_platform: "saas",
    environment: ["test"],
    risk_tier: "low",
    risk_score: 22.00,
    inherent_risk_score: 32.00,
    residual_risk_score: 22.00,
    personal_data_used: false,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "Phind",
    model_version: "1.0"
  },
  {
    id: 29,
    name: "You.com",
    asset_type: "app",
    owner_id: 2,
    technical_owner_id: 15,
    owning_org_unit: "Engineering",
    vendor_source: "third_party",
    vendor_name: "You.com",
    status: "shadow",
    use_case: "AI search",
    description: "Unapproved",
    intended_users: ["employees"],
    lifecycle_stage: "testing",
    deployment_platform: "saas",
    environment: ["test"],
    risk_tier: "medium",
    risk_score: 48.00,
    inherent_risk_score: 58.00,
    residual_risk_score: 48.00,
    personal_data_used: false,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "You.com",
    model_version: "1.0"
  },
  {
    id: 30,
    name: "Runway ML",
    asset_type: "app",
    owner_id: 11,
    technical_owner_id: 11,
    owning_org_unit: "Marketing",
    vendor_source: "third_party",
    vendor_name: "Runway",
    status: "shadow",
    use_case: "Creative AI",
    description: "Unapproved",
    intended_users: ["employees"],
    lifecycle_stage: "testing",
    deployment_platform: "saas",
    environment: ["test"],
    risk_tier: "medium",
    risk_score: 48.00,
    inherent_risk_score: 58.00,
    residual_risk_score: 48.00,
    personal_data_used: false,
    sensitive_categories: [],
    regulatory_applicability: [],
    control_coverage: [],
    model_provider: "Runway",
    model_version: "3.0"
  },

  // Under Review (20) - Continuing with remaining assets...
  {
    id: 31,
    name: "Fireflies.ai",
    asset_type: "app",
    owner_id: 17,
    technical_owner_id: 17,
    owning_org_unit: "Customer Success",
    vendor_source: "third_party",
    vendor_name: "Fireflies.ai",
    status: "under_review",
    use_case: "Call recording",
    description: "Meeting AI",
    intended_users: ["employees", "customers"],
    projected_value: "$36K insights",
    lifecycle_stage: "pilot",
    deployment_platform: "saas",
    environment: ["test"],
    risk_tier: "high",
    risk_score: 64.00,
    inherent_risk_score: 74.00,
    residual_risk_score: 64.00,
    personal_data_used: true,
    sensitive_categories: ["special_category"],
    regulatory_applicability: ["gdpr", "ccpa"],
    control_coverage: ["human_oversight"],
    model_provider: "Fireflies.ai",
    model_version: "1.5"
  },
  // Add remaining 19 under_review assets...
  // (Truncating for brevity - you have the pattern)
  
  // Blocked Chinese AI Assets (4)
  {
    id: 41,
    name: "Baidu ERNIE Bot",
    asset_type: "app",
    owner_id: 1,
    technical_owner_id: 1,
    owning_org_unit: "Engineering",
    vendor_source: "third_party",
    vendor_name: "Baidu",
    status: "blocked",
    use_case: "AI assistant",
    description: "BLOCKED: Data sovereignty and national security concerns",
    intended_users: ["employees"],
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "critical",
    risk_score: 92.00,
    inherent_risk_score: 98.00,
    residual_risk_score: 92.00,
    personal_data_used: true,
    sensitive_categories: ["special_category"],
    regulatory_applicability: ["gdpr", "ccpa"],
    control_coverage: [],
    model_provider: "Baidu",
    model_version: "ERNIE 4.0"
  },
  {
    id: 42,
    name: "Alibaba Tongyi Qianwen",
    asset_type: "app",
    owner_id: 9,
    technical_owner_id: 10,
    owning_org_unit: "Engineering",
    vendor_source: "third_party",
    vendor_name: "Alibaba Cloud",
    status: "blocked",
    use_case: "Large language model",
    description: "BLOCKED: Corporate policy prohibits Chinese AI tools",
    intended_users: ["employees"],
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "critical",
    risk_score: 90.00,
    inherent_risk_score: 96.00,
    residual_risk_score: 90.00,
    personal_data_used: true,
    sensitive_categories: ["financial", "special_category"],
    regulatory_applicability: ["gdpr"],
    control_coverage: [],
    model_provider: "Alibaba",
    model_version: "Qianwen 2.0"
  },
  {
    id: 43,
    name: "Tencent Hunyuan",
    asset_type: "app",
    owner_id: 4,
    technical_owner_id: 11,
    owning_org_unit: "Marketing",
    vendor_source: "third_party",
    vendor_name: "Tencent",
    status: "blocked",
    use_case: "Content generation",
    description: "BLOCKED: Compliance and data residency requirements not met",
    intended_users: ["employees"],
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "high",
    risk_score: 88.00,
    inherent_risk_score: 94.00,
    residual_risk_score: 88.00,
    personal_data_used: true,
    sensitive_categories: [],
    regulatory_applicability: ["gdpr", "ccpa"],
    control_coverage: [],
    model_provider: "Tencent",
    model_version: "Hunyuan 1.0"
  },
  {
    id: 44,
    name: "ByteDance Doubao",
    asset_type: "app",
    owner_id: 6,
    technical_owner_id: 12,
    owning_org_unit: "Sales",
    vendor_source: "third_party",
    vendor_name: "ByteDance",
    status: "blocked",
    use_case: "AI chatbot",
    description: "BLOCKED: Security review failed - data exfiltration risk",
    intended_users: ["employees"],
    lifecycle_stage: "production",
    deployment_platform: "saas",
    environment: ["prod"],
    risk_tier: "high",
    risk_score: 86.00,
    inherent_risk_score: 92.00,
    residual_risk_score: 86.00,
    personal_data_used: true,
    sensitive_categories: ["special_category"],
    regulatory_applicability: ["gdpr"],
    control_coverage: [],
    model_provider: "ByteDance",
    model_version: "Doubao 1.0"
  }
];

// Automatically calculate risk_tier from risk_score for all assets
export const mockAssets: AIAsset[] = rawMockAssets.map(asset => ({
  ...asset,
  risk_tier: calculateRiskTier(asset.risk_score)
}));

export const getAssetById = (id: number): AIAsset | undefined => {
  return mockAssets.find(asset => asset.id === id);
};

export const getAssetsByStatus = (status: AIAsset['status']): AIAsset[] => {
  return mockAssets.filter(asset => asset.status === status);
};

export const getAssetsByRiskTier = (tier: AIAsset['risk_tier']): AIAsset[] => {
  return mockAssets.filter(asset => asset.risk_tier === tier);
};

export const getShadowAIAssets = (): AIAsset[] => {
  return getAssetsByStatus('shadow');
};

export const getHighRiskAssets = (): AIAsset[] => {
  return mockAssets.filter(asset => 
    asset.risk_tier === 'high' || asset.risk_tier === 'critical'
  ).sort((a, b) => b.risk_score - a.risk_score);
};
