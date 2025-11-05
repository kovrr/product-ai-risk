import { useEffect, useState } from 'react';
import { Link2, CheckCircle, XCircle, RefreshCw, Settings, Plus } from 'lucide-react';

const IntegrationHub = () => {
  const [connectors, setConnectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConnectors();
  }, []);

  const loadConnectors = async () => {
    try {
      // TODO: Implement API call when backend is ready
      // const data = await integrationService.getConnectors();
      
      // Mock data for now
      setConnectors([]);
    } catch (error) {
      console.error('Failed to load connectors:', error);
    } finally {
      setLoading(false);
    }
  };

  const availableConnectors = [
    {
      id: 'kovrr',
      name: 'Kovrr Platform',
      description: 'Core Kovrr.ai platform - AI governance and risk management',
      icon: '🎯',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-700',
      iconColor: 'text-white',
      category: 'Core Platform',
      status: 'connected',
      vendor: 'Kovrr',
    },
    {
      id: 'entra-id',
      name: 'Microsoft Entra ID',
      description: 'Sync users, groups, and authentication data from Azure AD',
      icon: '🔐',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700',
      iconColor: 'text-white',
      category: 'Identity',
      status: 'available',
      vendor: 'Microsoft',
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Track AI models and code repositories',
      icon: '💻',
      iconBg: 'bg-gradient-to-br from-gray-800 to-black',
      iconColor: 'text-white',
      category: 'Development',
      status: 'connected',
      vendor: 'GitHub',
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Sync risk scenarios and action plans with Jira tickets',
      icon: '📋',
      iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800',
      iconColor: 'text-white',
      category: 'Project Management',
      status: 'connected',
      vendor: 'Atlassian',
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send alerts and notifications to Slack channels',
      icon: '💬',
      iconBg: 'bg-gradient-to-br from-purple-600 to-pink-600',
      iconColor: 'text-white',
      category: 'Communication',
      status: 'connected',
      vendor: 'Slack',
    },
    {
      id: 'casb',
      name: 'CASB (Cloud Access Security Broker)',
      description: 'Monitor and control cloud application usage',
      icon: '☁️',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      iconColor: 'text-white',
      category: 'Security',
      status: 'available',
      vendor: 'Security',
    },
    {
      id: 'dlp',
      name: 'Data Loss Prevention (DLP)',
      description: 'Track sensitive data exposure and policy violations',
      icon: '🛡️',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-700',
      iconColor: 'text-white',
      category: 'Security',
      status: 'available',
      vendor: 'Security',
    },
    {
      id: 'servicenow',
      name: 'ServiceNow',
      description: 'Integrate with IT service management workflows',
      icon: '🔧',
      iconBg: 'bg-gradient-to-br from-teal-600 to-teal-800',
      iconColor: 'text-white',
      category: 'ITSM',
      status: 'available',
      vendor: 'ServiceNow',
    },
    {
      id: 'aws',
      name: 'AWS',
      description: 'Monitor AI workloads and resources on Amazon Web Services',
      icon: '☁️',
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-700',
      iconColor: 'text-white',
      category: 'Cloud',
      status: 'available',
      vendor: 'Amazon',
    },
    {
      id: 'api',
      name: 'Custom API',
      description: 'Connect custom data sources via REST API',
      icon: '🔌',
      iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      iconColor: 'text-white',
      category: 'Custom',
      status: 'available',
      vendor: 'Custom',
    },
    {
      id: 'siem',
      name: 'SIEM Integration',
      description: 'Send security events to SIEM platforms',
      icon: '🔍',
      iconBg: 'bg-gradient-to-br from-red-500 to-red-700',
      iconColor: 'text-white',
      category: 'Security',
      status: 'coming-soon',
      vendor: 'Security',
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      'connected': 'badge-success',
      'error': 'badge-error',
      'syncing': 'badge-warning',
      'available': 'badge-info',
      'coming-soon': 'badge-neutral',
    };
    return badges[status] || 'badge-info';
  };

  const getStatusText = (status) => {
    const texts = {
      'connected': 'Connected',
      'error': 'Error',
      'syncing': 'Syncing',
      'available': 'Available',
      'coming-soon': 'Coming Soon',
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading integrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Integration Hub</h1>
          <p className="text-neutral-600 mt-1">Connect data sources and enable real-time data streams</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add Integration
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Active Connections</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{availableConnectors.filter(c => c.status === 'connected').length}</p>
              <p className="text-xs text-neutral-500 mt-1">Connected & syncing</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-success" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Integrations</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">{availableConnectors.length}</p>
              <p className="text-xs text-neutral-500 mt-1">Including Kovrr</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Link2 className="text-primary" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Available to Connect</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{availableConnectors.filter(c => c.status === 'available').length}</p>
              <p className="text-xs text-neutral-500 mt-1">Ready to configure</p>
            </div>
            <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
              <Plus className="text-info" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Coming Soon</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">{availableConnectors.filter(c => c.status === 'coming-soon').length}</p>
              <p className="text-xs text-neutral-500 mt-1">In development</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <RefreshCw className="text-warning" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Active Connections */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-800 mb-4">Active Connections</h2>
        <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-lg">
          <Link2 className="mx-auto text-neutral-400" size={48} />
          <p className="text-neutral-600 mt-4">No active connections</p>
          <p className="text-sm text-neutral-500 mt-2">Connect your first data source to start syncing data</p>
        </div>
      </div>

      {/* Available Connectors */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-800 mb-4">Available Connectors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableConnectors.map((connector) => (
            <div 
              key={connector.id}
              className="border border-neutral-200 rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 ${connector.iconBg} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                    {connector.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">{connector.name}</h3>
                    <span className="text-xs text-neutral-500">{connector.vendor} • {connector.category}</span>
                  </div>
                </div>
                <span className={`badge ${getStatusBadge(connector.status)} text-xs`}>
                  {getStatusText(connector.status)}
                </span>
              </div>
              <p className="text-sm text-neutral-600 mb-4">{connector.description}</p>
              <button 
                className={`btn ${connector.status === 'coming-soon' ? 'btn-outline opacity-50 cursor-not-allowed' : 'btn-primary'} w-full text-sm`}
                disabled={connector.status === 'coming-soon'}
              >
                {connector.status === 'coming-soon' ? 'Coming Soon' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Categories */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-800 mb-4">Integration Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <p className="text-2xl mb-2">🔐</p>
            <p className="font-semibold text-neutral-800">Identity</p>
            <p className="text-xs text-neutral-500 mt-1">1 connector</p>
          </div>
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <p className="text-2xl mb-2">🛡️</p>
            <p className="font-semibold text-neutral-800">Security</p>
            <p className="text-xs text-neutral-500 mt-1">3 connectors</p>
          </div>
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <p className="text-2xl mb-2">📋</p>
            <p className="font-semibold text-neutral-800">Project Mgmt</p>
            <p className="text-xs text-neutral-500 mt-1">1 connector</p>
          </div>
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <p className="text-2xl mb-2">💬</p>
            <p className="font-semibold text-neutral-800">Communication</p>
            <p className="text-xs text-neutral-500 mt-1">1 connector</p>
          </div>
        </div>
      </div>

      {/* API Documentation */}
      <div className="card bg-gradient-to-br from-primary/5 to-white border border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Settings className="text-primary" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-neutral-800 mb-2">Custom API Integration</h3>
            <p className="text-sm text-neutral-600 mb-3">
              Build custom integrations using our REST API. Access comprehensive documentation and examples to connect your proprietary systems.
            </p>
            <button className="btn btn-outline btn-sm">
              View API Docs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationHub;
