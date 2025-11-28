import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../atoms/button';

const GenericConnectorWizard = ({ connector, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, name: 'Authentication', description: 'Configure API credentials' },
    { id: 2, name: 'Configuration', description: 'Set up sync options' },
    { id: 3, name: 'Review & Connect', description: 'Confirm and activate' },
  ];

  // Configuration templates for different connector types
  const getAuthFields = () => {
    const templates = {
      cyberark: [
        { label: 'CyberArk URL', placeholder: 'https://your-instance.cyberark.cloud', type: 'text' },
        { label: 'Client ID', placeholder: 'Enter client ID', type: 'text' },
        { label: 'Client Secret', placeholder: 'Enter client secret', type: 'password' },
      ],
      zscaler: [
        { label: 'Zscaler Cloud', placeholder: 'zscaler.net', type: 'text' },
        { label: 'API Key', placeholder: 'Enter API key', type: 'password' },
        { label: 'Username', placeholder: 'admin@company.com', type: 'text' },
      ],
      'palo-alto': [
        { label: 'Firewall IP/Hostname', placeholder: '192.168.1.1', type: 'text' },
        { label: 'API Key', placeholder: 'Enter API key', type: 'password' },
      ],
      cloudflare: [
        { label: 'Account Email', placeholder: 'admin@company.com', type: 'email' },
        { label: 'API Token', placeholder: 'Enter API token', type: 'password' },
        { label: 'Zone ID', placeholder: 'Enter zone ID (optional)', type: 'text' },
      ],
      slack: [
        { label: 'Workspace URL', placeholder: 'your-workspace.slack.com', type: 'text' },
        { label: 'Bot Token', placeholder: 'xoxb-...', type: 'password' },
      ],
      teams: [
        { label: 'Tenant ID', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', type: 'text' },
        { label: 'Client ID', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', type: 'text' },
        { label: 'Client Secret', placeholder: 'Enter client secret', type: 'password' },
      ],
      servicenow: [
        { label: 'Instance URL', placeholder: 'your-instance.service-now.com', type: 'text' },
        { label: 'Username', placeholder: 'admin', type: 'text' },
        { label: 'Password', placeholder: 'Enter password', type: 'password' },
      ],
      asana: [
        { label: 'Workspace ID', placeholder: 'Enter workspace ID', type: 'text' },
        { label: 'Personal Access Token', placeholder: 'Enter PAT', type: 'password' },
      ],
      aws: [
        { label: 'Access Key ID', placeholder: 'AKIAIOSFODNN7EXAMPLE', type: 'text' },
        { label: 'Secret Access Key', placeholder: 'Enter secret key', type: 'password' },
        { label: 'Region', placeholder: 'us-east-1', type: 'text' },
      ],
      azure: [
        { label: 'Subscription ID', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', type: 'text' },
        { label: 'Tenant ID', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', type: 'text' },
        { label: 'Client ID', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', type: 'text' },
        { label: 'Client Secret', placeholder: 'Enter client secret', type: 'password' },
      ],
      gcp: [
        { label: 'Project ID', placeholder: 'my-project-12345', type: 'text' },
        { label: 'Service Account Key', placeholder: 'Paste JSON key', type: 'textarea' },
      ],
      casb: [
        { label: 'CASB Platform URL', placeholder: 'https://your-tenant.casb-provider.com', type: 'text' },
        { label: 'API Key', placeholder: 'Enter API key', type: 'password' },
        { label: 'Tenant ID', placeholder: 'Enter tenant ID', type: 'text' },
      ],
      dlp: [
        { label: 'DLP Console URL', placeholder: 'https://dlp.company.com', type: 'text' },
        { label: 'Admin Username', placeholder: 'admin@company.com', type: 'text' },
        { label: 'API Token', placeholder: 'Enter API token', type: 'password' },
      ],
    };
    return templates[connector.id] || [
      { label: 'API URL', placeholder: 'https://api.example.com', type: 'text' },
      { label: 'API Key', placeholder: 'Enter API key', type: 'password' },
    ];
  };

  const getSyncOptions = () => {
    const options = {
      cyberark: ['Privileged Accounts', 'Safes', 'Access Policies'],
      zscaler: ['Web Traffic Logs', 'Security Policies', 'User Activity'],
      'palo-alto': ['Firewall Logs', 'Threat Intelligence', 'Security Rules'],
      cloudflare: ['DNS Records', 'Firewall Rules', 'Analytics'],
      slack: ['Channels', 'Messages', 'User Activity'],
      teams: ['Teams', 'Channels', 'Messages', 'User Activity'],
      servicenow: ['Incidents', 'Change Requests', 'Configuration Items'],
      asana: ['Projects', 'Tasks', 'Users'],
      aws: ['EC2 Instances', 'S3 Buckets', 'Lambda Functions', 'SageMaker Models'],
      azure: ['Virtual Machines', 'Storage Accounts', 'AI Services'],
      gcp: ['Compute Instances', 'Cloud Storage', 'AI Platform Models'],
      casb: [
        'SaaS Application Usage',
        'Shadow IT Discovery',
        'User Activity Logs',
        'Data Sharing Events',
        'OAuth Grants & Permissions',
        'Anomalous Behavior Alerts',
        'Compliance Violations',
        'Third-Party App Risks'
      ],
      dlp: [
        'Sensitive Data Incidents',
        'Policy Violations',
        'Data Exfiltration Events',
        'Email DLP Alerts',
        'Endpoint DLP Events',
        'Cloud Storage Scanning Results',
        'PII/PHI Detection',
        'Intellectual Property Leaks',
        'Regulatory Compliance Findings'
      ],
    };
    return options[connector.id] || ['Data Type 1', 'Data Type 2', 'Data Type 3'];
  };

  const renderStep1 = () => (
    <div className="space-y-[20px]">
      <div className="bg-fill-base-1 p-[20px] rounded-[10px]">
        <h3 className="text-[16px] font-[600] text-text-base-primary mb-[12px]">
          {connector.name} Configuration
        </h3>
        <div className="space-y-[16px]">
          {getAuthFields().map((field, index) => (
            <div key={index}>
              <label className="block text-[13px] font-[600] text-text-base-secondary mb-[8px]">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  placeholder={field.placeholder}
                  className="w-full px-[12px] py-[10px] border border-fill-base-3 rounded-[6px] text-[14px] min-h-[100px]"
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-[12px] py-[10px] border border-fill-base-3 rounded-[6px] text-[14px]"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-[16px]">
      <p className="text-[14px] text-text-base-secondary mb-[16px]">
        Select the data types you want to sync from {connector.name}
      </p>
      {getSyncOptions().map((option) => (
        <div key={option} className="border border-fill-base-3 rounded-[10px] p-[16px] hover:border-fill-brand-primary transition-colors">
          <label className="flex items-center gap-[12px] cursor-pointer">
            <input type="checkbox" defaultChecked className="w-[16px] h-[16px]" />
            <span className="text-[14px] font-[600] text-text-base-primary">{option}</span>
          </label>
        </div>
      ))}
      <div className="mt-[20px] bg-fill-base-1 p-[16px] rounded-[10px]">
        <label className="block text-[13px] font-[600] text-text-base-secondary mb-[8px]">
          Sync Frequency
        </label>
        <select className="w-full px-[12px] py-[10px] border border-fill-base-3 rounded-[6px] text-[14px]">
          <option>Real-time (webhooks)</option>
          <option>Every hour</option>
          <option>Every 6 hours</option>
          <option>Daily</option>
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-[20px]">
      <div className="bg-fill-base-1 p-[20px] rounded-[10px]">
        <h3 className="text-[16px] font-[600] text-text-base-primary mb-[16px]">Configuration Summary</h3>
        <div className="space-y-[12px]">
          <div className="flex justify-between text-[14px]">
            <span className="text-text-base-secondary">Connector:</span>
            <span className="font-[600] text-text-base-primary">{connector.name}</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-base-secondary">Data types:</span>
            <span className="font-[600] text-text-base-primary">{getSyncOptions().length}</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-base-secondary">Sync frequency:</span>
            <span className="font-[600] text-text-base-primary">Every 6 hours</span>
          </div>
        </div>
      </div>
      <div className="bg-fill-information-success/10 border border-fill-information-success/30 p-[16px] rounded-[10px]">
        <div className="flex items-start gap-[12px]">
          <CheckCircle size={20} className="text-fill-information-success mt-[2px]" />
          <div>
            <p className="text-[14px] font-[600] text-text-base-primary mb-[4px]">Ready to Connect</p>
            <p className="text-[13px] text-text-base-secondary">
              Your configuration is complete. Click "Connect" to start syncing data from {connector.name}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[20px]">
      <div className="bg-white rounded-[15px] max-w-[700px] w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-[24px] border-b border-fill-base-3">
          <div className="flex items-center justify-between mb-[20px]">
            <div>
              <h2 className="text-[24px] font-[700] text-text-base-primary">{connector.name} Setup</h2>
              <p className="text-[14px] text-text-base-secondary mt-[4px]">
                Configure your {connector.name} integration
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-text-base-tertiary hover:text-text-base-primary text-[24px] leading-none"
            >
              ×
            </button>
          </div>

          <div className="flex items-center gap-[8px]">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-[600] ${currentStep >= step.id
                  ? 'bg-fill-brand-primary text-white'
                  : 'bg-fill-base-2 text-text-base-tertiary'
                  }`}>
                  {currentStep > step.id ? <CheckCircle size={16} /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-[2px] w-full mx-[8px] ${currentStep > step.id ? 'bg-fill-brand-primary' : 'bg-fill-base-3'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-[24px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        <div className="p-[24px] border-t border-fill-base-3 flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => currentStep === 1 ? onClose() : setCurrentStep(currentStep - 1)}
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            onClick={() => {
              if (currentStep === 3) {
                onComplete?.();
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            {currentStep === 3 ? 'Connect' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenericConnectorWizard;
