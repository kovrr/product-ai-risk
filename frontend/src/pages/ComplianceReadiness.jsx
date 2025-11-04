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
      
      // Mock data for now
      setAssessments([]);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Overall Readiness Score</p>
              <p className="text-4xl font-bold mt-2">--</p>
              <p className="text-sm opacity-75 mt-1">Out of 100</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp size={32} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Maturity Level</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">Initial</p>
              <p className="text-sm text-neutral-500 mt-1">Starting journey</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <Shield className="text-warning" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Frameworks Assessed</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">0</p>
              <p className="text-sm text-neutral-500 mt-1">NIST, ISO, EU AI Act</p>
            </div>
            <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-info" size={24} />
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
            <option value="all">All Frameworks</option>
            <option value="nist">NIST AI RMF</option>
            <option value="iso">ISO 42001</option>
            <option value="eu">EU AI Act</option>
          </select>
        </div>

        {/* Maturity Domains */}
        <div className="space-y-4">
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
