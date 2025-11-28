import { useEffect, useState } from 'react';
import { Link2, CheckCircle, XCircle, RefreshCw, Settings, Plus, Users, Shield, Network, Database, MessageSquare, FileText, Cloud } from 'lucide-react';
import EntraIDWizard from '../components/integrations/EntraIDWizard';
import JiraWizard from '../components/integrations/JiraWizard';
import OktaWizard from '../components/integrations/OktaWizard';
import GenericConnectorWizard from '../components/integrations/GenericConnectorWizard';

const IntegrationHub = () => {
  const [connectors, setConnectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeWizard, setActiveWizard] = useState(null);

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

  const handleConnectorClick = (connector) => {
    setActiveWizard(connector);
  };

  const handleWizardComplete = () => {
    setActiveWizard(null);
    // TODO: Refresh connectors list
    alert('Integration configured successfully!');
  };

  const categories = [
    {
      id: 'user-app-mgmt',
      name: 'User & App Management',
      icon: Users,
      description: 'Identity providers and application management',
      connectors: [
        {
          id: 'entra-id',
          name: 'Microsoft Entra ID',
          description: 'Sync users, groups, applications, and authentication data',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
          status: 'available',
          vendor: 'Microsoft',
          hasWizard: true,
        },
        {
          id: 'okta',
          name: 'Okta',
          description: 'Identity and access management platform',
          logo: 'https://www.okta.com/sites/default/files/Okta_Logo_BrightBlue_Medium.png',
          status: 'coming-soon',
          vendor: 'Okta',
          hasWizard: true,
        },
        {
          id: 'cyberark',
          name: 'CyberArk',
          description: 'Privileged access management and identity security',
          logo: '/logos/cyberark.png',
          status: 'coming-soon',
          vendor: 'CyberArk',
          hasWizard: true,
        },
      ]
    },
    {
      id: 'network-traffic',
      name: 'Network & Traffic',
      icon: Network,
      description: 'Network monitoring and traffic analysis',
      connectors: [
        {
          id: 'zscaler',
          name: 'Zscaler',
          description: 'Cloud security and zero trust network access',
          logo: 'https://www.zscaler.com/themes/custom/zscaler/logo.svg',
          status: 'connected',
          vendor: 'Zscaler',
          hasWizard: true,
        },
        {
          id: 'palo-alto',
          name: 'Palo Alto Networks',
          description: 'Next-generation firewall and network security',
          logo: '/logos/paloalto.png',
          status: 'available',
          vendor: 'Palo Alto',
          hasWizard: true,
        },
        {
          id: 'cloudflare',
          name: 'Cloudflare',
          description: 'Web traffic and security monitoring',
          logo: 'https://www.cloudflare.com/img/logo-cloudflare-dark.svg',
          status: 'coming-soon',
          vendor: 'Cloudflare',
          hasWizard: true,
        },
      ]
    },
    {
      id: 'security-compliance',
      name: 'Security & Compliance',
      icon: Shield,
      description: 'Security tools and compliance platforms',
      connectors: [
        {
          id: 'casb',
          name: 'CASB Solutions',
          description: 'Cloud Access Security Broker for SaaS monitoring',
          logo: '/logos/security.svg',
          status: 'available',
          vendor: 'Various',
          hasWizard: true,
        },
        {
          id: 'dlp',
          name: 'Data Loss Prevention',
          description: 'Track sensitive data exposure and policy violations',
          logo: 'https://cdn-icons-png.flaticon.com/512/2913/2913133.png',
          status: 'available',
          vendor: 'Various',
          hasWizard: true,
        },
        {
          id: 'siem',
          name: 'SIEM Integration',
          description: 'Send security events to SIEM platforms',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg',
          status: 'coming-soon',
          vendor: 'Various',
          hasWizard: true,
        },
      ]
    },
    {
      id: 'collaboration',
      name: 'Collaboration & Communication',
      icon: MessageSquare,
      description: 'Team collaboration and communication tools',
      connectors: [
        {
          id: 'slack',
          name: 'Slack',
          description: 'Send alerts and notifications to Slack channels',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
          status: 'connected',
          vendor: 'Slack',
          hasWizard: true,
        },
        {
          id: 'teams',
          name: 'Microsoft Teams',
          description: 'Integrate with Teams for notifications and collaboration',
          logo: 'https://cdn-icons-png.flaticon.com/512/906/906391.png',
          status: 'available',
          vendor: 'Microsoft',
          hasWizard: true,
        },
      ]
    },
    {
      id: 'project-mgmt',
      name: 'Project Management & ITSM',
      icon: FileText,
      description: 'Project tracking and IT service management',
      connectors: [
        {
          id: 'jira',
          name: 'Jira',
          description: 'Sync risk scenarios and action plans with Jira tickets',
          logo: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',
          status: 'connected',
          vendor: 'Atlassian',
          hasWizard: true,
        },
        {
          id: 'servicenow',
          name: 'ServiceNow',
          description: 'Integrate with IT service management workflows',
          logo: '/logos/servicenow.svg',
          status: 'available',
          vendor: 'ServiceNow',
          hasWizard: true,
        },
        {
          id: 'asana',
          name: 'Asana',
          description: 'Project and task management integration',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Asana_logo.svg',
          status: 'coming-soon',
          vendor: 'Asana',
          hasWizard: true,
        },
      ]
    },
    {
      id: 'cloud-platforms',
      name: 'Cloud Platforms',
      icon: Cloud,
      description: 'Cloud infrastructure and AI services',
      connectors: [
        {
          id: 'aws',
          name: 'AWS',
          description: 'Monitor AI workloads and resources on Amazon Web Services',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
          status: 'available',
          vendor: 'Amazon',
          hasWizard: true,
        },
        {
          id: 'azure',
          name: 'Microsoft Azure',
          description: 'Azure cloud services and AI resources',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
          status: 'available',
          vendor: 'Microsoft',
          hasWizard: true,
        },
        {
          id: 'gcp',
          name: 'Google Cloud',
          description: 'Google Cloud Platform and AI services',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg',
          status: 'coming-soon',
          vendor: 'Google',
          hasWizard: true,
        },
      ]
    },
  ];

  const allConnectors = categories.flatMap(cat => cat.connectors);

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
    <>
      <div className="space-y-[32px]">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[38px] font-[700] text-text-base-primary tracking-[-0.5px] mb-[8px]">Integration Hub</h1>
            <p className="text-[16px] text-text-base-secondary">Connect data sources and enable real-time data streams</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px]">
          <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-fill-base-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-[600] text-text-base-secondary uppercase tracking-[0.5px]">Active Connections</p>
                <p className="text-[32px] font-[700] text-fill-information-success mt-[8px]">
                  {allConnectors.filter(c => c.status === 'connected').length}
                </p>
                <p className="text-[12px] text-text-base-tertiary mt-[4px]">Connected & syncing</p>
              </div>
              <div className="w-[48px] h-[48px] bg-fill-information-success/10 rounded-[12px] flex items-center justify-center">
                <CheckCircle className="text-fill-information-success" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-fill-base-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-[600] text-text-base-secondary uppercase tracking-[0.5px]">Categories</p>
                <p className="text-[32px] font-[700] text-text-base-primary mt-[8px]">{categories.length}</p>
                <p className="text-[12px] text-text-base-tertiary mt-[4px]">Integration types</p>
              </div>
              <div className="w-[48px] h-[48px] bg-fill-brand-primary-transparent rounded-[12px] flex items-center justify-center">
                <Database className="text-fill-brand-primary" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-fill-base-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-[600] text-text-base-secondary uppercase tracking-[0.5px]">Available</p>
                <p className="text-[32px] font-[700] text-fill-brand-primary mt-[8px]">
                  {allConnectors.filter(c => c.status === 'available').length}
                </p>
                <p className="text-[12px] text-text-base-tertiary mt-[4px]">Ready to configure</p>
              </div>
              <div className="w-[48px] h-[48px] bg-fill-brand-primary-transparent rounded-[12px] flex items-center justify-center">
                <Plus className="text-fill-brand-primary" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-fill-base-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-[600] text-text-base-secondary uppercase tracking-[0.5px]">Coming Soon</p>
                <p className="text-[32px] font-[700] text-text-base-primary mt-[8px]">
                  {allConnectors.filter(c => c.status === 'coming-soon').length}
                </p>
                <p className="text-[12px] text-text-base-tertiary mt-[4px]">In development</p>
              </div>
              <div className="w-[48px] h-[48px] bg-fill-information-warning/10 rounded-[12px] flex items-center justify-center">
                <RefreshCw className="text-fill-information-warning" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Categories with Connectors */}
        {categories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.id} className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] border border-fill-base-3">
              <div className="flex items-center gap-[12px] mb-[20px]">
                <div className="w-[40px] h-[40px] bg-fill-brand-primary-transparent rounded-[10px] flex items-center justify-center">
                  <CategoryIcon className="text-fill-brand-primary" size={20} />
                </div>
                <div>
                  <h2 className="text-[18px] font-[700] text-text-base-primary">{category.name}</h2>
                  <p className="text-[13px] text-text-base-secondary">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                {category.connectors.map((connector) => (
                  <div
                    key={connector.id}
                    className="border border-fill-base-3 rounded-[10px] p-[16px] hover:border-fill-brand-primary hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => connector.status !== 'coming-soon' && handleConnectorClick(connector)}
                  >
                    <div className="flex items-start justify-between mb-[12px]">
                      <div className="flex items-center gap-[10px]">
                        <div className="w-[40px] h-[40px] rounded-[8px] flex items-center justify-center shadow-sm bg-white border border-fill-base-3">
                          <img
                            src={connector.logo}
                            alt={connector.name}
                            className="w-[32px] h-[32px] object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-[600] text-text-base-primary text-[14px]">{connector.name}</h3>
                          <span className="text-[10px] text-text-base-tertiary">{connector.vendor}</span>
                        </div>
                      </div>
                      <span className={`px-[6px] py-[2px] rounded-[4px] text-[10px] font-[600] ${connector.status === 'connected' ? 'bg-fill-information-success/10 text-fill-information-success' :
                        connector.status === 'available' ? 'bg-fill-brand-primary-transparent text-fill-brand-primary' :
                          'bg-fill-base-2 text-text-base-tertiary'
                        }`}>
                        {getStatusText(connector.status)}
                      </span>
                    </div>
                    <p className="text-[12px] text-text-base-secondary mb-[12px] leading-[1.4]">{connector.description}</p>
                    <button
                      className={`w-full px-[12px] py-[8px] rounded-[6px] text-[13px] font-[600] transition-all duration-200 ${connector.status === 'coming-soon'
                        ? 'bg-fill-base-2 text-text-base-tertiary cursor-not-allowed'
                        : connector.hasWizard
                          ? 'bg-fill-brand-primary text-white hover:bg-fill-brand-primary-hover shadow-sm'
                          : 'bg-fill-base-2 text-text-base-primary hover:bg-fill-base-3'
                        }`}
                      disabled={connector.status === 'coming-soon'}
                    >
                      {connector.status === 'coming-soon' ? 'Coming Soon' : connector.hasWizard ? 'Configure' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* API Documentation */}
        <div className="bg-gradient-to-br from-fill-brand-primary-transparent to-white border border-fill-brand-primary/20 rounded-[15px] p-[24px] shadow-sm">
          <div className="flex items-start gap-[16px]">
            <div className="w-[48px] h-[48px] bg-fill-brand-primary-transparent rounded-[12px] flex items-center justify-center flex-shrink-0">
              <Settings className="text-fill-brand-primary" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-[600] text-text-base-primary mb-[8px] text-[16px]">Custom API Integration</h3>
              <p className="text-[14px] text-text-base-secondary mb-[16px] leading-[1.5]">
                Build custom integrations using our REST API. Access comprehensive documentation and examples to connect your proprietary systems.
              </p>
              <button className="inline-flex items-center gap-[8px] px-[16px] py-[8px] bg-white text-fill-brand-primary border border-fill-brand-primary rounded-[6px] text-[13px] font-[600] hover:bg-fill-brand-primary-transparent transition-colors">
                View API Docs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wizards */}
      {activeWizard && activeWizard.id === 'entra-id' && (
        <EntraIDWizard
          onClose={() => setActiveWizard(null)}
          onComplete={handleWizardComplete}
        />
      )}
      {activeWizard && activeWizard.id === 'jira' && (
        <JiraWizard
          onClose={() => setActiveWizard(null)}
          onComplete={handleWizardComplete}
        />
      )}
      {activeWizard && activeWizard.id === 'okta' && (
        <OktaWizard
          onClose={() => setActiveWizard(null)}
          onComplete={handleWizardComplete}
        />
      )}
      {activeWizard && !['entra-id', 'jira', 'okta'].includes(activeWizard.id) && (
        <GenericConnectorWizard
          connector={activeWizard}
          onClose={() => setActiveWizard(null)}
          onComplete={handleWizardComplete}
        />
      )}
    </>
  );
};

export default IntegrationHub;
