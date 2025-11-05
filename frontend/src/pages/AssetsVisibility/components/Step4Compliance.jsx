import React from 'react';

const Step4Compliance = ({ formData, updateFormData }) => {
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
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Compliance & Governance</h2>
        <p className="text-neutral-600">Regulatory requirements and governance controls</p>
      </div>

      <div className="space-y-6">
        {/* Regulatory Classification */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Regulatory Classification <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'High-Risk AI System (EU AI Act)',
              'Limited Risk AI System',
              'Minimal Risk AI System',
              'Financial Services Regulated',
              'Healthcare Regulated',
              'Not Regulated'
            ].map(classification => (
              <label key={classification} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={(formData.regulatoryClassification || []).includes(classification)}
                  onChange={() => toggleArrayValue('regulatoryClassification', classification)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{classification}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Applicable Regulations */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Applicable Regulations <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'EU AI Act',
              'GDPR',
              'CCPA/CPRA',
              'HIPAA',
              'SOX',
              'PCI-DSS',
              'ISO 27001',
              'SOC 2',
              'NIST AI RMF',
              'None'
            ].map(regulation => (
              <label key={regulation} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={(formData.applicableRegulations || []).includes(regulation)}
                  onChange={() => toggleArrayValue('applicableRegulations', regulation)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{regulation}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Vendor Security Assessment */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Vendor Security Assessment <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.vendorAssessment}
            onChange={(e) => updateFormData('vendorAssessment', e.target.value)}
          >
            <option value="passed">✓ Completed - Passed</option>
            <option value="passed-conditions">⚠ Completed - Passed with Conditions</option>
            <option value="failed">✗ Completed - Failed</option>
            <option value="in-progress">⏳ In Progress</option>
            <option value="not-started">❌ Not Started</option>
            <option value="not-required">N/A - Not Required</option>
          </select>
        </div>

        {/* Contract AI Clauses */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Vendor Contract Includes AI Clauses? <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.contractAIClauses}
            onChange={(e) => updateFormData('contractAIClauses', e.target.value)}
          >
            <option value="yes">✓ Yes - Data usage, liability, IP rights covered</option>
            <option value="partial">⚠ Partially - Some AI clauses included</option>
            <option value="no">✗ No - Standard contract only</option>
            <option value="no-contract">N/A - No contract (internal system)</option>
          </select>
        </div>

        {/* Third-Party Audit/Certification */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Third-Party Audit/Certification <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'SOC 2 Type II',
              'ISO 27001',
              'ISO 42001 (AI Management)',
              'FedRAMP',
              'HITRUST',
              'None'
            ].map(audit => (
              <label key={audit} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={(formData.thirdPartyAudit || []).includes(audit)}
                  onChange={() => toggleArrayValue('thirdPartyAudit', audit)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{audit}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Governance Controls */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Documented AI Governance Controls? <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.governanceControls}
            onChange={(e) => updateFormData('governanceControls', e.target.value)}
          >
            <option value="yes">✓ Yes - Full documentation available</option>
            <option value="partial">⚠ Partial - Some documentation exists</option>
            <option value="no">✗ No - Not documented</option>
            <option value="in-development">⏳ In Development</option>
          </select>
        </div>

        {/* Model Documentation */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Model Documentation Available? <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.modelDocumentation}
            onChange={(e) => updateFormData('modelDocumentation', e.target.value)}
          >
            <option value="yes">✓ Yes - Model cards/datasheets available</option>
            <option value="partial">⚠ Partial - Limited documentation</option>
            <option value="no">✗ No - Not available</option>
            <option value="not-applicable">N/A - Not Applicable (black box)</option>
          </select>
        </div>

        {/* Explainability/Transparency */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Explainability/Transparency <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.explainability}
            onChange={(e) => updateFormData('explainability', e.target.value)}
          >
            <option value="high">✓ High - Decisions can be fully explained</option>
            <option value="moderate">⚠ Moderate - Partial explainability</option>
            <option value="low">⚡ Low - Limited transparency</option>
            <option value="black-box">🔴 Black Box - No explainability</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Step4Compliance;
