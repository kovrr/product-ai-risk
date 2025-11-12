import { useState } from 'react';

const GovernanceMonitoring = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedControl, setSelectedControl] = useState(null);

  // Mock data based on AI Assurance Plan controls
  const governanceMetrics = {
    controlsImplemented: 14,
    totalControls: 19,
    complianceScore: 74,
    openActions: 5,
    overdueActions: 2,
    evidenceItems: 28,
    lastAudit: 'Nov 8, 2025'
  };

  const controlStatus = [
    {
      id: 'GOVERN-1.1',
      name: 'Legal and Regulatory Requirements',
      category: 'Governance',
      status: 'Implemented',
      maturity: 4,
      lastReview: '2025-11-05',
      owner: 'Legal Team',
      evidence: 3,
      actions: 0
    },
    {
      id: 'GOVERN-1.2',
      name: 'Accountability Structure',
      category: 'Governance',
      status: 'In Progress',
      maturity: 3,
      lastReview: '2025-11-01',
      owner: 'Compliance',
      evidence: 2,
      actions: 2
    },
    {
      id: 'GOVERN-2.1',
      name: 'Risk Management Process',
      category: 'Governance',
      status: 'Implemented',
      maturity: 4,
      lastReview: '2025-10-28',
      owner: 'Risk Team',
      evidence: 5,
      actions: 0
    },
    {
      id: 'MAP-1.1',
      name: 'AI System Inventory',
      category: 'Map',
      status: 'Not Started',
      maturity: 1,
      lastReview: null,
      owner: 'IT Operations',
      evidence: 0,
      actions: 3
    },
    {
      id: 'MAP-2.1',
      name: 'Data Classification',
      category: 'Map',
      status: 'In Progress',
      maturity: 2,
      lastReview: '2025-10-15',
      owner: 'Data Governance',
      evidence: 1,
      actions: 2
    },
    {
      id: 'MEASURE-1.1',
      name: 'Performance Metrics',
      category: 'Measure',
      status: 'Implemented',
      maturity: 5,
      lastReview: '2025-11-10',
      owner: 'Analytics Team',
      evidence: 4,
      actions: 0
    },
    {
      id: 'MEASURE-2.1',
      name: 'Risk Monitoring',
      category: 'Measure',
      status: 'Implemented',
      maturity: 4,
      lastReview: '2025-11-08',
      owner: 'Risk Team',
      evidence: 3,
      actions: 1
    },
    {
      id: 'MANAGE-1.1',
      name: 'Incident Response',
      category: 'Manage',
      status: 'In Progress',
      maturity: 3,
      lastReview: '2025-10-20',
      owner: 'Security Team',
      evidence: 2,
      actions: 1
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      severity: 'High',
      title: 'Control GOVERN-1.2 Review Overdue',
      description: 'Accountability Structure control has not been reviewed in 45 days',
      timestamp: '2025-11-12 14:30',
      status: 'Open',
      control: 'GOVERN-1.2'
    },
    {
      id: 2,
      severity: 'Medium',
      title: 'Missing Evidence for MAP-2.1',
      description: 'Data Classification control requires additional evidence documentation',
      timestamp: '2025-11-11 09:15',
      status: 'Acknowledged',
      control: 'MAP-2.1'
    },
    {
      id: 3,
      severity: 'Low',
      title: 'Upcoming Audit Scheduled',
      description: 'Quarterly governance audit scheduled for Nov 20, 2025',
      timestamp: '2025-11-10 16:45',
      status: 'Open',
      control: null
    },
    {
      id: 4,
      severity: 'High',
      title: 'Action Plan Overdue',
      description: 'MAP-1.1 implementation action plan is 7 days overdue',
      timestamp: '2025-11-09 11:20',
      status: 'Open',
      control: 'MAP-1.1'
    }
  ];

  const auditTrail = [
    {
      id: 1,
      timestamp: '2025-11-12 15:45',
      user: 'Sarah Chen',
      action: 'Updated Control Status',
      details: 'MEASURE-1.1 status changed to Implemented',
      control: 'MEASURE-1.1'
    },
    {
      id: 2,
      timestamp: '2025-11-12 14:20',
      user: 'Michael Rodriguez',
      action: 'Uploaded Evidence',
      details: 'Added policy document for GOVERN-1.1',
      control: 'GOVERN-1.1'
    },
    {
      id: 3,
      timestamp: '2025-11-11 10:30',
      user: 'Emily Watson',
      action: 'Completed Review',
      details: 'Quarterly review completed for GOVERN-2.1',
      control: 'GOVERN-2.1'
    },
    {
      id: 4,
      timestamp: '2025-11-10 16:15',
      user: 'David Kim',
      action: 'Created Action Plan',
      details: 'New action plan created for MAP-1.1 implementation',
      control: 'MAP-1.1'
    },
    {
      id: 5,
      timestamp: '2025-11-09 09:00',
      user: 'Lisa Anderson',
      action: 'Updated Maturity Level',
      details: 'GOVERN-1.2 maturity increased from 2 to 3',
      control: 'GOVERN-1.2'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      'Implemented': 'bg-[rgba(13,199,131,0.1)] text-[rgb(13,199,131)]',
      'In Progress': 'bg-[rgba(255,153,0,0.1)] text-[rgb(255,153,0)]',
      'Not Started': 'bg-[rgba(163,173,181,0.1)] text-[rgb(74,85,104)]'
    };
    return styles[status] || styles['Not Started'];
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'High': 'rgb(255, 35, 35)',
      'Medium': 'rgb(255, 153, 0)',
      'Low': 'rgb(85, 81, 247)'
    };
    return colors[severity] || colors['Low'];
  };

  const getMaturityColor = (maturity) => {
    if (maturity >= 4) return 'rgb(13, 199, 131)';
    if (maturity >= 3) return 'rgb(255, 153, 0)';
    return 'rgb(255, 35, 35)';
  };

  return (
    <div style={{ fontFamily: '"Source Sans Pro", sans-serif', maxWidth: '1440px', margin: '0 auto', padding: '30px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '38px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
          Governance & Monitoring
        </h1>
        <p style={{ fontSize: '16px', color: 'rgb(74, 85, 104)', margin: 0 }}>
          Continuous oversight of AI governance controls and compliance status
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(113, 118, 126)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Controls Implemented
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgb(26, 32, 44)' }}>
            {governanceMetrics.controlsImplemented}/{governanceMetrics.totalControls}
          </div>
          <div style={{ fontSize: '12px', color: 'rgb(13, 199, 131)', marginTop: '4px' }}>
            {Math.round((governanceMetrics.controlsImplemented / governanceMetrics.totalControls) * 100)}% Complete
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(113, 118, 126)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Compliance Score
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgb(85, 81, 247)' }}>
            {governanceMetrics.complianceScore}%
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgb(237, 242, 247)', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: `${governanceMetrics.complianceScore}%`, height: '100%', background: 'rgb(85, 81, 247)', borderRadius: '3px' }} />
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(113, 118, 126)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Open Actions
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgb(255, 153, 0)' }}>
            {governanceMetrics.openActions}
          </div>
          <div style={{ fontSize: '12px', color: 'rgb(255, 35, 35)', marginTop: '4px' }}>
            {governanceMetrics.overdueActions} Overdue
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(113, 118, 126)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Evidence Items
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'rgb(26, 32, 44)' }}>
            {governanceMetrics.evidenceItems}
          </div>
          <div style={{ fontSize: '12px', color: 'rgb(74, 85, 104)', marginTop: '4px' }}>
            Last Audit: {governanceMetrics.lastAudit}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgb(220, 229, 242)', marginBottom: '24px', background: 'white', borderRadius: '15px 15px 0 0' }}>
        {[
          { id: 'overview', label: 'Control Status' },
          { id: 'alerts', label: 'Alerts & Notifications' },
          { id: 'audit', label: 'Audit Trail' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              fontSize: '15px',
              fontWeight: activeTab === tab.id ? '600' : '500',
              color: activeTab === tab.id ? 'rgb(85, 81, 247)' : 'rgb(113, 118, 126)',
              padding: '16px 24px',
              textAlign: 'center',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === tab.id ? '3px solid rgb(85, 81, 247)' : 'none',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Control Status Tab */}
      {activeTab === 'overview' && (
        <div style={{ background: 'white', borderRadius: '0 0 15px 15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'rgb(237, 242, 247)' }}>
              <tr>
                <th style={{ fontSize: '12px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', padding: '12px 16px' }}>
                  Control ID
                </th>
                <th style={{ fontSize: '12px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', padding: '12px 16px' }}>
                  Control Name
                </th>
                <th style={{ fontSize: '12px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', padding: '12px 16px' }}>
                  Category
                </th>
                <th style={{ fontSize: '12px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center', padding: '12px 16px' }}>
                  Status
                </th>
                <th style={{ fontSize: '12px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center', padding: '12px 16px' }}>
                  Maturity
                </th>
                <th style={{ fontSize: '12px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', padding: '12px 16px' }}>
                  Owner
                </th>
                <th style={{ fontSize: '12px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center', padding: '12px 16px' }}>
                  Evidence
                </th>
                <th style={{ fontSize: '12px', fontWeight: '700', color: 'rgb(74, 85, 104)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center', padding: '12px 16px' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {controlStatus.map((control, index) => (
                <tr
                  key={control.id}
                  style={{
                    borderBottom: index < controlStatus.length - 1 ? '1px solid rgb(220, 229, 242)' : 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(245, 247, 255)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  <td style={{ padding: '16px', fontWeight: '600', color: 'rgb(85, 81, 247)', fontSize: '14px' }}>
                    {control.id}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: 'rgb(26, 32, 44)' }}>
                    {control.name}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: 'rgb(74, 85, 104)' }}>
                    {control.category}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }} className={getStatusBadge(control.status)}>
                      {control.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '700', color: getMaturityColor(control.maturity) }}>
                        {control.maturity}
                      </span>
                      <span style={{ fontSize: '12px', color: 'rgb(113, 118, 126)' }}>/5</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: 'rgb(74, 85, 104)' }}>
                    {control.owner}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: 'rgb(85, 81, 247)' }}>
                    {control.evidence}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    {control.actions > 0 ? (
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: 'rgba(255, 153, 0, 0.1)',
                        color: 'rgb(255, 153, 0)'
                      }}>
                        {control.actions}
                      </span>
                    ) : (
                      <span style={{ fontSize: '14px', color: 'rgb(163, 173, 181)' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div style={{ background: 'white', borderRadius: '0 0 15px 15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: 0 }}>
              Recent Alerts
            </h2>
            <button style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid rgb(85, 81, 247)',
              background: 'white',
              color: 'rgb(85, 81, 247)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Mark All as Read
            </button>
          </div>

          {recentAlerts.map((alert, index) => (
            <div
              key={alert.id}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid rgb(220, 229, 242)',
                marginBottom: index < recentAlerts.length - 1 ? '12px' : 0,
                background: alert.status === 'Open' ? 'rgb(245, 247, 255)' : 'white'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: getSeverityColor(alert.severity)
                    }} />
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: getSeverityColor(alert.severity),
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {alert.severity}
                    </span>
                    {alert.control && (
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        background: 'rgba(85, 81, 247, 0.1)',
                        color: 'rgb(85, 81, 247)'
                      }}>
                        {alert.control}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(26, 32, 44)', marginBottom: '4px' }}>
                    {alert.title}
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', lineHeight: '1.5' }}>
                    {alert.description}
                  </div>
                </div>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: alert.status === 'Open' ? 'rgba(255, 153, 0, 0.1)' : 'rgba(13, 199, 131, 0.1)',
                  color: alert.status === 'Open' ? 'rgb(255, 153, 0)' : 'rgb(13, 199, 131)'
                }}>
                  {alert.status}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'rgb(113, 118, 126)', marginTop: '8px' }}>
                {alert.timestamp}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Audit Trail Tab */}
      {activeTab === 'audit' && (
        <div style={{ background: 'white', borderRadius: '0 0 15px 15px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'rgb(26, 32, 44)', margin: '0 0 20px 0' }}>
            Recent Activity
          </h2>

          <div style={{ position: 'relative', paddingLeft: '40px' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: '15px',
              top: '8px',
              bottom: '8px',
              width: '2px',
              background: 'rgb(220, 229, 242)'
            }} />

            {auditTrail.map((event, index) => (
              <div
                key={event.id}
                style={{
                  position: 'relative',
                  marginBottom: index < auditTrail.length - 1 ? '24px' : 0
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-33px',
                  top: '4px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'rgb(85, 81, 247)',
                  border: '2px solid white',
                  boxShadow: '0 0 0 2px rgb(220, 229, 242)'
                }} />

                <div style={{
                  padding: '12px 16px',
                  background: 'rgb(245, 247, 255)',
                  borderRadius: '8px',
                  border: '1px solid rgb(220, 229, 242)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(26, 32, 44)' }}>
                        {event.user}
                      </span>
                      <span style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', margin: '0 6px' }}>•</span>
                      <span style={{ fontSize: '14px', color: 'rgb(85, 81, 247)', fontWeight: '600' }}>
                        {event.action}
                      </span>
                    </div>
                    {event.control && (
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        background: 'rgba(85, 81, 247, 0.1)',
                        color: 'rgb(85, 81, 247)'
                      }}>
                        {event.control}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgb(74, 85, 104)', marginBottom: '4px' }}>
                    {event.details}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgb(113, 118, 126)' }}>
                    {event.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernanceMonitoring;
