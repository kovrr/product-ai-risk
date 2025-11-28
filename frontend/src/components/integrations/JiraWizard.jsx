import { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronDown, FileText, AlertCircle, CheckSquare, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../atoms/card';
import { Button } from '../atoms/button';
import { Badge } from '../atoms/badge';

const JiraWizard = ({ onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedObjects, setSelectedObjects] = useState({
    issues: true,
    projects: true,
    users: false,
    workflows: false,
  });
  const [expandedNodes, setExpandedNodes] = useState({
    issues: true,
    projects: false,
  });
  const [selectedAttributes, setSelectedAttributes] = useState({
    issues: ['id', 'key', 'summary', 'description', 'status', 'priority', 'assignee'],
    projects: ['id', 'key', 'name', 'description'],
  });

  const objectTypes = [
    {
      id: 'issues',
      name: 'Issues',
      icon: FileText,
      description: 'Sync Jira issues as action items and risks',
      attributes: [
        { id: 'id', name: 'Issue ID', type: 'string', required: true },
        { id: 'key', name: 'Issue Key', type: 'string', required: true },
        { id: 'summary', name: 'Summary', type: 'string', required: true },
        { id: 'description', name: 'Description', type: 'text', required: false },
        { id: 'status', name: 'Status', type: 'string', required: true },
        { id: 'priority', name: 'Priority', type: 'string', required: false },
        { id: 'assignee', name: 'Assignee', type: 'user', required: false },
        { id: 'reporter', name: 'Reporter', type: 'user', required: false },
        { id: 'created', name: 'Created Date', type: 'datetime', required: true },
        { id: 'updated', name: 'Updated Date', type: 'datetime', required: true },
        { id: 'dueDate', name: 'Due Date', type: 'date', required: false },
        { id: 'labels', name: 'Labels', type: 'array', required: false },
      ],
      mapping: {
        id: 'action_id',
        key: 'reference_id',
        summary: 'title',
        description: 'description',
        status: 'status',
        priority: 'priority',
        assignee: 'owner_id',
        dueDate: 'due_date',
      }
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: Target,
      description: 'Sync Jira projects for organization',
      attributes: [
        { id: 'id', name: 'Project ID', type: 'string', required: true },
        { id: 'key', name: 'Project Key', type: 'string', required: true },
        { id: 'name', name: 'Project Name', type: 'string', required: true },
        { id: 'description', name: 'Description', type: 'text', required: false },
        { id: 'lead', name: 'Project Lead', type: 'user', required: false },
        { id: 'projectTypeKey', name: 'Project Type', type: 'string', required: false },
      ],
      mapping: {
        id: 'project_id',
        key: 'project_key',
        name: 'name',
        description: 'description',
      }
    },
    {
      id: 'users',
      name: 'Users',
      icon: CheckSquare,
      description: 'Sync Jira users for assignment tracking',
      attributes: [
        { id: 'accountId', name: 'Account ID', type: 'string', required: true },
        { id: 'displayName', name: 'Display Name', type: 'string', required: true },
        { id: 'emailAddress', name: 'Email', type: 'string', required: false },
        { id: 'active', name: 'Active', type: 'boolean', required: true },
      ],
      mapping: {
        accountId: 'user_id',
        displayName: 'name',
        emailAddress: 'email',
      }
    },
    {
      id: 'workflows',
      name: 'Workflows',
      icon: AlertCircle,
      description: 'Sync workflow statuses and transitions',
      attributes: [
        { id: 'id', name: 'Workflow ID', type: 'string', required: true },
        { id: 'name', name: 'Workflow Name', type: 'string', required: true },
        { id: 'statuses', name: 'Statuses', type: 'array', required: true },
      ],
      mapping: {
        id: 'workflow_id',
        name: 'workflow_name',
        statuses: 'status_options',
      }
    },
  ];

  const steps = [
    { id: 1, name: 'Authentication', description: 'Configure API credentials' },
    { id: 2, name: 'Select Objects', description: 'Choose data to sync' },
    { id: 3, name: 'Map Attributes', description: 'Map fields to Kovrr model' },
    { id: 4, name: 'Review & Connect', description: 'Confirm and activate' },
  ];

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const toggleObject = (objectId) => {
    setSelectedObjects(prev => ({ ...prev, [objectId]: !prev[objectId] }));
  };

  const toggleAttribute = (objectId, attributeId) => {
    setSelectedAttributes(prev => {
      const current = prev[objectId] || [];
      const updated = current.includes(attributeId)
        ? current.filter(id => id !== attributeId)
        : [...current, attributeId];
      return { ...prev, [objectId]: updated };
    });
  };

  const renderStep1 = () => (
    <div className="space-y-[20px]">
      <div className="bg-fill-base-1 p-[20px] rounded-[10px]">
        <h3 className="text-[16px] font-[600] text-text-base-primary mb-[12px]">Jira Configuration</h3>
        <div className="space-y-[16px]">
          <div>
            <label className="block text-[13px] font-[600] text-text-base-secondary mb-[8px]">
              Jira Site URL
            </label>
            <input
              type="text"
              placeholder="https://your-domain.atlassian.net"
              className="w-full px-[12px] py-[10px] border border-fill-base-3 rounded-[6px] text-[14px]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-[600] text-text-base-secondary mb-[8px]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your-email@company.com"
              className="w-full px-[12px] py-[10px] border border-fill-base-3 rounded-[6px] text-[14px]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-[600] text-text-base-secondary mb-[8px]">
              API Token
            </label>
            <input
              type="password"
              placeholder="Enter your Jira API token"
              className="w-full px-[12px] py-[10px] border border-fill-base-3 rounded-[6px] text-[14px]"
            />
            <p className="text-[11px] text-text-base-tertiary mt-[4px]">
              Generate an API token from your Atlassian account settings
            </p>
          </div>
        </div>
      </div>
      <div className="bg-fill-information-info/10 border border-fill-information-info/30 p-[16px] rounded-[10px]">
        <p className="text-[13px] text-text-base-secondary">
          <strong>Required Permissions:</strong> Read access to Projects, Issues, and Users
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-[16px]">
      <p className="text-[14px] text-text-base-secondary mb-[16px]">
        Select the object types you want to sync from Jira
      </p>
      {objectTypes.map((obj) => {
        const Icon = obj.icon;
        const isSelected = selectedObjects[obj.id];
        return (
          <div
            key={obj.id}
            className={`border rounded-[10px] p-[16px] cursor-pointer transition-all ${isSelected
                ? 'border-fill-brand-primary bg-fill-brand-primary-transparent'
                : 'border-fill-base-3 hover:border-fill-base-4'
              }`}
            onClick={() => toggleObject(obj.id)}
          >
            <div className="flex items-start gap-[12px]">
              <div className={`p-[10px] rounded-[8px] ${isSelected ? 'bg-fill-brand-primary text-white' : 'bg-fill-base-2'
                }`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-[15px] font-[600] text-text-base-primary">{obj.name}</h4>
                  {isSelected && <CheckCircle size={20} className="text-fill-brand-primary" />}
                </div>
                <p className="text-[13px] text-text-base-secondary mt-[4px]">{obj.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-[20px]">
      <p className="text-[14px] text-text-base-secondary mb-[16px]">
        Select attributes to sync and review how they map to the Kovrr data model
      </p>
      {objectTypes
        .filter(obj => selectedObjects[obj.id])
        .map((obj) => {
          const Icon = obj.icon;
          const isExpanded = expandedNodes[obj.id];
          return (
            <Card key={obj.id}>
              <CardHeader
                className="cursor-pointer hover:bg-fill-base-1"
                onClick={() => toggleNode(obj.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[12px]">
                    <Icon size={20} className="text-fill-brand-primary" />
                    <CardTitle className="text-[15px]">{obj.name}</CardTitle>
                    <Badge variant="secondary" className="text-[11px]">
                      {selectedAttributes[obj.id]?.length || 0} attributes
                    </Badge>
                  </div>
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
              </CardHeader>
              {isExpanded && (
                <CardContent>
                  <div className="space-y-[8px]">
                    {obj.attributes.map((attr) => {
                      const isSelected = selectedAttributes[obj.id]?.includes(attr.id);
                      const mappedField = obj.mapping[attr.id];
                      return (
                        <div
                          key={attr.id}
                          className="flex items-center justify-between p-[12px] bg-fill-base-1 rounded-[8px] hover:bg-fill-base-2 cursor-pointer"
                          onClick={() => toggleAttribute(obj.id, attr.id)}
                        >
                          <div className="flex items-center gap-[12px] flex-1">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => { }}
                              className="w-[16px] h-[16px]"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-[8px]">
                                <span className="text-[13px] font-[600] text-text-base-primary">
                                  {attr.name}
                                </span>
                                {attr.required && (
                                  <Badge variant="error" className="text-[10px]">Required</Badge>
                                )}
                              </div>
                              <span className="text-[11px] text-text-base-tertiary">{attr.type}</span>
                            </div>
                          </div>
                          {mappedField && (
                            <div className="flex items-center gap-[8px] text-[12px]">
                              <span className="text-text-base-tertiary">→</span>
                              <code className="px-[8px] py-[4px] bg-fill-base-2 rounded text-fill-brand-primary font-mono">
                                {mappedField}
                              </code>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-[20px]">
      <div className="bg-fill-base-1 p-[20px] rounded-[10px]">
        <h3 className="text-[16px] font-[600] text-text-base-primary mb-[16px]">Configuration Summary</h3>
        <div className="space-y-[12px]">
          <div className="flex justify-between text-[14px]">
            <span className="text-text-base-secondary">Connector:</span>
            <span className="font-[600] text-text-base-primary">Jira</span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-base-secondary">Objects to sync:</span>
            <span className="font-[600] text-text-base-primary">
              {Object.values(selectedObjects).filter(Boolean).length}
            </span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-base-secondary">Total attributes:</span>
            <span className="font-[600] text-text-base-primary">
              {Object.values(selectedAttributes).reduce((sum, attrs) => sum + attrs.length, 0)}
            </span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-text-base-secondary">Sync frequency:</span>
            <span className="font-[600] text-text-base-primary">Real-time (webhooks)</span>
          </div>
        </div>
      </div>
      <div className="bg-fill-base-1 p-[20px] rounded-[10px]">
        <h4 className="text-[14px] font-[600] text-text-base-primary mb-[12px]">Sync Behavior</h4>
        <div className="space-y-[8px]">
          <label className="flex items-center gap-[8px] cursor-pointer">
            <input type="checkbox" defaultChecked className="w-[16px] h-[16px]" />
            <span className="text-[13px] text-text-base-secondary">
              Create action items in Kovrr when new issues are created in Jira
            </span>
          </label>
          <label className="flex items-center gap-[8px] cursor-pointer">
            <input type="checkbox" defaultChecked className="w-[16px] h-[16px]" />
            <span className="text-[13px] text-text-base-secondary">
              Update Jira issues when action items are modified in Kovrr
            </span>
          </label>
          <label className="flex items-center gap-[8px] cursor-pointer">
            <input type="checkbox" className="w-[16px] h-[16px]" />
            <span className="text-[13px] text-text-base-secondary">
              Sync comments between Kovrr and Jira
            </span>
          </label>
        </div>
      </div>
      <div className="bg-fill-information-success/10 border border-fill-information-success/30 p-[16px] rounded-[10px]">
        <div className="flex items-start gap-[12px]">
          <CheckCircle size={20} className="text-fill-information-success mt-[2px]" />
          <div>
            <p className="text-[14px] font-[600] text-text-base-primary mb-[4px]">Ready to Connect</p>
            <p className="text-[13px] text-text-base-secondary">
              Your configuration is complete. Click "Connect" to start syncing data from Jira.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[20px]">
      <div className="bg-white rounded-[15px] max-w-[900px] w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-[24px] border-b border-fill-base-3">
          <div className="flex items-center justify-between mb-[20px]">
            <div>
              <h2 className="text-[24px] font-[700] text-text-base-primary">Jira Setup</h2>
              <p className="text-[14px] text-text-base-secondary mt-[4px]">
                Configure your Jira integration
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-text-base-tertiary hover:text-text-base-primary text-[24px] leading-none"
            >
              ×
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-[8px]">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center gap-[8px] flex-1">
                  <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-[600] ${currentStep === step.id
                      ? 'bg-fill-brand-primary text-white'
                      : currentStep > step.id
                        ? 'bg-fill-information-success text-white'
                        : 'bg-fill-base-2 text-text-base-tertiary'
                    }`}>
                    {currentStep > step.id ? <CheckCircle size={16} /> : step.id}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-[12px] font-[600] text-text-base-primary">{step.name}</p>
                    <p className="text-[10px] text-text-base-tertiary">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-[2px] w-full mx-[8px] ${currentStep > step.id ? 'bg-fill-information-success' : 'bg-fill-base-3'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-[24px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Footer */}
        <div className="p-[24px] border-t border-fill-base-3 flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => currentStep === 1 ? onClose() : setCurrentStep(currentStep - 1)}
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            onClick={() => {
              if (currentStep === 4) {
                onComplete?.();
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            {currentStep === 4 ? 'Connect' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JiraWizard;
