import { useEffect, useState } from 'react';
import { riskService } from '../services/auth';
import { AlertTriangle, Plus } from 'lucide-react';

const RiskRegister = () => {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      const data = await riskService.getScenarios();
      setScenarios(data.results || data || []);
    } catch (error) {
      console.error('Failed to load scenarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      Critical: 'badge-error',
      High: 'badge-warning',
      Medium: 'badge-info',
      Low: 'badge-success',
    };
    return badges[priority] || 'badge-info';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading risk scenarios...</p>
        </div>
      </div>
    );
  }

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
              </tr>
            </thead>
            <tbody>
              {scenarios.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-neutral-500">
                    No risk scenarios found
                  </td>
                </tr>
              ) : (
                scenarios.map((scenario) => (
                  <tr key={scenario.id}>
                    <td className="font-medium">{scenario.name}</td>
                    <td>
                      <span className={`badge ${getPriorityBadge(scenario.priority)}`}>
                        {scenario.priority}
                      </span>
                    </td>
                    <td>{scenario.likelihood || 'N/A'}</td>
                    <td>{scenario.impact || 'N/A'}</td>
                    <td>{scenario.status}</td>
                    <td>{scenario.owner_name || 'Unassigned'}</td>
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
