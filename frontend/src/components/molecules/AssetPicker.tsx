import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Button, Input, Checkbox } from '../atoms';
import { StatusBadge, RiskScoreBadge } from './';

export interface Asset {
  id: string | number;
  name: string;
  asset_type: string;
  status: 'sanctioned' | 'shadow' | 'under_review' | 'blocked' | 'retired';
  risk_tier: 'low' | 'medium' | 'high' | 'critical';
  vendor_name: string;
}

export interface AssetPickerProps {
  assets: Asset[];
  selectedIds: (string | number)[];
  onSelect: (ids: (string | number)[]) => void;
  onClose: () => void;
  multiple?: boolean;
  title?: string;
  className?: string;
}

export const AssetPicker: React.FC<AssetPickerProps> = ({
  assets,
  selectedIds,
  onSelect,
  onClose,
  multiple = true,
  title = 'Select Assets',
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [localSelected, setLocalSelected] = useState<(string | number)[]>(selectedIds);

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.vendor_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (id: string | number) => {
    if (multiple) {
      setLocalSelected((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setLocalSelected([id]);
    }
  };

  const handleConfirm = () => {
    onSelect(localSelected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={cn(
          'bg-fill-base-primary rounded-[15px] shadow-xl',
          'w-full max-w-[600px] max-h-[80vh] flex flex-col',
          className
        )}
      >
        {/* Header */}
        <div className="p-[24px] border-b border-stroke-base-secondary">
          <div className="flex items-center justify-between mb-[16px]">
            <h2 className="text-[20px] font-[600] text-text-base-primary">{title}</h2>
            <button
              onClick={onClose}
              className="text-text-base-secondary hover:text-text-base-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <Input
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            placeholder="Search assets..."
          />
        </div>

        {/* Asset List */}
        <div className="flex-1 overflow-y-auto p-[16px]">
          {filteredAssets.length === 0 ? (
            <div className="text-center py-[32px] text-text-base-tertiary">
              No assets found
            </div>
          ) : (
            <div className="space-y-[8px]">
              {filteredAssets.map((asset) => {
                const isSelected = localSelected.includes(asset.id);
                return (
                  <div
                    key={asset.id}
                    onClick={() => handleToggle(asset.id)}
                    className={cn(
                      'p-[12px] rounded-[10px] border cursor-pointer transition-all',
                      isSelected
                        ? 'border-fill-brand-primary bg-fill-brand-primary/5'
                        : 'border-stroke-base-secondary hover:border-stroke-base-primary'
                    )}
                  >
                    <div className="flex items-start gap-[12px]">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleToggle(asset.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-[8px] mb-[4px]">
                          <span className="text-[14px] font-[600] text-text-base-primary truncate">
                            {asset.name}
                          </span>
                          <StatusBadge status={asset.status} size="sm" />
                        </div>
                        <div className="flex items-center gap-[8px]">
                          <span className="text-[12px] text-text-base-tertiary">
                            {asset.vendor_name}
                          </span>
                          <span className="text-text-base-tertiary">•</span>
                          <RiskScoreBadge tier={asset.risk_tier} size="sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-[24px] border-t border-stroke-base-secondary flex items-center justify-between">
          <span className="text-[14px] text-text-base-secondary">
            {localSelected.length} selected
          </span>
          <div className="flex gap-[12px]">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
