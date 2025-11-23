import { useState } from 'react';
import { ArrowLeft, Paperclip } from 'lucide-react';

const ComplianceReadiness = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'results', 'questionnaire'
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showNewAssessmentModal, setShowNewAssessmentModal] = useState(false);
  const [selectedGranularity, setSelectedGranularity] = useState('category');
  const [selectedScoringScale, setSelectedScoringScale] = useState('1-5');
  const [selectedAnswerStructure, setSelectedAnswerStructure] = useState('single');

  // Questionnaire state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentRating, setCurrentRating] = useState(null);
  const [targetRating, setTargetRating] = useState(null);
  const [isInapplicable, setIsInapplicable] = useState(false);
  const [notes, setNotes] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('');

  // Total questions (mock data)
  const totalQuestions = 73;

  const handleStartNewAssessment = () => {
    setShowNewAssessmentModal(true);
  };

  const handleCloseModal = () => {
    setShowNewAssessmentModal(false);
  };

  const handleStartAssessment = () => {
    setShowNewAssessmentModal(false);
    setCurrentView('questionnaire');
    setSelectedAssessment(null);
  };

  const handleAddNote = () => {
    if (notes.trim()) {
      alert(`Note added: ${notes}`);
      setNotes('');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Reset current question state
      setCurrentRating(null);
      setTargetRating(null);
      setIsInapplicable(false);
      setNotes('');
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Reset current question state
      setCurrentRating(null);
      setTargetRating(null);
      setIsInapplicable(false);
      setNotes('');
    } else {
      alert('Assessment complete!');
    }
  };

  // Mock assessments data
  const assessments = [
    {
      id: 1,
      name: 'EU AI Act Assessment',
      createdOn: '08 Nov 2025',
      assessmentScore: 3.42,
      scorePercentage: 85,
      framework: 'EU AI ACT',
      granularity: 'Question',
      answerStructure: 'Multi-Dimensional',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'NIST AI RMF',
      createdOn: '05 Nov 2025',
      assessmentScore: 2.85,
      scorePercentage: 71,
      framework: 'NIST AI RMF',
      granularity: 'Sub-category',
      answerStructure: 'Single Score',
      status: 'Completed',
    },
    {
      id: 3,
      name: 'ISO 42001 Assessment',
      createdOn: '02 Nov 2025',
      assessmentScore: 3.15,
      scorePercentage: 79,
      framework: 'ISO 42001:2023',
      granularity: 'Question',
      answerStructure: 'Multi-Dimensional',
      status: 'Completed',
    },
    {
      id: 4,
      name: 'Colorado SB21-169',
      createdOn: '28 Oct 2025',
      assessmentScore: 3.68,
      scorePercentage: 92,
      framework: 'Colorado Local Law No. SB21-169',
      granularity: 'Question',
      answerStructure: 'Single Score',
      status: 'Completed',
    },
    {
      id: 5,
      name: 'NYC Local Law 144',
      createdOn: '22 Oct 2025',
      assessmentScore: 3.91,
      scorePercentage: 98,
      framework: 'New York City Local Law No. 144',
      granularity: 'Question',
      answerStructure: 'Multi-Dimensional',
      status: 'Completed',
    },
  ];

  const getStatusBadge = (status) => {
    if (status === 'Completed') {
      return 'bg-[rgba(13,199,131,0.1)] text-[rgb(13,199,131)]';
    }
    if (status === 'In Progress') {
      return 'bg-[rgba(255,153,0,0.1)] text-[rgb(255,153,0)]';
    }
    return 'bg-[rgba(169,180,188,0.1)] text-[rgb(74,85,104)]';
  };

  const getStatusIcon = (status) => {
    if (status === 'Completed') return '✓';
    if (status === 'In Progress') return '⚠';
    return '○';
  };

  const handleViewResults = (assessment) => {
    setSelectedAssessment(assessment);
    setCurrentView('results');
  };

  const handleGoToQuestionnaire = () => {
    setCurrentView('questionnaire');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedAssessment(null);
  };

  // ==================== ASSESSMENT LIST VIEW ====================
  if (currentView === 'list') {
    return (
      <>
        <div className="space-y-[30px]">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-[38px] font-[700] text-[rgb(26,32,44)] tracking-[-0.5px] m-0">
              Compliance Readiness
            </h1>
            <button
              onClick={handleStartNewAssessment}
              className="inline-flex items-center gap-[8px] px-[16px] py-[8px] bg-[rgb(85,81,247)] text-white text-[14px] font-[600] rounded-[6px] border-none shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] cursor-pointer transition-all duration-200 hover:bg-[rgb(97,94,251)]"
            >
              Start New Assessment
            </button>
          </div>

          {/* Average Assessment Score Card */}
          <div className="bg-gradient-to-br from-[rgb(85,81,247)] to-[rgb(97,94,251)] rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.1)_0px_4px_12px_0px]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[14px] font-[600] text-white/80 uppercase tracking-[0.5px] mb-[8px]">
                  Average Assessment Score
                </div>
                <div className="flex items-baseline gap-[8px]">
                  <span className="text-[48px] font-[700] text-white leading-none">
                    {Math.round(assessments.reduce((sum, a) => sum + a.scorePercentage, 0) / assessments.length)}
                  </span>
                  <span className="text-[24px] font-[600] text-white/90">%</span>
                </div>
                <div className="text-[13px] text-white/80 mt-[8px]">
                  Based on {assessments.length} completed assessments
                </div>
              </div>
              <div className="w-[120px] h-[120px] relative">
                <svg className="transform -rotate-90" width="120" height="120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    strokeDashoffset={`${2 * Math.PI * 52 * (1 - (assessments.reduce((sum, a) => sum + a.scorePercentage, 0) / assessments.length) / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[20px] font-[700] text-white">
                  {Math.round(assessments.reduce((sum, a) => sum + a.scorePercentage, 0) / assessments.length)}%
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards Grid - Dynamic from assessments data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[20px]">
            {assessments.map((assessment) => {
              // Extract short framework name for card title
              const getShortFrameworkName = (framework) => {
                if (framework.includes('EU AI ACT')) return 'EU AI ACT';
                if (framework.includes('NIST')) return 'NIST AI RMF';
                if (framework.includes('ISO')) return 'ISO 42001:2023';
                if (framework.includes('Colorado')) return 'Colorado SB21-169';
                if (framework.includes('New York')) return 'NYC Local Law 144';
                return framework;
              };

              return (
                <div key={assessment.id} className="bg-white rounded-[15px] p-[20px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
                  <div className="text-[14px] font-[600] text-[rgb(26,32,44)] mb-[12px]">
                    {getShortFrameworkName(assessment.framework)}
                  </div>
                  <div className="flex items-baseline gap-[4px] mb-[12px]">
                    <span className="text-[32px] font-[700] text-[rgb(85,81,247)]">{assessment.scorePercentage}</span>
                    <span className="text-[18px] font-[600] text-[rgb(85,81,247)]">%</span>
                  </div>
                  <div className="w-full h-[6px] bg-[rgb(237,242,247)] rounded-[3px] overflow-hidden mb-[8px]">
                    <div className="h-full bg-[rgb(85,81,247)] rounded-[3px]" style={{ width: `${assessment.scorePercentage}%` }}></div>
                  </div>
                  <div className="text-[12px] text-[rgb(74,85,104)]">
                    {assessment.status === 'Completed' ? '1 Assessment Completed' : 'In Progress'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Assessment Table */}
          <div className="bg-white rounded-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-[rgb(237,242,247)]">
                <tr>
                  <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px]">
                    Name
                  </th>
                  <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px]">
                    Created On
                  </th>
                  <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px]">
                    Assessment Score
                  </th>
                  <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px]">
                    Completion %
                  </th>
                  <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px]">
                    Framework
                  </th>
                  <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px]">
                    Granularity
                  </th>
                  <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px]">
                    Answer Structure
                  </th>
                  <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px]">
                    Status
                  </th>
                  <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px]">
                    Resume/Results
                  </th>
                  <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((assessment) => (
                  <tr
                    key={assessment.id}
                    onClick={() => assessment.status === 'Completed' && handleViewResults(assessment)}
                    className={`transition-colors duration-150 bg-white ${assessment.status === 'Completed' ? 'cursor-pointer hover:bg-[rgb(236,242,252)]' : ''
                      }`}
                  >
                    <td className="px-[16px] py-[16px] border-b border-[rgb(220,229,242)] text-[rgb(26,32,44)] text-[14px] font-[600]">
                      {assessment.name}
                    </td>
                    <td className="px-[16px] py-[16px] border-b border-[rgb(220,229,242)] text-[rgb(74,85,104)] text-[14px]">
                      {assessment.createdOn}
                    </td>
                    <td className="px-[16px] py-[16px] border-b border-[rgb(220,229,242)]">
                      <div className="flex items-center gap-[8px]">
                        <span className="text-[20px] font-[700] text-[rgb(26,32,44)]">
                          {assessment.assessmentScore}
                        </span>
                        <div className="flex-1 h-[8px] bg-[rgb(237,242,247)] rounded-[4px] overflow-hidden">
                          <div
                            className="h-full bg-[rgb(255,153,0)] rounded-[4px]"
                            style={{ width: `${assessment.scorePercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-[16px] py-[16px] border-b border-[rgb(220,229,242)]">
                      <div className="flex items-center gap-[8px]">
                        <span className="text-[18px] font-[700] text-[rgb(85,81,247)]">
                          {assessment.scorePercentage}%
                        </span>
                        <div className="w-[60px] h-[6px] bg-[rgb(237,242,247)] rounded-[3px] overflow-hidden">
                          <div
                            className="h-full bg-[rgb(85,81,247)] rounded-[3px]"
                            style={{ width: `${assessment.scorePercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-[16px] py-[16px] border-b border-[rgb(220,229,242)] text-[rgb(74,85,104)] text-[14px]">
                      {assessment.framework}
                    </td>
                    <td className="px-[16px] py-[16px] border-b border-[rgb(220,229,242)] text-[rgb(74,85,104)] text-[14px]">
                      {assessment.granularity === 'Not Available' ? (
                        <span className="text-[14px] text-[rgb(113,118,126)]">{assessment.granularity}</span>
                      ) : (
                        assessment.granularity
                      )}
                    </td>
                    <td className="px-[16px] py-[16px] border-b border-[rgb(220,229,242)] text-[rgb(74,85,104)] text-[14px]">
                      {assessment.answerStructure === 'Not Available' ? (
                        <span className="text-[14px] text-[rgb(113,118,126)]">{assessment.answerStructure}</span>
                      ) : (
                        assessment.answerStructure
                      )}
                    </td>
                    <td className="px-[16px] py-[16px] border-b border-[rgb(220,229,242)] text-[rgb(48,48,69)] text-[14px]">
                      <span className={`inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px] text-[13px] font-[600] ${getStatusBadge(assessment.status)}`}>
                        {getStatusIcon(assessment.status)} {assessment.status}
                      </span>
                    </td>
                    <td className="px-[16px] py-[16px] border-b border-[rgb(220,229,242)] text-[rgb(48,48,69)] text-[14px]">
                      {assessment.status === 'Completed' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewResults(assessment);
                          }}
                          className="bg-white text-[rgb(74,85,104)] text-[13px] font-[600] px-[20px] py-[10px] border border-[rgb(220,229,242)] rounded-[6px] cursor-pointer transition-all duration-200 hover:bg-[rgb(248,250,252)] uppercase tracking-[0.3px]"
                        >
                          FULL RESULTS
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-white text-[rgb(169,180,188)] text-[13px] font-[600] px-[20px] py-[10px] border border-[rgb(220,229,242)] rounded-[6px] cursor-not-allowed uppercase tracking-[0.3px]"
                        >
                          NOT AVAILABLE
                        </button>
                      )}
                    </td>
                    <td className="px-[20px] py-[18px] border-b border-[rgb(237,242,247)] text-[rgb(74,85,104)] text-[14px] text-center">
                      <button className="bg-transparent border-none text-[rgb(113,118,126)] text-[20px] cursor-pointer hover:text-[rgb(74,85,104)] transition-colors">
                        ⋮
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Results count */}
          <div className="mt-[16px] text-[12px] text-[rgb(74,85,104)]">
            Results: 1 - {assessments.length} of {assessments.length}
          </div>
        </div>

        {/* New Assessment Modal */}
        {showNewAssessmentModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(30, 30, 30, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'rgb(255, 255, 255)',
              borderRadius: '15px',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 20px 0px'
            }}>
              {/* Modal Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: '1px solid rgb(220, 229, 242)'
              }}>
                <span style={{ fontSize: '20px', fontWeight: '700', color: 'rgb(26, 32, 44)' }}>
                  New Control Assessment
                </span>
                <button
                  onClick={handleCloseModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: 'rgb(74, 85, 104)',
                    padding: 0,
                    lineHeight: 1
                  }}
                >
                  ×
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '24px' }}>
                <p style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', marginBottom: '24px' }}>
                  Customize your control evaluation based on your preferred cybersecurity framework and assessment style
                </p>

                <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(26, 32, 44)', marginBottom: '16px' }}>
                  Control Assessment Information
                </div>

                {/* Name */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(26, 32, 44)', display: 'block', marginBottom: '8px' }}>
                    Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter assessment name"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgb(220, 229, 242)',
                      fontSize: '14px',
                      fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif'
                    }}
                  />
                </div>

                {/* Company */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(26, 32, 44)', display: 'block', marginBottom: '8px' }}>
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgb(220, 229, 242)',
                      fontSize: '14px',
                      fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif'
                    }}
                  />
                </div>

                {/* Controls Framework */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(26, 32, 44)', display: 'block', marginBottom: '8px' }}>
                    Controls Framework
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgb(220, 229, 242)',
                    fontSize: '14px',
                    fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
                    backgroundColor: 'rgb(255, 255, 255)'
                  }}>
                    <option>NIST AI RMF</option>
                    <option>ISO/IEC 42001</option>
                    <option>EU AI Act</option>
                    <option>Colorado SB21-169</option>
                    <option>NYC Local Law 144</option>
                  </select>
                </div>

                {/* Granularity Level */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(26, 32, 44)', display: 'block', marginBottom: '12px' }}>
                    Granularity Level
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {/* Category Option */}
                    <div
                      onClick={() => setSelectedGranularity('category')}
                      style={{
                        padding: '16px',
                        border: selectedGranularity === 'category' ? '2px solid rgb(85, 81, 247)' : '1px solid rgb(220, 229, 242)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        backgroundColor: selectedGranularity === 'category' ? 'rgb(236, 242, 252)' : 'rgb(255, 255, 255)'
                      }}
                    >
                      <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(26, 32, 44)', marginBottom: '8px' }}>
                        Category
                      </div>
                      <div style={{ fontSize: '13px', color: 'rgb(74, 85, 104)', lineHeight: '1.5', marginBottom: '8px' }}>
                        The highest level grouping of controls. Selecting this granularity aggregates results at the category level.
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', fontStyle: 'italic' }}>
                        Summarize the assessment by category (e.g., Governance).
                      </div>
                    </div>

                    {/* Sub-category Option */}
                    <div
                      onClick={() => setSelectedGranularity('subcategory')}
                      style={{
                        padding: '16px',
                        border: selectedGranularity === 'subcategory' ? '2px solid rgb(85, 81, 247)' : '1px solid rgb(220, 229, 242)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        backgroundColor: selectedGranularity === 'subcategory' ? 'rgb(236, 242, 252)' : 'rgb(255, 255, 255)'
                      }}
                    >
                      <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(26, 32, 44)', marginBottom: '8px' }}>
                        Sub-category
                      </div>
                      <div style={{ fontSize: '13px', color: 'rgb(74, 85, 104)', lineHeight: '1.5', marginBottom: '8px' }}>
                        A more specific grouping beneath a category. Use this granularity to view results for individual sub-categories.
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', fontStyle: 'italic' }}>
                        Drill down to the Access Control sub-category within Governance.
                      </div>
                    </div>
                  </div>

                  {/* Question Option */}
                  <div
                    onClick={() => setSelectedGranularity('question')}
                    style={{
                      marginTop: '12px',
                      padding: '16px',
                      border: selectedGranularity === 'question' ? '2px solid rgb(85, 81, 247)' : '1px solid rgb(220, 229, 242)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: selectedGranularity === 'question' ? 'rgb(236, 242, 252)' : 'rgb(255, 255, 255)'
                    }}
                  >
                    <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(26, 32, 44)', marginBottom: '8px' }}>
                      Question
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgb(74, 85, 104)', lineHeight: '1.5', marginBottom: '8px' }}>
                      The most detailed level, showing each individual implementation question.
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', fontStyle: 'italic' }}>
                      View granular question-level results.
                    </div>
                  </div>
                </div>

                {/* Scoring Scale */}
                <div style={{ marginBottom: '24px', marginTop: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(26, 32, 44)', display: 'block', marginBottom: '12px' }}>
                    Scoring Scale
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {/* 0-4 Scale */}
                    <div
                      onClick={() => setSelectedScoringScale('0-4')}
                      style={{
                        padding: '16px',
                        border: selectedScoringScale === '0-4' ? '2px solid rgb(85, 81, 247)' : '2px solid rgb(220, 229, 242)',
                        borderRadius: '12px',
                        backgroundColor: selectedScoringScale === '0-4' ? 'rgb(236, 242, 252)' : 'rgb(255, 255, 255)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(26, 32, 44)' }}>
                        0 - 4
                      </div>
                    </div>

                    {/* 1-5 Scale */}
                    <div
                      onClick={() => setSelectedScoringScale('1-5')}
                      style={{
                        padding: '16px',
                        border: selectedScoringScale === '1-5' ? '2px solid rgb(85, 81, 247)' : '2px solid rgb(220, 229, 242)',
                        borderRadius: '12px',
                        backgroundColor: selectedScoringScale === '1-5' ? 'rgb(236, 242, 252)' : 'rgb(255, 255, 255)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(26, 32, 44)' }}>
                        1 - 5
                      </div>
                    </div>
                  </div>
                </div>

                {/* Answer Structure */}
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(26, 32, 44)', display: 'block', marginBottom: '12px' }}>
                    Answer Structure
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {/* Single Score */}
                    <div
                      onClick={() => setSelectedAnswerStructure('single')}
                      style={{
                        padding: '20px',
                        border: selectedAnswerStructure === 'single' ? '2px solid rgb(85, 81, 247)' : '2px solid rgb(220, 229, 242)',
                        borderRadius: '12px',
                        backgroundColor: selectedAnswerStructure === 'single' ? 'rgb(236, 242, 252)' : 'rgb(255, 255, 255)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(26, 32, 44)', marginBottom: '8px' }}>
                        Single Score
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgb(74, 85, 104)', lineHeight: '1.5' }}>
                        Provide a single score per question
                      </div>
                    </div>

                    {/* Multi-Dimensional */}
                    <div
                      onClick={() => setSelectedAnswerStructure('multi')}
                      style={{
                        padding: '20px',
                        border: selectedAnswerStructure === 'multi' ? '2px solid rgb(85, 81, 247)' : '2px solid rgb(220, 229, 242)',
                        borderRadius: '12px',
                        backgroundColor: selectedAnswerStructure === 'multi' ? 'rgb(236, 242, 252)' : 'rgb(255, 255, 255)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(26, 32, 44)', marginBottom: '8px' }}>
                        Multi-Dimensional
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgb(74, 85, 104)', lineHeight: '1.5' }}>
                        Score each question across multiple dimensions: Existence, Documentation, Enforcement, Coverage.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                padding: '20px 24px',
                borderTop: '1px solid rgb(220, 229, 242)'
              }}>
                <button
                  onClick={handleCloseModal}
                  style={{
                    fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    border: '1px solid rgb(169, 180, 188)',
                    cursor: 'pointer',
                    backgroundColor: 'rgb(255, 255, 255)',
                    color: 'rgb(74, 85, 104)',
                    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartAssessment}
                  style={{
                    fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
                    fontSize: '14px',
                    fontWeight: '600',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: 'rgb(85, 81, 247)',
                    color: 'rgb(255, 255, 255)',
                    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
                  }}
                >
                  Start Assessment
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // ==================== RESULTS DASHBOARD VIEW ====================
  if (currentView === 'results') {
    return (
      <div style={{ padding: '30px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <button
            onClick={handleBackToList}
            style={{
              fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid rgb(169, 180, 188)',
              cursor: 'pointer',
              backgroundColor: 'rgb(255, 255, 255)',
              color: 'rgb(74, 85, 104)',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
            }}
          >
            ← Back
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '38px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: 0 }}>
              Control Assessment Results
            </h1>
            <p style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', marginTop: '4px' }}>Assessed On: {selectedAssessment?.createdOn || 'N/A'}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto' }}>
            <button
              onClick={() => alert('Integration Hub: Connect to automated evidence collection systems')}
              style={{
                fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
                fontSize: '14px',
                fontWeight: '600',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid rgb(85, 81, 247)',
                cursor: 'pointer',
                backgroundColor: 'white',
                color: 'rgb(85, 81, 247)',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              Integration
            </button>
            <button
              onClick={handleGoToQuestionnaire}
              style={{
                fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
                fontSize: '14px',
                fontWeight: '600',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: 'rgb(85, 81, 247)',
                color: 'rgb(255, 255, 255)',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
              }}
            >
              Go to Questionnaire
            </button>
          </div>
        </div>

        {/* Info Bar */}
        <div style={{
          backgroundColor: 'rgb(255, 255, 255)',
          borderRadius: '15px',
          padding: '16px',
          marginBottom: '16px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
        }}>
          <div style={{ flex: 1 }}>
            <strong>Framework:</strong> {selectedAssessment?.framework || 'N/A'}
          </div>
          <div style={{ flex: 1 }}>
            <strong>Granularity:</strong> {selectedAssessment?.granularity || 'N/A'}
          </div>
          <div style={{ flex: 1 }}>
            <strong>Answer Structure:</strong> {selectedAssessment?.answerStructure || 'N/A'}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              backgroundColor: 'rgba(255, 35, 35, 0.1)',
              color: 'rgb(255, 35, 35)'
            }}>
              ● 1 - Not Implemented
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              backgroundColor: 'rgba(255, 153, 0, 0.1)',
              color: 'rgb(255, 153, 0)'
            }}>
              ● 2 - Initial
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              backgroundColor: 'rgba(251, 188, 9, 0.1)',
              color: 'rgb(251, 188, 9)'
            }}>
              ● 3 - Partial
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              backgroundColor: 'rgba(124, 208, 17, 0.1)',
              color: 'rgb(124, 208, 17)'
            }}>
              ● 4 - Operational
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              backgroundColor: 'rgba(13, 199, 131, 0.1)',
              color: 'rgb(13, 199, 131)'
            }}>
              ● 5 - Fully Implemented
            </span>
          </div>
        </div>

        {/* Top Row: Average Control Implementation + Targets & Gaps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>
          {/* Card 1: Average Control Implementation */}
          <div style={{
            backgroundColor: 'rgb(255, 255, 255)',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgb(74, 85, 104)', marginBottom: '12px' }}>
              Average Control Implementation
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: 'rgb(74, 85, 104)' }}>1</div>
              </div>
              <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgb(237, 242, 247)" strokeWidth="12" />
                  <circle
                    cx="60" cy="60" r="50"
                    fill="none"
                    stroke="rgb(255, 153, 0)"
                    strokeWidth="12"
                    strokeDasharray="314"
                    strokeDashoffset="200"
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '28px',
                  fontWeight: '700',
                  color: 'rgb(26, 32, 44)'
                }}>
                  {selectedAssessment?.assessmentScore || '0.00'}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: 'rgb(74, 85, 104)' }}>5</div>
              </div>
            </div>
          </div>

          {/* Card 2: Controls Implementation Targets and Gaps */}
          <div style={{
            backgroundColor: 'rgb(255, 255, 255)',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgb(74, 85, 104)', marginBottom: '12px' }}>
              Controls Implementation Targets and Gaps
            </div>
            <div style={{ display: 'flex', gap: '24px', marginTop: '12px' }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: 'rgb(74, 85, 104)', marginBottom: '8px' }}>
                  % of Targets Defined
                </div>
                <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto' }}>
                  <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgb(237, 242, 247)" strokeWidth="12" />
                    <circle
                      cx="60" cy="60" r="50"
                      fill="none"
                      stroke="rgb(85, 81, 247)"
                      strokeWidth="12"
                      strokeDasharray="314"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: 'rgb(26, 32, 44)'
                  }}>
                    100%
                  </div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: 'rgb(74, 85, 104)', marginBottom: '8px' }}>
                  Current vs. Target
                </div>
                <div style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '60px', height: '6px', backgroundColor: 'rgb(13, 199, 131)', borderRadius: '3px' }}></div>
                      <span style={{ fontSize: '13px', fontWeight: '600' }}>{selectedAssessment?.assessmentScore || '0.00'}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'rgb(74, 85, 104)' }}>/ 5.00</span>
                  </div>
                  <div style={{ marginTop: '6px', color: 'rgb(13, 199, 131)', fontSize: '13px', fontWeight: '600' }}>
                    {selectedAssessment ? Math.round(100 - selectedAssessment.scorePercentage) : 0}% gap ◆
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Radar Chart + Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
          {/* Card 3: Implementation and Targets By Function (Radar Chart) */}
          <div className="bg-white rounded-[15px] p-[24px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
            <div className="text-[16px] font-[700] text-[rgb(26,32,44)] mb-[16px]">
              Implementation and Targets By Function
            </div>
            <div className="mt-[16px] flex justify-center items-center">
              <svg viewBox="0 0 600 600" className="w-full max-w-[500px] h-[500px]">
                {/* Grid circles */}
                <circle cx="300" cy="300" r="220" fill="none" stroke="rgb(220, 229, 242)" strokeWidth="1" opacity="0.3" />
                <circle cx="300" cy="300" r="176" fill="none" stroke="rgb(220, 229, 242)" strokeWidth="1" opacity="0.3" />
                <circle cx="300" cy="300" r="132" fill="none" stroke="rgb(220, 229, 242)" strokeWidth="1" opacity="0.3" />
                <circle cx="300" cy="300" r="88" fill="none" stroke="rgb(220, 229, 242)" strokeWidth="1" opacity="0.3" />
                <circle cx="300" cy="300" r="44" fill="none" stroke="rgb(220, 229, 242)" strokeWidth="1" opacity="0.3" />

                {/* Axis lines (19 lines) */}
                <line x1="300" y1="300" x2="300" y2="80" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="372" y2="95" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="431" y2="135" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="469" y2="198" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="483" y2="270" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="469" y2="342" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="431" y2="405" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="372" y2="445" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="300" y2="520" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="228" y2="505" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="169" y2="465" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="131" y2="402" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="117" y2="330" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="131" y2="258" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="169" y2="195" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="228" y2="155" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="300" y2="135" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="355" y2="145" stroke="rgb(220, 229, 242)" strokeWidth="1" />
                <line x1="300" y1="300" x2="403" y2="178" stroke="rgb(220, 229, 242)" strokeWidth="1" />

                {/* Current implementation polygon (blue) */}
                <polygon
                  points="300,212 344,222 389,244 413,276 421,318 413,360 389,392 344,414 300,432 264,420 231,394 207,362 199,330 207,298 231,266 264,244 300,234 327,246 358,264"
                  fill="rgba(85, 81, 247, 0.15)"
                  stroke="rgb(85, 81, 247)"
                  strokeWidth="2.5"
                />

                {/* Data points on current polygon */}
                {[
                  [300, 212], [344, 222], [389, 244], [413, 276], [421, 318],
                  [413, 360], [389, 392], [344, 414], [300, 432], [264, 420],
                  [231, 394], [207, 362], [199, 330], [207, 298], [231, 266],
                  [264, 244], [300, 234], [327, 246], [358, 264]
                ].map((point, i) => (
                  <circle key={i} cx={point[0]} cy={point[1]} r="6" fill="rgb(85, 81, 247)" stroke="white" strokeWidth="2" />
                ))}

                {/* Target polygon (green dashed) */}
                <polygon
                  points="300,168 372,185 431,225 469,278 483,330 469,382 431,435 372,475 300,492 228,475 169,435 131,382 117,330 131,278 169,225 228,185 300,201 355,218 403,242"
                  fill="none"
                  stroke="rgb(13, 199, 131)"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                />

                {/* Labels */}
                <text x="300" y="70" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">GOVERN-1</text>
                <text x="380" y="85" textAnchor="start" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">GOVERN-2</text>
                <text x="445" y="125" textAnchor="start" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">GOVERN-3</text>
                <text x="485" y="188" textAnchor="start" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">GOVERN-4</text>
                <text x="500" y="265" textAnchor="start" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">GOVERN-5</text>
                <text x="485" y="352" textAnchor="start" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">GOVERN-6</text>
                <text x="445" y="420" textAnchor="start" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MANAGE-1</text>
                <text x="380" y="460" textAnchor="start" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MANAGE-2</text>
                <text x="300" y="540" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MANAGE-3</text>
                <text x="220" y="520" textAnchor="end" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MANAGE-4</text>
                <text x="155" y="480" textAnchor="end" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MAP-1</text>
                <text x="115" y="415" textAnchor="end" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MAP-2</text>
                <text x="100" y="340" textAnchor="end" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MAP-3</text>
                <text x="115" y="270" textAnchor="end" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MAP-4</text>
                <text x="155" y="185" textAnchor="end" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MAP-5</text>
                <text x="220" y="145" textAnchor="end" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MEASURE-1</text>
                <text x="300" y="125" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MEASURE-2</text>
                <text x="363" y="135" textAnchor="start" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MEASURE-3</text>
                <text x="415" y="168" textAnchor="start" fontSize="11" fontWeight="600" fill="rgb(48, 48, 69)" fontFamily="Source Sans Pro">MEASURE-4</text>
              </svg>
            </div>
            <div className="flex gap-[24px] justify-center mt-[16px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[16px] h-[3px] bg-[rgb(85,81,247)]"></div>
                <span className="text-[12px] text-[rgb(74,85,104)]">Current</span>
              </div>
              <div className="flex items-center gap-[8px]">
                <div className="w-[16px] h-[3px] border-t-[2px] border-dashed border-[rgb(13,199,131)]"></div>
                <span className="text-[12px] text-[rgb(74,85,104)]">Target</span>
              </div>
            </div>
          </div>

          {/* Card 4: Implementation Heatmap */}
          <div style={{
            backgroundColor: 'rgb(255, 255, 255)',
            borderRadius: '15px',
            padding: '24px',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(74, 85, 104)', marginBottom: '16px' }}>
              Implementation Heatmap
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '8px',
              marginTop: '16px',
              maxWidth: '100%'
            }}>
              {[
                { label: 'GOVERN-1', score: '2.00', color: 'rgb(255, 153, 0)' },
                { label: 'GOVERN-2', score: '2.00', color: 'rgb(255, 153, 0)' },
                { label: 'GOVERN-3', score: '2.00', color: 'rgb(255, 153, 0)' },
                { label: 'GOVERN-4', score: '3.00', color: 'rgb(251, 188, 9)' },
                { label: 'GOVERN-5', score: '2.00', color: 'rgb(255, 153, 0)' },
                { label: 'GOVERN-6', score: '2.00', color: 'rgb(255, 153, 0)' },
                { label: 'MANAGE-1', score: '3.00', color: 'rgb(251, 188, 9)' },
                { label: 'MANAGE-2', score: '1.00', color: 'rgb(255, 35, 35)' },
                { label: 'MANAGE-3', score: '1.00', color: 'rgb(255, 35, 35)' },
                { label: 'MANAGE-4', score: '1.00', color: 'rgb(255, 35, 35)' },
                { label: 'MAP-1', score: '3.00', color: 'rgb(251, 188, 9)' },
                { label: 'MAP-2', score: '2.00', color: 'rgb(255, 153, 0)' },
                { label: 'MAP-3', score: '2.00', color: 'rgb(255, 153, 0)' },
                { label: 'MAP-4', score: '2.00', color: 'rgb(255, 153, 0)' },
                { label: 'MAP-5', score: '2.00', color: 'rgb(255, 153, 0)' },
                { label: 'MEASURE-1', score: '1.00', color: 'rgb(255, 35, 35)' },
                { label: 'MEASURE-2', score: '3.00', color: 'rgb(251, 188, 9)' },
                { label: 'MEASURE-3', score: '1.00', color: 'rgb(255, 35, 35)' },
                { label: 'MEASURE-4', score: '2.00', color: 'rgb(255, 153, 0)' },
              ].map((cell, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: cell.color,
                    color: 'white',
                    padding: '8px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}
                >
                  <div style={{ marginBottom: '4px' }}>{cell.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: '700' }}>{cell.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Identified Gaps */}
        <div style={{
          backgroundColor: 'rgb(255, 255, 255)',
          borderRadius: '15px',
          padding: '24px',
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
          marginTop: '24px'
        }}>
          <div style={{ fontSize: '20px', fontWeight: '600', color: 'rgb(26, 32, 44)', marginBottom: '16px' }}>
            Top Identified Gaps
          </div>

          {[
            { id: 'GOVERN-1', name: 'Mapping AI Systems and Use Cases', current: 2, target: 3, gap: 33 },
            { id: 'GOVERN-2', name: 'Accountability for AI Risk Governance', current: 2, target: 3, gap: 33 },
            { id: 'GOVERN-3', name: 'Mapping AI Systems and Use Cases', current: 2, target: 3, gap: 33 },
          ].map((gap, i) => (
            <div key={i} style={{
              borderLeft: '3px solid rgb(255, 153, 0)',
              paddingLeft: '16px',
              marginBottom: i < 2 ? '16px' : '0'
            }}>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(26, 32, 44)' }}>
                {gap.id}
              </div>
              <div style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', marginTop: '4px' }}>
                {gap.name}
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'rgb(237, 242, 247)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(gap.current / gap.target) * 100}%`,
                      backgroundColor: 'rgb(255, 153, 0)',
                      borderRadius: '3px'
                    }} />
                  </div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                  {gap.current} / {gap.target}
                </span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(13, 199, 131)', whiteSpace: 'nowrap' }}>
                  {gap.gap}% gap ◆
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==================== QUESTIONNAIRE VIEW ====================
  if (currentView === 'questionnaire') {
    return (
      <div style={{ display: 'flex', height: 'calc(100vh - 100px)' }}>
        {/* Sidebar */}
        <div style={{
          width: '280px',
          backgroundColor: 'rgb(255, 255, 255)',
          borderRight: '1px solid rgb(220, 229, 242)',
          padding: '20px',
          overflowY: 'auto'
        }}>
          {/* Framework Info */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'rgb(26, 32, 44)', marginBottom: '8px' }}>
              Framework
            </div>
            <div style={{ padding: '12px', backgroundColor: 'rgb(236, 242, 252)', borderRadius: '6px', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(85, 81, 247)' }}>{selectedAssessment?.framework || 'N/A'}</div>
            </div>

            <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(26, 32, 44)', marginBottom: '8px' }}>
              Granularity
            </div>
            <div style={{ padding: '8px', backgroundColor: 'rgb(236, 242, 252)', borderRadius: '6px', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', color: 'rgb(85, 81, 247)' }}>{selectedAssessment?.granularity || 'N/A'}</div>
            </div>

            <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(26, 32, 44)', marginBottom: '8px' }}>
              Answer Structure
            </div>
            <div style={{ padding: '8px', backgroundColor: 'rgb(236, 242, 252)', borderRadius: '6px', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', color: 'rgb(85, 81, 247)' }}>{selectedAssessment?.answerStructure || 'N/A'}</div>
            </div>

            <div style={{ borderTop: '1px solid rgb(220, 229, 242)', paddingTop: '16px', marginTop: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(74, 85, 104)', marginBottom: '8px' }}>
                Scale:
              </div>
              <div style={{ fontSize: '10px', color: 'rgb(74, 85, 104)', lineHeight: '1.6' }}>
                1 - Not Implemented<br />
                2 - Basic<br />
                3 - Partial<br />
                4 - Operational<br />
                5 - Fully Implemented
              </div>
            </div>
          </div>

          {/* Assessment Progress */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(74, 85, 104)', marginBottom: '8px' }}>
              Assessment Progress
            </div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: 'rgb(26, 32, 44)', marginBottom: '8px' }}>
              0%
            </div>

            {/* Progress Tree */}
            <div style={{ fontSize: '13px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 12px',
                backgroundColor: 'rgb(236, 242, 252)',
                borderRadius: '6px',
                marginBottom: '4px',
                fontWeight: '600'
              }}>
                <span>Govern</span>
                <span style={{ fontSize: '12px' }}>0/19</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 12px',
                paddingLeft: '24px',
                fontSize: '13px',
                color: 'rgb(74, 85, 104)'
              }}>
                <span>GOVERN-1</span>
                <span style={{ fontSize: '12px' }}>0/7</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 12px',
                paddingLeft: '24px',
                fontSize: '13px',
                color: 'rgb(74, 85, 104)'
              }}>
                <span>GOVERN-2</span>
                <span style={{ fontSize: '12px' }}>0/3</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 12px',
                marginTop: '8px',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                <span>Manage</span>
                <span style={{ fontSize: '12px' }}>0/13</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 12px',
                marginTop: '8px',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                <span>Map</span>
                <span style={{ fontSize: '12px' }}>0/18</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 12px',
                marginTop: '8px',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                <span>Measure</span>
                <span style={{ fontSize: '12px' }}>0/19</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '30px', overflowY: 'auto', backgroundColor: 'rgb(245, 247, 255)' }}>
          {/* Progress Indicator */}
          <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgb(74, 85, 104)' }}>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgb(85, 81, 247)' }}>
                {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete
              </span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: 'rgb(237, 242, 247)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`, height: '100%', backgroundColor: 'rgb(85, 81, 247)', transition: 'width 0.3s ease' }}></div>
            </div>
          </div>

          {/* Header Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <button
              onClick={handleBackToList}
              style={{
                fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid rgb(169, 180, 188)',
                cursor: 'pointer',
                backgroundColor: 'rgb(255, 255, 255)',
                color: 'rgb(74, 85, 104)',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
              }}
            >
              ← Back
            </button>
            <button style={{
              fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid rgb(169, 180, 188)',
              cursor: 'pointer',
              backgroundColor: 'rgb(255, 255, 255)',
              color: 'rgb(74, 85, 104)',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
            }}>
              Contact Us
            </button>
            <button style={{
              fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
              fontSize: '14px',
              fontWeight: '600',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'rgb(85, 81, 247)',
              color: 'rgb(255, 255, 255)',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
              marginLeft: 'auto'
            }}>
              Quit & Continue Later
            </button>
          </div>

          {/* Question Card */}
          <div style={{
            backgroundColor: 'rgb(255, 255, 255)',
            borderRadius: '15px',
            padding: '24px',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(85, 81, 247)', marginBottom: '8px' }}>
                  GOVERN 1.1 → GOVERN 1.1-a
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: '0 0 8px 0' }}>
                  GOVERN 1.1
                </h2>
                <p style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', lineHeight: '1.6', margin: 0 }}>
                  Legal and regulatory requirements involving AI are understood, managed, and documented.
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: 'rgb(74, 85, 104)', marginBottom: '4px' }}>Owner:</div>
                <select
                  value={selectedOwner}
                  onChange={(e) => setSelectedOwner(e.target.value)}
                  style={{
                    width: '200px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgb(220, 229, 242)',
                    fontSize: '14px',
                    fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif'
                  }}
                >
                  <option value="">Select owner</option>
                  <option value="or@kovrr.com">or@kovrr.com</option>
                  <option value="yakir@kovrr.com">yakir@kovrr.com</option>
                  <option value="shai@kovrr.com">shai@kovrr.com</option>
                </select>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgb(220, 229, 242)', paddingTop: '20px' }}>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(26, 32, 44)', marginBottom: '12px' }}>
                GOVERN 1.1-a
              </div>
              <p style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', lineHeight: '1.6', marginBottom: '24px' }}>
                Do you maintain documented policies and procedures that set decision gates and escalation triggers for disproportionately, nondiscrimination, discrimination, with an accountable owner identified and a defined review cadence?
              </p>

              {/* Current Rating */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgb(85, 81, 247)' }}></div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(26, 32, 44)' }}>Current</div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[1, 2, 3, 4, 5].map(num => (
                    <div
                      key={num}
                      onClick={() => setCurrentRating(num)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        textAlign: 'center',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: currentRating === num ? 'rgb(255, 255, 255)' : 'rgb(74, 85, 104)',
                        backgroundColor: currentRating === num ? 'rgb(85, 81, 247)' : 'rgb(255, 255, 255)',
                        border: currentRating === num ? '2px solid rgb(85, 81, 247)' : '2px solid rgb(220, 229, 242)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Rating */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgb(13, 199, 131)' }}></div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(26, 32, 44)' }}>Target</div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[1, 2, 3, 4, 5].map(num => (
                    <div
                      key={num}
                      onClick={() => setTargetRating(num)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        textAlign: 'center',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: targetRating === num ? 'rgb(255, 255, 255)' : 'rgb(74, 85, 104)',
                        backgroundColor: targetRating === num ? 'rgb(13, 199, 131)' : 'rgb(255, 255, 255)',
                        border: targetRating === num ? '2px solid rgb(13, 199, 131)' : '2px solid rgb(220, 229, 242)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>

              {/* Inapplicable Checkbox */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isInapplicable}
                  onChange={(e) => setIsInapplicable(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', color: 'rgb(74, 85, 104)' }}>Inapplicable</span>
              </label>

              {/* Notes Section */}
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(26, 32, 44)', display: 'block', marginBottom: '8px' }}>
                  Notes
                </label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    placeholder="Add a note..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '100px',
                      padding: '12px',
                      paddingBottom: '48px',
                      borderRadius: '8px',
                      border: '1px solid rgb(220, 229, 242)',
                      fontSize: '14px',
                      fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
                      resize: 'vertical'
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => console.log('Attach file')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '6px',
                        border: '1px solid rgb(220, 229, 242)',
                        cursor: 'pointer',
                        backgroundColor: 'rgb(255, 255, 255)',
                        color: 'rgb(74, 85, 104)'
                      }}
                    >
                      <Paperclip size={14} />
                      Attach
                    </button>
                    <button
                      onClick={handleAddNote}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: 'rgb(85, 81, 247)',
                        color: 'rgb(255, 255, 255)'
                      }}
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              style={{
                fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid rgb(169, 180, 188)',
                cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                backgroundColor: currentQuestionIndex === 0 ? 'rgb(237, 242, 247)' : 'rgb(255, 255, 255)',
                color: currentQuestionIndex === 0 ? 'rgb(163, 173, 181)' : 'rgb(74, 85, 104)',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                opacity: currentQuestionIndex === 0 ? 0.6 : 1
              }}
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              style={{
                fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
                fontSize: '14px',
                fontWeight: '600',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: 'rgb(85, 81, 247)',
                color: 'rgb(255, 255, 255)',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ComplianceReadiness;
