import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Plus } from 'lucide-react';
import { mockRisks, getRiskAssets, getAssetById } from '../data';
import { Badge } from '../components/atoms/Badge';

const RiskRegister = () => {
  const navigate = useNavigate();

  // Calculate affected assets for each risk
  const risksWithAssets = useMemo(() => {
    return mockRisks.map(risk => {
      const assetIds = getRiskAssets(risk.id);
      const assets = assetIds.map(id => getAssetById(id)).filter(Boolean);
      return {
        ...risk,
        affectedAssets: assets,
        assetCount: assets.length,
      };
    });
  }, []);

  const getPriorityBadge = (priority) => {
    const badges = {
      Critical: 'badge-error',
      High: 'badge-warning',
      Medium: 'badge-info',
      Low: 'badge-success',
    };
    return badges[priority] || 'badge-info';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Risk Register</h1>
          <p className="text-neutral-600 mt-1">AI risk scenarios and mitigation strategies</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add Risk Scenario
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Risk Name</th>
                <th>Priority</th>
                <th>Likelihood</th>
                <th>Impact</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Affected Assets</th>
              </tr>
            </thead>
            <tbody>
              {risksWithAssets.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-neutral-500">
                    No risk scenarios found
                  </td>
                </tr>
              ) : (
                risksWithAssets.map((risk) => (
                  <tr 
                    key={risk.id}
                    className="hover:bg-neutral-50"
                  >
                    <td className="font-medium">{risk.name}</td>
                    <td>
                      <span className={`badge ${getPriorityBadge(risk.priority)}`}>
                        {risk.priority}
                      </span>
                    </td>
                    <td>{risk.likelihood || 'N/A'}</td>
                    <td>{risk.impact || 'N/A'}</td>
                    <td>{risk.status}</td>
                    <td>{risk.owner_name || 'Unassigned'}</td>
                    <td>
                      {risk.assetCount > 0 ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {risk.assetCount} {risk.assetCount === 1 ? 'asset' : 'assets'}
                          </Badge>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/assets?risk=${risk.id}`);
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiskRegister;
