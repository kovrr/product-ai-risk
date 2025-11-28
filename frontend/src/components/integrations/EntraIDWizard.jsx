import { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronDown, Database, Users, Shield, Key } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../atoms/card';
import { Button } from '../atoms/button';
import { Badge } from '../atoms/badge';

const EntraIDWizard = ({ onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedObjects, setSelectedObjects] = useState({
    users: true,
    groups: true,
    applications: true,
    servicePrincipals: false,
    devices: false,
  });
  const [expandedNodes, setExpandedNodes] = useState({
    users: true,
    groups: false,
    applications: false,
  });
  const [selectedAttributes, setSelectedAttributes] = useState({
    users: ['id', 'displayName', 'userPrincipalName', 'mail', 'department'],
    groups: ['id', 'displayName', 'description'],
    applications: ['id', 'displayName', 'appId'],
  });

  const objectTypes = [
    {
      id: 'users',
      name: 'Users',
      icon: Users,
      description: 'Sync user accounts and profiles',
      attributes: [
        { id: 'id', name: 'User ID', type: 'string', required: true },
        { id: 'displayName', name: 'Display Name', type: 'string', required: true },
        { id: 'userPrincipalName', name: 'User Principal Name', type: 'string', required: true },
        { id: 'mail', name: 'Email', type: 'string', required: false },
        { id: 'department', name: 'Department', type: 'string', required: false },
        { id: 'jobTitle', name: 'Job Title', type: 'string', required: false },
        { id: 'officeLocation', name: 'Office Location', type: 'string', required: false },
        { id: 'mobilePhone', name: 'Mobile Phone', type: 'string', required: false },
      ],
      mapping: {
        id: 'user_id',
        displayName: 'name',
        userPrincipalName: 'email',
        mail: 'email',
        department: 'department',
      }
    },
    {
      id: 'groups',
      name: 'Groups',
      icon: Shield,
      description: 'Sync security and distribution groups',
      attributes: [
        { id: 'id', name: 'Group ID', type: 'string', required: true },
        { id: 'displayName', name: 'Display Name', type: 'string', required: true },
        { id: 'description', name: 'Description', type: 'string', required: false },
        { id: 'mail', name: 'Email', type: 'string', required: false },
        { id: 'groupTypes', name: 'Group Types', type: 'array', required: false },
      ],
      mapping: {
        id: 'group_id',
        displayName: 'name',
        description: 'description',
      }
    },
    {
      id: 'applications',
      name: 'Applications',
      icon: Database,
      description: 'Sync registered applications and AI tools',
      attributes: [
        { id: 'id', name: 'Application ID', type: 'string', required: true },
        { id: 'displayName', name: 'Display Name', type: 'string', required: true },
        { id: 'appId', name: 'App ID', type: 'string', required: true },
        { id: 'description', name: 'Description', type: 'string', required: false },
        { id: 'publisherDomain', name: 'Publisher Domain', type: 'string', required: false },
      ],
      mapping: {
        id: 'asset_id',
        displayName: 'name',
        appId: 'vendor_id',
        description: 'description',
      }
    },
    {
      id: 'servicePrincipals',
      name: 'Service Principals',
      icon: Key,
      description: 'Sync service principals and managed identities',
      attributes: [
        { id: 'id', name: 'Service Principal ID', type: 'string', required: true },
        { id: 'displayName', name: 'Display Name', type: 'string', required: true },
        { id: 'appId', name: 'App ID', type: 'string', required: true },
      ],
      mapping: {
        id: 'service_id',
        displayName: 'name',
        appId: 'app_id',
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
        <h3 className="text-[16px] font-[600] text-text-base-primary mb-[12px]">Microsoft Entra ID Configuration</h3>
        <div className="space-y-[16px]">
          <div>
            <label className="block text-[13px] font-[600] text-text-base-secondary mb-[8px]">
              Tenant ID
            </label>
            <input
              type="text"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              className="w-full px-[12px] py-[10px] border border-fill-base-3 rounded-[6px] text-[14px]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-[600] text-text-base-secondary mb-[8px]">
              Client ID
            </label>
            <input
              type="text"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              className="w-full px-[12px] py-[10px] border border-fill-base-3 rounded-[6px] text-[14px]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-[600] text-text-base-secondary mb-[8px]">
              Client Secret
            </label>
            <input
              type="password"
              placeholder="Enter client secret"
              className="w-full px-[12px] py-[10px] border border-fill-base-3 rounded-[6px] text-[14px]"
            />
          </div>
        </div>
      </div>
      <div className="bg-fill-information-info/10 border border-fill-information-info/30 p-[16px] rounded-[10px]">
        <p className="text-[13px] text-text-base-secondary">
          <strong>Required Permissions:</strong> User.Read.All, Group.Read.All, Application.Read.All
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-[16px]">
      <p className="text-[14px] text-text-base-secondary mb-[16px]">
        Select the object types you want to sync from Microsoft Entra ID
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
            <span className="font-[600] text-text-base-primary">Microsoft Entra ID</span>
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
              Your configuration is complete. Click "Connect" to start syncing data from Microsoft Entra ID.
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
              <h2 className="text-[24px] font-[700] text-text-base-primary">Microsoft Entra ID Setup</h2>
              <p className="text-[14px] text-text-base-secondary mt-[4px]">
                Configure your Microsoft Entra ID integration
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

export default EntraIDWizard;
