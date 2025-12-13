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
  const [activeTab, setActiveTab] = useState('risk');

  const risk = useMemo(() => getRiskById(Number(id)), [id]);
  const owner = useMemo(() => risk ? getUserById(risk.owner_id) : null, [risk]);
  
  const linkedAssets = useMemo(() => {
    if (!risk) return [];
    // Use affected_assets from risk data if available, otherwise fall back to getRiskAssets
    const assetIds = risk.affected_assets || getRiskAssets(risk.id);
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
    { id: 'risk', label: 'Risk Management' },
    { id: 'controls', label: 'Relevant Controls' },
    { id: 'notes', label: 'Notes' },
  ];

  return (
    <div className="h-full overflow-auto bg-fill-base-primary">
      <div className="max-w-[1440px] mx-auto px-[32px] py-[24px]">
        <button
          onClick={() => navigate('/risk-register')}
          className="flex items-center gap-2 text-primary hover:text-primary-dark text-sm font-medium mb-5"
        >
          <ArrowLeft size={16} />
          Back to all risks
        </button>

        <div className="grid grid-cols-[2fr_1fr] gap-5 items-start">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Scenario Header Card */}
            <div className="bg-white rounded-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] px-[20px] py-[20px]">
              <div className="text-xs font-semibold text-primary mb-1">{risk.risk_id} /</div>
              <h1 className="text-[26px] font-[700] text-text-base-primary mb-2 leading-tight">{risk.name}</h1>
              <p className="text-[14px] text-text-base-secondary leading-relaxed mb-3">{risk.description}</p>
              <div className="flex items-center gap-2">
                <CategoryBadge category={risk.category} />
              </div>
            </div>

            {/* Impact / Likelihood Card */}
            <div className="bg-white rounded-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] px-[20px] py-[20px] flex gap-10">
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-text-base-secondary mb-2">Impact</div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-md text-[16px] font-semibold ${getImpactBadge(risk.impact_level)}`}>
                    ● {risk.impact_level}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-text-base-secondary mb-2">Likelihood</div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-md text-[16px] font-semibold ${getLikelihoodBadge(risk.likelihood_level)}`}>
                    {risk.likelihood_level}
                  </span>
                </div>
              </div>
            </div>

            {/* Quantitative Metrics */}
            {risk.expected_annual_loss && (
              <div className="bg-white rounded-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] p-[20px]">
                <h3 className="text-[20px] font-[600] text-text-base-primary mb-5">Quantitative Metrics</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-fill-base-secondary rounded-[10px] p-4">
                    <div className="text-[14px] font-[600] text-text-base-secondary mb-1">Annual Events Likelihood</div>
                    <div className="text-xs text-text-base-tertiary mb-3 leading-relaxed">The estimated likelihood as a percentage that this scenario will occur within the next 12 months.</div>
                    <div className="text-[26px] font-[700] text-text-base-primary">
                      15 <span className="text-[16px] font-[400] text-text-base-secondary">%</span>
                    </div>
                  </div>
                  <div className="bg-fill-base-secondary rounded-[10px] p-4">
                    <div className="text-[14px] font-[600] text-text-base-secondary mb-1">Average Financial Loss</div>
                    <div className="text-xs text-text-base-tertiary mb-3 leading-relaxed">The estimated average financial impact per occurrence, including direct and indirect costs.</div>
                    <div className="text-[26px] font-[700] text-text-base-primary">
                      {(risk.expected_annual_loss / 1000000).toFixed(2)}M <span className="text-[16px] font-[400] text-text-base-secondary">USD</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Exposure - moved before Impact Details to match HTML */}
            {risk.records_at_risk > 0 && (
              <div className="bg-white rounded-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] p-[20px]">
                <h3 className="text-[16px] font-[600] text-text-base-primary mb-4">Data Exposure</h3>
                <div className="grid grid-cols-3 gap-5">
                  <div className="bg-fill-base-secondary rounded-[10px] p-4">
                    <div className="text-[14px] font-[600] text-text-base-secondary mb-1">PII</div>
                    <div className="text-xs text-text-base-tertiary mb-2">Personally Identifiable Information</div>
                    <div className="text-[26px] font-[700] text-text-base-primary">
                      {risk.records_at_risk.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-fill-base-secondary rounded-[10px] p-4">
                    <div className="text-[14px] font-[600] text-text-base-secondary mb-1">PCI</div>
                    <div className="text-xs text-text-base-tertiary mb-2">Payment Card Information</div>
                    <div className="text-[26px] font-[700] text-text-base-primary">0</div>
                  </div>
                  <div className="bg-fill-base-secondary rounded-[10px] p-4">
                    <div className="text-[14px] font-[600] text-text-base-secondary mb-1">PHI</div>
                    <div className="text-xs text-text-base-tertiary mb-2">Protected Health Information</div>
                    <div className="text-[26px] font-[700] text-text-base-primary">0</div>
                  </div>
                </div>
              </div>
            )}

            {/* Impact Details - hidden for now to match HTML more closely */}
            <div className="bg-white rounded-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] p-6 hidden">
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


            {/* MITRE ATLAS Mapping - hidden for now */}
            {risk.mitre_tactics.length > 0 && (
              <div className="bg-white rounded-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] p-6 hidden">
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

          {/* Right Column - Sticky Sidebar */}
          <div className="sticky top-[24px] self-start">
            <div className="bg-white rounded-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] flex flex-col h-full">
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
            <div className="flex-1 overflow-auto p-4 space-y-4">
            {/* Risk Management Tab */}
            {activeTab === 'risk' && (
              <div className="space-y-4">
                {/* Risk Priority */}
                <div>
                  <div className="text-xs font-semibold text-text-base-secondary mb-1">Risk Priority</div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold border border-stroke-base-secondary ${getPriorityColor(risk.priority)}`}>
                    {risk.priority}
                  </div>
                </div>

                {/* Affected Assets */}
                <div>
                  <div className="text-xs font-semibold text-text-base-secondary mb-2">
                    Affected Assets ({linkedAssets.length})
                  </div>
                  {linkedAssets.length > 0 ? (
                    <div className="space-y-2">
                      {linkedAssets.map(asset => asset && (
                        <div
                          key={asset.id}
                          className="p-3 bg-fill-base-secondary rounded-md border border-stroke-base-secondary cursor-pointer hover:bg-fill-base-tertiary transition-colors"
                          onClick={() => navigate(`/assets/${asset.id}`)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-text-base-primary">{asset.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              asset.risk_tier === 'critical' ? 'bg-red-100 text-red-700' :
                              asset.risk_tier === 'high' ? 'bg-orange-100 text-orange-700' :
                              asset.risk_tier === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              Risk: {asset.risk_score}
                            </span>
                          </div>
                          <div className="text-xs text-text-base-secondary">
                            {asset.vendor_name} • {asset.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-text-base-tertiary italic">No assets linked to this risk</div>
                  )}
                </div>

                {/* Initial Access Tactics (MITRE ATLAS) */}
                {risk.mitre_tactics.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-text-base-secondary mb-1">Initial Access Tactics (MITRE ATLAS)</div>
                    <div className="flex flex-wrap gap-2">
                      {risk.mitre_tactics.map(tactic => (
                        <span
                          key={tactic}
                          className="px-3 py-1 bg-fill-base-secondary text-text-base-primary text-xs font-medium rounded-md border border-stroke-base-secondary"
                        >
                          {tactic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cyber Event Type */}
                {risk.cyber_event_types.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-text-base-secondary mb-1">Cyber Event Type</div>
                    <div className="flex flex-wrap gap-2">
                      {risk.cyber_event_types.map(type => (
                        <span
                          key={type}
                          className="px-3 py-1 bg-fill-base-secondary text-text-base-primary text-xs font-medium rounded-md border border-stroke-base-secondary"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Impact Type */}
                {risk.impact_types.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-text-base-secondary mb-1">Impact Type</div>
                    <div className="flex flex-wrap gap-2">
                      {risk.impact_types.map(type => (
                        <span
                          key={type}
                          className="px-3 py-1 bg-fill-base-secondary text-text-base-primary text-xs font-medium rounded-md border border-stroke-base-secondary"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risk Subcategory */}
                {risk.risk_subcategories.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-text-base-secondary mb-1">Risk Subcategory</div>
                    <div className="flex flex-wrap gap-2">
                      {risk.risk_subcategories.map(sub => (
                        <span
                          key={sub}
                          className="px-3 py-1 bg-fill-base-secondary text-text-base-primary text-xs font-medium rounded-md border border-stroke-base-secondary"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risk Owner */}
                <div>
                  <div className="text-xs font-semibold text-text-base-secondary mb-1">Risk Owner</div>
                  {owner ? (
                    <UserAvatar name={owner.name} email={owner.email} size="sm" />
                  ) : (
                    <div className="text-xs text-text-base-tertiary">Unassigned</div>
                  )}
                </div>

                {/* Status */}
                <div>
                  <div className="text-xs font-semibold text-text-base-secondary mb-1">Status</div>
                  <div className="text-sm font-semibold text-text-base-primary">{risk.status}</div>
                </div>

                {/* Response Plan */}
                <div>
                  <div className="text-xs font-semibold text-text-base-secondary mb-1">Response Plan</div>
                  <div className="text-sm font-semibold text-text-base-primary">{risk.response_plan}</div>
                </div>

                {/* Ticket */}
                <div>
                  <div className="text-xs font-semibold text-text-base-secondary mb-1">Ticket</div>
                  <div className="text-xs text-text-base-secondary break-all">
                    {risk.ticket_url ?? 'Not linked'}
                  </div>
                </div>

                {/* Review Date */}
                {risk.review_date && (
                  <div>
                    <div className="text-xs font-semibold text-text-base-secondary mb-1">Review Date</div>
                    <div className="text-xs text-text-base-secondary">
                      {new Date(risk.review_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                )}

                {/* Mitigation Cost */}
                {(typeof risk.mitigation_cost === 'number' && risk.mitigation_currency) && (
                  <div>
                    <div className="text-xs font-semibold text-text-base-secondary mb-1">Mitigation Cost</div>
                    <div className="text-xs text-text-base-secondary">
                      {risk.mitigation_currency} {risk.mitigation_cost.toLocaleString()}
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="pt-4 border-t border-stroke-base-secondary space-y-2">
                  <div>
                    <div className="text-xs font-semibold text-text-base-secondary mb-1">Creation Date</div>
                    <div className="text-xs text-text-base-secondary">
                      {new Date(risk.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-text-base-secondary mb-1">Last Edited On</div>
                    <div className="text-xs text-text-base-secondary">
                      {new Date(risk.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-text-base-secondary mb-1">Last Assessed</div>
                    <div className="text-xs text-text-base-secondary">
                      {new Date(risk.last_assessed_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Relevant Controls Tab */}
            {activeTab === 'controls' && (
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
                      day: 'numeric',
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

            {/* Notes Tab */}
            {activeTab === 'notes' && (
              <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] p-4 space-y-4">
                <h3 className="text-sm font-semibold text-text-base-primary">Notes</h3>
                <textarea
                  className="w-full min-h-[80px] px-3 py-2 border border-stroke-base-secondary rounded-md text-sm text-text-base-primary bg-fill-base-primary focus:outline-none focus:border-fill-brand-primary focus:ring-2 focus:ring-fill-brand-primary/10"
                  placeholder="Add a note..."
                />
                <div className="flex justify-end">
                  <button className="px-4 py-2 rounded-md bg-fill-brand-primary text-text-base-invert text-sm font-semibold shadow-sm">
                    Save
                  </button>
                </div>
                <div className="text-center text-xs text-text-base-tertiary pt-2">
                  No notes yet. Add the first note above.
                </div>
              </div>
            )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
