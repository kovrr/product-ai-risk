import { useEffect, useState } from 'react';
import { visibilityService, riskService } from '../services/auth';
import { Eye, AlertTriangle, TrendingUp, Shield } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAssets: 0,
    riskScenarios: 0,
    highRisks: 0,
    loading: true,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [assets, scenarios] = await Promise.all([
        visibilityService.getAssets(),
        riskService.getScenarios(),
      ]);

      const highRisks = scenarios.results?.filter(
        (s) => s.priority === 'High' || s.priority === 'Critical'
      ).length || 0;

      setStats({
        totalAssets: assets.count || assets.results?.length || 0,
        riskScenarios: scenarios.count || scenarios.results?.length || 0,
        highRisks,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  const statCards = [
    {
      title: 'Total AI Assets',
      value: stats.totalAssets,
      icon: Eye,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Risk Scenarios',
      value: stats.riskScenarios,
      icon: AlertTriangle,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'High Priority Risks',
      value: stats.highRisks,
      icon: TrendingUp,
      color: 'text-error',
      bgColor: 'bg-error/10',
    },
    {
      title: 'Controls Active',
      value: '12',
      icon: Shield,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-800">Dashboard</h1>
        <p className="text-neutral-600 mt-1">Overview of your AI governance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-neutral-800 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="card-header">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-800">New AI asset discovered</p>
                <p className="text-xs text-neutral-500">ChatGPT Enterprise - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-800">Risk scenario updated</p>
                <p className="text-xs text-neutral-500">Data leakage risk - 5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded">
              <div className="w-2 h-2 bg-info rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-800">Control assessment completed</p>
                <p className="text-xs text-neutral-500">NIST AI RMF - 1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-header">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-outline text-left justify-start">
              <Eye size={18} />
              View Assets
            </button>
            <button className="btn btn-outline text-left justify-start">
              <AlertTriangle size={18} />
              Risk Register
            </button>
            <button className="btn btn-outline text-left justify-start">
              <Shield size={18} />
              Controls
            </button>
            <button className="btn btn-outline text-left justify-start">
              <TrendingUp size={18} />
              Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
