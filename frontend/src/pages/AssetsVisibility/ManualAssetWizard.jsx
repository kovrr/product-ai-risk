import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Save } from 'lucide-react';
import { calculateRiskScore, requiresExecutiveApproval } from '../../utils/riskCalculator';
import WizardProgress from './components/WizardProgress';
import Step1BasicInfo from './components/Step1BasicInfo';
import Step2RiskAssessment from './components/Step2RiskAssessment';
import Step3DataPrivacy from './components/Step3DataPrivacy';
import Step4Compliance from './components/Step4Compliance';
import Step5Technical from './components/Step5Technical';
import Step6Review from './components/Step6Review';

const ManualAssetWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    assetName: '',
    assetType: 'saas',
    vendor: '',
    version: '',
    deploymentType: 'cloud',
    assetOwner: '',
    technicalOwner: '',
    dateDeployed: '',
    businessUnit: '',
    primaryUseCase: '',
    
    // Step 2: Risk Assessment (with smart defaults)
    criticality: 'moderate',
    audienceReach: 'low',
    dataPrivacy: 'moderate',
    dataClassification: 'internal',
    ethicalRisk: 'low',
    complexity: 'moderate',
    cybersecurity: 'not-assessed',
    financialImpact: 'low',
    nonFinancialImpact: 'low',
    sustainability: 'unknown',
    resilience: 'moderate',
    humanOversight: 'human-in-loop',
    
    // Step 3: Data & Privacy
    dataSources: [],
    dataTypes: [],
    dataSegregation: 'yes',
    modelTraining: 'not-used',
    dataResidency: 'no',
    dataResidencyLocation: '',
    dataRetention: '30-90-days',
    privacyAssessment: 'not-required',
    gdprCompliance: 'not-applicable',
    
    // Step 4: Compliance & Governance
    regulatoryClassification: [],
    applicableRegulations: [],
    vendorAssessment: 'not-required',
    contractAIClauses: 'no-contract',
    thirdPartyAudit: [],
    governanceControls: 'in-development',
    modelDocumentation: 'not-applicable',
    explainability: 'moderate',
    
    // Step 5: Technical & Operational
    integrationPoints: [],
    authenticationMethod: [],
    numberOfUsers: '1-10',
    userAccessLevel: 'department',
    monitoring: 'moderate',
    incidentResponse: 'in-development',
    businessContinuity: 'partial',
    vendorSLA: '99.9',
    supportAvailability: 'business-hours',
    changeManagement: 'informal',
    
    // Step 6: Review & Submit
    mitigatingControls: '',
    knownIssues: '',
    exceptionRequests: '',
    reviewFrequency: 'quarterly',
    supportingDocuments: [],
    additionalNotes: '',
    executiveSponsor: '',
    approvalJustification: ''
  });

  const [riskScore, setRiskScore] = useState({ aggregate: 'low', percentage: 25, breakdown: {} });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Calculate risk score when Step 2 data changes
  useEffect(() => {
    const score = calculateRiskScore(formData);
    setRiskScore(score);
  }, [
    formData.criticality, formData.audienceReach, formData.dataPrivacy, 
    formData.dataClassification, formData.ethicalRisk, formData.complexity,
    formData.cybersecurity, formData.financialImpact, formData.nonFinancialImpact,
    formData.sustainability, formData.resilience, formData.humanOversight
  ]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.assetName.trim()) newErrors.assetName = 'Asset name is required';
      if (!formData.vendor.trim()) newErrors.vendor = 'Vendor/Provider is required';
      if (!formData.assetOwner.trim()) newErrors.assetOwner = 'Asset owner is required';
      if (!formData.dateDeployed) newErrors.dateDeployed = 'Deployment date is required';
      if (!formData.businessUnit) newErrors.businessUnit = 'Business unit is required';
      if (!formData.primaryUseCase.trim()) newErrors.primaryUseCase = 'Primary use case is required';
    }

    if (step === 6 && requiresExecutiveApproval(riskScore)) {
      if (!formData.executiveSponsor.trim()) newErrors.executiveSponsor = 'Executive sponsor is required for high-risk assets';
      if (!formData.approvalJustification.trim()) newErrors.approvalJustification = 'Approval justification is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement API call to save draft
      console.log('Saving draft:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Failed to save draft:', error);
      alert('Failed to save draft. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSaving(true);
    try {
      // TODO: Implement API call to submit asset
      const payload = {
        ...formData,
        riskScore: riskScore,
        status: requiresExecutiveApproval(riskScore) ? 'pending-executive-approval' : 'pending-review',
        submittedAt: new Date().toISOString()
      };
      
      console.log('Submitting asset:', payload);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      alert('Asset submitted successfully!');
      navigate('/assets');
    } catch (error) {
      console.error('Failed to submit asset:', error);
      alert('Failed to submit asset. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      errors,
      riskScore
    };

    switch (currentStep) {
      case 1:
        return <Step1BasicInfo {...stepProps} />;
      case 2:
        return <Step2RiskAssessment {...stepProps} />;
      case 3:
        return <Step3DataPrivacy {...stepProps} />;
      case 4:
        return <Step4Compliance {...stepProps} />;
      case 5:
        return <Step5Technical {...stepProps} />;
      case 6:
        return <Step6Review {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/assets')}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Assets
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-800">Manual Asset Registration</h1>
              <p className="text-neutral-600 mt-2">Complete this wizard to register a new AI asset</p>
            </div>
            <button
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="btn-secondary flex items-center gap-2"
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <WizardProgress currentStep={currentStep} />

        {/* Form Content */}
        <div className="card mb-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={18} />
            Previous
          </button>

          <div className="text-sm text-neutral-600">
            Step {currentStep} of 6
          </div>

          {currentStep < 6 ? (
            <button
              onClick={handleNext}
              className="btn-primary flex items-center gap-2"
            >
              Next
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="btn-primary flex items-center gap-2"
            >
              <Check size={18} />
              {isSaving ? 'Submitting...' : 'Submit for Review'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManualAssetWizard;
