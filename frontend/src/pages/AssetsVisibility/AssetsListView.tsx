import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  DataTable,
  StatusBadge,
  RiskScoreBadge,
  RiskProgressBar,
  UserAvatar,
  EmptyState,
  Column,
} from '../../components/molecules';
import { mockAssets, getUserById, AIAsset } from '../../data';

export const AssetsListView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [vendorSourceFilter, setVendorSourceFilter] = useState<string>('all');
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);

  // Handle URL parameters for filtering (e.g., ?risk_tier=critical)
  useEffect(() => {
    const riskTierParam = searchParams.get('risk_tier');
    if (riskTierParam) {
      setRiskFilter(riskTierParam);
    }
  }, [searchParams]);

  // Filter and search assets
  const filteredAssets = useMemo(() => {
    return mockAssets.filter((asset) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.vendor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.use_case.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;

      // Risk filter
      const matchesRisk = riskFilter === 'all' || asset.risk_tier === riskFilter;

      // Vendor source filter (3rd party)
      const matchesVendorSource = vendorSourceFilter === 'all' || asset.vendor_source === vendorSourceFilter;

      return matchesSearch && matchesStatus && matchesRisk && matchesVendorSource;
    });
  }, [searchQuery, statusFilter, riskFilter]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: mockAssets.length,
      sanctioned: mockAssets.filter((a) => a.status === 'sanctioned').length,
      shadow: mockAssets.filter((a) => a.status === 'shadow').length,
      underReview: mockAssets.filter((a) => a.status === 'under_review').length,
      blocked: mockAssets.filter((a) => a.status === 'blocked').length,
      thirdParty: mockAssets.filter((a) => a.vendor_source === 'third_party').length,
    };
  }, []);

  // Table columns
  const columns: Column<AIAsset>[] = [
    {
      key: 'name',
      label: 'Asset Name',
      sortable: true,
      width: '260px',
      render: (_, asset) => (
        <div className="flex items-center gap-[8px]">
          <div className="flex flex-col">
            <div className="flex items-center gap-[6px]">
              <span className="text-[14px] font-[600] text-text-base-primary">
                {asset.name}
              </span>
              {asset.vendor_source === 'third_party' && (
                <span className="inline-flex items-center gap-[4px] px-[8px] py-[3px] bg-fill-brand-primary text-text-base-invert text-[11px] font-[700] rounded-[6px] uppercase shadow-sm whitespace-nowrap">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  3RD PARTY
                </span>
              )}
            </div>
            <span className="text-[12px] text-text-base-tertiary">
              {asset.asset_type}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'vendor_name',
      label: 'Vendor',
      sortable: true,
      width: '120px',
      render: (value) => (
        <span className="text-[14px] text-text-base-primary">{value}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (_, asset) => <StatusBadge status={asset.status} size="sm" />,
    },
    {
      key: 'owner_id',
      label: 'Owner',
      width: '100px',
      render: (_, asset) => {
        const owner = getUserById(asset.owner_id);
        return owner ? (
          <UserAvatar name={owner.name} size="sm" showName />
        ) : (
          <span className="text-text-base-tertiary">-</span>
        );
      },
    },
    {
      key: 'technical_owner_id',
      label: 'Technical Owner',
      width: '100px',
      render: (_, asset) => {
        const owner = getUserById(asset.technical_owner_id);
        return owner ? (
          <UserAvatar name={owner.name} size="sm" showName />
        ) : (
          <span className="text-text-base-tertiary">-</span>
        );
      },
    },
    {
      key: 'risk_tier',
      label: 'Risk Tier',
      sortable: true,
      render: (_, asset) => {
        return asset.risk_tier ? (
          <RiskScoreBadge tier={asset.risk_tier} size="sm" />
        ) : (
          <span className="text-text-base-tertiary text-[12px]">-</span>
        );
      },
    },
    {
      key: 'regulatory_applicability',
      label: 'Regulatory',
      render: (value: string[]) => (
        <div className="flex gap-[4px] flex-wrap">
          {value && value.length > 0 ? (
            value.map((reg) => (
              <span
                key={reg}
                className="px-[6px] py-[2px] bg-fill-info/10 text-fill-info text-[11px] font-[600] rounded-[4px] uppercase"
              >
                {reg}
              </span>
            ))
          ) : (
            <span className="text-text-base-tertiary text-[12px]">-</span>
          )}
        </div>
      ),
    },
    {
      key: 'lifecycle_stage',
      label: 'Lifecycle',
      sortable: true,
      render: (value) => (
        <span className="text-[12px] text-text-base-secondary capitalize">
          {value}
        </span>
      ),
    },
    {
      key: 'personal_data_used',
      label: 'Personal Data',
      render: (value: boolean) => (
        <div className="flex items-center justify-center">
          {value ? (
            <span className="text-fill-warning text-[16px]">✓</span>
          ) : (
            <span className="text-text-base-tertiary text-[16px]">-</span>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '80px',
      render: (_, asset) => (
        <button
          onClick={() => navigate(`/assets/${asset.id}`)}
          className="text-[12px] text-[rgb(85,81,247)] hover:underline font-[600]"
        >
          View
        </button>
      ),
    },
  ];

  const handleRowClick = (asset: AIAsset) => {
    navigate(`/assets/${asset.id}`);
  };

  return (
    <div className="h-full overflow-y-auto bg-[rgb(245,247,255)] p-[30px]">
      <div className="max-w-[1440px] mx-auto space-y-[24px]">
        {/* Page Header Card */}
        <div className="bg-white rounded-[15px] p-[24px_30px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
          <div className="flex items-center justify-between mb-[20px]">
            <div>
              <h1 className="text-[38px] font-[700] text-[rgb(26,32,44)] mb-[4px]">
                AI Asset Visibility
              </h1>
              <p className="text-[14px] text-[rgb(74,85,104)]">
                Monitor and manage all AI assets across your organization
              </p>
            </div>
            <button 
              onClick={() => setShowDiscoveryModal(true)}
              className="inline-flex items-center gap-[8px] px-[20px] py-[10px] bg-[rgb(85,81,247)] text-white text-[14px] font-[600] rounded-[6px] border-none shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] cursor-pointer transition-all duration-200 hover:bg-[rgb(97,94,251)] hover:-translate-y-[1px]"
            >
              + Discover Assets
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-6 gap-[16px]">
          <div className="bg-[rgb(245,247,255)] rounded-[12px] p-[20px]">
            <div className="text-[26px] font-[700] text-[rgb(26,32,44)] mb-[4px]">
              {stats.total}
            </div>
            <div className="text-[12px] text-[rgb(74,85,104)] font-[400]">Total Assets</div>
          </div>
          <div className="bg-[rgb(245,247,255)] rounded-[12px] p-[20px]">
            <div className="text-[26px] font-[700] text-[rgb(13,199,131)] mb-[4px]">
              {stats.sanctioned}
            </div>
            <div className="text-[12px] text-[rgb(74,85,104)] font-[400]">Sanctioned</div>
          </div>
          <div className="bg-[rgb(245,247,255)] rounded-[12px] p-[20px]">
            <div className="text-[26px] font-[700] text-[rgb(255,35,35)] mb-[4px]">
              {stats.shadow}
            </div>
            <div className="text-[12px] text-[rgb(74,85,104)] font-[400]">Shadow AI</div>
          </div>
          <div className="bg-[rgb(245,247,255)] rounded-[12px] p-[20px]">
            <div className="text-[26px] font-[700] text-[rgb(255,193,7)] mb-[4px]">
              {stats.underReview}
            </div>
            <div className="text-[12px] text-[rgb(74,85,104)] font-[400]">Pending Review</div>
          </div>
          <div className="bg-[rgb(245,247,255)] rounded-[12px] p-[20px]">
            <div className="text-[26px] font-[700] text-[rgb(139,0,0)] mb-[4px]">
              {stats.blocked}
            </div>
            <div className="text-[12px] text-[rgb(74,85,104)] font-[400]">Blocked</div>
          </div>
          <div className="bg-[rgb(245,247,255)] rounded-[12px] p-[20px]">
            <div className="text-[26px] font-[700] text-[rgb(85,81,247)] mb-[4px]">
              {stats.thirdParty}
            </div>
            <div className="text-[12px] text-[rgb(74,85,104)] font-[400]">3rd Party</div>
          </div>
        </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-[15px] p-[20px_30px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
        <div className="flex items-center gap-[16px]">
          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets by name, vendor, or use case..."
            className="flex-1 px-[16px] py-[10px] border border-[rgb(169,180,188)] rounded-[6px] text-[14px] text-[rgb(48,48,69)] transition-all duration-200 focus:outline-none focus:border-[rgb(85,81,247)] focus:shadow-[0_0_0_3px_rgba(85,81,247,0.12)]"
          />

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-[16px] py-[10px] bg-white border border-[rgb(169,180,188)] rounded-[6px] text-[14px] text-[rgb(48,48,69)] cursor-pointer transition-all duration-200 focus:outline-none focus:border-[rgb(85,81,247)] focus:shadow-[0_0_0_3px_rgba(85,81,247,0.12)]"
          >
            <option value="all">All Status</option>
            <option value="sanctioned">Sanctioned</option>
            <option value="shadow">Shadow AI</option>
            <option value="under_review">Under Review</option>
            <option value="blocked">Blocked</option>
          </select>

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-[16px] py-[10px] bg-white border border-[rgb(169,180,188)] rounded-[6px] text-[14px] text-[rgb(48,48,69)] cursor-pointer transition-all duration-200 focus:outline-none focus:border-[rgb(85,81,247)] focus:shadow-[0_0_0_3px_rgba(85,81,247,0.12)]"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Vendor Source Filter (3rd Party) */}
          <select
            value={vendorSourceFilter}
            onChange={(e) => setVendorSourceFilter(e.target.value)}
            className="px-[16px] py-[10px] bg-white border border-[rgb(169,180,188)] rounded-[6px] text-[14px] text-[rgb(48,48,69)] cursor-pointer transition-all duration-200 focus:outline-none focus:border-[rgb(85,81,247)] focus:shadow-[0_0_0_3px_rgba(85,81,247,0.12)]"
          >
            <option value="all">All Sources</option>
            <option value="third_party">3rd Party</option>
            <option value="internal">Internal</option>
            <option value="open_source">Open Source</option>
          </select>
        </div>
        </div>

        {/* Assets Table Card */}
        <div className="bg-white rounded-[15px] p-[24px_30px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
          <div className="flex justify-between items-center mb-[20px]">
            <h2 className="text-[20px] font-[600] text-[rgb(26,32,44)]">Assets Inventory</h2>
            <div className="text-[12px] text-[rgb(74,85,104)]">
              Showing {filteredAssets.length} of {stats.total} assets
            </div>
          </div>

          <div className="overflow-x-auto">
        {filteredAssets.length === 0 ? (
          <EmptyState
            title="No assets found"
            description="Try adjusting your filters or search query"
            action={{
              label: 'Clear Filters',
              onClick: () => {
                setSearchQuery('');
                setStatusFilter('all');
                setRiskFilter('all');
              },
            }}
          />
        ) : (
          <DataTable
            data={filteredAssets}
            columns={columns}
            onRowClick={handleRowClick}
          />
        )}
        </div>
        </div>
      </div>

      {/* Asset Discovery Modal - Two Paths */}
      {showDiscoveryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[15px] p-8 max-w-4xl w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Discover AI Assets</h2>
            <p className="text-neutral-600 mb-8">Choose how you'd like to discover and add AI assets to your inventory</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Manual Asset Addition */}
              <div 
                className="border-2 border-neutral-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => {
                  setShowDiscoveryModal(false);
                  navigate('/assets/new');
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  📝
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Manual Asset Addition</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Fill out a questionnaire to manually add AI assets. Similar to Dave's assessment process.
                </p>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Guided questionnaire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Detailed asset profiling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Best for new or undocumented assets</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="btn btn-primary w-full">
                    Start Manual Asset Addition →
                  </button>
                </div>
              </div>

              {/* Automated Discovery */}
              <div 
                className="border-2 border-neutral-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => {
                  setShowDiscoveryModal(false);
                  navigate('/integration-hub');
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  🔌
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Automated Discovery</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Connect integrations to automatically discover assets from your existing tools and platforms.
                </p>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Real-time synchronization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Automatic updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Connect GitHub, Jira, Slack, and more</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="btn btn-secondary w-full">
                    View Integrations →
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                className="btn btn-outline"
                onClick={() => setShowDiscoveryModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
