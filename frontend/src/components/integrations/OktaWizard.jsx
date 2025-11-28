import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../atoms/button';

const OktaWizard = ({ onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, name: 'Authentication', description: 'Configure API credentials' },
    { id: 2, name: 'Select Data', description: 'Choose data to sync' },
    { id: 3, name: 'Review & Connect', description: 'Confirm and activate' },
  ];

  const renderStep1 = () => (
    <div className="space-y-[20px]">
      <div className="bg-fill-base-1 p-[20px] rounded-[10px]">
        <h3 className="text-[16px] font-[600] text-text-base-primary mb-[12px]">Okta Configuration</h3>
        <div className="space-y-[16px]">
          <div>
            <label className="block text-[13px] font-[600] text-text-base-secondary mb-[8px]">
              Okta Domain
            </label>
            <input
              type="text"
              placeholder="your-domain.okta.com"
              className="w-full px-[12px] py-[10px] border border-fill-base-3 rounded-[6px] text-[14px]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-[600] text-text-base-secondary mb-[8px]">
              API Token
            </label>
            <input
              type="password"
              placeholder="Enter your Okta API token"
              className="w-full px-[12px] py-[10px] border border-fill-base-3 rounded-[6px] text-[14px]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-[16px]">
      <p className="text-[14px] text-text-base-secondary">Select the data types to sync from Okta</p>
      {['Users', 'Groups', 'Applications'].map((item) => (
        <div key={item} className="border border-fill-base-3 rounded-[10px] p-[16px]">
          <label className="flex items-center gap-[12px] cursor-pointer">
            <input type="checkbox" defaultChecked className="w-[16px] h-[16px]" />
            <span className="text-[14px] font-[600] text-text-base-primary">{item}</span>
          </label>
        </div>
      ))}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-[20px]">
      <div className="bg-fill-information-success/10 border border-fill-information-success/30 p-[16px] rounded-[10px]">
        <div className="flex items-start gap-[12px]">
          <CheckCircle size={20} className="text-fill-information-success mt-[2px]" />
          <div>
            <p className="text-[14px] font-[600] text-text-base-primary mb-[4px]">Ready to Connect</p>
            <p className="text-[13px] text-text-base-secondary">
              Click "Connect" to start syncing data from Okta.
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
              <h2 className="text-[24px] font-[700] text-text-base-primary">Okta Setup</h2>
              <p className="text-[14px] text-text-base-secondary mt-[4px]">Configure your Okta integration</p>
            </div>
            <button onClick={onClose} className="text-text-base-tertiary hover:text-text-base-primary text-[24px]">×</button>
          </div>
          <div className="flex items-center gap-[8px]">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-[600] ${currentStep >= step.id ? 'bg-fill-brand-primary text-white' : 'bg-fill-base-2 text-text-base-tertiary'
                  }`}>
                  {step.id}
                </div>
                {index < steps.length - 1 && <div className={`h-[2px] w-full mx-[8px] ${currentStep > step.id ? 'bg-fill-brand-primary' : 'bg-fill-base-3'}`} />}
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
          <Button variant="secondary" onClick={() => currentStep === 1 ? onClose() : setCurrentStep(currentStep - 1)}>
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button onClick={() => currentStep === 3 ? onComplete?.() : setCurrentStep(currentStep + 1)}>
            {currentStep === 3 ? 'Connect' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OktaWizard;
