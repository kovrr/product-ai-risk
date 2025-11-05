import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, AlertCircle, XCircle, Plus, ArrowRight } from 'lucide-react';
import { mockControls, getControlAssets, getAssetById } from '../data';
import { Badge } from '../components/atoms/Badge';

const AIAssurancePlan = () => {
  const navigate = useNavigate();

  // Calculate applicable assets and risk scores for each control
  const controlsWithAssets = useMemo(() => {
    return mockControls.map(control => {
      const assetIds = getControlAssets(control.id);
      const assets = assetIds.map(id => getAssetById(id)).filter(Boolean);
      
      // Calculate risk score based on maturity gap and asset count
      const maturityGap = control.target_maturity && control.current_maturity 
        ? control.target_maturity - control.current_maturity 
        : 0;
      const riskScore = Math.min(100, (maturityGap * 20) + (assets.length * 5));
      
      return {
        ...control,
        applicableAssets: assets,
        assetCount: assets.length,
        riskScore,
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

  const getRiskScoreBadge = (score) => {
    if (score >= 75) return 'badge-error';
    if (score >= 50) return 'badge-warning';
    if (score >= 25) return 'badge-info';
    return 'badge-success';
  };

  const getRiskScoreLabel = (score) => {
    if (score >= 75) return 'Critical';
    if (score >= 50) return 'High';
    if (score >= 25) return 'Medium';
    return 'Low';
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">AI Assurance Plan</h1>
          <p className="text-neutral-600 mt-1">Control-by-control evaluation and action plan generation</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Assessment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Controls</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="text-primary" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Implemented</p>
              <p className="text-2xl font-bold text-success mt-1">{stats.implemented}</p>
            </div>
            <CheckCircle className="text-success" size={32} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">In Progress</p>
              <p className="text-2xl font-bold text-warning mt-1">{stats.inProgress}</p>
            </div>
            <AlertCircle className="text-warning" size={32} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Planned</p>
              <p className="text-2xl font-bold text-info mt-1">{stats.planned}</p>
            </div>
            <XCircle className="text-info" size={32} />
          </div>
        </div>
      </div>

      {/* Controls Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-neutral-800">Controls & Applicable Assets</h2>
          <span className="text-sm text-neutral-600">{stats.total} controls</span>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Control ID</th>
                <th>Control Name</th>
                <th>Category</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Maturity Gap</th>
                <th>Applicable Assets</th>
              </tr>
            </thead>
            <tbody>
              {controlsWithAssets.map((control) => (
                <tr 
                  key={control.id}
                  className="hover:bg-neutral-50"
                >
                  <td className="font-medium">{control.control_id}</td>
                  <td>
                    <div>
                      <div className="font-medium text-neutral-800">{control.name}</div>
                      <div className="text-xs text-neutral-500">{control.framework}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info text-xs">{control.category}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className={`badge ${getRiskScoreBadge(control.riskScore)} text-xs font-semibold`}>
                        {control.riskScore}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {getRiskScoreLabel(control.riskScore)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(control.status)} text-xs`}>
                      {control.status}
                    </span>
                  </td>
                  <td>
                    {control.current_maturity && control.target_maturity ? (
                      <div className="text-sm">
                        <span className="text-neutral-600">{control.current_maturity}</span>
                        <span className="text-neutral-400 mx-1">→</span>
                        <span className="text-neutral-800 font-medium">{control.target_maturity}</span>
                      </div>
                    ) : (
                      <span className="text-neutral-400 text-sm">-</span>
                    )}
                  </td>
                  <td>
                    {control.assetCount > 0 ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {control.assetCount} {control.assetCount === 1 ? 'asset' : 'assets'}
                        </Badge>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/assets?control=${control.id}`);
                          }}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View →
                        </button>
                      </div>
                    ) : (
                      <span className="text-neutral-400 text-sm">No assets</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AIAssurancePlan;
