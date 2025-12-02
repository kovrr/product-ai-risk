import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Info, TrendingUp, AlertTriangle, X } from 'lucide-react';

/**
 * Risk Score Breakdown Component
 * Provides transparent, explainable risk scoring with dimension-level details
 * 
 * Usage:
 * <RiskScoreBreakdown asset={assetData} />
 */
const RiskScoreBreakdown = ({ asset }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  // Calculate risk data from asset
  const riskData = useMemo(() => {
    // Check if asset has risk dimensions defined
    const hasDimensions = asset.criticality || asset.dataPrivacy || asset.cybersecurity;

    if (!hasDimensions) {
      // Return minimal data if no dimensions
      return {
        overall: Math.round(asset.risk_score || 50),
        tier: asset.risk_tier || 'medium',
        dimensions: [],
        categoryMetrics: {},
        topDrivers: [],
        hasDimensions: false
      };
    }

    // Map asset values to scores (1-4 scale to 0-100 scale)
    const valueToScore = {
      'low': 25,
      'moderate': 50,
      'high': 75,
      'very-high': 100,
      'not-assessed': 50,
      'unknown': 50,
      'human-in-loop': 25,
      'human-on-loop': 50,
      'sampled': 75,
      'autonomous': 100,
      'external': 25,
      'internal': 50,
      'confidential': 75,
      'highly-confidential': 100
    };

    // Get scores for each dimension from asset data
    const getScore = (value) => valueToScore[value] || 50;

    // Define weights for each dimension
    const weights = {
      criticality: 1.2,
      audienceReach: 1.1,
      dataPrivacy: 1.3,
      dataClassification: 1.2,
      ethicalRisk: 1.1,
      complexity: 0.9,
      cybersecurity: 1.3,
      financialImpact: 1.0,
      nonFinancialImpact: 1.0,
      sustainability: 0.7,
      resilience: 0.8,
      humanOversight: 1.0
    };

    // Helper to create dimension object
    const createDimension = (key, label, category, icon, assetField, defaultValue = 'moderate') => {
      const value = asset[assetField] || defaultValue;
      const score = getScore(value);
      const weight = weights[key];
      const weightedScore = score * weight;

      return {
        key,
        label,
        category,
        value,
        score,
        weight,
        weightedScore,
        icon
      };
    };

    // Calculate all dimensions first
    const dimensionsTemp = [
      // Business Impact
      createDimension('criticality', 'Criticality', 'Business Impact', '🔴', 'criticality', 'moderate'),
      createDimension('audienceReach', 'Audience Reach', 'Business Impact', '🎯', 'audienceReach', 'moderate'),
      createDimension('financialImpact', 'Financial Impact', 'Business Impact', '💎', 'financialImpact', 'low'),
      // Data & Privacy
      createDimension('dataPrivacy', 'Data Privacy Impact', 'Data & Privacy', '🔒', 'dataPrivacy', 'moderate'),
      createDimension('dataClassification', 'Data Classification', 'Data & Privacy', '🔐', 'dataClassification', 'internal'),
      // Security & Compliance
      createDimension('cybersecurity', 'Cybersecurity Posture', 'Security & Compliance', '🛡️', 'cybersecurity', 'moderate'),
      createDimension('ethicalRisk', 'Ethical Risk', 'Security & Compliance', '⚖️', 'ethicalRisk', 'low'),
      // Operational
      createDimension('complexity', 'Complexity & Interpretability', 'Operational', '🧩', 'complexity', 'moderate'),
      createDimension('resilience', 'Availability/Resilience', 'Operational', '⚡', 'resilience', 'moderate'),
      createDimension('humanOversight', 'Human Oversight Level', 'Operational', '👤', 'humanOversight', 'human-on-loop'),
      createDimension('nonFinancialImpact', 'Non-Financial Impact', 'Business Impact', '📊', 'nonFinancialImpact', 'moderate'),
      createDimension('sustainability', 'Sustainability Impact', 'Operational', '🌱', 'sustainability', 'low')
    ];

    // Calculate overall score as weighted average
    const totalWeightedScore = dimensionsTemp.reduce((sum, d) => sum + d.weightedScore, 0);
    const totalWeight = dimensionsTemp.reduce((sum, d) => sum + d.weight, 0);
    const calculatedScore = Math.round(totalWeightedScore / totalWeight);

    // Use asset's risk_score if provided, otherwise use calculated
    const overall = asset.risk_score ? Math.round(asset.risk_score) : calculatedScore;
    const tier = asset.risk_tier || 'medium';

    // Get description based on value
    const descriptions = {
      criticality: { low: 'Info only', moderate: 'Informative', high: 'High impact', 'very-high': 'Critical' },
      audienceReach: { low: 'Team/Department', moderate: 'Senior Management', high: 'Executive/Client Impact', 'very-high': 'Board/Regulator' },
      dataPrivacy: { low: 'Public data', moderate: 'Anonymized', high: 'PII/Finance', 'very-high': 'Sensitive PII' },
      dataClassification: { external: 'External', internal: 'Internal', confidential: 'Confidential', 'highly-confidential': 'Highly Confidential' },
      ethicalRisk: { low: 'No bias concerns', moderate: 'Potential bias mitigated', high: 'Requires oversight', 'very-high': 'Strict oversight needed' },
      complexity: { low: 'Anyone can understand', moderate: 'Requires expertise', high: 'Needs AI specialist', 'very-high': 'Black box system' },
      cybersecurity: { low: 'Passed assessment', moderate: 'Partially achieved', high: 'Partially with gaps', 'very-high': 'Failed assessment' },
      financialImpact: { low: 'Minor (<$50K)', moderate: 'Moderate ($50K-$500K)', high: 'Major ($500K-$5M)', 'very-high': 'Severe (>$5M)' },
      nonFinancialImpact: { low: 'Limited impact', moderate: 'Some concern', high: 'Significant impact', 'very-high': 'Critical impact' },
      sustainability: { low: 'Provider has practices', moderate: 'Some practices', unknown: 'Unknown', high: 'No details', 'very-high': 'No approach' },
      resilience: { low: 'Internal team', moderate: 'Vendor support', high: 'Specialized vendor', 'very-high': 'Niche specialist' },
      humanOversight: { 'human-in-loop': 'Human in the Loop', 'human-on-loop': 'Human on the Loop', sampled: 'Sampled Oversight', autonomous: 'Fully Autonomous' }
    };

    // Now calculate contributions and add descriptions
    const dimensions = dimensionsTemp.map(d => ({
      ...d,
      contribution: (d.weightedScore / totalWeightedScore) * 100,
      description: descriptions[d.key]?.[d.value] || d.value
    }));

    // Group dimensions by category and calculate category-level metrics
    const categoryMetrics = {
      'Business Impact': {
        icon: '💼',
        dimensions: dimensions.filter(d => d.category === 'Business Impact'),
        totalWeighted: 0,
        avgScore: 0,
        contribution: 0
      },
      'Data & Privacy': {
        icon: '🔒',
        dimensions: dimensions.filter(d => d.category === 'Data & Privacy'),
        totalWeighted: 0,
        avgScore: 0,
        contribution: 0
      },
      'Security & Compliance': {
        icon: '🛡️',
        dimensions: dimensions.filter(d => d.category === 'Security & Compliance'),
        totalWeighted: 0,
        avgScore: 0,
        contribution: 0
      },
      'Operational': {
        icon: '⚙️',
        dimensions: dimensions.filter(d => d.category === 'Operational'),
        totalWeighted: 0,
        avgScore: 0,
        contribution: 0
      }
    };

    // Calculate metrics for each category
    Object.keys(categoryMetrics).forEach(category => {
      const cat = categoryMetrics[category];
      cat.totalWeighted = cat.dimensions.reduce((sum, d) => sum + d.weightedScore, 0);
      cat.avgScore = Math.round(cat.dimensions.reduce((sum, d) => sum + d.score, 0) / cat.dimensions.length);
      cat.contribution = (cat.totalWeighted / totalWeightedScore) * 100;
    });

    // Get all categories sorted by contribution
    const allCategories = Object.entries(categoryMetrics)
      .sort((a, b) => b[1].contribution - a[1].contribution)
      .map(([name, data]) => ({
        category: name,
        label: name,
        icon: data.icon,
        score: data.avgScore,
        contribution: data.contribution
      }));

    return {
      overall,
      tier,
      dimensions,
      categoryMetrics,
      topDrivers: allCategories,
      hasDimensions: true
    };
  }, [asset]);

  const getTierColor = (tier) => {
    const colors = {
      low: 'rgb(13, 199, 131)',
      medium: 'rgb(255, 153, 0)',
      high: 'rgb(255, 35, 35)',
      critical: 'rgb(139, 0, 0)'
    };
    return colors[tier] || colors.medium;
  };

  const getTierBg = (tier) => {
    const colors = {
      low: 'rgba(13, 199, 131, 0.1)',
      medium: 'rgba(255, 153, 0, 0.1)',
      high: 'rgba(255, 35, 35, 0.1)',
      critical: 'rgba(139, 0, 0, 0.1)'
    };
    return colors[tier] || colors.medium;
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'rgb(255, 35, 35)';
    if (score >= 60) return 'rgb(255, 153, 0)';
    if (score >= 35) return 'rgb(255, 153, 0)';
    return 'rgb(13, 199, 131)';
  };

  const groupedDimensions = riskData.dimensions.reduce((acc, dim) => {
    if (!acc[dim.category]) acc[dim.category] = [];
    acc[dim.category].push(dim);
    return acc;
  }, {});

  return (
    <div style={{ fontFamily: '"Source Sans Pro", sans-serif' }}>
      {/* Summary View */}
      <div style={{
        background: getTierBg(riskData.tier),
        border: `2px solid ${getTierColor(riskData.tier)}`,
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
        maxWidth: '600px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: 0 }}>
            Risk Score: {riskData.tier.charAt(0).toUpperCase() + riskData.tier.slice(1)} Risk
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '26px', fontWeight: '700', color: getTierColor(riskData.tier) }}>
              {riskData.overall}
            </span>
            <span style={{ fontSize: '16px', color: 'rgb(113, 118, 126)' }}>/100</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
          <div style={{
            width: `${riskData.overall}%`,
            height: '100%',
            background: getTierColor(riskData.tier),
            borderRadius: '3px',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Risk Category Breakdown */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(74, 85, 104)', marginBottom: '6px' }}>
            Risk Category Breakdown:
          </div>
          {!riskData.hasDimensions ? (
            <div style={{
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: '11px',
              color: 'rgb(113, 118, 126)',
              fontStyle: 'italic'
            }}>
              Detailed risk breakdown not available for this asset
            </div>
          ) : (
            riskData.topDrivers.map((driver, index) => (
              <div key={driver.category} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 10px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '6px',
                marginBottom: index < riskData.topDrivers.length - 1 ? '5px' : 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '14px' }}>{driver.icon}</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(26, 32, 44)' }}>
                    {driver.label}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: getScoreColor(driver.score) }}>
                    {driver.score}/100
                  </span>
                  <span style={{ fontSize: '10px', color: 'rgb(113, 118, 126)' }}>
                    ({driver.contribution.toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: '100%',
            marginTop: '12px',
            padding: '8px',
            background: 'white',
            border: '1px solid rgb(220, 229, 242)',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'rgb(85, 81, 247)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(245, 247, 255)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
        >
          {isExpanded ? (
            <>
              Hide Full Breakdown <ChevronUp size={16} />
            </>
          ) : (
            <>
              View Full Breakdown <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>

      {/* Expanded Breakdown - Compact Table */}
      {
        isExpanded && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
            border: '1px solid rgb(220, 229, 242)',
            overflow: 'hidden',
            maxWidth: '600px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid rgb(220, 229, 242)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: 0 }}>
                Risk Dimension Breakdown
              </h3>
              <button
                onClick={() => setShowCalculation(true)}
                style={{
                  padding: '4px 10px',
                  background: 'rgb(85, 81, 247)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Info size={12} />
                How It's Calculated
              </button>
            </div>

            {/* Category-Level Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ background: 'rgb(245, 247, 255)', borderBottom: '1px solid rgb(220, 229, 242)' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', fontSize: '10px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.3px', width: '50%' }}>
                    Category
                  </th>
                  <th style={{ padding: '6px 10px', textAlign: 'center', fontSize: '10px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.3px', width: '20%' }}>
                    Avg Score
                  </th>
                  <th style={{ padding: '6px 10px', textAlign: 'center', fontSize: '10px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.3px', width: '30%' }}>
                    Contribution
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(riskData.categoryMetrics).map(([categoryName, categoryData], catIndex) => (
                  <React.Fragment key={categoryName}>
                    {/* Category Row */}
                    <tr
                      style={{
                        borderBottom: '1px solid rgb(237, 242, 247)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(245, 247, 255)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                    >
                      <td style={{ padding: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '16px' }}>{categoryData.icon}</span>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: 'rgb(26, 32, 44)' }}>
                            {categoryName}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: getScoreColor(categoryData.avgScore) }}>
                          {categoryData.avgScore}
                        </span>
                      </td>
                      <td style={{ padding: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, height: '6px', background: 'rgb(237, 242, 247)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${categoryData.contribution}%`,
                              height: '100%',
                              background: getScoreColor(categoryData.avgScore),
                              borderRadius: '3px'
                            }} />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: 'rgb(74, 85, 104)', minWidth: '45px', textAlign: 'right' }}>
                            {categoryData.contribution.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* Dimension Details (sub-rows) - indented */}
                    {categoryData.dimensions.map((dim, dimIndex) => (
                      <tr
                        key={dim.key}
                        style={{
                          borderBottom: dimIndex === categoryData.dimensions.length - 1 ? '2px solid rgb(220, 229, 242)' : '1px solid rgb(237, 242, 247)',
                          background: 'rgb(250, 251, 252)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(245, 247, 255)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgb(250, 251, 252)'}
                      >
                        <td style={{ padding: '6px 10px 6px 30px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ fontSize: '11px' }}>{dim.icon}</span>
                            <div>
                              <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgb(74, 85, 104)' }}>
                                {dim.label}
                              </div>
                              <div style={{ fontSize: '9px', color: 'rgb(113, 118, 126)' }}>
                                {dim.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '6px 10px', textAlign: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: '600', color: getScoreColor(dim.score) }}>
                            {dim.score}
                          </span>
                        </td>
                        <td style={{ padding: '6px 10px', textAlign: 'center' }}>
                          <span style={{ fontSize: '10px', color: 'rgb(113, 118, 126)' }}>
                            {dim.contribution.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )
      }

      {/* Calculation Modal */}
      {
        showCalculation && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(30, 30, 30, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }} onClick={() => setShowCalculation(false)}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '32px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto'
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: 0 }}>
                  How Your Risk Score is Calculated
                </h3>
                <button
                  onClick={() => setShowCalculation(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: 'rgb(113, 118, 126)'
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ fontSize: '16px', color: 'rgb(74, 85, 104)', marginBottom: '24px' }}>
                Final Score = Weighted Average of 12 Dimensions
              </div>

              {/* Step 1 */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'rgb(26, 32, 44)', marginBottom: '12px' }}>
                  Step 1: Normalize Each Dimension (0-100)
                </h4>
                <div style={{ paddingLeft: '16px', borderLeft: '3px solid rgb(85, 81, 247)' }}>
                  <div style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', marginBottom: '6px' }}>
                    • Criticality: Very High → 100 points
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', marginBottom: '6px' }}>
                    • Data Privacy: Very High → 100 points
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgb(74, 85, 104)' }}>
                    • Human Oversight: Human-in-Loop → 25 points
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'rgb(26, 32, 44)', marginBottom: '12px' }}>
                  Step 2: Apply Dimension Weights
                </h4>
                <div style={{ paddingLeft: '16px', borderLeft: '3px solid rgb(85, 81, 247)' }}>
                  <div style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', marginBottom: '6px' }}>
                    • Data Privacy (90) × 1.3 = 117
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', marginBottom: '6px' }}>
                    • Cybersecurity (85) × 1.3 = 110.5
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgb(74, 85, 104)' }}>
                    • Sustainability (40) × 0.7 = 28
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'rgb(26, 32, 44)', marginBottom: '12px' }}>
                  Step 3: Calculate Weighted Average
                </h4>
                <div style={{
                  padding: '16px',
                  background: 'rgb(245, 247, 255)',
                  borderRadius: '8px',
                  border: '1px solid rgb(220, 229, 242)'
                }}>
                  <div style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', marginBottom: '8px' }}>
                    Total Weighted Score: <strong>864</strong>
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', marginBottom: '8px' }}>
                    Total Weights: <strong>12.0</strong>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: 'rgb(26, 32, 44)', marginTop: '12px' }}>
                    Final Score: 864 ÷ 12.0 = 72/100
                  </div>
                </div>
              </div>

              {/* Risk Tier */}
              <div style={{
                padding: '16px',
                background: getTierBg(riskData.tier),
                border: `2px solid ${getTierColor(riskData.tier)}`,
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', marginBottom: '4px' }}>
                  Risk Tier:
                </div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: getTierColor(riskData.tier) }}>
                  {riskData.tier.charAt(0).toUpperCase() + riskData.tier.slice(1)} (61-85 range)
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default RiskScoreBreakdown;
