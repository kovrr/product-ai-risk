import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Clock } from 'lucide-react';

/**
 * ActionModal - Shows detailed action workflow with steps
 * Demonstrates how to complete each top action with progress tracking
 */
export const ActionModal = ({ isOpen, onClose, action, onComplete, onStepToggle }) => {
  const [notes, setNotes] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  if (!isOpen || !action) return null;

  // Use completed steps from action (loaded from localStorage)
  const completedSteps = action.completedSteps || [];
  const initialStepsCount = completedSteps.length;

  // Define steps for each action type
  const actionSteps = {
    'review-data-retention': [
      { id: 1, title: 'Review current retention settings', description: 'Check ChatGPT data retention configuration' },
      { id: 2, title: 'Verify compliance requirements', description: 'Ensure alignment with GDPR, CCPA requirements' },
      { id: 3, title: 'Configure retention period', description: 'Set appropriate data retention timeframe' },
      { id: 4, title: 'Document policy', description: 'Update governance documentation' },
      { id: 5, title: 'Notify stakeholders', description: 'Inform relevant teams of changes' }
    ],
    'risk-assessment': [
      { id: 1, title: 'Access asset details', description: 'Navigate to GitHub Copilot asset page' },
      { id: 2, title: 'Complete risk questionnaire', description: 'Answer security and compliance questions' },
      { id: 3, title: 'Identify control gaps', description: 'Review required vs. implemented controls' },
      { id: 4, title: 'Document findings', description: 'Record risk assessment results' },
      { id: 5, title: 'Create mitigation plan', description: 'Define actions to address gaps' }
    ],
    'update-policy': [
      { id: 1, title: 'Review current policy', description: 'Check existing ChatGPT usage guidelines' },
      { id: 2, title: 'Identify gaps', description: 'Compare with best practices and regulations' },
      { id: 3, title: 'Draft policy updates', description: 'Write new policy sections' },
      { id: 4, title: 'Legal review', description: 'Get approval from legal/compliance team' },
      { id: 5, title: 'Publish and communicate', description: 'Share updated policy with organization' }
    ]
  };

  const steps = actionSteps[action.type] || [];

  const toggleStep = (stepId) => {
    const isCurrentlyCompleted = completedSteps.includes(stepId);
    const willBeCompleted = !isCurrentlyCompleted;
    onStepToggle(action.id, stepId, willBeCompleted);
    setHasChanges(true); // Mark that user made changes
  };

  const handleComplete = () => {
    // If all steps are complete, mark action as fully complete
    if (completedSteps.length === steps.length) {
      onComplete(action.id, notes);
    }
    // Close modal (progress already saved on each step toggle)
    onClose();
  };

  const progress = steps.length > 0 ? (completedSteps.length / steps.length) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-neutral-900 mb-2">{action.title}</h2>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Clock size={14} className="text-neutral-500" />
                  <span className="text-neutral-600">Due: {action.dueDate || 'Overdue'}</span>
                </span>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-600">Owner: {action.owner}</span>
                <span className="text-neutral-400">•</span>
                <span className={`font-semibold ${action.priority === 'critical' ? 'text-red-600' :
                  action.priority === 'high' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`}>
                  {action.priority.toUpperCase()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-neutral-700">Progress</span>
              <span className="text-neutral-600">{completedSteps.length} of {steps.length} steps</span>
            </div>
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${isCompleted
                    ? 'border-green-500 bg-green-50'
                    : 'border-neutral-200 hover:border-primary hover:bg-neutral-50'
                    }`}
                  onClick={() => toggleStep(step.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'bg-neutral-300'
                      }`}>
                      {isCompleted ? (
                        <CheckCircle size={16} className="text-white" />
                      ) : (
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isCompleted ? 'text-green-900' : 'text-neutral-900'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm mt-1 ${isCompleted ? 'text-green-700' : 'text-neutral-600'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notes Section */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Add any notes or comments about this action..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 bg-neutral-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              {completedSteps.length === steps.length ? (
                <>
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-green-600 font-medium">All steps completed!</span>
                </>
              ) : (
                <>
                  <AlertCircle size={16} className="text-orange-600" />
                  <span className="text-neutral-600">
                    {steps.length - completedSteps.length} step{steps.length - completedSteps.length !== 1 ? 's' : ''} remaining
                  </span>
                </>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleComplete}
                disabled={!hasChanges && completedSteps.length !== steps.length}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${hasChanges || completedSteps.length === steps.length
                  ? 'bg-primary text-white hover:bg-opacity-90'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
              >
                {completedSteps.length === steps.length ? 'Mark as Complete' : 'Save Progress'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
