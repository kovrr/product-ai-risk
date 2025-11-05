// Mock relationship links between assets, risks, and controls

export interface AssetRiskLink {
  asset_id: number;
  risk_id: number;
}

export interface AssetControlLink {
  asset_id: number;
  control_id: number;
}

// 14 Asset-Risk Links from PostgreSQL
export const mockAssetRiskLinks: AssetRiskLink[] = [
  { asset_id: 1, risk_id: 2 },   // GitHub Copilot → Code vulnerability
  { asset_id: 3, risk_id: 3 },   // Salesforce Einstein → Biased recommendations
  { asset_id: 6, risk_id: 4 },   // Fraud Detection → Financial fraud
  { asset_id: 8, risk_id: 5 },   // Workday AI → Privacy breach
  { asset_id: 10, risk_id: 1 },  // M365 Copilot → Data exposure
  { asset_id: 13, risk_id: 3 },  // (placeholder)
  { asset_id: 14, risk_id: 3 },  // (placeholder)
  { asset_id: 15, risk_id: 3 },  // (placeholder)
  { asset_id: 21, risk_id: 1 },  // ChatGPT → Data exposure
  { asset_id: 22, risk_id: 1 },  // Claude → Data exposure
  { asset_id: 27, risk_id: 1 },  // Bard → Data exposure
  { asset_id: 35, risk_id: 1 },  // (placeholder)
  { asset_id: 44, risk_id: 1 },  // OpenAI API → Data exposure
  { asset_id: 45, risk_id: 1 },  // Azure OpenAI → Data exposure
];

// 35 Asset-Control Links from PostgreSQL
export const mockAssetControlLinks: AssetControlLink[] = [
  // High-risk sanctioned assets with full controls
  { asset_id: 6, control_id: 1 },
  { asset_id: 6, control_id: 2 },
  { asset_id: 6, control_id: 4 },
  { asset_id: 6, control_id: 5 },
  { asset_id: 6, control_id: 9 },
  
  { asset_id: 4, control_id: 1 },
  { asset_id: 4, control_id: 4 },
  { asset_id: 4, control_id: 9 },
  
  { asset_id: 8, control_id: 1 },
  { asset_id: 8, control_id: 4 },
  { asset_id: 8, control_id: 9 },
  
  // Medium-risk sanctioned with moderate controls
  { asset_id: 1, control_id: 1 },
  { asset_id: 1, control_id: 2 },
  { asset_id: 1, control_id: 5 },
  
  { asset_id: 3, control_id: 1 },
  { asset_id: 3, control_id: 4 },
  
  { asset_id: 7, control_id: 1 },
  { asset_id: 7, control_id: 2 },
  
  { asset_id: 10, control_id: 1 },
  
  // Low-risk sanctioned with basic controls
  { asset_id: 2, control_id: 1 },
  { asset_id: 5, control_id: 1 },
  { asset_id: 9, control_id: 1 },
  
  // Under review with proposed controls
  { asset_id: 31, control_id: 1 },
  { asset_id: 31, control_id: 9 },
  
  { asset_id: 35, control_id: 1 },
  
  { asset_id: 40, control_id: 1 },
  
  { asset_id: 42, control_id: 1 },
  
  { asset_id: 43, control_id: 1 },
  
  { asset_id: 44, control_id: 1 },
  
  { asset_id: 45, control_id: 1 },
  
  // Additional links
  { asset_id: 12, control_id: 1 },
  { asset_id: 13, control_id: 1 },
  { asset_id: 14, control_id: 1 },
  { asset_id: 15, control_id: 1 },
];

// Helper functions
export const getAssetRisks = (assetId: number): number[] => {
  return mockAssetRiskLinks
    .filter(link => link.asset_id === assetId)
    .map(link => link.risk_id);
};

export const getRiskAssets = (riskId: number): number[] => {
  return mockAssetRiskLinks
    .filter(link => link.risk_id === riskId)
    .map(link => link.asset_id);
};

export const getAssetControls = (assetId: number): number[] => {
  return mockAssetControlLinks
    .filter(link => link.asset_id === assetId)
    .map(link => link.control_id);
};

export const getControlAssets = (controlId: number): number[] => {
  return mockAssetControlLinks
    .filter(link => link.control_id === controlId)
    .map(link => link.asset_id);
};

export const getAssetControlCount = (assetId: number): number => {
  return mockAssetControlLinks.filter(link => link.asset_id === assetId).length;
};

export const getAssetRiskCount = (assetId: number): number => {
  return mockAssetRiskLinks.filter(link => link.asset_id === assetId).length;
};
