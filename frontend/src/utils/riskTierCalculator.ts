/**
 * Calculate risk tier based on risk score
 * @param riskScore - Risk score value (0-100)
 * @returns Risk tier: 'low' | 'medium' | 'high' | 'critical'
 */
export const calculateRiskTier = (riskScore: number): 'low' | 'medium' | 'high' | 'critical' => {
  if (riskScore >= 76) return 'critical';
  if (riskScore >= 51) return 'high';
  if (riskScore >= 26) return 'medium';
  return 'low';
};

/**
 * Get risk tier color for UI display
 */
export const getRiskTierColor = (tier: 'low' | 'medium' | 'high' | 'critical'): string => {
  const colors = {
    low: 'rgb(13, 199, 131)',      // Green
    medium: 'rgb(251, 188, 9)',    // Yellow
    high: 'rgb(255, 153, 0)',      // Orange
    critical: 'rgb(255, 35, 35)'   // Red
  };
  return colors[tier];
};
