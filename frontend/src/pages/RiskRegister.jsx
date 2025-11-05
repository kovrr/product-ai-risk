import React, { useState, useMemo, useCallback } from 'react';
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
      Critical: 'bg-red-100 text-red-700 border-red-200',
      High: 'bg-orange-100 text-orange-700 border-orange-200',
      Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      Low: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return badges[priority] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getImpactBadge = (impact) => {
    const badges = {
      Severe: 'bg-red-100 text-red-700 border-red-200',
      Significant: 'bg-orange-100 text-orange-700 border-orange-200',
      Moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      Minor: 'bg-gray-100 text-gray-700 border-gray-200',
      Negligible: 'bg-gray-50 text-gray-600 border-gray-100',
    };
    return badges[impact] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getLikelihoodBadge = (likelihood) => {
    const badges = {
      Expected: 'bg-red-100 text-red-700 border-red-200',
      Possible: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      Unlikely: 'bg-blue-100 text-blue-700 border-blue-200',
      Rare: 'bg-gray-100 text-gray-700 border-gray-200',
      'Very Rare': 'bg-gray-50 text-gray-600 border-gray-100',
    };
    return badges[likelihood] || 'bg-gray-100 text-gray-700 border-gray-200';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">AI Risk Register</h1>
          <p className="text-sm text-neutral-600 mt-1">
            Manage and track AI-related risk scenarios
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportMenu risks={filteredRisks} />
          <button 
            onClick={handleAddRisk}
            className="btn btn-primary"
          >
            <Plus size={18} />
            Add Risk Scenario
          </button>
        </div>
      </div>

      {/* Risk Matrix Visualization - Always Visible */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

      {/* Tabs Navigation */}
      <div className="border-b border-stroke-base-secondary">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'table'
                ? 'border-fill-brand-primary text-fill-brand-primary'
                : 'border-transparent text-text-base-secondary hover:text-text-base-primary'
            }`}
          >
            Risk Register Table
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'insights'
                ? 'border-fill-brand-primary text-fill-brand-primary'
                : 'border-transparent text-text-base-secondary hover:text-text-base-primary'
            }`}
          >
            Kovrr Insights
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'financial'
                ? 'border-fill-brand-primary text-fill-brand-primary'
                : 'border-transparent text-text-base-secondary hover:text-text-base-primary'
            }`}
          >
            Financial Quantification
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'table' && (
        <>
          {/* Search and Filters */}
          <div className="card p-4">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search scenarios by name, ID, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-neutral-600 uppercase">Category</label>
              <div className="flex flex-wrap gap-2">
                {getAllCategories().map(category => (
                  <button
                    key={category}
                    onClick={() => toggleFilter(selectedCategories, setSelectedCategories, category)}
                    className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                      selectedCategories.includes(category)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-neutral-600 uppercase">Priority</label>
              <div className="flex flex-wrap gap-2">
                {getAllPriorities().map(priority => (
                  <button
                    key={priority}
                    onClick={() => toggleFilter(selectedPriorities, setSelectedPriorities, priority)}
                    className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                      selectedPriorities.includes(priority)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-neutral-600 uppercase">Status</label>
              <div className="flex flex-wrap gap-2">
                {getAllStatuses().map(status => (
                  <button
                    key={status}
                    onClick={() => toggleFilter(selectedStatuses, setSelectedStatuses, status)}
                    className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                      selectedStatuses.includes(status)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
              <span className="text-sm text-neutral-600">
                Showing {risksWithAssets.length} of {mockRisks.length} risks
              </span>
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:text-primary-dark font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th 
                  className="cursor-pointer hover:bg-neutral-100"
                  onClick={() => handleSort('risk_id')}
                >
                  ID {sortColumn === 'risk_id' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="cursor-pointer hover:bg-neutral-100"
                  onClick={() => handleSort('name')}
                >
                  Scenario Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="cursor-pointer hover:bg-neutral-100"
                  onClick={() => handleSort('category')}
                >
                  Category {sortColumn === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="cursor-pointer hover:bg-neutral-100"
                  onClick={() => handleSort('priority')}
                >
                  Priority {sortColumn === 'priority' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th>Impact</th>
                <th>Likelihood</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Affected Assets</th>
              </tr>
            </thead>
            <tbody>
              {risksWithAssets.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-8 text-neutral-500">
                    No risk scenarios found matching your filters
                  </td>
                </tr>
              ) : (
                risksWithAssets.map((risk) => (
                  <tr 
                    key={risk.id}
                    onClick={() => navigate(`/risk-register/${risk.id}`)}
                    className="hover:bg-neutral-50 cursor-pointer"
                  >
                    <td>
                      <span className="text-primary font-semibold">{risk.risk_id}</span>
                    </td>
                    <td className="font-medium">{risk.name}</td>
                    <td>
                      <CategoryBadge category={risk.category} />
                    </td>
                    <td>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold border ${getPriorityBadge(risk.priority)}`}>
                        {risk.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold border ${getImpactBadge(risk.impact_level)}`}>
                        {risk.impact_level}
                      </span>
                    </td>
                    <td>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold border ${getLikelihoodBadge(risk.likelihood_level)}`}>
                        {risk.likelihood_level}
                      </span>
                    </td>
                    <td>{risk.status}</td>
                    <td className="text-sm text-neutral-600">{risk.owner_name}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-semibold">
                          {risk.assetCount}
                        </span>
                        {risk.assetCount > 0 && (
                          <button
                            onClick={() => navigate(`/assets?risk=${risk.id}`)}
                            className="text-primary hover:text-primary-dark text-sm font-medium"
                          >
                            View →
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}

      {/* Kovrr Insights Tab */}
      {activeTab === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - AI Recommendations */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <AIRecommendations risks={filteredRisks} />
            </div>
          </div>

          {/* Right Column - AI Chat Interface */}
          <div className="lg:col-span-1">
            <div className="card h-[800px] flex flex-col overflow-hidden">
              <KovrrAIChat risks={filteredRisks} />
            </div>
          </div>
        </div>
      )}

      {/* Financial Quantification Tab */}
      {activeTab === 'financial' && (
        <div className="space-y-6">
          {/* Financial Overview */}
          <FinancialOverview risks={filteredRisks} />
          
          {/* Loss Distribution Chart */}
          <LossDistributionChart risks={filteredRisks} />
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
