import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, FileCheck, Shield, Search } from 'lucide-react';

const GovernanceMonitoring = () => {
  const [alerts, setAlerts] = useState([]);
  const [violations, setViolations] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('alerts');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // TODO: Implement API calls when backend is ready
      // const alertsData = await monitoringService.getAlerts();
      // const violationsData = await monitoringService.getViolations();
      // const evidenceData = await monitoringService.getEvidence();
      
      // Mock data for now
      setAlerts([]);
      setViolations([]);
      setEvidence([]);
    } catch (error) {
      console.error('Failed to load monitoring data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity) => {
    const badges = {
      Critical: 'badge-error',
      High: 'badge-warning',
      Medium: 'badge-info',
      Low: 'badge-success',
    };
    return badges[severity] || 'badge-info';
  };

  const getStatusBadge = (status) => {
    const badges = {
      Open: 'badge-error',
      Acknowledged: 'badge-warning',
      Resolved: 'badge-success',
      Dismissed: 'badge-info',
    };
    return badges[status] || 'badge-info';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading monitoring data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Governance & Monitoring</h1>
          <p className="text-neutral-600 mt-1">Continuous oversight, evidence tracking, alerts, and policy enforcement</p>
        </div>
        <button className="btn btn-primary">
          <Activity size={18} />
          Generate Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Open Alerts</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">0</p>
            </div>
            <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-error" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Policy Violations</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">0</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <Shield className="text-warning" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Evidence Items</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">0</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <FileCheck className="text-success" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Audit Events</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">0</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Activity className="text-primary" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-neutral-200 mb-4">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'alerts'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral-600 hover:text-neutral-800'
              }`}
            >
              Alerts
            </button>
            <button
              onClick={() => setActiveTab('violations')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'violations'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral-600 hover:text-neutral-800'
              }`}
            >
              Policy Violations
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'evidence'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral-600 hover:text-neutral-800'
              }`}
            >
              Evidence
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'audit'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral-600 hover:text-neutral-800'
              }`}
            >
              Audit Trail
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'alerts' && (
            <div className="text-center py-12">
              <AlertTriangle className="mx-auto text-neutral-400" size={48} />
              <p className="text-neutral-600 mt-4">No alerts found</p>
              <p className="text-sm text-neutral-500 mt-2">Alerts will appear here when monitoring detects issues</p>
            </div>
          )}

          {activeTab === 'violations' && (
            <div className="text-center py-12">
              <Shield className="mx-auto text-neutral-400" size={48} />
              <p className="text-neutral-600 mt-4">No policy violations detected</p>
              <p className="text-sm text-neutral-500 mt-2">Policy violations will be tracked here</p>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="text-center py-12">
              <FileCheck className="mx-auto text-neutral-400" size={48} />
              <p className="text-neutral-600 mt-4">No evidence uploaded</p>
              <p className="text-sm text-neutral-500 mt-2">Upload evidence to support compliance controls</p>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="text-center py-12">
              <Activity className="mx-auto text-neutral-400" size={48} />
              <p className="text-neutral-600 mt-4">No audit events</p>
              <p className="text-sm text-neutral-500 mt-2">System activities will be logged here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GovernanceMonitoring;
