import React from 'react';

const Step3DataPrivacy = ({ formData, updateFormData }) => {
  const toggleArrayValue = (field, value) => {
    const current = formData[field] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFormData(field, updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Data & Privacy</h2>
        <p className="text-neutral-600">Data handling, privacy, and model training considerations</p>
      </div>

      <div className="space-y-6">
        {/* Data Sources */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Data Sources <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Internal databases',
              'Customer data',
              'Employee data',
              'Third-party data',
              'Public data',
              'Synthetic data'
            ].map(source => (
              <label key={source} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={(formData.dataSources || []).includes(source)}
                  onChange={() => toggleArrayValue('dataSources', source)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{source}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Data Types */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Data Types Processed <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Personal Identifiable Information (PII)',
              'Financial data',
              'Health data',
              'Biometric data',
              'Behavioral data',
              'Business/operational data'
            ].map(type => (
              <label key={type} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={(formData.dataTypes || []).includes(type)}
                  onChange={() => toggleArrayValue('dataTypes', type)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Data Segregation */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Data Segregation <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.dataSegregation}
            onChange={(e) => updateFormData('dataSegregation', e.target.value)}
          >
            <option value="yes">✓ Yes - Organization data is segregated</option>
            <option value="no">✗ No - Shared data environment</option>
            <option value="unknown">❓ Unknown</option>
            <option value="na">N/A - Not Applicable</option>
          </select>
        </div>

        {/* Model Training */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Model Training Policy <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.modelTraining}
            onChange={(e) => updateFormData('modelTraining', e.target.value)}
          >
            <option value="not-used">✓ Our data is NOT used to train models</option>
            <option value="with-consent">⚠ MAY be used (with consent)</option>
            <option value="is-used">✗ IS used for model training</option>
            <option value="unknown">❓ Unknown</option>
            <option value="na">N/A - Custom model</option>
          </select>
        </div>

        {/* Data Residency */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Data Residency Requirements <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.dataResidency}
            onChange={(e) => updateFormData('dataResidency', e.target.value)}
          >
            <option value="no">No - No geographic restrictions</option>
            <option value="yes">Yes - Data must remain in specific location</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        {/* Data Residency Location (conditional) */}
        {formData.dataResidency === 'yes' && (
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Data Residency Location <span className="text-error">*</span>
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g., EU, US, UK"
              value={formData.dataResidencyLocation}
              onChange={(e) => updateFormData('dataResidencyLocation', e.target.value)}
            />
          </div>
        )}

        {/* Data Retention */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Data Retention Period <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.dataRetention}
            onChange={(e) => updateFormData('dataRetention', e.target.value)}
          >
            <option value="realtime">Real-time only (no storage)</option>
            <option value="less-30">Less than 30 days</option>
            <option value="30-90-days">30-90 days</option>
            <option value="90-365">90 days - 1 year</option>
            <option value="1-3-years">1-3 years</option>
            <option value="3-7-years">3-7 years</option>
            <option value="more-7-years">More than 7 years</option>
            <option value="indefinite">Indefinite</option>
          </select>
        </div>

        {/* Privacy Assessment */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Privacy Impact Assessment Completed? <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.privacyAssessment}
            onChange={(e) => updateFormData('privacyAssessment', e.target.value)}
          >
            <option value="yes">✓ Yes (document attached)</option>
            <option value="no">✗ No</option>
            <option value="in-progress">⏳ In Progress</option>
            <option value="not-required">N/A - Not Required</option>
          </select>
        </div>

        {/* GDPR Compliance */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            GDPR/Privacy Compliance <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.gdprCompliance}
            onChange={(e) => updateFormData('gdprCompliance', e.target.value)}
          >
            <option value="fully-compliant">✓ Fully Compliant</option>
            <option value="partially-compliant">⚠ Partially Compliant</option>
            <option value="non-compliant">✗ Non-Compliant</option>
            <option value="not-applicable">N/A - Not Applicable</option>
            <option value="under-review">⏳ Under Review</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Step3DataPrivacy;
