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
            <option value="other">Other</option>
          </select>
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
