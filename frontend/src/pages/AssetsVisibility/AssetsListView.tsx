import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button, Input } from '../../components/atoms';
import {
  DataTable,
  StatusBadge,
  RiskScoreBadge,
  RiskScoreProgress,
  UserAvatar,
  EmptyState,
  Column,
} from '../../components/molecules';
import { mockAssets, getUserById, AIAsset } from '../../data';

export const AssetsListView: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [vendorSourceFilter, setVendorSourceFilter] = useState<string>('all');
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);

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
      highRisk: mockAssets.filter((a) => a.risk_tier === 'high' || a.risk_tier === 'critical').length,
      thirdParty: mockAssets.filter((a) => a.vendor_source === 'third_party').length,
    };
  }, []);

  // Table columns
  const columns: Column<AIAsset>[] = [
    {
      key: 'name',
      label: 'Asset Name',
      sortable: true,
      width: '200px',
      render: (_, asset) => (
        <div className="flex items-center gap-[8px]">
          <div className="flex flex-col">
            <div className="flex items-center gap-[6px]">
              <span className="text-[14px] font-[600] text-text-base-primary">
                {asset.name}
              </span>
              {asset.vendor_source === 'third_party' && (
                <span className="inline-flex items-center px-[4px] py-[1px] bg-fill-brand-primary/10 text-fill-brand-primary text-[9px] font-[600] rounded-[3px] uppercase border border-fill-brand-primary/20 whitespace-nowrap">
                  3RD
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
      render: (_, asset) => (
        <RiskScoreBadge tier={asset.risk_tier} size="sm" />
      ),
    },
    {
      key: 'risk_score',
      label: 'Risk Score',
      sortable: true,
      width: '180px',
      render: (_, asset) => (
        <RiskScoreProgress
          score={asset.risk_score}
          tier={asset.risk_tier}
          size="sm"
        />
      ),
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
      render: (_, asset) => (
        <Button
          variant="ghost"
          onClick={() => navigate(`/assets/${asset.id}`)}
          className="text-[12px]"
        >
          View
        </Button>
      ),
    },
  ];

  const handleRowClick = (asset: AIAsset) => {
    navigate(`/assets/${asset.id}`);
  };

  return (
    <div className="h-full flex flex-col bg-fill-base-primary">
      {/* Header */}
      <div className="border-b border-stroke-base-secondary bg-fill-base-primary px-[32px] py-[24px]">
        <div className="flex items-center justify-between mb-[20px]">
          <div>
            <h1 className="text-[28px] font-[700] text-text-base-primary mb-[4px]">
              AI Assets Visibility
            </h1>
            <p className="text-[14px] text-text-base-secondary">
              Manage and monitor all AI assets across your organization
            </p>
          </div>
          <Button variant="primary" onClick={() => setShowDiscoveryModal(true)}>
            + Discover Assets
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-6 gap-[16px]">
          <div className="bg-fill-base-secondary rounded-[10px] p-[16px]">
            <div className="text-[24px] font-[700] text-text-base-primary">
              {stats.total}
            </div>
            <div className="text-[12px] text-text-base-secondary">Total Assets</div>
          </div>
          <div className="bg-fill-base-secondary rounded-[10px] p-[16px]">
            <div className="text-[24px] font-[700] text-fill-success">
              {stats.sanctioned}
            </div>
            <div className="text-[12px] text-text-base-secondary">Sanctioned</div>
          </div>
          <div className="bg-fill-base-secondary rounded-[10px] p-[16px]">
            <div className="text-[24px] font-[700] text-fill-error">
              {stats.shadow}
            </div>
            <div className="text-[12px] text-text-base-secondary">Shadow AI</div>
          </div>
          <div className="bg-fill-base-secondary rounded-[10px] p-[16px]">
            <div className="text-[24px] font-[700] text-fill-warning">
              {stats.underReview}
            </div>
            <div className="text-[12px] text-text-base-secondary">Under Review</div>
          </div>
          <div className="bg-fill-base-secondary rounded-[10px] p-[16px]">
            <div className="text-[24px] font-[700] text-fill-error">
              {stats.highRisk}
            </div>
            <div className="text-[12px] text-text-base-secondary">High Risk</div>
          </div>
          <div className="bg-fill-base-secondary rounded-[10px] p-[16px]">
            <div className="text-[24px] font-[700] text-fill-brand-primary">
              {stats.thirdParty}
            </div>
            <div className="text-[12px] text-text-base-secondary">3rd Party</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="border-b border-stroke-base-secondary bg-fill-base-primary px-[32px] py-[16px]">
        <div className="flex items-center gap-[16px]">
          {/* Search */}
          <div className="flex-1">
            <Input
              value={searchQuery}
              onChange={(e: any) => setSearchQuery(e.target.value)}
              placeholder="Search assets by name, vendor, or use case..."
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-[16px] py-[10px] bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] text-[14px] text-text-base-primary"
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
            className="px-[16px] py-[10px] bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] text-[14px] text-text-base-primary"
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
            className="px-[16px] py-[10px] bg-fill-base-primary border border-stroke-base-secondary rounded-[10px] text-[14px] text-text-base-primary"
          >
            <option value="all">All Sources</option>
            <option value="third_party">🏢 3rd Party Only</option>
            <option value="internal">Internal Only</option>
            <option value="open_source">Open Source Only</option>
          </select>

          {/* Clear Filters */}
          {(searchQuery || statusFilter !== 'all' || riskFilter !== 'all' || vendorSourceFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setRiskFilter('all');
                setVendorSourceFilter('all');
              }}
              className="text-[14px] text-fill-brand-primary hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Active Filters Count */}
        <div className="mt-[12px] text-[12px] text-text-base-secondary">
          Showing {filteredAssets.length} of {stats.total} assets
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-[32px] py-[24px]">
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

      {/* Asset Discovery Modal - Two Paths */}
      {showDiscoveryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[15px] p-8 max-w-4xl w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Discover AI Assets</h2>
            <p className="text-neutral-600 mb-8">Choose how you'd like to discover and add AI assets to your inventory</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Manual Discovery */}
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
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Manual Discovery</h3>
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
                    Start Manual Discovery →
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
