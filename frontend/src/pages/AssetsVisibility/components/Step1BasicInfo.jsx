import React from 'react';

const Step1BasicInfo = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Basic Information</h2>
        <p className="text-neutral-600">Essential identification and classification details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Asset Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Asset Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            className={`input ${errors.assetName ? 'border-error' : ''}`}
            placeholder="e.g., ChatGPT Enterprise, GitHub Copilot"
            value={formData.assetName}
            onChange={(e) => updateFormData('assetName', e.target.value)}
          />
          {errors.assetName && <p className="text-error text-sm mt-1">{errors.assetName}</p>}
        </div>

        {/* Asset Type */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Asset Type <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.assetType}
            onChange={(e) => updateFormData('assetType', e.target.value)}
          >
            <option value="saas">SaaS Application</option>
            <option value="open-source">Open-Source Library</option>
            <option value="custom">Custom-Built AI System</option>
            <option value="tool">AI-Enabled Tool</option>
            <option value="web-service">Public Web Service</option>
            <option value="model">AI Model/Algorithm</option>
            <option value="3rd-party">🏢 3rd Party / Vendor Provided</option>
            <option value="other">Other</option>
          </select>
          <p className="text-sm text-neutral-500 mt-2">
            💡 Choose "3rd Party" to track vendor risk, contracts, and certifications
          </p>
        </div>

        {/* Vendor/Provider */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Vendor/Provider <span className="text-error">*</span>
          </label>
          <input
            type="text"
            className={`input ${errors.vendor ? 'border-error' : ''}`}
            placeholder="e.g., OpenAI, Microsoft, Internal"
            value={formData.vendor}
            onChange={(e) => updateFormData('vendor', e.target.value)}
          />
          {errors.vendor && <p className="text-error text-sm mt-1">{errors.vendor}</p>}
        </div>

        {/* Version */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Version
          </label>
          <input
            type="text"
            className="input"
            placeholder="e.g., GPT-4, v2.1.0"
            value={formData.version}
            onChange={(e) => updateFormData('version', e.target.value)}
          />
        </div>

        {/* Deployment Type */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Deployment Type <span className="text-error">*</span>
          </label>
          <select
            className="input"
            value={formData.deploymentType}
            onChange={(e) => updateFormData('deploymentType', e.target.value)}
          >
            <option value="cloud">Cloud-Hosted</option>
            <option value="on-premises">On-Premises</option>
            <option value="hybrid">Hybrid</option>
            <option value="api">API-Based</option>
          </select>
        </div>

        {/* Asset Owner */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Asset Owner <span className="text-error">*</span>
          </label>
          <input
            type="text"
            className={`input ${errors.assetOwner ? 'border-error' : ''}`}
            placeholder="Business owner name"
            value={formData.assetOwner}
            onChange={(e) => updateFormData('assetOwner', e.target.value)}
          />
          {errors.assetOwner && <p className="text-error text-sm mt-1">{errors.assetOwner}</p>}
        </div>

        {/* Technical Owner */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Technical Owner
          </label>
          <input
            type="text"
            className="input"
            placeholder="IT/Technical contact"
            value={formData.technicalOwner}
            onChange={(e) => updateFormData('technicalOwner', e.target.value)}
          />
        </div>

        {/* Date Deployed */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Date Deployed/Acquired <span className="text-error">*</span>
          </label>
          <input
            type="date"
            className={`input ${errors.dateDeployed ? 'border-error' : ''}`}
            value={formData.dateDeployed}
            onChange={(e) => updateFormData('dateDeployed', e.target.value)}
          />
          {errors.dateDeployed && <p className="text-error text-sm mt-1">{errors.dateDeployed}</p>}
        </div>

        {/* Business Unit */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Business Unit/Department <span className="text-error">*</span>
          </label>
          <select
            className={`input ${errors.businessUnit ? 'border-error' : ''}`}
            value={formData.businessUnit}
            onChange={(e) => updateFormData('businessUnit', e.target.value)}
          >
            <option value="">Select department...</option>
            <option value="engineering">Engineering</option>
            <option value="product">Product</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="finance">Finance</option>
            <option value="hr">Human Resources</option>
            <option value="legal">Legal</option>
            <option value="operations">Operations</option>
            <option value="it">IT</option>
            <option value="security">Security</option>
          </select>
          {errors.businessUnit && <p className="text-error text-sm mt-1">{errors.businessUnit}</p>}
        </div>

        {/* Conditional: 3rd Party Vendor Details */}
        {formData.assetType === '3rd-party' && (
          <div className="md:col-span-2 border-2 border-primary/20 rounded-lg p-6 bg-primary/5">
            <h3 className="text-lg font-bold text-neutral-800 mb-2 flex items-center gap-2">
              🏢 Third-Party Vendor Details
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              Additional information for vendor-provided AI systems
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vendor Contact Email */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Vendor Contact Email
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="vendor@company.com"
                  value={formData.vendorContactEmail || ''}
                  onChange={(e) => updateFormData('vendorContactEmail', e.target.value)}
                />
              </div>

              {/* Account Manager */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Account Manager
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="John Doe"
                  value={formData.accountManager || ''}
                  onChange={(e) => updateFormData('accountManager', e.target.value)}
                />
              </div>

              {/* Vendor Risk Level */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-neutral-700 mb-3">
                  Vendor Risk Level <span className="text-error">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {[
                    { value: 'Low', label: 'Low', color: 'success', icon: '✓' },
                    { value: 'Moderate', label: 'Moderate', color: 'warning', icon: '⚠' },
                    { value: 'High', label: 'High', color: 'error', icon: '⚡' },
                    { value: 'Critical', label: 'Critical', color: 'error', icon: '🔴' },
                    { value: 'Not Assessed', label: 'Not Assessed', color: 'neutral', icon: '❓' }
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateFormData('vendorRiskLevel', option.value)}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        formData.vendorRiskLevel === option.value
                          ? `border-${option.color} bg-${option.color}/10 shadow-md`
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="text-xl mb-1">{option.icon}</div>
                      <div className="text-xs font-semibold">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contract Status */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Contract Status
                </label>
                <select
                  className="input"
                  value={formData.contractStatus || 'None'}
                  onChange={(e) => updateFormData('contractStatus', e.target.value)}
                >
                  <option value="Active">✅ Active</option>
                  <option value="Expiring Soon">⚠️ Expiring Soon</option>
                  <option value="Expired">❌ Expired</option>
                  <option value="Under Negotiation">🔄 Under Negotiation</option>
                  <option value="None">None</option>
                </select>
              </div>

              {/* Contract End Date */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Contract End Date
                </label>
                <input
                  type="date"
                  className="input"
                  value={formData.contractEndDate || ''}
                  onChange={(e) => updateFormData('contractEndDate', e.target.value)}
                />
              </div>

              {/* Auto-Renewal */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Auto-Renewal
                </label>
                <select
                  className="input"
                  value={formData.autoRenewal || 'false'}
                  onChange={(e) => updateFormData('autoRenewal', e.target.value)}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* Contract Value */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Annual Contract Value (USD)
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="50000"
                  value={formData.contractValue || ''}
                  onChange={(e) => updateFormData('contractValue', e.target.value)}
                />
              </div>

              {/* Vendor Certifications */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Vendor Certifications
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    'SOC2-Type2',
                    'ISO27001',
                    'ISO42001',
                    'HIPAA',
                    'GDPR-Compliant',
                    'FedRAMP',
                    'PCI-DSS',
                    'Other'
                  ].map(cert => (
                    <label key={cert} className="flex items-center gap-2 p-2 border rounded hover:bg-neutral-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.vendorCertifications || []).includes(cert)}
                        onChange={(e) => {
                          const current = formData.vendorCertifications || [];
                          const updated = e.target.checked
                            ? [...current, cert]
                            : current.filter(c => c !== cert);
                          updateFormData('vendorCertifications', updated);
                        }}
                        className="checkbox"
                      />
                      <span className="text-sm">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* SLA Uptime */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  SLA Uptime
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="99.9%"
                  value={formData.slaUptime || ''}
                  onChange={(e) => updateFormData('slaUptime', e.target.value)}
                />
              </div>

              {/* Support Tier */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Support Tier
                </label>
                <select
                  className="input"
                  value={formData.supportTier || 'Standard'}
                  onChange={(e) => updateFormData('supportTier', e.target.value)}
                >
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                  <option value="None">None</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Primary Use Case */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Primary Use Case <span className="text-error">*</span>
          </label>
          <textarea
            className={`input ${errors.primaryUseCase ? 'border-error' : ''}`}
            rows="3"
            placeholder="Describe the main business purpose and how this AI system is used..."
            maxLength="500"
            value={formData.primaryUseCase}
            onChange={(e) => updateFormData('primaryUseCase', e.target.value)}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.primaryUseCase && <p className="text-error text-sm">{errors.primaryUseCase}</p>}
            <p className="text-neutral-500 text-sm ml-auto">{formData.primaryUseCase.length}/500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
