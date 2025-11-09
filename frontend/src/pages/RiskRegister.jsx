import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, ChevronDown } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import { 
  mockRisks, 
  searchRisks,
  getRisksByCategory,
  getRisksByPriority,
  getRisksByStatus,
  getAllCategories,
  getAllPriorities,
  getAllStatuses,
  sortRisksByPriority,
} from '../data/mock-risks';
import { getRiskAssets, getAssetById } from '../data';
import { CategoryBadge, ExportMenu } from '../components/molecules';
import { 
  RiskFormModal, 
  RiskMatrix, 
  RiskMetricsSidebar, 
  KovrrAIChat, 
  AIRecommendations,
  FinancialOverview,
  LossDistributionChart 
} from '../components/organisms';

const RiskRegister = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [sortColumn, setSortColumn] = useState('priority');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);
  const [selectedMatrixCell, setSelectedMatrixCell] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'agent',
      text: '👋 Hi! I\'m your Kovrr AI Risk Analyst. Ask me anything about AI risks, incident data, or recommendations for your scenarios.'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [insightsRecommendations, setInsightsRecommendations] = useState([]);
  const chatMessagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Filter and search risks
  const filteredRisks = useMemo(() => {
    let filtered = mockRisks;

    // Apply search
    if (searchQuery) {
      filtered = searchRisks(searchQuery);
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(risk => selectedCategories.includes(risk.category));
    }

    // Apply priority filter
    if (selectedPriorities.length > 0) {
      filtered = filtered.filter(risk => selectedPriorities.includes(risk.priority));
    }

    // Apply status filter
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(risk => selectedStatuses.includes(risk.status));
    }

    // Apply matrix cell filter
    if (selectedMatrixCell) {
      filtered = filtered.filter(risk => 
        risk.impact_level === selectedMatrixCell.impact && 
        risk.likelihood_level === selectedMatrixCell.likelihood
      );
    }

    // Apply sorting
    if (sortColumn === 'priority') {
      filtered = sortRisksByPriority(filtered);
      if (sortDirection === 'asc') filtered = filtered.reverse();
    } else if (sortColumn === 'name') {
      filtered = [...filtered].sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    } else if (sortColumn === 'category') {
      filtered = [...filtered].sort((a, b) => {
        const comparison = a.category.localeCompare(b.category);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedPriorities, selectedStatuses, sortColumn, sortDirection]);

  // Calculate affected assets for each risk
  const risksWithAssets = useMemo(() => {
    return filteredRisks.map(risk => {
      const assetIds = getRiskAssets(risk.id);
      const assets = assetIds.map(id => getAssetById(id)).filter(Boolean);
      return {
        ...risk,
        affectedAssets: assets,
        assetCount: assets.length,
      };
    });
  }, [filteredRisks]);

  const getPriorityBadge = (priority) => {
    const badges = {
      Critical: 'bg-[rgba(255,35,35,0.1)] text-[rgb(255,35,35)]',
      High: 'bg-[rgba(255,153,0,0.1)] text-[rgb(255,153,0)]',
      Medium: 'bg-[rgba(251,188,9,0.1)] text-[rgb(159,60,0)]',
      Low: 'bg-[rgba(169,180,188,0.1)] text-[rgb(74,85,104)]',
    };
    return badges[priority] || 'bg-[rgba(169,180,188,0.1)] text-[rgb(74,85,104)]';
  };

  const getImpactBadge = (impact) => {
    const badges = {
      Severe: 'bg-[rgba(255,35,35,0.1)] text-[rgb(255,35,35)]',
      Significant: 'bg-[rgba(255,153,0,0.1)] text-[rgb(255,153,0)]',
      Moderate: 'bg-[rgba(251,188,9,0.1)] text-[rgb(159,60,0)]',
      Minor: 'bg-[rgba(169,180,188,0.1)] text-[rgb(74,85,104)]',
      Negligible: 'bg-[rgba(245,247,255,0.5)] text-[rgb(113,118,126)]',
    };
    return badges[impact] || 'bg-[rgba(169,180,188,0.1)] text-[rgb(74,85,104)]';
  };

  const getLikelihoodBadge = (likelihood) => {
    const badges = {
      Expected: 'bg-[rgba(255,35,35,0.1)] text-[rgb(255,35,35)]',
      Possible: 'bg-[rgba(251,188,9,0.1)] text-[rgb(159,60,0)]',
      Unlikely: 'bg-[rgba(255,153,0,0.1)] text-[rgb(255,153,0)]',
      Rare: 'bg-[rgba(169,180,188,0.1)] text-[rgb(74,85,104)]',
      'Very Rare': 'bg-[rgba(245,247,255,0.5)] text-[rgb(113,118,126)]',
    };
    return badges[likelihood] || 'bg-[rgba(169,180,188,0.1)] text-[rgb(74,85,104)]';
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const toggleFilter = (filterArray, setFilterArray, value) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter(item => item !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedPriorities([]);
    setSelectedStatuses([]);
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || 
    selectedPriorities.length > 0 || selectedStatuses.length > 0;

  const handleSaveRisk = useCallback((riskData) => {
    console.log('Saving risk:', riskData);
    setIsModalOpen(false);
    setEditingRisk(null);
    
    showNotification({
      type: 'success',
      title: editingRisk ? 'Risk Updated' : 'Risk Created',
      message: editingRisk 
        ? `${riskData.name} has been successfully updated.`
        : `${riskData.name} has been successfully created.`,
    });
  }, [editingRisk, showNotification]);

  const handleMatrixCellClick = useCallback((impactLevel, likelihoodLevel) => {
    if (selectedMatrixCell?.impact === impactLevel && selectedMatrixCell?.likelihood === likelihoodLevel) {
      setSelectedMatrixCell(null);
    } else {
      setSelectedMatrixCell({ impact: impactLevel, likelihood: likelihoodLevel });
    }
  }, [selectedMatrixCell]);

  const handleAddRisk = useCallback(() => {
    setEditingRisk(null);
    setIsModalOpen(true);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage = { type: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMessage]);

    // Generate AI response based on keywords
    const lowerInput = chatInput.toLowerCase();
    let agentResponse = '';

    if (lowerInput.includes('incident') || lowerInput.includes('frequency')) {
      agentResponse = 'Based on Kovrr\'s incident databases (OECD.AI: 9,678 incidents, AIAAIC: 2,084 incidents), I can provide detailed analysis. Biometric data incidents have increased 340% since 2020, while model poisoning attacks show a 215% increase since 2021. What specific type of incident are you interested in?';
    } else if (lowerInput.includes('biometric') || lowerInput.includes('facial')) {
      agentResponse = 'Biometric data incidents have increased 340% since 2020. Common patterns include unauthorized facial recognition deployment, inadequate consent mechanisms, and cross-border data transfers. Average GDPR fines: €2.1M-€4.8M. These incidents typically involve Privacy Violation (78%) and Human Rights concerns.';
    } else if (lowerInput.includes('impact') || lowerInput.includes('financial') || lowerInput.includes('cost')) {
      agentResponse = 'Impact assessments should consider multiple dimensions: regulatory (fines, sanctions), operational (downtime, recovery costs), reputational (customer churn, media coverage), and strategic (market position, competitive advantage). For biometric violations, average fines are $2.1M-$4.8M. Model poisoning shows median impact of $3.8M with 45-90 day recovery time. Would you like estimates for a specific scenario?';
    } else if (lowerInput.includes('mitre') || lowerInput.includes('atlas') || lowerInput.includes('tactic')) {
      agentResponse = 'MITRE ATLAS provides 12 initial access tactics for AI systems. The most common in our incident data are: Phishing (AML.T0052) - 3 incidents, AI Supply Chain Compromise variants - 2 incidents, and Evade AI Model (AML.T0015) - 3 incidents. Exploit Public-Facing Application (AML.T0049) appears in 67% of biometric incidents. Which tactic would you like to explore?';
    } else if (lowerInput.includes('model poisoning') || lowerInput.includes('supply chain')) {
      agentResponse = 'Model poisoning attacks represent Critical risk. MIT AI Risk Repository classifies this under "AI Supply Chain Compromise: Model" with documented cases across 23 industries. Median financial impact: $3.8M, recovery time: 45-90 days. Consider adding "Evade AI Model (AML.T0015)" - found in 42% of model poisoning incidents to avoid detection during testing.';
    } else if (lowerInput.includes('recommendation') || lowerInput.includes('control') || lowerInput.includes('mitigation')) {
      agentResponse = 'For effective risk mitigation, I recommend: 1) Map controls to NIST AI RMF (GOVERN 1.1, MAP 1.1, MEASURE 2.3 are most common), 2) Implement multi-layered defenses, 3) Regular testing and validation, 4) Incident response planning. GOVERN 1.1 is currently mapped to 5 scenarios in your register. Would you like specific guidance for a particular risk?';
    } else if (lowerInput.includes('priorit') || lowerInput.includes('which') || lowerInput.includes('first')) {
      agentResponse = 'Risk prioritization should consider: 1) Severity of impact (financial, reputational, regulatory), 2) Likelihood based on incident frequency data, 3) Current control maturity, 4) Regulatory requirements (EU AI Act high-risk classifications). Critical risks with high likelihood should be addressed first. Your register shows ' + filteredRisks.filter(r => r.priority === 'Critical').length + ' Critical scenarios requiring immediate attention.';
    } else {
      agentResponse = 'I can help you with:\n• Incident frequency analysis from 12,000+ documented cases\n• Impact magnitude estimates based on historical data (OECD.AI, AIAAIC, Damien Charlotin databases)\n• MITRE ATLAS tactic recommendations\n• Risk categorization guidance (EU AI Act, NIST AI RMF)\n• Control mapping suggestions\n• Financial impact estimates\n\nTry asking: "What are the most common incidents?" or "How should I prioritize risks?" or "Tell me about biometric data risks"';
    }

    // Add agent response after a short delay
    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'agent', text: agentResponse }]);
    }, 500);

    setChatInput('');
  }, [chatInput, filteredRisks]);

  const handleChatKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleAnalyzeScenario = useCallback(() => {
    if (!selectedScenario) return;

    const risk = risksWithAssets.find(r => r.risk_id === selectedScenario);
    if (!risk) return;

    // Generate AI-powered recommendations based on the selected risk
    const recommendations = [
      {
        id: 1,
        priority: 'high',
        title: 'Implement Multi-Layer Defense Strategy',
        description: `For ${risk.name}, establish defense-in-depth with multiple security controls including input validation, output filtering, and behavioral monitoring.`,
        impact: 'Reduces likelihood by 40%',
        effort: 'Medium',
        timeline: '2-3 months'
      },
      {
        id: 2,
        priority: 'high',
        title: 'Enhanced Monitoring & Detection',
        description: `Deploy real-time monitoring for ${risk.category} incidents with automated alerting and anomaly detection capabilities.`,
        impact: 'Improves detection time by 70%',
        effort: 'Low',
        timeline: '2-4 weeks'
      },
      {
        id: 3,
        priority: 'medium',
        title: 'Incident Response Playbook',
        description: `Create specific response procedures for ${risk.category} scenarios including escalation paths, containment strategies, and recovery steps.`,
        impact: 'Reduces impact by 30%',
        effort: 'Low',
        timeline: '1-2 weeks'
      },
      {
        id: 4,
        priority: 'medium',
        title: 'Regular Security Assessments',
        description: `Schedule quarterly penetration testing and vulnerability assessments focused on ${risk.category} attack vectors.`,
        impact: 'Identifies 85% of vulnerabilities',
        effort: 'Medium',
        timeline: 'Ongoing'
      }
    ];

    setInsightsRecommendations(recommendations);
    
    showNotification({
      type: 'success',
      title: 'Analysis Complete',
      message: `Generated ${recommendations.length} AI-powered recommendations for ${risk.name}`,
    });
  }, [selectedScenario, risksWithAssets, showNotification]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-[24px]">
        <h1 className="text-[38px] font-[700] text-[rgb(26,32,44)] tracking-[-0.5px] m-0">AI Risk Register</h1>
        <div className="flex items-center gap-3">
          <ExportMenu risks={filteredRisks} />
          <button 
            onClick={handleAddRisk}
            className="inline-flex items-center gap-[8px] px-[16px] py-[8px] bg-[rgb(85,81,247)] text-white text-[14px] font-[600] rounded-[6px] border-none shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] cursor-pointer transition-all duration-200 hover:bg-[rgb(97,94,251)]"
          >
            <Plus size={18} />
            Add Risk Scenario
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-t-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] overflow-hidden">
        <div className="flex border-b border-[rgb(220,229,242)]">
          <button
            onClick={() => setActiveTab('table')}
            className={`flex-1 px-[24px] py-[16px] text-center text-[15px] border-b-[3px] transition-all duration-200 ${
              activeTab === 'table'
                ? 'font-[600] text-[rgb(85,81,247)] border-b-[rgb(85,81,247)] bg-white'
                : 'font-[500] text-[rgb(113,118,126)] border-b-transparent bg-transparent hover:bg-[rgb(245,247,255)]'
            }`}
          >
            Risk Register Table
          </button>
          <button
            onClick={() => setActiveTab('visualization')}
            className={`flex-1 px-[24px] py-[16px] text-center text-[15px] border-b-[3px] transition-all duration-200 ${
              activeTab === 'visualization'
                ? 'font-[600] text-[rgb(85,81,247)] border-b-[rgb(85,81,247)] bg-white'
                : 'font-[500] text-[rgb(113,118,126)] border-b-transparent bg-transparent hover:bg-[rgb(245,247,255)]'
            }`}
          >
            Risk Register Visualization
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`flex-1 px-[24px] py-[16px] text-center text-[15px] border-b-[3px] transition-all duration-200 ${
              activeTab === 'insights'
                ? 'font-[600] text-[rgb(85,81,247)] border-b-[rgb(85,81,247)] bg-white'
                : 'font-[500] text-[rgb(113,118,126)] border-b-transparent bg-transparent hover:bg-[rgb(245,247,255)]'
            }`}
          >
            Kovrr Insights
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'table' && (
        <>
          {/* Search and Filters */}
          <div className="bg-white rounded-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] p-[30px]">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="flex justify-between items-center mb-[16px]">
            <div className="relative w-[300px]">
              <Search className="absolute left-[12px] top-1/2 transform -translate-y-1/2 text-[rgb(113,118,126)]" size={16} />
              <input
                type="text"
                placeholder="Search scenarios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-[36px] pr-[12px] py-[8px] border border-[rgb(220,229,242)] rounded-[6px] text-[14px] font-['Source_Sans_Pro'] focus:outline-none focus:border-[rgb(85,81,247)] focus:shadow-[0_0_0_3px_rgba(85,81,247,0.12)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th 
                  className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px] bg-[rgb(237,242,247)] border-b border-[rgb(220,229,242)] cursor-pointer"
                  onClick={() => handleSort('risk_id')}
                >
                  ID {sortColumn === 'risk_id' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px] bg-[rgb(237,242,247)] border-b border-[rgb(220,229,242)] cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Scenario Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px] bg-[rgb(237,242,247)] border-b border-[rgb(220,229,242)] cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  Category {sortColumn === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px] bg-[rgb(237,242,247)] border-b border-[rgb(220,229,242)] cursor-pointer"
                  onClick={() => handleSort('priority')}
                >
                  Priority {sortColumn === 'priority' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px] bg-[rgb(237,242,247)] border-b border-[rgb(220,229,242)]">Impact</th>
                <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px] bg-[rgb(237,242,247)] border-b border-[rgb(220,229,242)]">Likelihood</th>
                <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px] bg-[rgb(237,242,247)] border-b border-[rgb(220,229,242)]">Status</th>
                <th className="text-[12px] font-[700] text-[rgb(74,85,104)] uppercase tracking-[0.5px] text-left px-[16px] py-[12px] bg-[rgb(237,242,247)] border-b border-[rgb(220,229,242)]">Owner</th>
              </tr>
            </thead>
            <tbody>
              {risksWithAssets.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-[rgb(113,118,126)]">
                    No risk scenarios found matching your filters
                  </td>
                </tr>
              ) : (
                risksWithAssets.map((risk) => (
                  <tr 
                    key={risk.id}
                    onClick={() => navigate(`/risk-register/${risk.id}`)}
                    className="cursor-pointer transition-colors duration-150 hover:bg-[rgb(236,242,252)]"
                  >
                    <td className="px-[16px] py-[12px] border-b border-[rgb(220,229,242)] text-[rgb(48,48,69)] text-[14px]">
                      <span className="text-[rgb(85,81,247)] font-[600]">{risk.risk_id}</span>
                    </td>
                    <td className="px-[16px] py-[12px] border-b border-[rgb(220,229,242)] text-[rgb(48,48,69)] text-[14px] font-[600]">{risk.name}</td>
                    <td className="px-[16px] py-[12px] border-b border-[rgb(220,229,242)] text-[rgb(48,48,69)] text-[14px]">
                      <CategoryBadge category={risk.category} />
                    </td>
                    <td className="px-[16px] py-[12px] border-b border-[rgb(220,229,242)] text-[rgb(48,48,69)] text-[14px]">
                      <span className={`inline-flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] text-[12px] font-[600] ${getPriorityBadge(risk.priority)}`}>
                        {risk.priority}
                      </span>
                    </td>
                    <td className="px-[16px] py-[12px] border-b border-[rgb(220,229,242)] text-[rgb(48,48,69)] text-[14px]">
                      <span className={`inline-flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] text-[12px] font-[600] ${getImpactBadge(risk.impact_level)}`}>
                        {risk.impact_level}
                      </span>
                    </td>
                    <td className="px-[16px] py-[12px] border-b border-[rgb(220,229,242)] text-[rgb(48,48,69)] text-[14px]">
                      <span className={`inline-flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] text-[12px] font-[600] ${getLikelihoodBadge(risk.likelihood_level)}`}>
                        {risk.likelihood_level}
                      </span>
                    </td>
                    <td className="px-[16px] py-[12px] border-b border-[rgb(220,229,242)] text-[rgb(48,48,69)] text-[14px]">{risk.status}</td>
                    <td className="px-[16px] py-[12px] border-b border-[rgb(220,229,242)] text-[rgb(48,48,69)] text-[14px]">{risk.owner_name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}

      {/* Risk Register Visualization Tab */}
      {activeTab === 'visualization' && (
        <div className="bg-white rounded-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] p-[30px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
            {/* Risk Matrix */}
            <div className="lg:col-span-2">
              <RiskMatrix 
                risks={filteredRisks}
                onCellClick={handleMatrixCellClick}
                selectedCell={selectedMatrixCell}
              />
            </div>

            {/* Metrics Sidebar */}
            <div className="lg:col-span-1">
              <RiskMetricsSidebar risks={filteredRisks} />
            </div>
          </div>
        </div>
      )}

      {/* Kovrr Insights Tab */}
      {activeTab === 'insights' && (
        <div className="bg-white rounded-[15px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] p-[30px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
            {/* Left Column - Analysis Form + Chat */}
            <div className="lg:col-span-1 space-y-[30px]">
              {/* Analysis Form */}
              <div className="bg-white p-[30px] rounded-[12px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
                <div className="flex items-center gap-[8px] mb-[20px]">
                  <h3 className="text-[20px] font-[600] text-[rgb(26,32,44)] flex-1">Analyze Risk Scenario</h3>
                  <button 
                    className="bg-white border border-[rgb(220,229,242)] rounded-[6px] px-[8px] py-[6px] cursor-pointer text-[rgb(74,85,104)] text-[16px] leading-none transition-all duration-200 hover:bg-[rgb(237,242,247)]"
                    title="How Priority Scoring Works"
                  >
                    ℹ️
                  </button>
                </div>
                <div className="mb-[20px]">
                  <label className="text-[13px] font-[600] text-[rgb(74,85,104)] mb-[6px] block">Select Scenario</label>
                  <select 
                    value={selectedScenario || ''}
                    onChange={(e) => setSelectedScenario(e.target.value)}
                    className="w-full px-[12px] py-[10px] border border-[rgb(220,229,242)] rounded-[6px] text-[14px] font-['Source_Sans_Pro']"
                  >
                    <option value="">Choose a scenario...</option>
                    {risksWithAssets.map(risk => (
                      <option key={risk.id} value={risk.risk_id}>
                        {risk.risk_id} - {risk.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={handleAnalyzeScenario}
                  disabled={!selectedScenario}
                  className="w-full bg-[rgb(85,81,247)] text-white px-[12px] py-[12px] border-none rounded-[6px] text-[14px] font-[600] cursor-pointer font-['Source_Sans_Pro'] mt-[10px] hover:bg-[rgb(97,94,251)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Analyze Scenario
                </button>
              </div>

              {/* Chat Interface */}
              <div className="bg-white p-[20px] rounded-[12px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
                <h3 className="text-[20px] font-[600] text-[rgb(26,32,44)] mb-[16px]">Ask Kovrr Agent</h3>
                <div className="max-h-[400px] overflow-y-auto mb-[16px] space-y-[12px]">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`px-[12px] py-[12px] rounded-[8px] ${
                        message.type === 'user'
                          ? 'bg-[rgb(236,242,252)] text-[rgb(48,48,69)] ml-[40px]'
                          : 'bg-[rgb(245,247,255)] text-[rgb(48,48,69)] mr-[40px]'
                      }`}
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {message.text}
                    </div>
                  ))}
                  <div ref={chatMessagesEndRef} />
                </div>
                <div className="flex gap-[12px]">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleChatKeyPress}
                    className="flex-1 px-[12px] py-[10px] border border-[rgb(220,229,242)] rounded-[6px] text-[14px] font-['Source_Sans_Pro'] focus:outline-none focus:border-[rgb(85,81,247)] focus:shadow-[0_0_0_3px_rgba(85,81,247,0.12)]" 
                    placeholder="Ask about incidents, impact estimates, or recommendations..."
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="bg-[rgb(85,81,247)] text-white px-[20px] py-[10px] border-none rounded-[6px] text-[14px] font-[600] cursor-pointer font-['Source_Sans_Pro'] hover:bg-[rgb(97,94,251)] transition-colors duration-200"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Recommendations */}
            <div className="lg:col-span-1">
              <div className="bg-white p-[30px] rounded-[12px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
                <h3 className="text-[20px] font-[600] text-[rgb(26,32,44)] mb-[16px]">AI-Powered Recommendations</h3>
                {insightsRecommendations.length === 0 ? (
                  <div>
                    <p className="text-[rgb(113,118,126)] text-center py-[40px]">
                      Select a scenario and click "Analyze Scenario" to get AI-powered recommendations
                    </p>
                  </div>
                ) : (
                  <div className="space-y-[16px]">
                    {insightsRecommendations.map((rec) => (
                      <div 
                        key={rec.id}
                        className="border border-[rgb(220,229,242)] rounded-[12px] p-[20px] hover:shadow-[rgba(0,0,0,0.08)_0px_2px_8px_0px] transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between mb-[12px]">
                          <div className="flex items-center gap-[8px]">
                            <span className={`px-[8px] py-[4px] rounded-[6px] text-[12px] font-[600] ${
                              rec.priority === 'high' 
                                ? 'bg-[rgba(255,35,35,0.1)] text-[rgb(255,35,35)]'
                                : 'bg-[rgba(255,153,0,0.1)] text-[rgb(255,153,0)]'
                            }`}>
                              {rec.priority.toUpperCase()}
                            </span>
                            <span className="text-[12px] text-[rgb(113,118,126)]">{rec.timeline}</span>
                          </div>
                        </div>
                        <h4 className="text-[16px] font-[600] text-[rgb(26,32,44)] mb-[8px]">{rec.title}</h4>
                        <p className="text-[14px] text-[rgb(74,85,104)] mb-[12px] leading-[1.6]">{rec.description}</p>
                        <div className="flex items-center gap-[16px] text-[13px]">
                          <div className="flex items-center gap-[6px]">
                            <span className="text-[rgb(113,118,126)]">Impact:</span>
                            <span className="font-[600] text-[rgb(13,199,131)]">{rec.impact}</span>
                          </div>
                          <div className="flex items-center gap-[6px]">
                            <span className="text-[rgb(113,118,126)]">Effort:</span>
                            <span className="font-[600] text-[rgb(74,85,104)]">{rec.effort}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Risk Form Modal */}
      <RiskFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRisk(null);
        }}
        onSave={handleSaveRisk}
        risk={editingRisk}
        mode={editingRisk ? 'edit' : 'create'}
      />
    </div>
  );
};

export default RiskRegister;
