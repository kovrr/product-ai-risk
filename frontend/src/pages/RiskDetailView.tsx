import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { getRiskById } from '../data/mock-risks';
import { getRiskAssets, getAssetById, getUserById, getControlById } from '../data';
import { getActivityLogsByRisk } from '../data/mock-activity';
import { CategoryBadge, UserAvatar } from '../components/molecules';
import { ActivityTimeline } from '../components/organisms';

export const RiskDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('assets');

  const risk = useMemo(() => getRiskById(Number(id)), [id]);
  const owner = useMemo(() => risk ? getUserById(risk.owner_id) : null, [risk]);
  
  const linkedAssets = useMemo(() => {
    if (!risk) return [];
    const assetIds = getRiskAssets(risk.id);
    return assetIds.map(id => getAssetById(id)).filter(Boolean);
  }, [risk]);

  const currentControls = useMemo(() => {
    if (!risk) return [];
    return risk.current_controls.map(id => getControlById(id)).filter(Boolean);
  }, [risk]);

  const plannedControls = useMemo(() => {
    if (!risk) return [];
    return risk.planned_controls.map(id => getControlById(id)).filter(Boolean);
  }, [risk]);

  const activityLogs = useMemo(() => {
    if (!risk) return [];
    return getActivityLogsByRisk(risk.id);
  }, [risk]);

  if (!risk) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-text-base-primary mt-4">Risk scenario not found</p>
          <button 
            onClick={() => navigate('/risk-register')}
            className="mt-4 px-4 py-2 bg-fill-brand-primary text-white rounded"
          >
            Back to Risk Register
          </button>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'Critical': 'text-red-700',
      'High': 'text-orange-700',
      'Medium': 'text-yellow-700',
      'Low': 'text-gray-700',
    };
    return colors[priority] || 'text-gray-700';
  };

  const getImpactBadge = (impact: string) => {
    const badges: Record<string, string> = {
      'Severe': 'bg-red-100 text-red-700 border-red-200',
      'Significant': 'bg-orange-100 text-orange-700 border-orange-200',
      'Moderate': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Minor': 'bg-gray-100 text-gray-700 border-gray-200',
      'Negligible': 'bg-gray-50 text-gray-600 border-gray-100',
    };
    return badges[impact] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getLikelihoodBadge = (likelihood: string) => {
    const badges: Record<string, string> = {
      'Expected': 'bg-red-100 text-red-700 border-red-200',
      'Possible': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Unlikely': 'bg-blue-100 text-blue-700 border-blue-200',
      'Rare': 'bg-gray-100 text-gray-700 border-gray-200',
      'Very Rare': 'bg-gray-50 text-gray-600 border-gray-100',
    };
    return badges[likelihood] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const tabs = [
    { id: 'assets', label: `Affected Assets (${linkedAssets.length})` },
    { id: 'mitigation', label: `Mitigation (${currentControls.length + plannedControls.length})` },
    { id: 'activity', label: 'Activity Log' },
  ];

  return (
    <div className="h-full flex flex-col bg-fill-base-primary">
      {/* Header */}
      <div className="border-b border-stroke-base-secondary bg-fill-base-primary px-[32px] py-[24px]">
        <button
          onClick={() => navigate('/risk-register')}
          className="flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Risk Register
        </button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-primary">{risk.risk_id}</span>
              <CategoryBadge category={risk.category} />
              <span className={`text-sm font-semibold ${getPriorityColor(risk.priority)}`}>
                {risk.priority} Priority
              </span>
            </div>
            <h1 className="text-[28px] font-[700] text-text-base-primary mb-2">{risk.name}</h1>
            <p className="text-[14px] text-text-base-secondary max-w-3xl">{risk.description}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-fill-base-secondary rounded-lg transition-colors">
              <Edit size={18} className="text-text-base-secondary" />
            </button>
            <button className="p-2 hover:bg-fill-base-secondary rounded-lg transition-colors">
              <Trash2 size={18} className="text-text-base-secondary" />
            </button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-fill-base-secondary rounded-[10px] p-4">
            <div className="text-xs text-text-base-secondary mb-1">Impact Level</div>
            <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold border ${getImpactBadge(risk.impact_level)}`}>
              {risk.impact_level}
            </span>
          </div>
          <div className="bg-fill-base-secondary rounded-[10px] p-4">
            <div className="text-xs text-text-base-secondary mb-1">Likelihood</div>
            <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold border ${getLikelihoodBadge(risk.likelihood_level)}`}>
              {risk.likelihood_level}
            </span>
          </div>
          <div className="bg-fill-base-secondary rounded-[10px] p-4">
            <div className="text-xs text-text-base-secondary mb-1">Status</div>
            <div className="text-sm font-semibold text-text-base-primary">{risk.status}</div>
          </div>
          <div className="bg-fill-base-secondary rounded-[10px] p-4">
            <div className="text-xs text-text-base-secondary mb-1">Risk Owner</div>
            {owner && <UserAvatar name={owner.name} email={owner.email} size="sm" />}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left Column - Details */}
        <div className="flex-1 overflow-auto px-[32px] py-[24px]">
          {/* Financial Impact */}
          {risk.expected_annual_loss && (
            <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-6 mb-6">
              <h3 className="text-[16px] font-[600] text-text-base-primary mb-4">Financial Quantification</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-text-base-secondary mb-1">Expected Annual Loss</div>
                  <div className="text-2xl font-bold text-text-base-primary">
                    ${(risk.expected_annual_loss / 1000000).toFixed(1)}M
                  </div>
                </div>
                {risk.value_at_risk_95 && (
                  <div>
                    <div className="text-xs text-text-base-secondary mb-1">Value at Risk (95%)</div>
                    <div className="text-2xl font-bold text-text-base-primary">
                      ${(risk.value_at_risk_95 / 1000000).toFixed(1)}M
                    </div>
                  </div>
                )}
                {risk.maximum_probable_loss && (
                  <div>
                    <div className="text-xs text-text-base-secondary mb-1">Maximum Probable Loss</div>
                    <div className="text-2xl font-bold text-text-base-primary">
                      ${(risk.maximum_probable_loss / 1000000).toFixed(1)}M
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Impact Details */}
          <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-6 mb-6">
            <h3 className="text-[16px] font-[600] text-text-base-primary mb-4">Impact Assessment</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-text-base-secondary mb-1">Financial Impact</div>
                <div className="text-sm text-text-base-primary">${(risk.financial_impact / 1000000).toFixed(1)}M potential loss</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-text-base-secondary mb-1">Reputational Impact</div>
                <div className="text-sm text-text-base-primary">{risk.reputational_impact}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-text-base-secondary mb-1">Regulatory Impact</div>
                <div className="text-sm text-text-base-primary">{risk.regulatory_impact}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-text-base-secondary mb-1">Operational Impact</div>
                <div className="text-sm text-text-base-primary">{risk.operational_impact}</div>
              </div>
            </div>
          </div>

          {/* Data Exposure */}
          {risk.records_at_risk > 0 && (
            <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-6 mb-6">
              <h3 className="text-[16px] font-[600] text-text-base-primary mb-4">Data Exposure</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-text-base-secondary mb-1">Records at Risk</div>
                  <div className="text-2xl font-bold text-text-base-primary">
                    {risk.records_at_risk.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-text-base-secondary mb-1">Data Types</div>
                  <div className="flex flex-wrap gap-2">
                    {risk.data_types.map(type => (
                      <span key={type} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-text-base-secondary mb-1">Jurisdictions</div>
                  <div className="flex flex-wrap gap-2">
                    {risk.jurisdictions.map(jurisdiction => (
                      <span key={jurisdiction} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                        {jurisdiction}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-text-base-secondary mb-1">Regulatory Frameworks</div>
                  <div className="flex flex-wrap gap-2">
                    {risk.regulatory_frameworks.map(framework => (
                      <span key={framework} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                        {framework}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MITRE ATLAS Mapping */}
          {risk.mitre_tactics.length > 0 && (
            <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-6">
              <h3 className="text-[16px] font-[600] text-text-base-primary mb-4">MITRE ATLAS Mapping</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-text-base-secondary mb-2">Tactics</div>
                  <div className="flex flex-wrap gap-2">
                    {risk.mitre_tactics.map(tactic => (
                      <span key={tactic} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded border border-gray-300">
                        {tactic}
                      </span>
                    ))}
                  </div>
                </div>
                {risk.mitre_techniques.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-text-base-secondary mb-2">Techniques</div>
                    <div className="flex flex-wrap gap-2">
                      {risk.mitre_techniques.map(technique => (
                        <span key={technique} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded border border-gray-300">
                          {technique}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Tabs */}
        <div className="w-[400px] border-l border-stroke-base-secondary bg-fill-base-primary flex flex-col">
          {/* Tabs Header */}
          <div className="border-b border-stroke-base-secondary">
            <div className="flex">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-fill-brand-primary text-fill-brand-primary'
                      : 'border-transparent text-text-base-secondary hover:text-text-base-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto p-4">
            {activeTab === 'assets' && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-text-base-primary mb-3">Affected Assets</h4>
                {linkedAssets.length > 0 ? (
                  linkedAssets.map(asset => asset && (
                    <div
                      key={asset.id}
                      className="p-3 bg-fill-base-secondary rounded-lg cursor-pointer hover:bg-fill-base-tertiary transition-colors"
                      onClick={() => navigate(`/assets/${asset.id}`)}
                    >
                      <div className="font-semibold text-sm text-text-base-primary">{asset.name}</div>
                      <div className="text-xs text-text-base-secondary mt-1">
                        {asset.asset_type} • Risk Score: {asset.risk_score.toFixed(0)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-text-base-tertiary text-sm">
                    No assets linked to this risk
                  </div>
                )}
              </div>
            )}

            {activeTab === 'mitigation' && (
              <div className="space-y-4">
                {/* Current Controls */}
                <div>
                  <h4 className="text-sm font-semibold text-text-base-primary mb-3">
                    Current Controls ({currentControls.length})
                  </h4>
                  {currentControls.length > 0 ? (
                    <div className="space-y-2">
                      {currentControls.map(control => control && (
                        <div
                          key={control.id}
                          className="p-3 bg-green-50 border border-green-200 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                          onClick={() => navigate('/ai-assurance-plan')}
                        >
                          <div className="font-semibold text-sm text-text-base-primary">
                            {control.control_id} - {control.name}
                          </div>
                          <div className="text-xs text-text-base-secondary mt-1">{control.status}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-text-base-tertiary text-sm">
                      No current controls
                    </div>
                  )}
                </div>

                {/* Planned Controls */}
                <div>
                  <h4 className="text-sm font-semibold text-text-base-primary mb-3">
                    Planned Controls ({plannedControls.length})
                  </h4>
                  {plannedControls.length > 0 ? (
                    <div className="space-y-2">
                      {plannedControls.map(control => control && (
                        <div
                          key={control.id}
                          className="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                          onClick={() => navigate('/ai-assurance-plan')}
                        >
                          <div className="font-semibold text-sm text-text-base-primary">
                            {control.control_id} - {control.name}
                          </div>
                          <div className="text-xs text-text-base-secondary mt-1">Planned</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-text-base-tertiary text-sm">
                      No planned controls
                    </div>
                  )}
                </div>

                {/* Mitigation Timeline */}
                <div className="pt-4 border-t border-stroke-base-secondary">
                  <div className="text-xs font-semibold text-text-base-secondary mb-1">Mitigation Timeline</div>
                  <div className="text-sm text-text-base-primary">
                    {new Date(risk.mitigation_timeline).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>

                {/* Residual Risk */}
                <div>
                  <div className="text-xs font-semibold text-text-base-secondary mb-1">Residual Risk Level</div>
                  <div className="text-sm font-semibold text-text-base-primary">{risk.residual_risk_level}</div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-6">
                <h3 className="text-sm font-semibold text-text-base-primary mb-4">Activity Timeline</h3>
                <ActivityTimeline activities={activityLogs} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
