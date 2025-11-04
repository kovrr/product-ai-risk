import { useEffect, useState } from 'react';
import { Shield, CheckCircle, AlertCircle, XCircle, Plus, ArrowRight } from 'lucide-react';

const AIAssurancePlan = () => {
  const [assessments, setAssessments] = useState([]);
  const [actionPlans, setActionPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // TODO: Implement API calls when backend is ready
      // const assessmentsData = await riskService.getControlAssessments();
      // const actionPlansData = await riskService.getActionPlans();
      
      // Mock data for now
      setAssessments([]);
      setActionPlans([]);
    } catch (error) {
      console.error('Failed to load AI Assurance Plan data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading AI Assurance Plan...</p>
        </div>
      </div>
    );
  }

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
              <p className="text-2xl font-bold text-neutral-800 mt-1">0</p>
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
              <p className="text-2xl font-bold text-success mt-1">0</p>
            </div>
            <CheckCircle className="text-success" size={32} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Partial</p>
              <p className="text-2xl font-bold text-warning mt-1">0</p>
            </div>
            <AlertCircle className="text-warning" size={32} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Missing</p>
              <p className="text-2xl font-bold text-error mt-1">0</p>
            </div>
            <XCircle className="text-error" size={32} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
            <select 
              className="input"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Implemented">Implemented</option>
              <option value="Partial">Partial</option>
              <option value="Missing">Missing</option>
              <option value="Not Applicable">Not Applicable</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Priority</label>
            <select 
              className="input"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Control Assessments */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-neutral-800">Control Assessments</h2>
          <span className="text-sm text-neutral-600">0 controls assessed</span>
        </div>

        <div className="space-y-4">
          {/* Sample Control Assessment */}
          <div className="border border-neutral-200 rounded-lg p-4 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                {getStatusIcon('Partial')}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-neutral-800">NIST.AI.1.1 - AI Governance Structure</h3>
                    <span className="badge badge-warning">Partial</span>
                    <span className="badge badge-error">High Priority</span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-2">
                    Establish and document organizational AI governance structure with clear roles and responsibilities
                  </p>
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span>Framework: NIST AI RMF</span>
                    <span>•</span>
                    <span>Assessed: Oct 15, 2024</span>
                    <span>•</span>
                    <span>Target: Dec 31, 2024</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-warning/5 border border-warning/20 rounded p-3 mb-3">
              <p className="text-sm text-neutral-700">
                <span className="font-medium">Gap:</span> Governance structure exists but lacks formal documentation and clear escalation paths for AI-related decisions.
              </p>
            </div>

            {/* Action Plans */}
            <div className="border-t border-neutral-200 pt-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-neutral-700">Action Plans (2)</h4>
                <button className="text-sm text-primary hover:text-primary/80 font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-neutral-50 rounded">
                  <span className="badge badge-warning text-xs">In Progress</span>
                  <span className="text-sm text-neutral-700 flex-1">Document AI governance framework and roles</span>
                  <span className="text-xs text-neutral-500">Due: Nov 30</span>
                  <ArrowRight size={16} className="text-neutral-400" />
                </div>
                <div className="flex items-center gap-3 p-2 bg-neutral-50 rounded">
                  <span className="badge badge-error text-xs">Not Started</span>
                  <span className="text-sm text-neutral-700 flex-1">Create escalation procedures for AI incidents</span>
                  <span className="text-xs text-neutral-500">Due: Dec 15</span>
                  <ArrowRight size={16} className="text-neutral-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-lg">
            <Shield className="mx-auto text-neutral-400" size={48} />
            <p className="text-neutral-600 mt-4">No control assessments found</p>
            <p className="text-sm text-neutral-500 mt-2">Start assessing controls to identify gaps and generate action plans</p>
            <button className="btn btn-outline mt-4">
              <Plus size={18} />
              Start Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Action Plan Summary */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-neutral-800">Prioritized Action Plan</h2>
          <button className="btn btn-outline">
            Export Plan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Priority</th>
                <th>Action</th>
                <th>Control</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Due Date</th>
                <th>Effort</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" className="text-center py-8 text-neutral-500">
                  No action plans generated yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Gap Report Summary */}
      <div className="card bg-gradient-to-br from-neutral-50 to-white">
        <h2 className="text-xl font-bold text-neutral-800 mb-4">Gap Report Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-neutral-200">
            <p className="text-3xl font-bold text-error">0</p>
            <p className="text-sm text-neutral-600 mt-1">Critical Gaps</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-neutral-200">
            <p className="text-3xl font-bold text-warning">0</p>
            <p className="text-sm text-neutral-600 mt-1">High Priority Gaps</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-neutral-200">
            <p className="text-3xl font-bold text-info">0</p>
            <p className="text-sm text-neutral-600 mt-1">Medium Priority Gaps</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssurancePlan;
