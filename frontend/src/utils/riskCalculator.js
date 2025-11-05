// Risk Score Calculator for AI Asset Wizard

export const calculateRiskScore = (formData) => {
  const riskValues = {
    'low': 1,
    'moderate': 2,
    'high': 3,
    'very-high': 4,
    'not-assessed': 2,
    'unknown': 2,
    'human-in-loop': 1,
    'human-on-loop': 2,
    'sampled': 3,
    'autonomous': 4
  };

  // Map data classification to risk value
  const classificationMap = {
    'external': 1,
    'internal': 2,
    'confidential': 3,
    'highly-confidential': 4
  };

  const measures = [
    riskValues[formData.criticality] || 2,
    riskValues[formData.audienceReach] || 2,
    riskValues[formData.dataPrivacy] || 2,
    classificationMap[formData.dataClassification] || 2,
    riskValues[formData.ethicalRisk] || 2,
    riskValues[formData.complexity] || 2,
    riskValues[formData.cybersecurity] || 2,
    riskValues[formData.financialImpact] || 2,
    riskValues[formData.nonFinancialImpact] || 2,
    riskValues[formData.sustainability] || 2,
    riskValues[formData.resilience] || 2,
    riskValues[formData.humanOversight] || 2
  ];

  const total = measures.reduce((sum, value) => sum + value, 0);
  const percentage = (total / (measures.length * 4)) * 100;

  let aggregate = 'low';
  if (percentage > 75) aggregate = 'very-high';
  else if (percentage > 50) aggregate = 'high';
  else if (percentage > 25) aggregate = 'moderate';

  return {
    aggregate,
    percentage: Math.round(percentage),
    breakdown: {
      low: measures.filter(m => m === 1).length,
      moderate: measures.filter(m => m === 2).length,
      high: measures.filter(m => m === 3).length,
      veryHigh: measures.filter(m => m === 4).length
    }
  };
};

export const getRiskColor = (risk) => {
  const colors = {
    'low': 'text-success bg-success/10 border-success',
    'moderate': 'text-warning bg-warning/10 border-warning',
    'high': 'text-error bg-error/10 border-error',
    'very-high': 'text-error bg-error/20 border-error'
  };
  return colors[risk] || colors.low;
};

export const getRiskLabel = (risk) => {
  const labels = {
    'low': 'Low Risk',
    'moderate': 'Moderate Risk',
    'high': 'High Risk',
    'very-high': 'Very High Risk'
  };
  return labels[risk] || 'Low Risk';
};

export const requiresExecutiveApproval = (riskScore) => {
  return riskScore.aggregate === 'high' || riskScore.aggregate === 'very-high';
};
