import React from 'react';
import { getRiskColor, getRiskLabel } from '../../../utils/riskCalculator';

const Step2RiskAssessment = ({ formData, updateFormData, riskScore }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Risk Assessment</h2>
        <p className="text-neutral-600">Evaluate the risk profile using standardized measures</p>
      </div>

      {/* Risk Score Display */}
      <div className={`border-2 rounded-lg p-4 ${getRiskColor(riskScore.aggregate)}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">Current Risk Score: {getRiskLabel(riskScore.aggregate)}</h3>
          <span className="text-2xl font-bold">{riskScore.percentage}%</span>
        </div>
        <div className="w-full bg-white/50 rounded-full h-3 mb-2">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              riskScore.aggregate === 'low' ? 'bg-success' :
              riskScore.aggregate === 'moderate' ? 'bg-warning' :
              'bg-error'
            }`}
            style={{ width: `${riskScore.percentage}%` }}
          />
        </div>
        {riskScore.breakdown && (
          <div className="flex gap-4 text-sm mt-2">
            <span>✓ {riskScore.breakdown.low} Low</span>
            <span>⚠ {riskScore.breakdown.moderate} Moderate</span>
            <span>⚡ {riskScore.breakdown.high} High</span>
            <span>🔴 {riskScore.breakdown.veryHigh} Very High</span>
          </div>
        )}
        <p className="text-sm mt-2 opacity-90">
          {riskScore.aggregate === 'low' && '✓ Standard review process applies'}
          {riskScore.aggregate === 'moderate' && '⚠ Enhanced oversight recommended'}
          {(riskScore.aggregate === 'high' || riskScore.aggregate === 'very-high') && '🔴 Executive approval required'}
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Criticality */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            1. Criticality <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              { value: 'low', label: 'Low', desc: 'Info only', icon: 'ℹ️' },
              { value: 'moderate', label: 'Moderate', desc: 'Informative', icon: '📊' },
              { value: 'high', label: 'High', desc: 'High impact', icon: '⚠️' },
              { value: 'very-high', label: 'Very High', desc: 'Critical', icon: '🔴' }
            ].map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateFormData('criticality', option.value)}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  formData.criticality === option.value
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="text-2xl mb-1">{option.icon}</div>
                <div className="font-semibold text-neutral-800">{option.label}</div>
                <div className="text-xs text-neutral-600">{option.desc}</div>
              </button>
            ))}
          </div>
          <p className="text-sm text-neutral-500 mt-2">💡 Most business tools fall into 'Moderate'</p>
        </div>

        {/* 2. Audience Reach */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            2. Audience Reach <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.audienceReach}
            onChange={(e) => updateFormData('audienceReach', e.target.value)}
          >
            <option value="low">👥 Low - Team/Department</option>
            <option value="moderate">👔 Moderate - Senior Management</option>
            <option value="high">🎯 High - Executive/Client Impact</option>
            <option value="very-high">🏛️ Very High - Board/Regulator</option>
          </select>
        </div>

        {/* 3. Data Privacy Impact */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            3. Data Privacy Impact <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              { value: 'low', label: 'Low', desc: 'Public data' },
              { value: 'moderate', label: 'Moderate', desc: 'Anonymized' },
              { value: 'high', label: 'High', desc: 'PII/Finance' },
              { value: 'very-high', label: 'Very High', desc: 'Sensitive PII' }
            ].map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateFormData('dataPrivacy', option.value)}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  formData.dataPrivacy === option.value
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="font-semibold text-neutral-800">{option.label}</div>
                <div className="text-xs text-neutral-600 mt-1">{option.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Data Classification */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            4. Data Classification <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: 'external', label: 'External' },
              { value: 'internal', label: 'Internal' },
              { value: 'confidential', label: 'Confidential' },
              { value: 'highly-confidential', label: 'Highly Conf.' }
            ].map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateFormData('dataClassification', option.value)}
                className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                  formData.dataClassification === option.value
                    ? 'border-primary bg-primary text-white'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5-12: Remaining Risk Measures */}
        {[
          { field: 'ethicalRisk', label: '5. Ethical Risk', options: [
            { value: 'low', label: '✓ Low - No bias concerns' },
            { value: 'moderate', label: '⚠ Moderate - Potential bias but mitigated' },
            { value: 'high', label: '⚡ High - Requires oversight' },
            { value: 'very-high', label: '🔴 Very High - Strict oversight needed' }
          ]},
          { field: 'complexity', label: '6. Complexity & Interpretability', options: [
            { value: 'low', label: '✓ Low - Anyone can understand' },
            { value: 'moderate', label: '📊 Moderate - Requires expertise' },
            { value: 'high', label: '⚡ High - Needs AI specialist' },
            { value: 'very-high', label: '🔴 Very High - Black box system' }
          ]},
          { field: 'cybersecurity', label: '7. Cybersecurity Posture', options: [
            { value: 'low', label: '✓ Passed - Assessment achieved' },
            { value: 'moderate', label: '⚠ Partially Achieved' },
            { value: 'high', label: '⚡ Partially with gaps' },
            { value: 'not-assessed', label: '❓ Not Assessed Yet' },
            { value: 'very-high', label: '🔴 Failed or Not Performed' }
          ]},
          { field: 'financialImpact', label: '8. Financial Impact of Failure', options: [
            { value: 'low', label: '💵 Minor (<$50K)' },
            { value: 'moderate', label: '💰 Moderate ($50K-$500K)' },
            { value: 'high', label: '💎 Major ($500K-$5M)' },
            { value: 'very-high', label: '🏦 Severe (>$5M)' }
          ]},
          { field: 'nonFinancialImpact', label: '9. Non-Financial Impact', options: [
            { value: 'low', label: '✓ Minor - Limited impact' },
            { value: 'moderate', label: '⚠ Moderate - Some concern' },
            { value: 'high', label: '⚡ Major - Significant impact' },
            { value: 'very-high', label: '🔴 Severe - Critical impact' }
          ]},
          { field: 'sustainability', label: '10. Sustainability Impact', options: [
            { value: 'low', label: '🌱 Provider has practices' },
            { value: 'moderate', label: '🌿 Some practices' },
            { value: 'unknown', label: '❓ Unknown' },
            { value: 'high', label: '⚠ No details' },
            { value: 'very-high', label: '🔴 No approach' }
          ]},
          { field: 'resilience', label: '11. Availability/Resilience', options: [
            { value: 'low', label: '✓ Internal team - Easy to fix' },
            { value: 'moderate', label: '📞 Vendor support - Standard' },
            { value: 'high', label: '⚡ Specialized vendor - Complex' },
            { value: 'very-high', label: '🔴 Niche specialist - Critical' }
          ]},
          { field: 'humanOversight', label: '12. Human Oversight Level', options: [
            { value: 'human-in-loop', label: '👤 Human in the Loop (Recommended)' },
            { value: 'human-on-loop', label: '👁️ Human on the Loop' },
            { value: 'sampled', label: '📊 Sampled Oversight' },
            { value: 'autonomous', label: '🤖 Fully Autonomous' }
          ]}
        ].map(measure => (
          <div key={measure.field}>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              {measure.label} <span className="text-error">*</span>
            </label>
            <select
              className="input"
              value={formData[measure.field]}
              onChange={(e) => updateFormData(measure.field, e.target.value)}
            >
              {measure.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step2RiskAssessment;
