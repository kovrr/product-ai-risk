import React from 'react';

const Step5Technical = ({ formData, updateFormData }) => {
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
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Technical & Operational</h2>
        <p className="text-neutral-600">Technical specifications and operational considerations</p>
      </div>

      <div className="space-y-6">
        {/* Integration Points */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Integration Points <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Identity Provider (SSO/SAML)',
              'CRM System',
              'ERP System',
              'Data Warehouse',
              'Cloud Storage',
              'APIs',
              'Email System',
              'Collaboration Tools',
              'Standalone (no integrations)'
            ].map(integration => (
              <label key={integration} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={(formData.integrationPoints || []).includes(integration)}
                  onChange={() => toggleArrayValue('integrationPoints', integration)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{integration}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Authentication Method */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Authentication Method <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Single Sign-On (SSO)',
              'Multi-Factor Authentication (MFA)',
              'API Keys',
              'OAuth 2.0',
              'Username/Password',
              'Certificate-based'
            ].map(method => (
              <label key={method} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={(formData.authenticationMethod || []).includes(method)}
                  onChange={() => toggleArrayValue('authenticationMethod', method)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Number of Users */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Number of Users <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.numberOfUsers}
            onChange={(e) => updateFormData('numberOfUsers', e.target.value)}
          >
            <option value="1-10">1-10 users</option>
            <option value="11-50">11-50 users</option>
            <option value="51-100">51-100 users</option>
            <option value="101-500">101-500 users</option>
            <option value="501-1000">501-1000 users</option>
            <option value="1000+">1000+ users</option>
          </select>
        </div>

        {/* User Access Level */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            User Access Level <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.userAccessLevel}
            onChange={(e) => updateFormData('userAccessLevel', e.target.value)}
          >
            <option value="department">Department-wide</option>
            <option value="organization">Organization-wide</option>
            <option value="restricted">Restricted to specific roles</option>
            <option value="external">External users included</option>
            <option value="public">Public-facing</option>
          </select>
        </div>

        {/* Monitoring & Logging */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Monitoring & Logging <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.monitoring}
            onChange={(e) => updateFormData('monitoring', e.target.value)}
          >
            <option value="comprehensive">✓ Comprehensive - All activities logged</option>
            <option value="moderate">⚠ Moderate - Key activities logged</option>
            <option value="minimal">⚡ Minimal - Basic logging only</option>
            <option value="none">✗ None - No logging/monitoring</option>
          </select>
        </div>

        {/* Incident Response Plan */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Incident Response Plan <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.incidentResponse}
            onChange={(e) => updateFormData('incidentResponse', e.target.value)}
          >
            <option value="yes-tested">✓ Yes - Documented and tested</option>
            <option value="yes-not-tested">⚠ Yes - Documented but not tested</option>
            <option value="in-development">⏳ In Development</option>
            <option value="no">✗ No</option>
          </select>
        </div>

        {/* Business Continuity Plan */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Business Continuity Plan <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.businessContinuity}
            onChange={(e) => updateFormData('businessContinuity', e.target.value)}
          >
            <option value="yes">✓ Yes - Documented with backup/failover</option>
            <option value="partial">⚠ Partial - Some continuity measures</option>
            <option value="no">✗ No</option>
            <option value="not-required">N/A - Not Required</option>
          </select>
        </div>

        {/* Vendor SLA */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Vendor SLA (Uptime Guarantee)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              className="input"
              placeholder="99.9"
              value={formData.vendorSLA}
              onChange={(e) => updateFormData('vendorSLA', e.target.value)}
            />
            <span className="text-neutral-600">%</span>
          </div>
          <p className="text-sm text-neutral-500 mt-1">e.g., 99.9% uptime</p>
        </div>

        {/* Support Availability */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Support Availability <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.supportAvailability}
            onChange={(e) => updateFormData('supportAvailability', e.target.value)}
          >
            <option value="24-7">24/7 Support</option>
            <option value="business-hours">Business Hours Only</option>
            <option value="email-only">Email Support Only</option>
            <option value="community">Community Support</option>
            <option value="none">No Formal Support</option>
          </select>
        </div>

        {/* Change Management */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Change Management Process <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.changeManagement}
            onChange={(e) => updateFormData('changeManagement', e.target.value)}
          >
            <option value="formal">✓ Formal change control process</option>
            <option value="informal">⚠ Informal change management</option>
            <option value="none">✗ No change management</option>
            <option value="vendor-managed">Vendor-managed updates only</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Step5Technical;
