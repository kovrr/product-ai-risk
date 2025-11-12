import { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const FinancialQuantification = () => {
  const [currentView, setCurrentView] = useState('form');
  const [currentTab, setCurrentTab] = useState('overview');
  const [formData, setFormData] = useState({
    industry: 'technology',
    country: 'us',
    revenue: 50000000,
    compliance: 'ccpa',
    model: 'gpt-4',
    webAccess: 'true',
    publicFacing: 'true',
    piiRecords: 250000,
    pciRecords: 50000,
    phiRecords: 0,
    customRecords: 100000,
    outageTolerance: 24,
    revenueExposure: 35,
    recoveryTime: 48,
    controls: {
      gov1: false, gov2: false, gov3: false, gov4: false, gov5: false, gov6: false,
      man1: false, man2: false, man3: false, man4: false,
      map1: false, map2: true, map3: false, map4: false, map5: false,
      mea1: false, mea2: true, mea3: false, mea4: false
    }
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleControlChange = (control) => {
    setFormData({
      ...formData,
      controls: { ...formData.controls, [control]: !formData.controls[control] }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentView('loading');
    setTimeout(() => setCurrentView('results'), 2500);
  };

  // FORM VIEW
  if (currentView === 'form') {
    return (
      <div style={{ fontFamily: '"Source Sans Pro", sans-serif', maxWidth: '1440px', margin: '0 auto', padding: '30px' }}>
        <h1 style={{ fontSize: '38px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: '0 0 8px 0' }}>
          Gen AI Exposure
        </h1>
        <p style={{ fontSize: '16px', color: 'rgb(74, 85, 104)', margin: '0 0 24px 0' }}>Entity Exposure Assessment</p>

        <form onSubmit={handleSubmit}>
          {/* Company Information */}
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', marginBottom: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Company Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Industry<span style={{ color: 'rgb(255, 35, 35)' }}>*</span>
                </label>
                <select value={formData.industry} onChange={(e) => handleInputChange('industry', e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }}>
                  <option value="">Select industry...</option>
                  <option value="financial_services">Financial Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="technology">Technology</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Country<span style={{ color: 'rgb(255, 35, 35)' }}>*</span>
                </label>
                <select value={formData.country} onChange={(e) => handleInputChange('country', e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }}>
                  <option value="">Select country...</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="eu">European Union</option>
                  <option value="ca">Canada</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Annual Revenue (USD)<span style={{ color: 'rgb(255, 35, 35)' }}>*</span>
                </label>
                <input type="number" value={formData.revenue} onChange={(e) => handleInputChange('revenue', e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Regulatory Compliance<span style={{ color: 'rgb(255, 35, 35)' }}>*</span>
                </label>
                <select value={formData.compliance} onChange={(e) => handleInputChange('compliance', e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }}>
                  <option value="">Select...</option>
                  <option value="gdpr">GDPR</option>
                  <option value="ccpa">CCPA</option>
                  <option value="hipaa">HIPAA</option>
                  <option value="eu_ai_act">EU AI Act</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Model */}
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', marginBottom: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>AI Model</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Model<span style={{ color: 'rgb(255, 35, 35)' }}>*</span>
                </label>
                <select value={formData.model} onChange={(e) => handleInputChange('model', e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }}>
                  <option value="">Select model...</option>
                  <option value="gpt-4">OpenAI GPT-4</option>
                  <option value="gpt-4o">OpenAI GPT-4o</option>
                  <option value="claude-3">Anthropic Claude 3</option>
                  <option value="gemini-1.5">Google Gemini 1.5</option>
                  <option value="llama-3">Meta LLaMA 3</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Web Access<span style={{ color: 'rgb(255, 35, 35)' }}>*</span>
                </label>
                <select value={formData.webAccess} onChange={(e) => handleInputChange('webAccess', e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }}>
                  <option value="">Select...</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Public Facing App<span style={{ color: 'rgb(255, 35, 35)' }}>*</span>
                </label>
                <select value={formData.publicFacing} onChange={(e) => handleInputChange('publicFacing', e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }}>
                  <option value="">Select...</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Exposure */}
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', marginBottom: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Data Exposure</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>PII Records</label>
                <input type="number" value={formData.piiRecords} onChange={(e) => handleInputChange('piiRecords', e.target.value)} min="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>PCI Records</label>
                <input type="number" value={formData.pciRecords} onChange={(e) => handleInputChange('pciRecords', e.target.value)} min="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>PHI Records</label>
                <input type="number" value={formData.phiRecords} onChange={(e) => handleInputChange('piiRecords', e.target.value)} min="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Custom Data Records</label>
                <input type="number" value={formData.customRecords} onChange={(e) => handleInputChange('customRecords', e.target.value)} min="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }} />
              </div>
            </div>
          </div>

          {/* Operational Reliance */}
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', marginBottom: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Operational Reliance</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Outage Tolerance (Hours)<span style={{ color: 'rgb(255, 35, 35)' }}>*</span>
                </label>
                <input type="number" value={formData.outageTolerance} onChange={(e) => handleInputChange('outageTolerance', e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }} />
                <span style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', marginTop: '4px', display: 'block' }}>How long can you operate without the model?</span>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Revenue Exposure (%)<span style={{ color: 'rgb(255, 35, 35)' }}>*</span>
                </label>
                <input type="number" value={formData.revenueExposure} onChange={(e) => handleInputChange('revenueExposure', e.target.value)} min="0" max="100" required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }} />
                <span style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', marginTop: '4px', display: 'block' }}>What % of revenue depends on this model?</span>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Recovery Time (Hours)<span style={{ color: 'rgb(255, 35, 35)' }}>*</span>
                </label>
                <input type="number" value={formData.recoveryTime} onChange={(e) => handleInputChange('recoveryTime', e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(163, 173, 181)', fontSize: '14px' }} />
                <span style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', marginTop: '4px', display: 'block' }}>Time to fully recover from an incident</span>
              </div>
            </div>
          </div>

          {/* NIST AI RMF Controls */}
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', marginBottom: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 12px 0' }}>NIST AI RMF Controls</h2>
            <p style={{ fontSize: '13px', color: 'rgb(74, 85, 104)', marginBottom: '16px' }}>Select controls currently implemented</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
              {Object.keys(formData.controls).map(control => (
                <label key={control} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.controls[control]} onChange={() => handleControlChange(control)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                  <span style={{ fontSize: '14px' }}>{control.toUpperCase().replace(/(\d)/, '-$1')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" style={{ fontSize: '14px', fontWeight: '600', padding: '8px 16px', borderRadius: '6px', border: '1px solid rgb(85, 81, 247)', cursor: 'pointer', background: 'white', color: 'rgb(85, 81, 247)' }}>
              Advanced: Assumptions Studio
            </button>
            <button type="submit" style={{ fontSize: '14px', fontWeight: '600', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: 'rgb(85, 81, 247)', color: 'white' }}>
              Run Quantification
            </button>
          </div>
        </form>
      </div>
    );
  }

  // LOADING VIEW
  if (currentView === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(245, 247, 255)' }}>
        <div style={{ maxWidth: '500px', textAlign: 'center', padding: '60px 40px', background: 'white', borderRadius: '15px' }}>
          <div style={{ width: '50px', height: '50px', margin: '0 auto 32px', border: '3px solid rgb(220, 229, 242)', borderTopColor: 'rgb(85, 81, 247)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>Quantifying Risk Exposure</h1>
          <p style={{ fontSize: '14px', color: 'rgb(74, 85, 104)' }}>Analyzing MITRE ATLAS attack vectors and calculating expected losses...</p>
          <div style={{ marginTop: '24px', fontSize: '12px', color: 'rgb(113, 118, 126)' }}>This may take a few moments</div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // RESULTS VIEW
  const vectorsData = [
    { name: 'Phishing', code: 'AML.T0052', aal: '$1.86M' },
    { name: 'Exploit Public-Facing', code: 'AML.T0043', aal: '$1.24M' },
    { name: 'AI Supply Chain', code: 'AML.T0010', aal: '$930K' },
    { name: 'Evade AI Model', code: 'AML.T0043', aal: '$930K' },
    { name: 'Drive-by', code: 'AML.T0051', aal: '$620K' },
    { name: 'Valid Accounts', code: 'AML.T0078', aal: '$620K' }
  ];

  return (
    <div style={{ fontFamily: '"Source Sans Pro", sans-serif', maxWidth: '1440px', margin: '0 auto', padding: '30px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '38px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: '0 0 8px 0' }}>
            Gen AI Exposure
          </h1>
          <p style={{ fontSize: '16px', color: 'rgb(74, 85, 104)', margin: 0 }}>AI Risk Assessment - Overview</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ fontSize: '14px', fontWeight: '600', padding: '8px 16px', borderRadius: '6px', border: '1px solid rgb(85, 81, 247)', cursor: 'pointer', background: 'white', color: 'rgb(85, 81, 247)' }}>
            Download JSON
          </button>
          <button onClick={() => setCurrentView('form')} style={{ fontSize: '14px', fontWeight: '600', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: 'rgb(85, 81, 247)', color: 'white' }}>
            Re-run
          </button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'AAL', value: '$6.2M' },
          { label: '1:100', value: '$85M' },
          { label: 'Annual Likelihood', value: '18%' },
          { label: 'Inherent Risk AAL', value: '$12.5M' },
          { label: 'Inherent Risk 1:100', value: '$190M' }
        ].map((kpi, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid rgb(220, 229, 242)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(113, 118, 126)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{kpi.label}</div>
            <div style={{ fontSize: '26px', fontWeight: '700', color: 'rgb(26, 32, 44)' }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgb(220, 229, 242)', marginBottom: '24px', background: 'white' }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'vectors', label: 'Attack Vectors' },
          { id: 'events', label: 'Event Types' },
          { id: 'damages', label: 'Damage Types' },
          { id: 'controls', label: 'Controls' }
        ].map(tab => (
          <button key={tab.id} onClick={() => setCurrentTab(tab.id)} style={{ flex: 1, fontSize: '15px', fontWeight: currentTab === tab.id ? '600' : '500', color: currentTab === tab.id ? 'rgb(85, 81, 247)' : 'rgb(113, 118, 126)', padding: '16px 24px', textAlign: 'center', border: 'none', background: 'transparent', borderBottom: currentTab === tab.id ? '3px solid rgb(85, 81, 247)' : 'none', cursor: 'pointer' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {currentTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Expected Loss Curve</h2>
            <div style={{ height: '300px' }}>
              <Line
                data={{
                  labels: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
                  datasets: [{
                    label: 'Expected Loss',
                    data: [0, 1.2, 2.8, 4.5, 6.2, 12.5, 25, 45, 65, 85, 190],
                    borderColor: 'rgb(85, 81, 247)',
                    backgroundColor: 'rgba(85, 81, 247, 0.1)',
                    tension: 0.4,
                    fill: true
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => `$${context.parsed.y}M`
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => `$${value}M`
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Probability'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Model Information</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgb(220, 229, 242)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '600' }}>Model</td>
                  <td style={{ padding: '12px 16px' }}>GPT-4</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgb(220, 229, 242)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '600' }}>Run Time</td>
                  <td style={{ padding: '12px 16px' }}>{new Date().toLocaleString()}</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: '600' }}>Model Version</td>
                  <td style={{ padding: '12px 16px' }}>ai-v2025.1-beta.1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attack Vectors Tab */}
      {currentTab === 'vectors' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Initial Access Vectors</h2>
              <div style={{ height: '300px' }}>
                <Bar
                  data={{
                    labels: vectorsData.map(v => v.name),
                    datasets: [{
                      label: 'AAL',
                      data: [1.86, 1.24, 0.93, 0.93, 0.62, 0.62],
                      backgroundColor: 'rgb(85, 81, 247)',
                      borderRadius: 6
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (context) => `$${context.parsed.y}M`
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `$${value}M`
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Summary Table</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgb(237, 242, 247)', borderBottom: '1px solid rgb(220, 229, 242)' }}>
                    <th style={{ fontSize: '12px', fontWeight: '700', textAlign: 'left', padding: '12px 16px', textTransform: 'uppercase' }}>Vector</th>
                    <th style={{ fontSize: '12px', fontWeight: '700', textAlign: 'left', padding: '12px 16px', textTransform: 'uppercase' }}>AAL</th>
                  </tr>
                </thead>
                <tbody>
                  {vectorsData.map((v, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgb(220, 229, 242)' }}>
                      <td style={{ padding: '12px 16px' }}>{v.name}</td>
                      <td style={{ padding: '12px 16px' }}>{v.aal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vector Details */}
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Vector Details & Mitigations</h2>
            {vectorsData.map((vector, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid rgb(220, 229, 242)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgb(220, 229, 242)', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '700' }}>{vector.name}</div>
                    <div style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', marginTop: '4px' }}>{vector.code}</div>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'rgb(85, 81, 247)' }}>{vector.aal}</div>
                </div>
                <div style={{ padding: '12px', background: 'rgb(237, 242, 247)', borderRadius: '6px', fontSize: '13px', marginBottom: '12px' }}>
                  <strong>Description:</strong> Attack vector targeting AI systems through {vector.name.toLowerCase()} techniques.
                </div>
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgb(220, 229, 242)' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Recommended Mitigations</div>
                  <div style={{ padding: '12px', background: 'rgb(237, 242, 247)', borderRadius: '6px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgb(21, 77, 171)', marginBottom: '6px' }}>NIST AI RMF Control</div>
                    <div style={{ fontSize: '13px', color: 'rgb(74, 85, 104)' }}>Implement comprehensive monitoring and validation controls.</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event Types Tab */}
      {currentTab === 'events' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Event Types</h2>
            <div style={{ height: '300px' }}>
              <Bar
                data={{
                  labels: ['Data Breach', 'Service Disruption', 'Model Poisoning'],
                  datasets: [{
                    label: 'AAL',
                    data: [3.1, 2.1, 1.0],
                    backgroundColor: ['rgb(255, 35, 35)', 'rgb(255, 153, 0)', 'rgb(85, 81, 247)'],
                    borderRadius: 6
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => `$${context.parsed.y}M`
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => `$${value}M`
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Summary</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgb(237, 242, 247)', borderBottom: '1px solid rgb(220, 229, 242)' }}>
                  <th style={{ fontSize: '12px', fontWeight: '700', textAlign: 'left', padding: '12px 16px' }}>Event Type</th>
                  <th style={{ fontSize: '12px', fontWeight: '700', textAlign: 'left', padding: '12px 16px' }}>AAL</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgb(220, 229, 242)' }}>
                  <td style={{ padding: '12px 16px' }}>Data Breach</td>
                  <td style={{ padding: '12px 16px' }}>$3.1M</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgb(220, 229, 242)' }}>
                  <td style={{ padding: '12px 16px' }}>Service Disruption</td>
                  <td style={{ padding: '12px 16px' }}>$2.1M</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px' }}>Model Poisoning</td>
                  <td style={{ padding: '12px 16px' }}>$1.0M</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Damage Types Tab */}
      {currentTab === 'damages' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Damage Distribution</h2>
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Doughnut
                data={{
                  labels: ['Revenue Loss', 'Remediation Costs', 'Legal & Regulatory', 'Reputation Damage', 'Customer Churn'],
                  datasets: [{
                    data: [40, 24, 19, 13, 4],
                    backgroundColor: [
                      'rgb(255, 35, 35)',
                      'rgb(255, 153, 0)',
                      'rgb(85, 81, 247)',
                      'rgb(13, 199, 131)',
                      'rgb(163, 173, 181)'
                    ],
                    borderWidth: 2,
                    borderColor: 'white'
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        padding: 15,
                        font: { size: 12 }
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.label}: ${context.parsed}%`
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Damage Types</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgb(237, 242, 247)', borderBottom: '1px solid rgb(220, 229, 242)' }}>
                  <th style={{ fontSize: '12px', fontWeight: '700', textAlign: 'left', padding: '12px 16px' }}>Damage Type</th>
                  <th style={{ fontSize: '12px', fontWeight: '700', textAlign: 'left', padding: '12px 16px' }}>AAL</th>
                  <th style={{ fontSize: '12px', fontWeight: '700', textAlign: 'left', padding: '12px 16px' }}>% of Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Revenue Loss', aal: '$2.5M', pct: '40%' },
                  { type: 'Remediation Costs', aal: '$1.5M', pct: '24%' },
                  { type: 'Legal & Regulatory', aal: '$1.2M', pct: '19%' },
                  { type: 'Reputation Damage', aal: '$800K', pct: '13%' },
                  { type: 'Customer Churn', aal: '$200K', pct: '4%' }
                ].map((d, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgb(220, 229, 242)' }}>
                    <td style={{ padding: '12px 16px' }}>{d.type}</td>
                    <td style={{ padding: '12px 16px' }}>{d.aal}</td>
                    <td style={{ padding: '12px 16px' }}>{d.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Controls Tab */}
      {currentTab === 'controls' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Risk Reduction by Control</h2>
            <div style={{ height: '300px' }}>
              <Bar
                data={{
                  labels: ['GOVERN-1', 'MANAGE-2', 'MEASURE-3', 'MAP-4'],
                  datasets: [{
                    label: 'Risk Reduction',
                    data: [2.1, 1.8, 1.5, 1.2],
                    backgroundColor: 'rgb(13, 199, 131)',
                    borderRadius: 6
                  }]
                }}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => `Risk Reduction: $${context.parsed.x}M`
                      }
                    }
                  },
                  scales: {
                    x: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => `$${value}M`
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 20px 0' }}>Top Recommended Controls</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgb(237, 242, 247)', borderBottom: '1px solid rgb(220, 229, 242)' }}>
                  <th style={{ fontSize: '12px', fontWeight: '700', textAlign: 'left', padding: '12px 16px' }}>Control</th>
                  <th style={{ fontSize: '12px', fontWeight: '700', textAlign: 'left', padding: '12px 16px' }}>Description</th>
                  <th style={{ fontSize: '12px', fontWeight: '700', textAlign: 'left', padding: '12px 16px' }}>Risk Reduction</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { control: 'GOVERN-1', desc: 'AI System Mapping', reduction: '$2.1M' },
                  { control: 'MANAGE-2', desc: 'Incident Response', reduction: '$1.8M' },
                  { control: 'MEASURE-3', desc: 'Performance Monitoring', reduction: '$1.5M' },
                  { control: 'MAP-4', desc: 'Data Classification', reduction: '$1.2M' }
                ].map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgb(220, 229, 242)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '600' }}>{c.control}</td>
                    <td style={{ padding: '12px 16px' }}>{c.desc}</td>
                    <td style={{ padding: '12px 16px', color: 'rgb(13, 199, 131)', fontWeight: '600' }}>{c.reduction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialQuantification;
