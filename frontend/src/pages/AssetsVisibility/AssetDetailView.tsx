import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  StatusBadge,
  RiskScoreBadge,
  UserAvatar,
} from '../../components/molecules';
import {
  getAssetById,
  getUserById,
  getAssetRisks,
  getRiskById,
  getAssetControls,
  getControlById,
  getControlByControlId,
} from '../../data';
import { getControlsForAsset, getRiskAreasForAsset } from '../../data/asset-control-mappings';
import RiskScoreBreakdown from '../../components/RiskScoreBreakdown';

export const AssetDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const asset = useMemo(() => getAssetById(Number(id)), [id]);
  const owner = useMemo(() => asset ? getUserById(asset.owner_id) : null, [asset]);
  const technicalOwner = useMemo(() => asset ? getUserById(asset.technical_owner_id) : null, [asset]);
  const linkedRisks = useMemo(() => {
    if (!asset) return [];
    return getAssetRisks(asset.id).map(id => getRiskById(id)).filter(Boolean);
  }, [asset]);
  // Get NIST controls for this asset from mappings
  const nistControlIds = useMemo(() => {
    if (!asset) return [];
    return getControlsForAsset(asset.name);
  }, [asset]);

  const linkedControls = useMemo(() => {
    if (!asset || nistControlIds.length === 0) return [];
    // Map control IDs (strings like "GOVERN-1.1") to full control objects
    return nistControlIds.map(controlId => getControlByControlId(controlId)).filter(Boolean);
  }, [asset, nistControlIds]);

  const riskAreas = useMemo(() => {
    if (!asset) return [];
    return getRiskAreasForAsset(asset.name);
  }, [asset]);

  if (!asset) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-text-base-primary mt-4">Asset not found</p>
          <button 
            onClick={() => navigate('/assets')}
            className="mt-4 px-4 py-2 bg-fill-brand-primary text-white rounded"
          >
            Back to Assets
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'risk', label: 'Risk & Compliance' },
    { id: 'controls', label: `Controls (${linkedControls.length})` },
    { id: 'risks', label: `Risks (${linkedRisks.length})` },
  ];

  return (
    <div className="h-full flex flex-col bg-fill-base-primary">
      {/* Header */}
      <div className="border-b border-stroke-base-secondary bg-fill-base-primary px-[32px] py-[24px]">
        <div className="flex items-center gap-[16px] mb-[16px]">
          <button
            onClick={() => navigate('/assets')}
            className="p-[8px] hover:bg-fill-base-secondary rounded-[8px]"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-[12px] mb-[8px]">
              <h1 className="text-[28px] font-[700] text-text-base-primary">{asset.name}</h1>
              <StatusBadge status={asset.status} />
              <RiskScoreBadge tier={asset.risk_tier} />
            </div>
            <p className="text-[14px] text-text-base-secondary">{asset.description}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-stroke-base-secondary px-[32px]">
        <div className="flex gap-[8px]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-[20px] py-[12px] text-[14px] font-[600] border-b-2 -mb-[1px] ${
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

      {/* Content */}
      <div className="flex-1 overflow-auto px-[32px] py-[24px]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 gap-[24px]">
            <div className="bg-fill-base-secondary rounded-[10px] p-[20px]">
              <h3 className="text-[16px] font-[600] mb-[16px]">Core Identity</h3>
              <div className="space-y-[12px]">
                <div>
                  <div className="text-[12px] text-text-base-secondary">Asset Type</div>
                  <div className="text-[14px] capitalize">{asset.asset_type}</div>
                </div>
                <div>
                  <div className="text-[12px] text-text-base-secondary">Use Case</div>
                  <div className="text-[14px]">{asset.use_case}</div>
                </div>
              </div>
            </div>
            <div className="bg-fill-base-secondary rounded-[10px] p-[20px]">
              <h3 className="text-[16px] font-[600] mb-[16px]">Ownership</h3>
              <div className="space-y-[12px]">
                <div>
                  <div className="text-[12px] text-text-base-secondary">Business Owner</div>
                  {owner && <UserAvatar name={owner.name} email={owner.email} showEmail />}
                </div>
                <div>
                  <div className="text-[12px] text-text-base-secondary">Technical Owner</div>
                  {technicalOwner && <UserAvatar name={technicalOwner.name} email={technicalOwner.email} showEmail />}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-[24px]">
            <div className="bg-fill-base-secondary rounded-[10px] p-[20px]">
              <h3 className="text-[16px] font-[600] mb-[16px]">Risk Assessment Summary</h3>
              <div className="grid grid-cols-3 gap-[16px]">
                <div>
                  <div className="text-[12px] text-text-base-secondary">Risk Tier</div>
                  <RiskScoreBadge tier={asset.risk_tier} size="md" />
                </div>
                <div>
                  <div className="text-[12px] text-text-base-secondary">Risk Score</div>
                  <div className="text-[20px] font-[700]">{asset.risk_score.toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-[12px] text-text-base-secondary">Personal Data</div>
                  <div className="text-[14px]">{asset.personal_data_used ? '✓ Yes' : '✗ No'}</div>
                </div>
              </div>
            </div>

            {/* Risk Score Breakdown */}
            <RiskScoreBreakdown asset={asset} />
          </div>
        )}

        {activeTab === 'controls' && (
          <div className="bg-fill-base-secondary rounded-[10px] p-[20px]">
            <div className="flex items-center justify-between mb-[16px]">
              <h3 className="text-[16px] font-[600]">Related Controls (NIST AI RMF)</h3>
              <span className="text-[12px] text-text-base-tertiary">{linkedControls.length} controls</span>
            </div>
            
            {riskAreas.length > 0 && (
              <div className="mb-[16px] p-[12px] bg-fill-base-primary rounded-[8px]">
                <div className="text-[12px] font-[600] text-text-base-secondary mb-[6px]">Risk Areas Covered:</div>
                <div className="flex flex-wrap gap-[6px]">
                  {riskAreas.map((area) => (
                    <span key={area} className="text-[11px] px-[8px] py-[4px] bg-fill-brand-primary text-white rounded-[4px]">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {linkedControls.length > 0 ? (
              <div className="space-y-[12px]">
                {linkedControls.map((control) => control && (
                  <div
                    key={control.id}
                    className="p-[16px] bg-fill-base-primary rounded-[8px] cursor-pointer hover:bg-fill-base-tertiary transition-colors border border-transparent hover:border-fill-brand-primary"
                    onClick={() => navigate(`/ai-assurance-plan`)}
                  >
                    <div className="flex items-start justify-between mb-[8px]">
                      <div className="font-[600] text-[14px]">{control.control_id} - {control.name}</div>
                      <span className="text-[11px] px-[8px] py-[2px] bg-fill-base-secondary text-text-base-secondary rounded-[4px] whitespace-nowrap ml-[8px]">
                        {control.category}
                      </span>
                    </div>
                    <div className="text-[12px] text-text-base-secondary mb-[8px]">{control.description}</div>
                    <div className="flex items-center gap-[12px] text-[11px]">
                      <span className="text-text-base-tertiary">Current: {control.current_maturity || 0}/5</span>
                      <span className="text-text-base-tertiary">•</span>
                      <span className="text-text-base-tertiary">Target: {control.target_maturity || 5}/5</span>
                      {((control.current_maturity || 0) < (control.target_maturity || 5)) && (
                        <>
                          <span className="text-text-base-tertiary">•</span>
                          <span className="text-fill-information-warning font-[600]">Gap: {(control.target_maturity || 5) - (control.current_maturity || 0)}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-[32px] text-text-base-tertiary">
                No related controls found for this asset
              </div>
            )}
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="bg-fill-base-secondary rounded-[10px] p-[20px]">
            <h3 className="text-[16px] font-[600] mb-[16px]">Linked Risks</h3>
            {linkedRisks.length > 0 ? (
              <div className="space-y-[12px]">
                {linkedRisks.map((risk) => risk && (
                  <div
                    key={risk.id}
                    className="p-[16px] bg-fill-base-primary rounded-[8px] cursor-pointer hover:bg-fill-base-tertiary"
                    onClick={() => navigate('/risk-register')}
                  >
                    <div className="font-[600]">{risk.name}</div>
                    <div className="text-[12px] text-text-base-secondary">{risk.description}</div>
                    <div className="text-[11px] text-text-base-tertiary mt-[4px]">
                      {risk.priority} Priority • {risk.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-[32px] text-text-base-tertiary">
                No risks linked
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
