/**
 * Script to add risk dimensions to all assets in mock-assets.ts
 * Run this to ensure all assets have realistic, calculated risk dimensions
 */

import { generateRiskDimensions } from './generate-risk-dimensions.js';

// Asset-specific contexts for more realistic dimensions
const assetContexts = {
  // Zendesk AI Agent - High risk customer service
  4: {
    hasPersonalData: true,
    isCustomerFacing: true,
    isHighValue: false,
    vendorSource: 'third_party'
  },
  // Azure OpenAI - High risk with PII
  6: {
    hasPersonalData: true,
    isCustomerFacing: false,
    isHighValue: true,
    vendorSource: 'third_party'
  },
  // ChatGPT - Critical shadow AI
  21: {
    hasPersonalData: true,
    isShadowAI: true,
    isCustomerFacing: false,
    isHighValue: false,
    vendorSource: 'third_party'
  }
};

// Generate dimensions for Zendesk AI Agent (id: 4, score: 58)
const zendeskDimensions = generateRiskDimensions(58, {
  hasPersonalData: true,
  isCustomerFacing: true,
  isHighValue: false
});

console.log('Zendesk AI Agent (58/100 - High Risk):');
console.log(JSON.stringify(zendeskDimensions, null, 2));

// Expected output for Zendesk:
// criticality: "high"
// audienceReach: "high" (customer-facing)
// dataPrivacy: "high" (has personal data)
// dataClassification: "confidential"
// ethicalRisk: "moderate" (customer-facing)
// complexity: "moderate"
// cybersecurity: "high"
// financialImpact: "moderate"
// nonFinancialImpact: "high"
// sustainability: "moderate"
// resilience: "high"
// humanOversight: "sampled"
