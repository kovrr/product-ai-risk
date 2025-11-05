import { useEffect, useState } from 'react';
import { ClipboardCheck, TrendingUp, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const ComplianceReadiness = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFramework, setSelectedFramework] = useState('all');

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      // TODO: Implement API call when backend is ready
      // const data = await governanceService.getComplianceReadiness();
      
      // Mock data with all statuses: Not Started, In Progress, Completed
      const mockAssessments = [
        {
          id: 1,
          framework: 'NIST AI Risk Management Framework',
          shortName: 'nist',
          status: 'In Progress',
          overallProgress: 40,
          maturityLevel: 'Developing',
          domains: [
            { name: 'Governance', progress: 45 },
            { name: 'Map', progress: 30 },
            { name: 'Measure', progress: 50 },
            { name: 'Manage', progress: 35 },
          ]
        },
        {
          id: 2,
          framework: 'ISO/IEC 42001',
          shortName: 'iso',
          status: 'Completed',
          overallProgress: 100,
          maturityLevel: 'Managed',
          domains: [
            { name: 'Context', progress: 100 },
            { name: 'Leadership', progress: 100 },
            { name: 'Planning', progress: 100 },
            { name: 'Support', progress: 100 },
          ]
        },
        {
          id: 3,
          framework: 'EU AI Act',
          shortName: 'eu',
          status: 'Not Started',
          overallProgress: 0,
          maturityLevel: 'Initial',
          domains: [
            { name: 'Risk Classification', progress: 0 },
            { name: 'Requirements', progress: 0 },
            { name: 'Documentation', progress: 0 },
            { name: 'Conformity', progress: 0 },
          ]
        },
        {
          id: 4,
          framework: 'SOC 2 Type II',
          shortName: 'soc2',
          status: 'Not Started',
          overallProgress: 0,
          maturityLevel: 'Initial',
          domains: [
            { name: 'Security', progress: 0 },
            { name: 'Availability', progress: 0 },
            { name: 'Confidentiality', progress: 0 },
            { name: 'Privacy', progress: 0 },
          ]
        },
        {
          id: 5,
          framework: 'GDPR Compliance',
          shortName: 'gdpr',
          status: 'In Progress',
          overallProgress: 65,
          maturityLevel: 'Defined',
          domains: [
            { name: 'Lawfulness', progress: 80 },
            { name: 'Data Rights', progress: 70 },
            { name: 'Security', progress: 60 },
            { name: 'Accountability', progress: 50 },
          ]
        },
      ];
      
      setAssessments(mockAssessments);
    } catch (error) {
      console.error('Failed to load assessments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMaturityColor = (level) => {
    const colors = {
      'Initial': 'text-error',
      'Developing': 'text-warning',
      'Defined': 'text-info',
      'Managed': 'text-success',
      'Optimizing': 'text-primary',
    };
    return colors[level] || 'text-neutral-600';
  };

  const getMaturityBadge = (level) => {
    const badges = {
      'Initial': 'badge-error',
      'Developing': 'badge-warning',
      'Defined': 'badge-info',
      'Managed': 'badge-success',
      'Optimizing': 'badge-success',
    };
    return badges[level] || 'badge-info';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Not Started': 'bg-gray-100 text-gray-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      'Completed': 'bg-green-100 text-green-700',
    };
    return badges[status] || 'bg-gray-100 text-gray-700';
  };

  const getProgressColor = (progress) => {
    if (progress === 0) return 'bg-gray-400';
    if (progress < 30) return 'bg-red-500';
    if (progress < 60) return 'bg-orange-500';
    if (progress < 90) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const filteredAssessments = selectedFramework === 'all' 
    ? assessments 
    : assessments.filter(a => a.shortName === selectedFramework);

  const totalAssessments = assessments.length;
  const completedAssessments = assessments.filter(a => a.status === 'Completed').length;
  const inProgressAssessments = assessments.filter(a => a.status === 'In Progress').length;
  const notStartedAssessments = assessments.filter(a => a.status === 'Not Started').length;
  const avgProgress = assessments.length > 0 
    ? Math.round(assessments.reduce((sum, a) => sum + a.overallProgress, 0) / assessments.length)
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading compliance readiness...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Compliance Readiness</h1>
          <p className="text-neutral-600 mt-1">High-level governance & maturity self-evaluation aligned to frameworks</p>
        </div>
        <button className="btn btn-primary">
          <ClipboardCheck size={18} />
          New Assessment
        </button>
      </div>

      {/* Overall Readiness Score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Average Progress</p>
              <p className="text-4xl font-bold mt-2">{avgProgress}%</p>
              <p className="text-sm opacity-75 mt-1">Across all frameworks</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp size={32} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Frameworks</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">{totalAssessments}</p>
              <p className="text-sm text-neutral-500 mt-1">Being tracked</p>
            </div>
            <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
              <Shield className="text-info" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{inProgressAssessments}</p>
              <p className="text-sm text-neutral-500 mt-1">Active assessments</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Completed</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{completedAssessments}</p>
              <p className="text-sm text-neutral-500 mt-1">Not Started: {notStartedAssessments}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Framework Selection */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-neutral-800">Framework Assessments</h2>
          <select 
            className="input w-64"
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value)}
          >
            <option value="all">All Frameworks ({totalAssessments})</option>
            <option value="nist">NIST AI RMF</option>
            <option value="iso">ISO/IEC 42001</option>
            <option value="eu">EU AI Act</option>
            <option value="soc2">SOC 2 Type II</option>
            <option value="gdpr">GDPR Compliance</option>
          </select>
        </div>

        {/* Framework List - Dynamic */}
        <div className="space-y-4">
          {filteredAssessments.map((assessment) => (
            <div key={assessment.id} className="border border-neutral-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-neutral-800">{assessment.framework}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(assessment.status)}`}>
                    {assessment.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-neutral-800">{assessment.overallProgress}%</span>
                  <span className={`badge ${getMaturityBadge(assessment.maturityLevel)}`}>
                    {assessment.maturityLevel}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {assessment.domains.map((domain, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-neutral-600">{domain.name}</span>
                      <span className="text-sm font-medium text-neutral-800">{domain.progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className={`${getProgressColor(domain.progress)} h-2 rounded-full transition-all`} 
                        style={{ width: `${domain.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {assessment.status === 'In Progress' && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                    <div className="text-sm text-neutral-600">
                      <p className="font-medium text-neutral-800 mb-1">In Progress - {assessment.overallProgress}% Complete</p>
                      <p>Continue assessment to improve compliance readiness.</p>
                    </div>
                  </div>
                </div>
              )}

              {assessment.status === 'Not Started' && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-gray-600 flex-shrink-0 mt-0.5" size={18} />
                    <div className="text-sm text-neutral-600">
                      <p className="font-medium text-neutral-800 mb-1">Not Started</p>
                      <p>Click "New Assessment" to begin evaluating compliance with this framework.</p>
                    </div>
                  </div>
                </div>
              )}

              {assessment.status === 'Completed' && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                    <div className="text-sm text-neutral-600">
                      <p className="font-medium text-green-700 mb-1">Assessment Completed</p>
                      <p>All requirements have been evaluated. Review and maintain compliance.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto text-neutral-400 mb-3" size={48} />
            <p className="text-neutral-600">No frameworks found matching your filter.</p>
          </div>
        )}

        {/* Old hardcoded content removed - now dynamic */}
        <div className="space-y-4 hidden">
          <div className="border border-neutral-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-neutral-800">NIST AI Risk Management Framework</h3>
              <span className="badge badge-warning">Developing</span>
            </div>
            
            <div className="space-y-3">
              {/* Governance Domain */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-600">Governance</span>
                  <span className="text-sm font-medium text-neutral-800">45%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              {/* Map Domain */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-600">Map</span>
                  <span className="text-sm font-medium text-neutral-800">30%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-error h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>

              {/* Measure Domain */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-600">Measure</span>
                  <span className="text-sm font-medium text-neutral-800">50%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-info h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>

              {/* Manage Domain */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-neutral-600">Manage</span>
                  <span className="text-sm font-medium text-neutral-800">35%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-warning flex-shrink-0 mt-0.5" size={18} />
                <div className="text-sm text-neutral-600">
                  <p className="font-medium text-neutral-800 mb-1">Key Recommendations:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Establish formal AI governance structure</li>
                    <li>Implement comprehensive AI inventory process</li>
                    <li>Develop risk assessment methodology</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Placeholder for other frameworks */}
          <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-lg">
            <ClipboardCheck className="mx-auto text-neutral-400" size={48} />
            <p className="text-neutral-600 mt-4">No additional assessments</p>
            <p className="text-sm text-neutral-500 mt-2">Start a new assessment to evaluate compliance readiness</p>
            <button className="btn btn-outline mt-4">
              Start Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Maturity Level Guide */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-800 mb-4">Maturity Levels Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-error font-bold">1</span>
            </div>
            <p className="font-semibold text-sm text-neutral-800">Initial</p>
            <p className="text-xs text-neutral-500 mt-1">Ad-hoc processes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-warning font-bold">2</span>
            </div>
            <p className="font-semibold text-sm text-neutral-800">Developing</p>
            <p className="text-xs text-neutral-500 mt-1">Basic processes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-info font-bold">3</span>
            </div>
            <p className="font-semibold text-sm text-neutral-800">Defined</p>
            <p className="text-xs text-neutral-500 mt-1">Documented processes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-success font-bold">4</span>
            </div>
            <p className="font-semibold text-sm text-neutral-800">Managed</p>
            <p className="text-xs text-neutral-500 mt-1">Measured & controlled</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary font-bold">5</span>
            </div>
            <p className="font-semibold text-sm text-neutral-800">Optimizing</p>
            <p className="text-xs text-neutral-500 mt-1">Continuous improvement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceReadiness;
