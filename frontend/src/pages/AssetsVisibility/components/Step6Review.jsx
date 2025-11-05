import React from 'react';
import { Upload, X, AlertTriangle } from 'lucide-react';
import { getRiskColor, getRiskLabel, requiresExecutiveApproval } from '../../../utils/riskCalculator';

const Step6Review = ({ formData, updateFormData, errors, riskScore }) => {
  const needsExecutiveApproval = requiresExecutiveApproval(riskScore);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const currentFiles = formData.supportingDocuments || [];
    updateFormData('supportingDocuments', [...currentFiles, ...files]);
  };

  const removeFile = (index) => {
    const currentFiles = formData.supportingDocuments || [];
    updateFormData('supportingDocuments', currentFiles.filter((_, i) => i !== index));
  };

  // Calculate next review date based on frequency
  React.useEffect(() => {
    if (formData.reviewFrequency) {
      const today = new Date();
      let nextDate = new Date(today);
      
      switch (formData.reviewFrequency) {
        case 'monthly':
          nextDate.setMonth(today.getMonth() + 1);
          break;
        case 'quarterly':
          nextDate.setMonth(today.getMonth() + 3);
          break;
        case 'semi-annually':
          nextDate.setMonth(today.getMonth() + 6);
          break;
        case 'annually':
          nextDate.setFullYear(today.getFullYear() + 1);
          break;
        default:
          nextDate = null;
      }
      
      if (nextDate) {
        updateFormData('nextReviewDate', nextDate.toISOString().split('T')[0]);
      }
    }
  }, [formData.reviewFrequency]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Review & Submit</h2>
        <p className="text-neutral-600">Final review and additional documentation</p>
      </div>

      {/* Summary Section */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-neutral-800 mb-4">Asset Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-neutral-600">Asset Name:</span>
            <p className="font-semibold text-neutral-800">{formData.assetName || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-neutral-600">Vendor:</span>
            <p className="font-semibold text-neutral-800">{formData.vendor || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-neutral-600">Asset Type:</span>
            <p className="font-semibold text-neutral-800 capitalize">{formData.assetType.replace('-', ' ')}</p>
          </div>
          <div>
            <span className="text-neutral-600">Business Unit:</span>
            <p className="font-semibold text-neutral-800 capitalize">{formData.businessUnit || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Risk Score Summary */}
      <div className={`border-2 rounded-lg p-4 ${getRiskColor(riskScore.aggregate)}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">Final Risk Score: {getRiskLabel(riskScore.aggregate)}</h3>
          <span className="text-2xl font-bold">{riskScore.percentage}%</span>
        </div>
        <div className="w-full bg-white/50 rounded-full h-3 mb-2">
          <div
            className={`h-3 rounded-full transition-all ${
              riskScore.aggregate === 'low' ? 'bg-success' :
              riskScore.aggregate === 'moderate' ? 'bg-warning' :
              'bg-error'
            }`}
            style={{ width: `${riskScore.percentage}%` }}
          />
        </div>
        {needsExecutiveApproval && (
          <div className="flex items-center gap-2 mt-3 p-3 bg-white/70 rounded-lg">
            <AlertTriangle size={20} className="text-error" />
            <p className="text-sm font-semibold">Executive approval required for this high-risk asset</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Mitigating Controls */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Mitigating Controls
          </label>
          <textarea
            className="input"
            rows="4"
            placeholder="Describe any controls in place to mitigate identified risks..."
            maxLength="1000"
            value={formData.mitigatingControls}
            onChange={(e) => updateFormData('mitigatingControls', e.target.value)}
          />
          <p className="text-neutral-500 text-sm mt-1">{formData.mitigatingControls.length}/1000</p>
        </div>

        {/* Known Issues/Limitations */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Known Issues/Limitations
          </label>
          <textarea
            className="input"
            rows="4"
            placeholder="Document any known issues, limitations, or concerns..."
            maxLength="1000"
            value={formData.knownIssues}
            onChange={(e) => updateFormData('knownIssues', e.target.value)}
          />
          <p className="text-neutral-500 text-sm mt-1">{formData.knownIssues.length}/1000</p>
        </div>

        {/* Exception Requests */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Exception Requests
          </label>
          <textarea
            className="input"
            rows="4"
            placeholder="If this asset requires policy exceptions, describe them here..."
            maxLength="1000"
            value={formData.exceptionRequests}
            onChange={(e) => updateFormData('exceptionRequests', e.target.value)}
          />
          <p className="text-neutral-500 text-sm mt-1">{formData.exceptionRequests.length}/1000</p>
        </div>

        {/* Review Frequency */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Review Frequency <span className="text-error">*</span>
            </label>
            <select
              className="input"
              value={formData.reviewFrequency}
              onChange={(e) => updateFormData('reviewFrequency', e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="semi-annually">Semi-Annually</option>
              <option value="annually">Annually</option>
              <option value="as-needed">As Needed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Next Review Date
            </label>
            <input
              type="date"
              className="input"
              value={formData.nextReviewDate}
              onChange={(e) => updateFormData('nextReviewDate', e.target.value)}
              readOnly
            />
          </div>
        </div>

        {/* Supporting Documents */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Supporting Documents
          </label>
          <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload size={32} className="mx-auto text-neutral-400 mb-2" />
              <p className="text-sm text-neutral-600 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-neutral-500">
                PDF, DOC, XLS, TXT (max 25MB each)
              </p>
            </label>
          </div>

          {/* Uploaded Files List */}
          {formData.supportingDocuments && formData.supportingDocuments.length > 0 && (
            <div className="mt-3 space-y-2">
              {formData.supportingDocuments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <span className="text-sm text-neutral-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-error hover:text-error/80"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Additional Notes
          </label>
          <textarea
            className="input"
            rows="4"
            placeholder="Any other relevant information..."
            maxLength="1000"
            value={formData.additionalNotes}
            onChange={(e) => updateFormData('additionalNotes', e.target.value)}
          />
          <p className="text-neutral-500 text-sm mt-1">{formData.additionalNotes.length}/1000</p>
        </div>

        {/* Executive Approval Section (conditional) */}
        {needsExecutiveApproval && (
          <div className="border-2 border-error/30 bg-error/5 rounded-lg p-6">
            <h3 className="text-lg font-bold text-error mb-4 flex items-center gap-2">
              <AlertTriangle size={20} />
              Executive Approval Required
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Executive Sponsor <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  className={`input ${errors.executiveSponsor ? 'border-error' : ''}`}
                  placeholder="Executive sponsor name"
                  value={formData.executiveSponsor}
                  onChange={(e) => updateFormData('executiveSponsor', e.target.value)}
                />
                {errors.executiveSponsor && (
                  <p className="text-error text-sm mt-1">{errors.executiveSponsor}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Approval Justification <span className="text-error">*</span>
                </label>
                <textarea
                  className={`input ${errors.approvalJustification ? 'border-error' : ''}`}
                  rows="4"
                  placeholder="Provide justification for executive approval..."
                  maxLength="500"
                  value={formData.approvalJustification}
                  onChange={(e) => updateFormData('approvalJustification', e.target.value)}
                />
                {errors.approvalJustification && (
                  <p className="text-error text-sm mt-1">{errors.approvalJustification}</p>
                )}
                <p className="text-neutral-500 text-sm mt-1">
                  {formData.approvalJustification.length}/500
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step6Review;
