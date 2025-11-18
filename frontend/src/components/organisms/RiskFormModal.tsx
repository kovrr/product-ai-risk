import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { RiskScenario, RiskCategory, Priority, ImpactLevel, LikelihoodLevel, RiskStatus } from '../../data/mock-risks';
import { mockAssets } from '../../data/mock-assets';
import { mockControls } from '../../data/mock-controls';
import { mockUsers } from '../../data/mock-users';

interface RiskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (risk: Partial<RiskScenario>) => void;
  risk?: RiskScenario | null;
  mode: 'create' | 'edit';
}

export const RiskFormModal: React.FC<RiskFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  risk,
  mode,
}) => {
  const [formData, setFormData] = useState<Partial<RiskScenario>>({
    name: '',
    description: '',
    category: 'Security Risk',
    priority: 'Medium',
    impact_level: 'Moderate',
    likelihood_level: 'Possible',
    status: 'Identified',
    owner_id: 1,
    mitre_tactics: [],
    mitre_techniques: [],
    financial_impact: 0,
    reputational_impact: '',
    regulatory_impact: '',
    operational_impact: '',
    current_controls: [],
    planned_controls: [],
    mitigation_timeline: new Date().toISOString().split('T')[0],
    residual_risk_level: 'Medium',
    records_at_risk: 0,
    data_types: [],
    jurisdictions: [],
    regulatory_frameworks: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);

  useEffect(() => {
    if (risk && mode === 'edit') {
      setFormData(risk);
      setSelectedAssets(risk.affected_assets || []);
    }
  }, [risk, mode]);

  const categories: RiskCategory[] = [
    'Privacy Risk',
    'Security Risk',
    'Bias/Fairness Risk',
    'Safety Risk',
    'Legal/Compliance Risk',
  ];

  const priorities: Priority[] = ['Critical', 'High', 'Medium', 'Low'];
  const impactLevels: ImpactLevel[] = ['Severe', 'Significant', 'Moderate', 'Minor', 'Negligible'];
  const likelihoodLevels: LikelihoodLevel[] = ['Expected', 'Possible', 'Unlikely', 'Rare', 'Very Rare'];
  const statuses: RiskStatus[] = ['Identified', 'Under Assessment', 'Plan in Progress', 'Response Plan Decided'];

  const dataTypeOptions = ['PII', 'Financial', 'Health Records', 'Biometric', 'Confidential Business Data', 'Model Parameters', 'Training Data'];
  const jurisdictionOptions = ['US', 'EU', 'UK', 'CA', 'Global'];
  const frameworkOptions = ['GDPR', 'CCPA', 'HIPAA', 'BIPA', 'SOC 2', 'ISO 27001', 'EEOC', 'Title VII', 'ECOA', 'FCRA', 'CFPB', 'PIPEDA', 'SOX', 'SEC', 'DMCA', 'FDA', 'NHTSA'];

  const mitreTacticOptions = [
    'AML.T0052 - Phishing',
    'AML.T0043 - Data Exfiltration',
    'AML.T0020 - AI Supply Chain: Model',
    'AML.T0018 - Backdoor ML Model',
    'AML.T0051 - Evade AI Model',
    'AML.T0048 - Model Inversion',
    'AML.T0054 - Social Engineering',
  ];

  const mitreTechniqueOptions = [
    'T1566 - Phishing',
    'T1530 - Data from Cloud Storage',
    'T1195 - Supply Chain Compromise',
    'T1204 - User Execution',
    'T1059 - Command Injection',
    'T1557 - Adversarial ML',
    'T1498 - Algorithmic Bias',
    'T1499 - AI Hallucination',
    'T1598 - Phishing for Information',
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = 'Scenario name is required';
    }

    if (!formData.description || formData.description.trim().length === 0) {
      newErrors.description = 'Description is required';
    }

    if (!formData.owner_id) {
      newErrors.owner_id = 'Risk owner is required';
    }

    if (formData.financial_impact && formData.financial_impact < 0) {
      newErrors.financial_impact = 'Financial impact must be positive';
    }

    if (formData.records_at_risk && formData.records_at_risk < 0) {
      newErrors.records_at_risk = 'Records at risk must be positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const now = new Date().toISOString();
    const riskData: Partial<RiskScenario> = {
      ...formData,
      affected_assets: selectedAssets,
      updated_at: now,
      ...(mode === 'create' && {
        created_at: now,
        created_by: 1, // Current user
        last_assessed_at: now,
      }),
    };

    onSave(riskData);
    onClose();
  };

  const handleChange = (field: keyof RiskScenario, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleArrayItem = (field: keyof RiskScenario, value: any) => {
    const currentArray = (formData[field] as any[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleChange(field, newArray);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-[15px] shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stroke-base-secondary">
          <h2 className="text-[20px] font-[700] text-text-base-primary">
            {mode === 'create' ? 'Add Risk Scenario' : 'Edit Risk Scenario'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-fill-base-secondary rounded-lg transition-colors"
          >
            <X size={20} className="text-text-base-secondary" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            {/* Section 1: Basic Information */}
            <div>
              <h3 className="text-[16px] font-[600] text-text-base-primary mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-1">
                    Scenario Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    placeholder="e.g., Biometric Data Misuse"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.description ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    placeholder="Describe the risk scenario..."
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-base-primary mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value as RiskCategory)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-base-primary mb-1">
                      Risk Owner <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.owner_id}
                      onChange={(e) => handleChange('owner_id', Number(e.target.value))}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.owner_id ? 'border-red-500' : 'border-neutral-300'
                      }`}
                    >
                      {mockUsers.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                      ))}
                    </select>
                    {errors.owner_id && <p className="text-red-500 text-xs mt-1">{errors.owner_id}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1.5: Affected Assets */}
            <div className="pt-4 border-t border-stroke-base-secondary">
              <h3 className="text-[16px] font-[600] text-text-base-primary mb-4">Affected Assets</h3>
              <div>
                <label className="block text-sm font-medium text-text-base-primary mb-2">
                  Select AI assets affected by this risk
                </label>
                <div className="max-h-[200px] overflow-y-auto border border-neutral-300 rounded-lg p-3 space-y-2">
                  {mockAssets.map(asset => (
                    <label
                      key={asset.id}
                      className="flex items-center gap-3 p-2 hover:bg-fill-base-secondary rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAssets.includes(asset.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAssets([...selectedAssets, asset.id]);
                          } else {
                            setSelectedAssets(selectedAssets.filter(id => id !== asset.id));
                          }
                        }}
                        className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-text-base-primary">{asset.name}</div>
                        <div className="text-xs text-text-base-secondary">
                          {asset.vendor_name} • Risk Score: {asset.risk_score} • {asset.status}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {selectedAssets.length > 0 && (
                  <p className="text-xs text-text-base-secondary mt-2">
                    {selectedAssets.length} asset{selectedAssets.length !== 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            </div>

            {/* Section 2: Risk Assessment */}
            <div className="pt-4 border-t border-stroke-base-secondary">
              <h3 className="text-[16px] font-[600] text-text-base-primary mb-4">Risk Assessment</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleChange('priority', e.target.value as Priority)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {priorities.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value as RiskStatus)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {statuses.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-1">Impact Level</label>
                  <select
                    value={formData.impact_level}
                    onChange={(e) => handleChange('impact_level', e.target.value as ImpactLevel)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {impactLevels.map(i => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-1">Likelihood</label>
                  <select
                    value={formData.likelihood_level}
                    onChange={(e) => handleChange('likelihood_level', e.target.value as LikelihoodLevel)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {likelihoodLevels.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: MITRE ATLAS Mapping */}
            <div className="pt-4 border-t border-stroke-base-secondary">
              <h3 className="text-[16px] font-[600] text-text-base-primary mb-4">MITRE ATLAS Mapping</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-2">Tactics</label>
                  <div className="flex flex-wrap gap-2">
                    {mitreTacticOptions.map(tactic => (
                      <button
                        key={tactic}
                        type="button"
                        onClick={() => toggleArrayItem('mitre_tactics', tactic)}
                        className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                          formData.mitre_tactics?.includes(tactic)
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary'
                        }`}
                      >
                        {tactic}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-2">Techniques</label>
                  <div className="flex flex-wrap gap-2">
                    {mitreTechniqueOptions.map(technique => (
                      <button
                        key={technique}
                        type="button"
                        onClick={() => toggleArrayItem('mitre_techniques', technique)}
                        className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                          formData.mitre_techniques?.includes(technique)
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary'
                        }`}
                      >
                        {technique}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Impact Details */}
            <div className="pt-4 border-t border-stroke-base-secondary">
              <h3 className="text-[16px] font-[600] text-text-base-primary mb-4">Impact Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-1">
                    Financial Impact ($)
                  </label>
                  <input
                    type="number"
                    value={formData.financial_impact}
                    onChange={(e) => handleChange('financial_impact', Number(e.target.value))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.financial_impact ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    placeholder="e.g., 2400000"
                  />
                  {errors.financial_impact && <p className="text-red-500 text-xs mt-1">{errors.financial_impact}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-1">
                    Reputational Impact
                  </label>
                  <textarea
                    value={formData.reputational_impact}
                    onChange={(e) => handleChange('reputational_impact', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe reputational impact..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-1">
                    Regulatory Impact
                  </label>
                  <textarea
                    value={formData.regulatory_impact}
                    onChange={(e) => handleChange('regulatory_impact', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe regulatory impact..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-1">
                    Operational Impact
                  </label>
                  <textarea
                    value={formData.operational_impact}
                    onChange={(e) => handleChange('operational_impact', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe operational impact..."
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Data Exposure */}
            <div className="pt-4 border-t border-stroke-base-secondary">
              <h3 className="text-[16px] font-[600] text-text-base-primary mb-4">Data Exposure</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-1">
                    Records at Risk
                  </label>
                  <input
                    type="number"
                    value={formData.records_at_risk}
                    onChange={(e) => handleChange('records_at_risk', Number(e.target.value))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.records_at_risk ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    placeholder="e.g., 125000"
                  />
                  {errors.records_at_risk && <p className="text-red-500 text-xs mt-1">{errors.records_at_risk}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-2">Data Types</label>
                  <div className="flex flex-wrap gap-2">
                    {dataTypeOptions.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleArrayItem('data_types', type)}
                        className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                          formData.data_types?.includes(type)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-blue-500'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-2">Jurisdictions</label>
                  <div className="flex flex-wrap gap-2">
                    {jurisdictionOptions.map(jurisdiction => (
                      <button
                        key={jurisdiction}
                        type="button"
                        onClick={() => toggleArrayItem('jurisdictions', jurisdiction)}
                        className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                          formData.jurisdictions?.includes(jurisdiction)
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-purple-500'
                        }`}
                      >
                        {jurisdiction}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-2">Regulatory Frameworks</label>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {frameworkOptions.map(framework => (
                      <button
                        key={framework}
                        type="button"
                        onClick={() => toggleArrayItem('regulatory_frameworks', framework)}
                        className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                          formData.regulatory_frameworks?.includes(framework)
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-orange-500'
                        }`}
                      >
                        {framework}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Mitigation */}
            <div className="pt-4 border-t border-stroke-base-secondary">
              <h3 className="text-[16px] font-[600] text-text-base-primary mb-4">Mitigation Strategy</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-2">Current Controls</label>
                  <div className="border border-neutral-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                    {mockControls.map(control => (
                      <label key={control.id} className="flex items-center gap-2 py-1 cursor-pointer hover:bg-neutral-50">
                        <input
                          type="checkbox"
                          checked={formData.current_controls?.includes(control.id)}
                          onChange={() => toggleArrayItem('current_controls', control.id)}
                          className="rounded"
                        />
                        <span className="text-sm">{control.control_id} - {control.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-base-primary mb-2">Planned Controls</label>
                  <div className="border border-neutral-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                    {mockControls.map(control => (
                      <label key={control.id} className="flex items-center gap-2 py-1 cursor-pointer hover:bg-neutral-50">
                        <input
                          type="checkbox"
                          checked={formData.planned_controls?.includes(control.id)}
                          onChange={() => toggleArrayItem('planned_controls', control.id)}
                          className="rounded"
                        />
                        <span className="text-sm">{control.control_id} - {control.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-base-primary mb-1">
                      Mitigation Timeline
                    </label>
                    <input
                      type="date"
                      value={formData.mitigation_timeline}
                      onChange={(e) => handleChange('mitigation_timeline', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-base-primary mb-1">
                      Residual Risk Level
                    </label>
                    <select
                      value={formData.residual_risk_level}
                      onChange={(e) => handleChange('residual_risk_level', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Very Low">Very Low</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Very High">Very High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stroke-base-secondary bg-fill-base-secondary">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-text-base-primary hover:bg-fill-base-tertiary rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium bg-fill-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            {mode === 'create' ? 'Create Risk Scenario' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
