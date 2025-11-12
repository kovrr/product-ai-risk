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
      logo: '/logos/kovrr.svg',
      category: 'Core Platform',
      status: 'connected',
      vendor: 'Kovrr',
    },
    {
      id: 'entra-id',
      name: 'Microsoft Entra ID',
      description: 'Sync users, groups, and authentication data from Azure AD',
      logo: '/logos/microsoft.svg',
      category: 'Identity',
      status: 'available',
      vendor: 'Microsoft',
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Track AI models and code repositories',
      logo: '/logos/github.svg',
      category: 'Development',
      status: 'connected',
      vendor: 'GitHub',
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Sync risk scenarios and action plans with Jira tickets',
      logo: '/logos/jira.svg',
      category: 'Project Management',
      status: 'connected',
      vendor: 'Atlassian',
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send alerts and notifications to Slack channels',
      logo: '/logos/slack.svg',
      category: 'Communication',
      status: 'connected',
      vendor: 'Slack',
    },
    {
      id: 'casb',
      name: 'CASB (Cloud Access Security Broker)',
      description: 'Monitor and control cloud application usage',
      logo: '/logos/security.svg',
      category: 'Security',
      status: 'available',
      vendor: 'Security',
    },
    {
      id: 'dlp',
      name: 'Data Loss Prevention (DLP)',
      description: 'Track sensitive data exposure and policy violations',
      logo: '/logos/security.svg',
      category: 'Security',
      status: 'available',
      vendor: 'Security',
    },
    {
      id: 'servicenow',
      name: 'ServiceNow',
      description: 'Integrate with IT service management workflows',
      logo: '/logos/servicenow.svg',
      category: 'ITSM',
      status: 'available',
      vendor: 'ServiceNow',
    },
    {
      id: 'aws',
      name: 'AWS',
      description: 'Monitor AI workloads and resources on Amazon Web Services',
      logo: '/logos/aws.svg',
      category: 'Cloud',
      status: 'available',
      vendor: 'Amazon',
    },
    {
      id: 'api',
      name: 'Custom API',
      description: 'Connect custom data sources via REST API',
      logo: '/logos/api.svg',
      category: 'Custom',
      status: 'available',
      vendor: 'Custom',
    },
    {
      id: 'siem',
      name: 'SIEM Integration',
      description: 'Send security events to SIEM platforms',
      logo: '/logos/security.svg',
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
    <div className="space-y-[32px]">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[38px] font-[700] text-[rgb(26,32,44)] tracking-[-0.5px] mb-[8px]">Integration Hub</h1>
          <p className="text-[16px] text-[rgb(74,85,104)]">Connect data sources and enable real-time data streams</p>
        </div>
        <button className="inline-flex items-center gap-[8px] px-[20px] py-[10px] bg-[rgb(85,81,247)] text-white text-[14px] font-[600] rounded-[6px] border-none shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] cursor-pointer transition-all duration-200 hover:bg-[rgb(97,94,251)] hover:-translate-y-[1px]">
          <Plus size={18} />
          Add Integration
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px]">
        <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-[600] text-[rgb(74,85,104)] uppercase tracking-[0.5px]">Active Connections</p>
              <p className="text-[32px] font-[700] text-[rgb(13,199,131)] mt-[8px]">{availableConnectors.filter(c => c.status === 'connected').length}</p>
              <p className="text-[12px] text-[rgb(113,118,126)] mt-[4px]">Connected & syncing</p>
            </div>
            <div className="w-[48px] h-[48px] bg-[rgba(13,199,131,0.1)] rounded-[12px] flex items-center justify-center">
              <CheckCircle className="text-[rgb(13,199,131)]" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-[600] text-[rgb(74,85,104)] uppercase tracking-[0.5px]">Total Integrations</p>
              <p className="text-[32px] font-[700] text-[rgb(26,32,44)] mt-[8px]">{availableConnectors.length}</p>
              <p className="text-[12px] text-[rgb(113,118,126)] mt-[4px]">Including Kovrr</p>
            </div>
            <div className="w-[48px] h-[48px] bg-[rgba(85,81,247,0.1)] rounded-[12px] flex items-center justify-center">
              <Link2 className="text-[rgb(85,81,247)]" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-[600] text-[rgb(74,85,104)] uppercase tracking-[0.5px]">Available to Connect</p>
              <p className="text-[32px] font-[700] text-[rgb(85,81,247)] mt-[8px]">{availableConnectors.filter(c => c.status === 'available').length}</p>
              <p className="text-[12px] text-[rgb(113,118,126)] mt-[4px]">Ready to configure</p>
            </div>
            <div className="w-[48px] h-[48px] bg-[rgba(85,81,247,0.1)] rounded-[12px] flex items-center justify-center">
              <Plus className="text-[rgb(85,81,247)]" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-[600] text-[rgb(74,85,104)] uppercase tracking-[0.5px]">Coming Soon</p>
              <p className="text-[32px] font-[700] text-[rgb(26,32,44)] mt-[8px]">{availableConnectors.filter(c => c.status === 'coming-soon').length}</p>
              <p className="text-[12px] text-[rgb(113,118,126)] mt-[4px]">In development</p>
            </div>
            <div className="w-[48px] h-[48px] bg-[rgba(255,153,0,0.1)] rounded-[12px] flex items-center justify-center">
              <RefreshCw className="text-[rgb(255,153,0)]" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Available Connectors */}
      <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)]">
        <h2 className="text-[20px] font-[700] text-[rgb(26,32,44)] mb-[20px]">Available Connectors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {availableConnectors.map((connector) => (
            <div 
              key={connector.id}
              className="border border-[rgb(220,229,242)] rounded-[12px] p-[20px] hover:border-[rgb(85,81,247)] hover:shadow-[rgba(0,0,0,0.1)_0px_4px_20px_0px] transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-[16px]">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] bg-white border border-[rgb(220,229,242)]">
                    <img 
                      src={connector.logo} 
                      alt={connector.name}
                      className="w-[48px] h-[48px] object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-[600] text-[rgb(26,32,44)] text-[15px]">{connector.name}</h3>
                    <span className="text-[11px] text-[rgb(113,118,126)]">{connector.vendor} • {connector.category}</span>
                  </div>
                </div>
                <span className={`px-[8px] py-[4px] rounded-[6px] text-[11px] font-[600] ${
                  connector.status === 'connected' ? 'bg-[rgba(13,199,131,0.1)] text-[rgb(13,199,131)]' :
                  connector.status === 'available' ? 'bg-[rgba(85,81,247,0.1)] text-[rgb(85,81,247)]' :
                  connector.status === 'coming-soon' ? 'bg-[rgba(169,180,188,0.1)] text-[rgb(74,85,104)]' :
                  'bg-[rgba(169,180,188,0.1)] text-[rgb(74,85,104)]'
                }`}>
                  {getStatusText(connector.status)}
                </span>
              </div>
              <p className="text-[13px] text-[rgb(74,85,104)] mb-[16px] leading-[1.5]">{connector.description}</p>
              <button 
                className={`w-full px-[16px] py-[10px] rounded-[6px] text-[14px] font-[600] transition-all duration-200 ${
                  connector.status === 'coming-soon' 
                    ? 'bg-[rgb(237,242,247)] text-[rgb(113,118,126)] cursor-not-allowed' 
                    : 'bg-[rgb(85,81,247)] text-white hover:bg-[rgb(97,94,251)] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]'
                }`}
                disabled={connector.status === 'coming-soon'}
              >
                {connector.status === 'coming-soon' ? 'Coming Soon' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Categories */}
      <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-[rgb(220,229,242)]">
        <h2 className="text-[20px] font-[700] text-[rgb(26,32,44)] mb-[20px]">Integration Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
          <div className="text-center p-[20px] bg-[rgb(245,247,255)] rounded-[12px]">
            <p className="text-[32px] mb-[8px]">🔐</p>
            <p className="font-[600] text-[rgb(26,32,44)] text-[15px]">Identity</p>
            <p className="text-[12px] text-[rgb(113,118,126)] mt-[4px]">1 connector</p>
          </div>
          <div className="text-center p-[20px] bg-[rgb(245,247,255)] rounded-[12px]">
            <p className="text-[32px] mb-[8px]">🛡️</p>
            <p className="font-[600] text-[rgb(26,32,44)] text-[15px]">Security</p>
            <p className="text-[12px] text-[rgb(113,118,126)] mt-[4px]">3 connectors</p>
          </div>
          <div className="text-center p-[20px] bg-[rgb(245,247,255)] rounded-[12px]">
            <p className="text-[32px] mb-[8px]">📋</p>
            <p className="font-[600] text-[rgb(26,32,44)] text-[15px]">Project Mgmt</p>
            <p className="text-[12px] text-[rgb(113,118,126)] mt-[4px]">1 connector</p>
          </div>
          <div className="text-center p-[20px] bg-[rgb(245,247,255)] rounded-[12px]">
            <p className="text-[32px] mb-[8px]">💬</p>
            <p className="font-[600] text-[rgb(26,32,44)] text-[15px]">Communication</p>
            <p className="text-[12px] text-[rgb(113,118,126)] mt-[4px]">1 connector</p>
          </div>
        </div>
      </div>

      {/* API Documentation */}
      <div className="bg-gradient-to-br from-[rgba(85,81,247,0.05)] to-white border border-[rgba(85,81,247,0.2)] rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
        <div className="flex items-start gap-[16px]">
          <div className="w-[48px] h-[48px] bg-[rgba(85,81,247,0.1)] rounded-[12px] flex items-center justify-center flex-shrink-0">
            <Settings className="text-[rgb(85,81,247)]" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-[600] text-[rgb(26,32,44)] mb-[8px] text-[16px]">Custom API Integration</h3>
            <p className="text-[14px] text-[rgb(74,85,104)] mb-[16px] leading-[1.5]">
              Build custom integrations using our REST API. Access comprehensive documentation and examples to connect your proprietary systems.
            </p>
            <button className="inline-flex items-center gap-[8px] px-[16px] py-[8px] bg-white text-[rgb(85,81,247)] border border-[rgb(85,81,247)] rounded-[6px] text-[13px] font-[600] hover:bg-[rgb(236,242,252)] transition-colors">
              View API Docs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationHub;
