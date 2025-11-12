/**
 * Centralized Heat Map Colors for Risk Matrix
 * 
 * This ensures all heat maps across the application use the exact same
 * diagonal gradient colors from the design system.
 * 
 * Pattern: Red (top-left) → Orange → Yellow → Green (bottom-right)
 */

export type ImpactLevel = 'Negligible' | 'Minor' | 'Moderate' | 'Significant' | 'Severe';
export type LikelihoodLevel = 'Very Rare' | 'Rare' | 'Unlikely' | 'Possible' | 'Expected';

/**
 * Get the exact heat map color for a given impact and likelihood combination
 * 
 * @param impactIndex - 0=Negligible, 1=Minor, 2=Moderate, 3=Significant, 4=Severe
 * @param likelihoodIndex - 0=Very Rare, 1=Rare, 2=Unlikely, 3=Possible, 4=Expected
 * @returns RGBA color string
 */
export const getHeatMapColor = (impactIndex: number, likelihoodIndex: number): string => {
  // Severe Row (impactIndex = 4)
  if (impactIndex === 4) {
    if (likelihoodIndex === 4) return 'rgba(255, 77, 79, 0.65)';   // Expected
    if (likelihoodIndex === 3) return 'rgba(255, 99, 97, 0.6)';    // Possible
    if (likelihoodIndex === 2) return 'rgba(255, 138, 101, 0.5)';  // Unlikely
    if (likelihoodIndex === 1) return 'rgba(255, 171, 145, 0.45)'; // Rare
    return 'rgba(255, 171, 145, 0.4)';                              // Very Rare
  }
  
  // Significant Row (impactIndex = 3)
  if (impactIndex === 3) {
    if (likelihoodIndex === 4) return 'rgba(255, 120, 117, 0.55)'; // Expected
    if (likelihoodIndex === 3) return 'rgba(255, 160, 122, 0.5)';  // Possible
    if (likelihoodIndex === 2) return 'rgba(255, 178, 132, 0.45)'; // Unlikely
    if (likelihoodIndex === 1) return 'rgba(255, 193, 158, 0.4)';  // Rare
    return 'rgba(144, 238, 144, 0.35)';                             // Very Rare
  }
  
  // Moderate Row (impactIndex = 2)
  if (impactIndex === 2) {
    if (likelihoodIndex === 4) return 'rgba(255, 160, 122, 0.45)'; // Expected
    if (likelihoodIndex === 3) return 'rgba(255, 178, 132, 0.4)';  // Possible
    if (likelihoodIndex === 2) return 'rgba(255, 193, 158, 0.4)';  // Unlikely
    if (likelihoodIndex === 1) return 'rgba(255, 235, 156, 0.5)';  // Rare
    return 'rgba(144, 238, 144, 0.45)';                             // Very Rare
  }
  
  // Minor Row (impactIndex = 1)
  if (impactIndex === 1) {
    if (likelihoodIndex === 4) return 'rgba(255, 193, 158, 0.35)'; // Expected
    if (likelihoodIndex === 3) return 'rgba(255, 220, 130, 0.45)'; // Possible
    if (likelihoodIndex === 2) return 'rgba(255, 235, 156, 0.55)'; // Unlikely
    if (likelihoodIndex === 1) return 'rgba(255, 235, 156, 0.6)';  // Rare
    return 'rgba(144, 238, 144, 0.55)';                             // Very Rare
  }
  
  // Negligible Row (impactIndex = 0)
  if (likelihoodIndex === 4) return 'rgba(144, 238, 144, 0.35)'; // Expected
  if (likelihoodIndex === 3) return 'rgba(144, 238, 144, 0.45)'; // Possible
  if (likelihoodIndex === 2) return 'rgba(144, 238, 144, 0.55)'; // Unlikely
  if (likelihoodIndex === 1) return 'rgba(144, 238, 144, 0.65)'; // Rare
  return 'rgba(144, 238, 144, 0.75)';                             // Very Rare
};

/**
 * Get the impact index from impact level string
 */
export const getImpactIndex = (impact: ImpactLevel): number => {
  const mapping: Record<ImpactLevel, number> = {
    'Negligible': 0,
    'Minor': 1,
    'Moderate': 2,
    'Significant': 3,
    'Severe': 4,
  };
  return mapping[impact] ?? 2;
};

/**
 * Get the likelihood index from likelihood level string
 */
export const getLikelihoodIndex = (likelihood: LikelihoodLevel): number => {
  const mapping: Record<LikelihoodLevel, number> = {
    'Very Rare': 0,
    'Rare': 1,
    'Unlikely': 2,
    'Possible': 3,
    'Expected': 4,
  };
  return mapping[likelihood] ?? 2;
};

/**
 * Get heat map color directly from impact and likelihood strings
 */
export const getHeatMapColorFromLevels = (impact: ImpactLevel, likelihood: LikelihoodLevel): string => {
  const impactIndex = getImpactIndex(impact);
  const likelihoodIndex = getLikelihoodIndex(likelihood);
  return getHeatMapColor(impactIndex, likelihoodIndex);
};

/**
 * Get text color for contrast on heat map cells
 * Uses dark text for better readability across all colors
 */
export const getHeatMapTextColor = (): string => {
  return 'rgb(48, 48, 69)';
};

/**
 * Heat map styling constants
 */
export const HEAT_MAP_STYLES = {
  cellBorder: 'rgb(220, 229, 242)',
  cellBorderSelected: 'rgb(85, 81, 247)',
  countBadgeBg: 'rgb(85, 81, 247)',
  countBadgeText: 'white',
  labelColor: 'rgb(74, 85, 104)',
  labelFontSize: '11px',
  labelFontWeight: '600',
  labelTextTransform: 'uppercase' as const,
  labelLetterSpacing: '0.5px',
} as const;
