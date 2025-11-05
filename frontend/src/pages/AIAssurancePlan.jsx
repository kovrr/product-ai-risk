import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, AlertCircle, XCircle, Plus, ArrowRight } from 'lucide-react';
import { mockControls, getControlAssets, getAssetById } from '../data';
import { Badge } from '@/newComponents/atoms/badge';
import { Button } from '@/newComponents/atoms/button';
import { Card } from '@/newComponents/atoms/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/newComponents/atoms/table';

const AIAssurancePlan = () => {
  const navigate = useNavigate();

  // Calculate applicable assets for each control
  const controlsWithAssets = useMemo(() => {
    return mockControls.map(control => {
      const assetIds = getControlAssets(control.id);
      const assets = assetIds.map(id => getAssetById(id)).filter(Boolean);
      return {
        ...control,
        applicableAssets: assets,
        assetCount: assets.length,
      };
    });
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    const implemented = controlsWithAssets.filter(c => c.status === 'Implemented').length;
    const inProgress = controlsWithAssets.filter(c => c.status === 'In Progress').length;
    const planned = controlsWithAssets.filter(c => c.status === 'Planned').length;
    
    return {
      total: controlsWithAssets.length,
      implemented,
      inProgress,
      planned,
    };
  }, [controlsWithAssets]);

  const getStatusIcon = (status) => {
    const icons = {
      'Implemented': <CheckCircle className="text-success" size={20} />,
      'Partial': <AlertCircle className="text-warning" size={20} />,
      'Missing': <XCircle className="text-error" size={20} />,
      'Not Applicable': <div className="w-5 h-5 rounded-full bg-neutral-300" />,
    };
    return icons[status] || icons['Missing'];
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Implemented': 'badge-success',
      'Partial': 'badge-warning',
      'Missing': 'badge-error',
      'Not Applicable': 'badge-info',
    };
    return badges[status] || 'badge-info';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      'Critical': 'badge-error',
      'High': 'badge-warning',
      'Medium': 'badge-info',
      'Low': 'badge-success',
    };
    return badges[priority] || 'badge-info';
  };

  const getActionStatusBadge = (status) => {
    const badges = {
      'Not Started': 'badge-error',
      'In Progress': 'badge-warning',
      'Blocked': 'badge-error',
      'Completed': 'badge-success',
    };
    return badges[status] || 'badge-info';
  };

  return (
    <div className="min-h-screen bg-fill-base-1 p-md space-y-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-xs">
          <h1 className="text-[32px] font-[700] text-text-base-primary">AI Assurance Plan</h1>
          <p className="text-[14px] text-text-base-secondary">Control-by-control evaluation and action plan generation</p>
        </div>
        <Button variant="primary" className="rounded-[15px] px-md">
          <Plus size={18} />
          New Assessment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-sm">
        <Card className="border-0 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-default">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-text-base-secondary font-[600] uppercase tracking-wide">Total Controls</p>
              <p className="text-[32px] font-[700] text-text-base-primary leading-none mt-xs">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-fill-brand-primary/10 rounded-[15px] flex items-center justify-center">
              <Shield className="text-fill-brand-primary" size={24} />
            </div>
          </div>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-default">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-text-base-secondary font-[600] uppercase tracking-wide">Implemented</p>
              <p className="text-[32px] font-[700] text-fill-information-success leading-none mt-xs">{stats.implemented}</p>
            </div>
            <CheckCircle className="text-fill-information-success" size={32} />
          </div>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-default">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-text-base-secondary font-[600] uppercase tracking-wide">In Progress</p>
              <p className="text-[32px] font-[700] text-fill-information-warning leading-none mt-xs">{stats.inProgress}</p>
            </div>
            <AlertCircle className="text-fill-information-warning" size={32} />
          </div>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-default">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-text-base-secondary font-[600] uppercase tracking-wide">Planned</p>
              <p className="text-[32px] font-[700] text-fill-info leading-none mt-xs">{stats.planned}</p>
            </div>
            <XCircle className="text-fill-info" size={32} />
          </div>
        </Card>
      </div>

      {/* Controls Table */}
      <Card className="border-0 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-[700] text-text-base-primary">Controls & Applicable Assets</h2>
          <span className="text-sm text-text-base-secondary">{stats.total} controls</span>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Control ID</TableHead>
                <TableHead>Control Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Applicable Assets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {controlsWithAssets.map((control) => (
                <TableRow
                  key={control.id}
                  className="hover:bg-fill-base-1"
                >
                  <TableCell className="font-[600]">{control.control_id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-[600] text-text-base-primary">{control.name}</div>
                      <div className="text-xs text-text-base-tertiary">{control.framework}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{control.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={control.status === 'Implemented' ? 'default' : 'secondary'}>
                      {control.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {control.current_maturity && control.target_maturity ? (
                      <div className="text-sm">
                        <span className="text-text-base-secondary">{control.current_maturity}</span>
                        <span className="text-text-base-tertiary mx-1">→</span>
                        <span className="text-text-base-primary font-[600]">{control.target_maturity}</span>
                      </div>
                    ) : (
                      <span className="text-text-base-tertiary text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {control.assetCount > 0 ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {control.assetCount} {control.assetCount === 1 ? 'asset' : 'assets'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/assets?control=${control.id}`);
                          }}
                          className="text-xs"
                        >
                          View →
                        </Button>
                      </div>
                    ) : (
                      <span className="text-text-base-tertiary text-sm">No assets</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default AIAssurancePlan;
