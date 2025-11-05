import React from 'react';
import { Check, Info, AlertTriangle, Shield, FileText, Settings, CheckCircle } from 'lucide-react';

const WizardProgress = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Basic Info', icon: Info },
    { number: 2, title: 'Risk Assessment', icon: AlertTriangle },
    { number: 3, title: 'Data & Privacy', icon: Shield },
    { number: 4, title: 'Compliance', icon: FileText },
    { number: 5, title: 'Technical', icon: Settings },
    { number: 6, title: 'Review', icon: CheckCircle }
  ];

  return (
    <div className="card mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  currentStep === step.number
                    ? 'bg-primary text-white shadow-lg scale-110'
                    : currentStep > step.number
                    ? 'bg-success text-white'
                    : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                {currentStep > step.number ? (
                  <Check size={20} />
                ) : (
                  <step.icon size={20} />
                )}
              </div>
              <span className={`text-sm font-medium text-center transition-colors ${
                currentStep === step.number ? 'text-primary font-semibold' : 'text-neutral-600'
              }`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-1 flex-1 mx-2 mt-[-20px] transition-all duration-300 ${
                currentStep > step.number ? 'bg-success' : 'bg-neutral-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WizardProgress;
