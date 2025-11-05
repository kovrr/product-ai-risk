import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/newComponents/atoms/button';
import { Input } from '@/newComponents/atoms/input';
import { DataTable } from '../../components/molecules';
import {
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

      return matchesSearch && matchesStatus && matchesRisk;
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
        <div className="flex items-center gap-xs">
          <div className="flex flex-col">
            <span className="text-[14px] font-[600] text-text-base-primary">
              {asset.name}
            </span>
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
        <div className="flex gap-xs flex-wrap">
          {value && value.length > 0 ? (
            value.map((reg) => (
              <span
                key={reg}
                className="px-[6px] py-[2px] bg-fill-info/10 text-fill-info text-[11px] font-[600] rounded-[10px] uppercase"
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
    <div className="min-h-screen flex flex-col bg-fill-base-1">
      {/* Header */}
      <div className="bg-background border-b border-stroke-base-secondary px-md py-md">
        <div className="flex items-center justify-between mb-sm">
          <div className="space-y-xs">
            <h1 className="text-[32px] font-[700] text-text-base-primary">
              AI Assets Visibility
            </h1>
            <p className="text-[14px] text-text-base-secondary">
              Manage and monitor all AI assets across your organization
            </p>
          </div>
          <Button variant="primary" onClick={() => navigate('/assets/new')} className="rounded-[15px] px-md">
            + Add Asset
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-5 gap-sm">
          <div className="bg-card rounded-[15px] p-md border-0 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-default">
            <div className="text-[32px] font-[700] text-text-base-primary leading-none mb-xs">
              {stats.total}
            </div>
            <div className="text-[12px] text-text-base-secondary font-[600] uppercase tracking-wide">Total Assets</div>
          </div>
          <div className="bg-card rounded-[15px] p-md border-0 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-default">
            <div className="text-[32px] font-[700] text-fill-information-success leading-none mb-xs">
              {stats.sanctioned}
            </div>
            <div className="text-[12px] text-text-base-secondary font-[600] uppercase tracking-wide">Sanctioned</div>
          </div>
          <div className="bg-card rounded-[15px] p-md border-0 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-default">
            <div className="text-[32px] font-[700] text-fill-information-error leading-none mb-xs">
              {stats.shadow}
            </div>
            <div className="text-[12px] text-text-base-secondary font-[600] uppercase tracking-wide">Shadow AI</div>
          </div>
          <div className="bg-card rounded-[15px] p-md border-0 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-default">
            <div className="text-[32px] font-[700] text-fill-information-warning leading-none mb-xs">
              {stats.underReview}
            </div>
            <div className="text-[12px] text-text-base-secondary font-[600] uppercase tracking-wide">Under Review</div>
          </div>
          <div className="bg-card rounded-[15px] p-md border-0 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-default">
            <div className="text-[32px] font-[700] text-fill-information-error leading-none mb-xs">
              {stats.highRisk}
            </div>
            <div className="text-[12px] text-text-base-secondary font-[600] uppercase tracking-wide">High Risk</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-background border-b border-stroke-base-secondary px-md py-sm">
        <div className="flex items-center gap-sm">
          {/* Search */}
          <div className="flex-1">
            <Input
              value={searchQuery}
              onChange={(e: any) => setSearchQuery(e.target.value)}
              placeholder="Search assets by name, vendor, or use case..."
              className="rounded-[15px] border-stroke-base-secondary focus:border-fill-brand-primary"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-sm py-xs bg-card border border-stroke-base-secondary rounded-[15px] text-[14px] text-text-base-primary font-[600] hover:border-fill-brand-primary focus:border-fill-brand-primary focus:ring-2 focus:ring-fill-brand-primary/20 transition-all outline-none"
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
            className="px-sm py-xs bg-card border border-stroke-base-secondary rounded-[15px] text-[14px] text-text-base-primary font-[600] hover:border-fill-brand-primary focus:border-fill-brand-primary focus:ring-2 focus:ring-fill-brand-primary/20 transition-all outline-none"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Clear Filters */}
          {(searchQuery || statusFilter !== 'all' || riskFilter !== 'all') && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setRiskFilter('all');
              }}
              className="text-[12px] hover:bg-fill-base-1 rounded-[15px]"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Active Filters Count */}
        <div className="mt-xs text-[12px] text-text-base-secondary font-[600]">
          Showing <span className="text-fill-brand-primary">{filteredAssets.length}</span> of {stats.total} assets
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-md py-sm">
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
  );
};
