import { useState } from 'react';

const AIAssurancePlan = () => {
  const [currentTab, setCurrentTab] = useState('actions');
  const [selectedAssessment, setSelectedAssessment] = useState('1');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedControl, setSelectedControl] = useState(null);
  const [drawerTab, setDrawerTab] = useState('scoring');
  const [showExplainerModal, setShowExplainerModal] = useState(false);

  // Drawer state for scoring
  const [selectedStakeholders, setSelectedStakeholders] = useState(['Legal', 'Compliance']);
  const [criterionScores, setCriterionScores] = useState({
    impact: 4,
    regulatory: 5,
    ethical: 3,
    cost: 2,
    effort: 3
  });

  // Mock assessments data
  const assessments = [
    { id: '1', name: 'NIST AI RMF', date: 'Nov. 2, 2025', scale: '1–5', controlCount: 19 },
    { id: '2', name: 'NIST AI RMF', date: 'Oct. 15, 2025', scale: '1–5', controlCount: 19 },
    { id: '3', name: 'NIST AI RMF', date: 'Sep. 8, 2025', scale: '1–5', controlCount: 19 },
    { id: '4', name: 'ISO/IEC 42001', date: 'Aug. 22, 2025', scale: '1–5', controlCount: 24 },
  ];

  // Mock controls data
  const [controls, setControls] = useState([
    {
      id: 1,
      control_id: 'GOVERN-1.1',
      name: 'Legal and Regulatory Requirements',
      status: 'Draft',
      current_maturity: 2,
      target_maturity: 4,
      gap_normalized: 0.5,
      priority_score: 78,
      rosi_percentage: 145,
      stakeholder_count: 3
    },
    {
      id: 2,
      control_id: 'GOVERN-1.2',
      name: 'Accountability Structure',
      status: 'In Review',
      current_maturity: 3,
      target_maturity: 5,
      gap_normalized: 0.4,
      priority_score: 85,
      rosi_percentage: 210,
      stakeholder_count: 4
    },
    {
      id: 3,
      control_id: 'GOVERN-2.1',
      name: 'Risk Management Process',
      status: 'Approved',
      current_maturity: 4,
      target_maturity: 5,
      gap_normalized: 0.2,
      priority_score: 92,
      rosi_percentage: 180,
      stakeholder_count: 5
    },
    {
      id: 4,
      control_id: 'MAP-1.1',
      name: 'AI System Inventory',
      status: 'In Progress',
      current_maturity: 1,
      target_maturity: 4,
      gap_normalized: 0.75,
      priority_score: 65,
      rosi_percentage: 95,
      stakeholder_count: 2
    },
    {
      id: 5,
      control_id: 'MAP-2.1',
      name: 'Data Classification',
      status: 'Draft',
      current_maturity: 2,
      target_maturity: 5,
      gap_normalized: 0.6,
      priority_score: 72,
      rosi_percentage: 125,
      stakeholder_count: 3
    },
    {
      id: 6,
      control_id: 'MEASURE-1.1',
      name: 'Performance Metrics',
      status: 'Completed',
      current_maturity: 5,
      target_maturity: 5,
      gap_normalized: 0.0,
      priority_score: 45,
      rosi_percentage: 220,
      stakeholder_count: 2
    },
    {
      id: 7,
      control_id: 'MEASURE-2.1',
      name: 'Bias Testing',
      status: 'In Review',
      current_maturity: 2,
      target_maturity: 4,
      gap_normalized: 0.5,
      priority_score: 88,
      rosi_percentage: 165,
      stakeholder_count: 4
    },
    {
      id: 8,
      control_id: 'MANAGE-1.1',
      name: 'Incident Response',
      status: 'Draft',
      current_maturity: 1,
      target_maturity: 5,
      gap_normalized: 0.8,
      priority_score: 95,
      rosi_percentage: 190,
      stakeholder_count: 5
    }
  ]);

  const selectedAssessmentData = assessments.find(a => a.id === selectedAssessment);

  const handleRowClick = (control) => {
    // If clicking the same row, toggle drawer open/closed
    if (selectedControl?.id === control.id) {
      setDrawerOpen(!drawerOpen);
    } else {
      // If clicking a different row, keep drawer open and update content
      setSelectedControl(control);
      setDrawerOpen(true);
    }
  };

  const getStatusBadgeStyle = (status) => {
    const styles = {
      'Draft': { background: 'rgba(169, 180, 188, 0.1)', color: 'rgb(74, 85, 104)' },
      'In Review': { background: 'rgba(255, 153, 0, 0.1)', color: 'rgb(255, 153, 0)' },
      'Approved': { background: 'rgba(13, 199, 131, 0.1)', color: 'rgb(13, 199, 131)' }
    };
    return styles[status] || styles['Draft'];
  };

  const getPriorityColor = (score) => {
    if (score >= 80) return 'rgb(255, 35, 35)';
    if (score >= 60) return 'rgb(255, 153, 0)';
    return 'rgb(85, 81, 247)';
  };

  return (
    <div style={{ fontFamily: '"Source Sans Pro", sans-serif', maxWidth: '1440px', margin: '0 auto', padding: '30px' }}>
      <h1 style={{ fontSize: '38px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: '0 0 8px 0' }}>
        AI Assurance Plan
      </h1>
      <p style={{ fontSize: '16px', color: 'rgb(74, 85, 104)', margin: '0 0 24px 0' }}>
        Prioritize AI governance controls with weighted scoring and stakeholder alignment
      </p>

      {/* Assessment Toolbar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: 'rgb(113, 118, 126)' }}>Assessment:</span>
        <select
          value={selectedAssessment}
          onChange={(e) => setSelectedAssessment(e.target.value)}
          style={{ minWidth: '250px', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgb(220, 229, 242)' }}
        >
          {assessments.map(a => (
            <option key={a.id} value={a.id}>{a.name} — {a.date}</option>
          ))}
        </select>
        <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: 'rgba(85, 81, 247, 0.1)', color: 'rgb(85, 81, 247)' }}>
          Scale: {selectedAssessmentData?.scale}
        </span>
        <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: 'rgba(13, 199, 131, 0.1)', color: 'rgb(13, 199, 131)' }}>
          {selectedAssessmentData?.controlCount} Controls
        </span>
      </div>

      {/* Top Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', border: '1px solid rgb(220, 229, 242)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(113, 118, 126)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Average Priority Score
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgb(26, 32, 44)', marginBottom: '4px' }}>
            {(controls.reduce((sum, c) => sum + c.priority_score, 0) / controls.length).toFixed(1)}
          </div>
          <div style={{ fontSize: '11px', fontWeight: '400', color: 'rgb(113, 118, 126)', fontStyle: 'italic' }}>
            Mean priority across all {controls.length} controls (0-100 scale)
          </div>
        </div>
        <div style={{ background: 'white', border: '1px solid rgb(220, 229, 242)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(113, 118, 126)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Controls with Critical Gaps
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgb(255, 153, 0)', marginBottom: '4px' }}>
            {controls.filter(c => c.gap_normalized >= 0.5).length}
          </div>
          <div style={{ fontSize: '11px', fontWeight: '400', color: 'rgb(113, 118, 126)', fontStyle: 'italic' }}>
            Controls with gap ≥ 0.5 requiring immediate attention
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgb(220, 229, 242)', marginBottom: '16px' }}>
        <button onClick={() => setCurrentTab('actions')} style={{ flex: 1, padding: '16px', fontSize: '15px', fontWeight: currentTab === 'actions' ? '600' : '500', color: currentTab === 'actions' ? 'rgb(85, 81, 247)' : 'rgb(113, 118, 126)', border: 'none', borderBottom: currentTab === 'actions' ? '3px solid rgb(85, 81, 247)' : 'none', background: 'transparent', cursor: 'pointer' }}>
          📊 Actions Center
        </button>
        <button onClick={() => setCurrentTab('insights')} style={{ flex: 1, padding: '16px', fontSize: '15px', fontWeight: currentTab === 'insights' ? '600' : '500', color: currentTab === 'insights' ? 'rgb(85, 81, 247)' : 'rgb(113, 118, 126)', border: 'none', borderBottom: currentTab === 'insights' ? '3px solid rgb(85, 81, 247)' : 'none', background: 'transparent', cursor: 'pointer' }}>
          💡 Kovrr Insights
        </button>
      </div>

      {/* Actions Center */}
      {currentTab === 'actions' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button onClick={() => setControls([...controls].sort((a, b) => b.priority_score - a.priority_score))} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid rgb(169, 180, 188)', background: 'white', cursor: 'pointer' }}>
              Sort by Priority
            </button>
            <button onClick={() => setControls([...controls].sort((a, b) => b.gap_normalized - a.gap_normalized))} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid rgb(169, 180, 188)', background: 'white', cursor: 'pointer' }}>
              Sort by Gap
            </button>
            <button onClick={() => alert('Recalculating...')} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: 'rgb(85, 81, 247)', color: 'white', cursor: 'pointer', fontWeight: '600' }}>
              Recalculate All
            </button>
            <button onClick={() => setShowExplainerModal(true)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid rgb(169, 180, 188)', background: 'white', cursor: 'pointer', marginLeft: 'auto' }}>
              📖 How Priority Scoring Works
            </button>
          </div>

          <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'rgb(245, 247, 255)' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid rgb(220, 229, 242)' }}>Control ID</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid rgb(220, 229, 242)' }}>Control Name</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid rgb(220, 229, 242)' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', borderBottom: '1px solid rgb(220, 229, 242)' }}>Current</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', borderBottom: '1px solid rgb(220, 229, 242)' }}>Target</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', borderBottom: '1px solid rgb(220, 229, 242)' }}>Gap</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', borderBottom: '1px solid rgb(220, 229, 242)' }}>Priority (0–100)</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', borderBottom: '1px solid rgb(220, 229, 242)' }}>ROSI %</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid rgb(220, 229, 242)' }}>Stakeholders</th>
                </tr>
              </thead>
              <tbody>
                {controls.map(c => (
                  <tr key={c.id} onClick={() => handleRowClick(c)} style={{ cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(245, 247, 255)'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgb(220, 229, 242)', fontWeight: '600', color: 'rgb(85, 81, 247)' }}>{c.control_id}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgb(220, 229, 242)' }}>{c.name}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgb(220, 229, 242)' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', ...getStatusBadgeStyle(c.status) }}>{c.status}</span>
                    </td>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgb(220, 229, 242)', textAlign: 'center', fontWeight: '600' }}>{c.current_maturity}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgb(220, 229, 242)', textAlign: 'center', fontWeight: '600' }}>{c.target_maturity}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgb(220, 229, 242)', textAlign: 'center', fontWeight: '600', color: 'rgb(255, 153, 0)' }}>{c.gap_normalized.toFixed(2)}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgb(220, 229, 242)', textAlign: 'center' }}>
                      <span style={{ fontWeight: '700', fontSize: '16px', color: getPriorityColor(c.priority_score) }}>{c.priority_score}</span>
                    </td>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgb(220, 229, 242)', textAlign: 'center', fontWeight: '600', color: c.rosi_percentage >= 100 ? 'rgb(13, 199, 131)' : 'rgb(255, 153, 0)' }}>{c.rosi_percentage}%</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid rgb(220, 229, 242)' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: 'rgba(85, 81, 247, 0.1)', color: 'rgb(85, 81, 247)' }}>{c.stakeholder_count} stakeholders</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Kovrr Insights */}
      {currentTab === 'insights' && (
        <div style={{ background: 'white', borderRadius: '15px', padding: '40px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, rgb(85, 81, 247), rgb(97, 94, 251))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: '700' }}>K</div>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Kovrr Insights</h2>
              <p style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', margin: 0 }}>AI-powered recommendations based on industry data and best practices</p>
            </div>
          </div>

          {/* Insight Card 1 */}
          <div style={{ background: 'rgb(245, 247, 255)', borderRadius: '12px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid rgb(85, 81, 247)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <div style={{ background: 'rgb(85, 81, 247)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>1</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: '0 0 4px 0' }}>Prioritize Legal & Regulatory Compliance First</h3>
                <p style={{ fontSize: '13px', color: 'rgb(113, 118, 126)', fontStyle: 'italic', margin: 0 }}>Based on your assessment, regulatory controls show the highest gap</p>
              </div>
            </div>
            <p style={{ lineHeight: '1.7', color: 'rgb(48, 48, 69)', marginBottom: '12px' }}>
              Your assessment reveals significant gaps in legal and regulatory compliance controls (GOVERN-1.1, GOVERN-1.2).
              These controls have high priority scores (78-85) and should be addressed immediately to reduce regulatory risk exposure.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '12px 0' }}>
              <span style={{ background: 'white', border: '1px solid rgb(220, 229, 242)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: 'rgb(85, 81, 247)' }}>GOVERN-1.1</span>
              <span style={{ background: 'white', border: '1px solid rgb(220, 229, 242)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: 'rgb(85, 81, 247)' }}>GOVERN-1.2</span>
            </div>
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgb(220, 229, 242)' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Sources</div>
              <div style={{ fontSize: '13px', color: 'rgb(74, 85, 104)', marginBottom: '4px' }}>• NIST AI RMF 1.0 - Governance Framework</div>
              <div style={{ fontSize: '13px', color: 'rgb(74, 85, 104)' }}>• EU AI Act Compliance Requirements</div>
            </div>
          </div>

          {/* Insight Card 2 */}
          <div style={{ background: 'rgb(245, 247, 255)', borderRadius: '12px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid rgb(85, 81, 247)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <div style={{ background: 'rgb(85, 81, 247)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>2</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: '0 0 4px 0' }}>Address Data Classification Before AI System Inventory</h3>
                <p style={{ fontSize: '13px', color: 'rgb(113, 118, 126)', fontStyle: 'italic', margin: 0 }}>Dependency recommendation</p>
              </div>
            </div>
            <p style={{ lineHeight: '1.7', color: 'rgb(48, 48, 69)', marginBottom: '12px' }}>
              MAP-2.1 (Data Classification) should be implemented before MAP-1.1 (AI System Inventory) to ensure proper data handling
              protocols are in place. This will streamline your inventory process and ensure compliance from the start.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0', fontSize: '14px', color: 'rgb(74, 85, 104)' }}>
              <span style={{ fontWeight: '600' }}>MAP-2.1</span>
              <span style={{ color: 'rgb(255, 153, 0)', fontSize: '20px' }}>→</span>
              <span style={{ fontWeight: '600' }}>MAP-1.1</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, rgba(85, 81, 247, 0.1), rgba(97, 94, 251, 0.15))', border: '1px solid rgb(85, 81, 247)', padding: '8px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', color: 'rgb(85, 81, 247)', marginTop: '12px' }}>
              💡 Quick Win Initiative
            </div>
          </div>

          {/* Insight Card 3 */}
          <div style={{ background: 'rgb(245, 247, 255)', borderRadius: '12px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid rgb(85, 81, 247)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <div style={{ background: 'rgb(85, 81, 247)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>3</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: '0 0 4px 0' }}>High ROSI Opportunity: Risk Management Process</h3>
                <p style={{ fontSize: '13px', color: 'rgb(113, 118, 126)', fontStyle: 'italic', margin: 0 }}>Investment recommendation</p>
              </div>
            </div>
            <p style={{ lineHeight: '1.7', color: 'rgb(48, 48, 69)', marginBottom: '12px' }}>
              GOVERN-2.1 (Risk Management Process) shows a 180% ROSI with the highest priority score (92).
              This control is already at maturity level 4, making the final push to level 5 a high-value, low-effort investment.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '12px 0' }}>
              <span style={{ background: 'white', border: '1px solid rgb(220, 229, 242)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: 'rgb(85, 81, 247)' }}>GOVERN-2.1</span>
            </div>
            <div style={{ background: 'white', borderRadius: '8px', padding: '12px', marginTop: '12px' }}>
              <div style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', marginBottom: '4px' }}>Expected ROSI</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'rgb(13, 199, 131)' }}>180%</div>
            </div>
          </div>

          {/* Insight Card 4 */}
          <div style={{ background: 'rgb(245, 247, 255)', borderRadius: '12px', padding: '20px', borderLeft: '4px solid rgb(85, 81, 247)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <div style={{ background: 'rgb(85, 81, 247)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>4</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: '0 0 4px 0' }}>Engage Cross-Functional Stakeholders Early</h3>
                <p style={{ fontSize: '13px', color: 'rgb(113, 118, 126)', fontStyle: 'italic', margin: 0 }}>Stakeholder alignment strategy</p>
              </div>
            </div>
            <p style={{ lineHeight: '1.7', color: 'rgb(48, 48, 69)', marginBottom: '12px' }}>
              Controls with 4+ stakeholders (GOVERN-1.2, GOVERN-2.1) require early cross-functional alignment.
              Schedule kickoff meetings with Legal, Compliance, Engineering, and Operations teams to ensure buy-in and resource allocation.
            </p>
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgb(220, 229, 242)' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Recommended Actions</div>
              <div style={{ fontSize: '13px', color: 'rgb(74, 85, 104)', marginBottom: '4px' }}>• Schedule stakeholder alignment meetings</div>
              <div style={{ fontSize: '13px', color: 'rgb(74, 85, 104)', marginBottom: '4px' }}>• Define RACI matrix for each control</div>
              <div style={{ fontSize: '13px', color: 'rgb(74, 85, 104)' }}>• Establish regular progress check-ins</div>
            </div>
          </div>
        </div>
      )}

      {/* Explainer Modal */}
      {showExplainerModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30, 30, 30, 0.8)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowExplainerModal(false)}>
          <div style={{ background: 'white', borderRadius: '15px', maxWidth: '900px', width: '90%', maxHeight: '85vh', overflow: 'auto', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: '700', margin: 0 }}>How Priority Scoring Works: The Impact Story</h2>
              <button onClick={() => setShowExplainerModal(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ lineHeight: '1.7' }}>
              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>👋 Introduction</h2>
              <p>Hey! Let me walk you through how we calculate priority scores for AI governance controls. I'm going to focus on just <strong>one criterion - Impact</strong> - so you can really understand how this works. Once you get this, the rest will make total sense.</p>
              <p>Think of this like baking a cake. We're going to take ingredients from different people (stakeholders), mix them together in a specific way, and end up with a final number that tells us how important this control is.</p>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>🎯 The Setup: Meet Control X</h2>
              <p>Imagine we're looking at a control called <strong>"GOVERN-1: Mapping AI Systems"</strong>.</p>
              <p>Right now, your organization is at <strong>Level 2</strong> maturity (you're doing some basic stuff, but not great).</p>
              <p>Your goal is to reach <strong>Level 5</strong> maturity (you're world-class at this).</p>
              <p>That's a gap of <strong>3 levels</strong> to close. Let's remember this - we'll need it later.</p>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>📊 Step 1: Calculate How Big the Gap Is</h2>
              <p>First, we need to figure out: <strong>How far away are we from where we want to be?</strong></p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>Gap = (Target - Current) / 4</pre>
              <p>Wait, why divide by 4? Because whether you're using a 1-5 scale or a 0-4 scale, there are always <strong>4 steps</strong> between the lowest and highest level. This keeps everything fair and normalized.</p>
              <p><strong>For our Control X:</strong></p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>Gap = (5 - 2) / 4 = 3 / 4 = 0.75</pre>
              <p>So we have a <strong>0.75 gap</strong>. That's 75% of the maximum possible gap. Pretty big! This control needs serious work.</p>
              <div style={{ background: 'rgb(236, 242, 252)', borderLeft: '4px solid rgb(85, 81, 247)', padding: '16px', margin: '16px 0', borderRadius: '8px' }}>
                <strong style={{ color: 'rgb(85, 81, 247)' }}>💡 What this means:</strong> The bigger the gap, the more urgency we'll add later. Controls that are further from their target get a boost in priority.
              </div>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>👥 Step 2: Meet Your Stakeholders</h2>
              <p>Now, in your organization, three people care about AI governance:</p>
              <ul>
                <li><strong>Sarah (CISO)</strong> - She runs security</li>
                <li><strong>Mike (Legal)</strong> - He worries about compliance</li>
                <li><strong>Emma (Ethics)</strong> - She focuses on responsible AI</li>
              </ul>
              <p>These three people have different perspectives. They don't all care about the same things equally. And that's okay! That's actually the whole point of this system.</p>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>⚖️ Step 3: How Much Power Does Each Person Have?</h2>
              <p>Not everyone has equal say in your organization (that's just reality). So we assign <strong>Influence percentages</strong>:</p>
              <ul>
                <li><strong>Sarah (CISO): 40% influence</strong> - She's the main decision-maker</li>
                <li><strong>Mike (Legal): 35% influence</strong> - He has strong sway due to regulations</li>
                <li><strong>Emma (Ethics): 25% influence</strong> - Important voice, but less organizational power</li>
              </ul>
              <p>Notice these add up to <strong>100%</strong>. Everyone gets a slice of the pie.</p>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>🎯 Step 4: What Does "Impact" Mean to Each Person?</h2>
              <p>Now here's where it gets interesting. Each person has their own priorities. They split their attention across 5 criteria:</p>
              <ul>
                <li><strong>Impact</strong> (How much business value does this control create?)</li>
                <li><strong>Regulatory</strong> (How important is this for compliance?)</li>
                <li><strong>Ethical</strong> (How important is this for doing the right thing?)</li>
                <li><strong>Cost</strong> (How expensive is this to implement?)</li>
                <li><strong>Effort</strong> (How much work will this take?)</li>
              </ul>
              <p>Let's focus on just <strong>Impact</strong>. Each person decides: "Out of 100%, how much do I care about Impact versus the other criteria?"</p>
              <ul>
                <li><strong>Sarah (CISO) says:</strong> "Impact is <strong>35%</strong> of my priorities"</li>
                <li><strong>Mike (Legal) says:</strong> "Impact is only <strong>15%</strong> of my priorities" (he cares more about regulatory stuff)</li>
                <li><strong>Emma (Ethics) says:</strong> "Impact is <strong>20%</strong> of my priorities"</li>
              </ul>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>🔢 Step 5: Calculate the Global Weight for Impact</h2>
              <p>Now we need to blend these three perspectives into <strong>one organizational priority</strong> for Impact.</p>
              <p>Here's how we do it: <strong>Weight each person's opinion by their influence</strong></p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>Global Weight (Impact) = (Sarah's Influence × Sarah's Impact Weight)
                + (Mike's Influence × Mike's Impact Weight)
                + (Emma's Influence × Emma's Impact Weight)</pre>
              <p>Let's plug in the numbers:</p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>Global Weight (Impact) = (0.40 × 0.35) + (0.35 × 0.15) + (0.25 × 0.20)
                = 0.14 + 0.0525 + 0.05
                = 0.2425
                ≈ 0.24 (or 24%)</pre>
              <div style={{ background: 'rgb(236, 242, 252)', borderLeft: '4px solid rgb(85, 81, 247)', padding: '16px', margin: '16px 0', borderRadius: '8px' }}>
                <strong style={{ color: 'rgb(85, 81, 247)' }}>💡 What this means:</strong> As an organization, <strong>Impact accounts for 24% of your overall priorities</strong> when making decisions. This is a blend of what Sarah, Mike, and Emma each think, weighted by their power.
                <br /><br />
                Notice how Sarah's 35% got "pulled down" by Mike's 15% and Emma's 20%. That's the blending at work!
              </div>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>📝 Step 6: How Does Control X Score on Impact?</h2>
              <p>Okay, now each stakeholder actually <strong>rates Control X</strong> on how impactful it is. They give it a score from <strong>1 to 5</strong>:</p>
              <ul>
                <li><strong>1 = Very low impact</strong> ("This control doesn't really help us much")</li>
                <li><strong>5 = Very high impact</strong> ("This control is absolutely critical for our business")</li>
              </ul>
              <ul>
                <li><strong>Sarah (CISO) rates Impact: 5/5</strong> - "This control is huge for us!"</li>
                <li><strong>Mike (Legal) rates Impact: 4/5</strong> - "Pretty important"</li>
                <li><strong>Emma (Ethics) rates Impact: 4/5</strong> - "Definitely valuable"</li>
              </ul>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>🚀 Step 7: Adjust Scores Based on the Gap (The Magic Part!)</h2>
              <p>Here's where the gap we calculated way back in Step 1 comes into play.</p>
              <p>Remember our gap was <strong>0.75</strong>? Now we're going to <strong>amplify</strong> the Impact scores because of this gap.</p>
              <p>The logic is: <strong>If we're far from our target, we need to prioritize closing that gap even more urgently.</strong></p>
              <p>Formula for benefit criteria (like Impact):</p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>Adjusted Score = Raw Score × (1 + Gap)</pre>
              <p>Let's calculate for each person:</p>
              <p><strong>Sarah's Adjusted Impact Score:</strong></p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>5 × (1 + 0.75) = 5 × 1.75 = 8.75</pre>
              <p><strong>Mike's Adjusted Impact Score:</strong></p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>4 × (1 + 0.75) = 4 × 1.75 = 7.00</pre>
              <p><strong>Emma's Adjusted Impact Score:</strong></p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>4 × (1 + 0.75) = 4 × 1.75 = 7.00</pre>
              <div style={{ background: 'rgb(236, 242, 252)', borderLeft: '4px solid rgb(85, 81, 247)', padding: '16px', margin: '16px 0', borderRadius: '8px' }}>
                <strong style={{ color: 'rgb(85, 81, 247)' }}>💡 What this means:</strong> Because we have a big gap (0.75), everyone's scores got boosted by 75%. A score of 5 became 8.75. A score of 4 became 7.0. This creates urgency!
              </div>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>🔄 Step 8: Blend the Adjusted Scores</h2>
              <p>Just like we blended the weights in Step 5, now we blend the adjusted scores.</p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>Blended Impact Score = (Sarah's Influence × Sarah's Adjusted Score)
                + (Mike's Influence × Mike's Adjusted Score)
                + (Emma's Influence × Emma's Adjusted Score)</pre>
              <p>Plug in the numbers:</p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>Blended Impact Score = (0.40 × 8.75) + (0.35 × 7.00) + (0.25 × 7.00)
                = 3.50 + 2.45 + 1.75
                = 7.70</pre>
              <div style={{ background: 'rgb(236, 242, 252)', borderLeft: '4px solid rgb(85, 81, 247)', padding: '16px', margin: '16px 0', borderRadius: '8px' }}>
                <strong style={{ color: 'rgb(85, 81, 247)' }}>💡 What this means:</strong> The organization's <strong>overall adjusted Impact score for Control X is 7.70</strong> out of a theoretical maximum of about 8.75 (which would be 5 × 1.75 if everyone rated it 5/5).
                <br /><br />
                That's really strong! This control scores highly on Impact from an organizational perspective.
              </div>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>✨ Step 9: Calculate Impact's Contribution to Priority</h2>
              <p>Almost there! Now we multiply:</p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>Impact Contribution = Global Weight × Blended Score
                = 0.24 × 7.70
                = 1.85</pre>
              <div style={{ background: 'rgb(236, 242, 252)', borderLeft: '4px solid rgb(85, 81, 247)', padding: '16px', margin: '16px 0', borderRadius: '8px' }}>
                <strong style={{ color: 'rgb(85, 81, 247)' }}>💡 What this means:</strong> The <strong>Impact criterion contributes 1.85 points</strong> to Control X's overall priority score.
              </div>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>🎉 Step 10: The Big Picture</h2>
              <p>Here's what we just did <strong>for Impact alone</strong>:</p>
              <ol>
                <li>✅ Calculated the gap (0.75)</li>
                <li>✅ Figured out how much the org cares about Impact (24% weight)</li>
                <li>✅ Had stakeholders rate the control on Impact (5, 4, 4)</li>
                <li>✅ Boosted those scores because of the gap (8.75, 7.0, 7.0)</li>
                <li>✅ Blended them into one org score (7.70)</li>
                <li>✅ Multiplied weight × score = <strong>1.85 contribution</strong></li>
              </ol>
              <p><strong>Now imagine doing this exact same process for the other 4 criteria:</strong></p>
              <ul>
                <li>Regulatory (probably contributes ~2.5 points)</li>
                <li>Ethical (probably contributes ~1.3 points)</li>
                <li>Cost (inverted, probably contributes ~0.5 points)</li>
                <li>Effort (inverted, probably contributes ~0.3 points)</li>
              </ul>
              <p><strong>Add them all up:</strong></p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>Total Raw Priority = 1.85 + 2.50 + 1.30 + 0.50 + 0.30 = 6.45</pre>
              <p><strong>Then normalize to 0-100 scale:</strong></p>
              <pre style={{ background: 'rgb(237, 242, 247)', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>Priority Score = (6.45 / 7.70) × 100 = 83.8</pre>
              <p><strong>Control X gets a priority score of 83.8 out of 100!</strong></p>
              <p>That's really high! This control should be near the top of your implementation list.</p>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>🎯 Why This Matters</h2>
              <h3 style={{ fontSize: '18px', marginTop: '16px' }}>1. Transparent & Explainable</h3>
              <p>You can show anyone: "Here's exactly why Control X scored 83.8. Sarah gave it 5/5 on Impact, Mike gave it 5/5 on Regulatory, we have a 75% gap, etc."</p>

              <h3 style={{ fontSize: '18px', marginTop: '16px' }}>2. Stakeholder Alignment</h3>
              <p>Instead of fighting about priorities, you blend everyone's perspective mathematically. No one gets ignored.</p>

              <h3 style={{ fontSize: '18px', marginTop: '16px' }}>3. Gap-Aware</h3>
              <p>Controls with bigger gaps automatically get more urgency. You're not just looking at "importance" - you're looking at "importance × how far we have to go."</p>

              <h3 style={{ fontSize: '18px', marginTop: '16px' }}>4. Cost-Conscious</h3>
              <p>Cost and Effort are inverted, so expensive/hard controls naturally score lower (all else being equal).</p>

              <h3 style={{ fontSize: '18px', marginTop: '16px' }}>5. Adaptive</h3>
              <p>Change Sarah's influence from 40% to 50%? Recalculate instantly. Adjust Mike's regulatory weight? Recalculate instantly. It's flexible.</p>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>💭 Common Questions</h2>
              <p><strong>Q: Why do we divide by 4 when calculating gap?</strong><br />
                A: To normalize the gap to 0-1 scale regardless of whether you use 1-5 or 0-4 maturity levels. There are always 4 steps between min and max.</p>

              <p><strong>Q: Why multiply by (1 + Gap) for benefits?</strong><br />
                A: To create urgency. A control rated 5/5 with a tiny gap (0.1) becomes 5.5. The same control with a huge gap (0.9) becomes 9.5. Bigger gap = more urgent.</p>

              <p><strong>Q: Why invert Cost and Effort (6 - Score)?</strong><br />
                A: Because lower cost = better. If something costs 5/5 (expensive), we convert that to 1/5 (bad). If it costs 1/5 (cheap), we convert to 5/5 (good).</p>

              <p><strong>Q: What if stakeholder influences don't add up to 100%?</strong><br />
                A: The system will normalize them automatically. If you enter 40, 40, 40 (total = 120%), it'll convert to 33.3%, 33.3%, 33.3%.</p>

              <p><strong>Q: Can I have more than 3 stakeholders?</strong><br />
                A: Absolutely! Add as many as you want. The math stays the same - just more terms in the summation.</p>

              <h2 style={{ fontSize: '22px', marginTop: '24px' }}>🎓 You Made It!</h2>
              <p>Congrats! You now understand <strong>exactly</strong> how the Impact criterion flows through the entire calculation.</p>
              <p>The beautiful thing? <strong>Every other criterion works the exact same way.</strong> Regulatory, Ethical, Cost, Effort - they all follow this pattern.</p>
              <p>You've learned the system. Now you can explain it to your CFO, your board, your auditors, or anyone who asks: "How did you decide this control is priority #1?"</p>
              <p>You have a defensible, transparent, mathematically sound answer.</p>
              <p><strong>That's the power of weighted scoring! 🚀</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* Drawer Overlay */}
      {drawerOpen && selectedControl && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(30, 30, 30, 0.5)',
            zIndex: 99,
            opacity: drawerOpen ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* Right Drawer */}
      {selectedControl && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '600px',
          height: '100vh',
          background: 'white',
          boxShadow: 'rgba(0, 0, 0, 0.2) -4px 0px 20px 0px',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* Drawer Header */}
          <div style={{ padding: '24px', borderBottom: '1px solid rgb(220, 229, 242)', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0', color: 'rgb(26, 32, 44)' }}>{selectedControl.name}</h2>
              <div style={{ fontSize: '14px', color: 'rgb(113, 118, 126)', marginBottom: '12px' }}>{selectedControl.control_id}</div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Status</label>
                <select style={{ width: '200px', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgb(220, 229, 242)' }} value={selectedControl.status}>
                  <option>Draft</option>
                  <option>In Review</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <button onClick={() => setDrawerOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', height: '32px' }}>✕</button>
          </div>

          {/* Drawer Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgb(220, 229, 242)', background: 'rgb(245, 247, 255)' }}>
            <button onClick={() => setDrawerTab('scoring')} style={{ flex: 1, padding: '12px', fontSize: '14px', fontWeight: drawerTab === 'scoring' ? '600' : '500', color: drawerTab === 'scoring' ? 'rgb(85, 81, 247)' : 'rgb(113, 118, 126)', border: 'none', borderBottom: drawerTab === 'scoring' ? '3px solid rgb(85, 81, 247)' : 'none', background: 'transparent', cursor: 'pointer' }}>
              Scoring
            </button>
            <button onClick={() => setDrawerTab('remediation')} style={{ flex: 1, padding: '12px', fontSize: '14px', fontWeight: drawerTab === 'remediation' ? '600' : '500', color: drawerTab === 'remediation' ? 'rgb(85, 81, 247)' : 'rgb(113, 118, 126)', border: 'none', borderBottom: drawerTab === 'remediation' ? '3px solid rgb(85, 81, 247)' : 'none', background: 'transparent', cursor: 'pointer' }}>
              Remediation Guidance
            </button>
            <button onClick={() => setDrawerTab('notes')} style={{ flex: 1, padding: '12px', fontSize: '14px', fontWeight: drawerTab === 'notes' ? '600' : '500', color: drawerTab === 'notes' ? 'rgb(85, 81, 247)' : 'rgb(113, 118, 126)', border: 'none', borderBottom: drawerTab === 'notes' ? '3px solid rgb(85, 81, 247)' : 'none', background: 'transparent', cursor: 'pointer' }}>
              Notes & Attachments
            </button>
          </div>

          {/* Drawer Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {/* Scoring Tab */}
            {drawerTab === 'scoring' && (
              <div>
                {/* KPI Tiles */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ background: 'rgb(245, 247, 255)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', marginBottom: '4px' }}>Priority (0–100)</div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: getPriorityColor(selectedControl.priority_score) }}>{selectedControl.priority_score}</div>
                    <div style={{ fontSize: '11px', color: 'rgb(113, 118, 126)', marginTop: '4px' }}>Overall weighted score</div>
                  </div>
                  <div style={{ background: 'rgb(245, 247, 255)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', marginBottom: '4px' }}>Gap</div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: 'rgb(255, 153, 0)' }}>{selectedControl.gap_normalized.toFixed(2)}</div>
                    <div style={{ fontSize: '11px', color: 'rgb(113, 118, 126)', marginTop: '4px' }}>Maturity distance from target</div>
                  </div>
                </div>

                {/* Stakeholder Configuration */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Stakeholder Configuration</h3>
                  <div style={{ background: 'rgb(245, 247, 255)', borderRadius: '8px', padding: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Select Stakeholders</label>
                    {['Legal', 'Compliance', 'Engineering', 'Executive', 'Risk', 'Security', 'Privacy', 'Operations'].map(sh => (
                      <label key={sh} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedStakeholders.includes(sh)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStakeholders([...selectedStakeholders, sh]);
                            } else {
                              setSelectedStakeholders(selectedStakeholders.filter(s => s !== sh));
                            }
                          }}
                          style={{ width: '16px', height: '16px' }}
                        />
                        <span style={{ fontSize: '14px' }}>{sh}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Criterion Scoring */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Criterion Scoring (1-5)</h3>

                  {/* Impact */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Impact</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map(score => (
                        <button
                          key={score}
                          onClick={() => setCriterionScores({ ...criterionScores, impact: score })}
                          style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '6px',
                            border: criterionScores.impact === score ? '2px solid rgb(85, 81, 247)' : '1px solid rgb(220, 229, 242)',
                            background: criterionScores.impact === score ? 'rgb(236, 242, 252)' : 'white',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Regulatory */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Regulatory</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map(score => (
                        <button
                          key={score}
                          onClick={() => setCriterionScores({ ...criterionScores, regulatory: score })}
                          style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '6px',
                            border: criterionScores.regulatory === score ? '2px solid rgb(85, 81, 247)' : '1px solid rgb(220, 229, 242)',
                            background: criterionScores.regulatory === score ? 'rgb(236, 242, 252)' : 'white',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ethical */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Ethical</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map(score => (
                        <button
                          key={score}
                          onClick={() => setCriterionScores({ ...criterionScores, ethical: score })}
                          style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '6px',
                            border: criterionScores.ethical === score ? '2px solid rgb(85, 81, 247)' : '1px solid rgb(220, 229, 242)',
                            background: criterionScores.ethical === score ? 'rgb(236, 242, 252)' : 'white',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cost */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Cost (inverted)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map(score => (
                        <button
                          key={score}
                          onClick={() => setCriterionScores({ ...criterionScores, cost: score })}
                          style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '6px',
                            border: criterionScores.cost === score ? '2px solid rgb(85, 81, 247)' : '1px solid rgb(220, 229, 242)',
                            background: criterionScores.cost === score ? 'rgb(236, 242, 252)' : 'white',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Effort */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Effort (inverted)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map(score => (
                        <button
                          key={score}
                          onClick={() => setCriterionScores({ ...criterionScores, effort: score })}
                          style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '6px',
                            border: criterionScores.effort === score ? '2px solid rgb(85, 81, 247)' : '1px solid rgb(220, 229, 242)',
                            background: criterionScores.effort === score ? 'rgb(236, 242, 252)' : 'white',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button style={{ width: '100%', padding: '12px', borderRadius: '6px', border: 'none', background: 'rgb(85, 81, 247)', color: 'white', fontWeight: '600', cursor: 'pointer', marginTop: '16px' }}>
                    Recalculate Priority Score
                  </button>
                </div>
              </div>
            )}

            {/* Remediation Tab */}
            {drawerTab === 'remediation' && (
              <div>
                {/* Sample AI Guidance Response */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '16px', border: '1px solid rgb(220, 229, 242)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '20px' }}>🤖</span>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>AI Remediation Guidance</h3>
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgb(48, 48, 69)', lineHeight: '1.6' }}>
                    <p style={{ marginTop: 0 }}><strong>Recommended Implementation Approach:</strong></p>
                    <ol style={{ paddingLeft: '20px', margin: '12px 0' }}>
                      <li style={{ marginBottom: '8px' }}><strong>Establish AI System Inventory:</strong> Create a centralized repository documenting all AI systems, including purpose, data sources, and stakeholders.</li>
                      <li style={{ marginBottom: '8px' }}><strong>Define Classification Criteria:</strong> Develop risk-based classification framework (High/Medium/Low) based on impact, data sensitivity, and regulatory scope.</li>
                      <li style={{ marginBottom: '8px' }}><strong>Implement Discovery Process:</strong> Deploy automated discovery tools and establish quarterly review cycles to identify shadow AI.</li>
                      <li style={{ marginBottom: '8px' }}><strong>Assign Ownership:</strong> Designate AI system owners responsible for maintaining accurate documentation and compliance.</li>
                    </ol>
                    <p><strong>Estimated Timeline:</strong> 8-12 weeks for initial implementation</p>
                    <p><strong>Key Success Metrics:</strong> 100% AI system coverage, &lt;5% shadow AI, quarterly update compliance &gt;95%</p>
                  </div>
                </div>

                <div style={{ background: 'rgb(245, 247, 255)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: 0 }}>Ask AI for More Guidance</h3>
                  <p style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', marginBottom: '16px' }}>
                    Get additional recommendations for implementation steps, best practices, or specific challenges.
                  </p>
                  <textarea
                    placeholder="e.g., 'What tools can help with automated AI discovery?' or 'How do we handle third-party AI systems?'"
                    style={{ width: '100%', minHeight: '80px', padding: '12px', borderRadius: '8px', border: '1px solid rgb(220, 229, 242)', fontSize: '14px', marginBottom: '12px' }}
                  />
                  <button style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', background: 'rgb(85, 81, 247)', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
                    Get AI Guidance
                  </button>
                </div>

                <div style={{ background: 'rgb(245, 247, 255)', borderRadius: '12px', padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: 0 }}>ROSI Calculator</h3>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Total Costs ($)</label>
                    <input type="number" placeholder="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(220, 229, 242)' }} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Annual Savings ($)</label>
                    <input type="number" placeholder="0" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(220, 229, 242)' }} />
                  </div>
                  <div style={{ padding: '16px', background: 'white', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', marginBottom: '4px' }}>ROSI %</div>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgb(13, 199, 131)' }}>{selectedControl.rosi_percentage}%</div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes Tab */}
            {drawerTab === 'notes' && (
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Owner</label>
                  <select style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgb(220, 229, 242)', background: 'white' }}>
                    <option>sarah@kovrr.com</option>
                    <option>or@kovrr.com</option>
                    <option>yakir@kovrr.com</option>
                    <option>shai@kovrr.com</option>
                  </select>
                </div>

                {/* Existing Notes */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Activity Log</label>
                  <div style={{ background: 'white', borderRadius: '8px', border: '1px solid rgb(220, 229, 242)', padding: '16px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(85, 81, 247)' }}>sarah@kovrr.com</span>
                      <span style={{ fontSize: '11px', color: 'rgb(113, 118, 126)' }}>Nov 14, 2025 3:42 PM</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'rgb(48, 48, 69)', margin: '0 0 8px 0', lineHeight: '1.5' }}>
                      Met with IT team to discuss current AI inventory process. They're using a spreadsheet that's updated quarterly. Recommended moving to automated discovery tool to improve coverage and reduce shadow AI.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'rgb(113, 118, 126)' }}>
                      <span>📎</span>
                      <span>2 attachments</span>
                    </div>
                  </div>
                  <div style={{ background: 'white', borderRadius: '8px', border: '1px solid rgb(220, 229, 242)', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(85, 81, 247)' }}>or@kovrr.com</span>
                      <span style={{ fontSize: '11px', color: 'rgb(113, 118, 126)' }}>Nov 12, 2025 10:15 AM</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'rgb(48, 48, 69)', margin: 0, lineHeight: '1.5' }}>
                      Initial assessment complete. Current maturity at Level 2. Target set to Level 5 based on regulatory requirements (EU AI Act, NIST AI RMF). Priority score calculated at 87/100.
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Add New Note</label>
                  <textarea
                    placeholder="Add notes about this control..."
                    style={{ width: '100%', minHeight: '100px', padding: '12px', borderRadius: '8px', border: '1px solid rgb(220, 229, 242)', fontSize: '14px' }}
                  />
                  <button style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', background: 'rgb(85, 81, 247)', color: 'white', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}>
                    Save Note
                  </button>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Attachments</label>
                  {/* Existing Attachments */}
                  <div style={{ background: 'white', borderRadius: '8px', border: '1px solid rgb(220, 229, 242)', padding: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid rgb(237, 242, 247)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>📄</span>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgb(26, 32, 44)' }}>AI_Inventory_Template.xlsx</div>
                          <div style={{ fontSize: '11px', color: 'rgb(113, 118, 126)' }}>45 KB • Nov 14, 2025</div>
                        </div>
                      </div>
                      <button style={{ background: 'none', border: 'none', color: 'rgb(85, 81, 247)', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Download</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>📄</span>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgb(26, 32, 44)' }}>IT_Meeting_Notes.pdf</div>
                          <div style={{ fontSize: '11px', color: 'rgb(113, 118, 126)' }}>128 KB • Nov 14, 2025</div>
                        </div>
                      </div>
                      <button style={{ background: 'none', border: 'none', color: 'rgb(85, 81, 247)', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Download</button>
                    </div>
                  </div>
                  <div style={{ border: '2px dashed rgb(220, 229, 242)', borderRadius: '8px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ fontSize: '14px', color: 'rgb(113, 118, 126)' }}>📎 Drop files here or click to upload</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssurancePlan;
