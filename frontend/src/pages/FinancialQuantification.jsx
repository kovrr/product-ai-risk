import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, PieChart } from 'lucide-react';

const FinancialQuantification = () => {
  const [quantifications, setQuantifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuantifications();
  }, []);

  const loadQuantifications = async () => {
    try {
      // TODO: Implement API call when backend is ready
      // const data = await riskService.getFinancialQuantifications();
      
      // Mock data for now
      setQuantifications([]);
    } catch (error) {
      console.error('Failed to load financial quantifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading financial quantification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Financial Quantification</h1>
          <p className="text-neutral-600 mt-1">Financial quantification of risks per gaps identified</p>
        </div>
        <button className="btn btn-primary">
          <DollarSign size={18} />
          New Quantification
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-error to-error/80 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Risk Exposure</p>
              <p className="text-3xl font-bold mt-2">$0</p>
              <p className="text-xs opacity-75 mt-1">Annual expected loss</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Gap-Related Risks</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">$0</p>
              <p className="text-xs text-neutral-500 mt-1">From control gaps</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-warning" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Mitigation Cost</p>
              <p className="text-2xl font-bold text-neutral-800 mt-1">$0</p>
              <p className="text-xs text-neutral-500 mt-1">Investment needed</p>
            </div>
            <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
              <DollarSign className="text-info" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">ROI</p>
              <p className="text-2xl font-bold text-success mt-1">--%</p>
              <p className="text-xs text-neutral-500 mt-1">Return on investment</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <PieChart className="text-success" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Risk Exposure by Gap */}
      <div className="card">
        <h2 className="text-xl font-bold text-neutral-800 mb-4">Risk Exposure by Control Gap</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Control Gap</th>
                <th>Framework</th>
                <th>Priority</th>
                <th>Annual Likelihood</th>
                <th>Expected Loss</th>
                <th>Min Loss</th>
                <th>Max Loss</th>
                <th>Mitigation Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" className="text-center py-12">
                  <AlertTriangle className="mx-auto text-neutral-400 mb-3" size={48} />
                  <p className="text-neutral-600">No financial quantifications available</p>
                  <p className="text-sm text-neutral-500 mt-2">Quantify risks based on identified control gaps</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">Risk by Category</h2>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-neutral-600">Data Privacy</span>
                <span className="text-sm font-medium text-neutral-800">$0</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-error h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-neutral-600">Model Bias</span>
                <span className="text-sm font-medium text-neutral-800">$0</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-neutral-600">Security</span>
                <span className="text-sm font-medium text-neutral-800">$0</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-info h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-neutral-600">Compliance</span>
                <span className="text-sm font-medium text-neutral-800">$0</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">Cost-Benefit Analysis</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-error/5 rounded-lg">
              <div>
                <p className="text-sm text-neutral-600">Total Risk Exposure</p>
                <p className="text-xl font-bold text-error">$0</p>
              </div>
              <AlertTriangle className="text-error" size={32} />
            </div>
            <div className="flex items-center justify-between p-3 bg-info/5 rounded-lg">
              <div>
                <p className="text-sm text-neutral-600">Total Mitigation Cost</p>
                <p className="text-xl font-bold text-info">$0</p>
              </div>
              <DollarSign className="text-info" size={32} />
            </div>
            <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
              <div>
                <p className="text-sm text-neutral-600">Net Benefit</p>
                <p className="text-xl font-bold text-success">$0</p>
              </div>
              <TrendingUp className="text-success" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Quantification Methodology */}
      <div className="card bg-gradient-to-br from-neutral-50 to-white">
        <h2 className="text-xl font-bold text-neutral-800 mb-4">Quantification Methodology</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg border border-neutral-200">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
              <span className="text-primary font-bold">1</span>
            </div>
            <h3 className="font-semibold text-neutral-800 mb-2">Identify Gaps</h3>
            <p className="text-sm text-neutral-600">
              Assess control implementation status and identify missing or partial controls
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-neutral-200">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
              <span className="text-primary font-bold">2</span>
            </div>
            <h3 className="font-semibold text-neutral-800 mb-2">Map to Risks</h3>
            <p className="text-sm text-neutral-600">
              Link control gaps to risk scenarios with likelihood and impact estimates
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-neutral-200">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
              <span className="text-primary font-bold">3</span>
            </div>
            <h3 className="font-semibold text-neutral-800 mb-2">Calculate Exposure</h3>
            <p className="text-sm text-neutral-600">
              Compute expected annual loss and compare with mitigation costs
            </p>
          </div>
        </div>
      </div>

      {/* Sample Calculation */}
      <div className="card border-l-4 border-l-primary">
        <h2 className="text-xl font-bold text-neutral-800 mb-4">Sample Calculation</h2>
        <div className="bg-neutral-50 rounded-lg p-4 font-mono text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-600">Annual Likelihood:</span>
              <span className="text-neutral-800 font-semibold">15%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Expected Loss (if occurs):</span>
              <span className="text-neutral-800 font-semibold">$500,000</span>
            </div>
            <div className="border-t border-neutral-300 my-2"></div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Annual Expected Loss:</span>
              <span className="text-error font-bold">$75,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Mitigation Cost:</span>
              <span className="text-info font-bold">$30,000</span>
            </div>
            <div className="border-t border-neutral-300 my-2"></div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Net Benefit:</span>
              <span className="text-success font-bold">$45,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">ROI:</span>
              <span className="text-success font-bold">150%</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-neutral-500 mt-3">
          * This is a simplified example. Actual calculations may include additional factors such as residual risk, insurance coverage, and business impact.
        </p>
      </div>
    </div>
  );
};

export default FinancialQuantification;
