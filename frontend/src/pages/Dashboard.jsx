import { useEffect, useState } from 'react';
import { visibilityService, riskService } from '../services/auth';
import { Eye, AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/atoms/card';
import { Button } from '../components/atoms/button';
import { Badge } from '../components/atoms/badge';

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
      color: 'text-text-brand-primary',
      bgColor: 'bg-fill-brand-primary-transparent',
    },
    {
      title: 'Risk Scenarios',
      value: stats.riskScenarios,
      icon: AlertTriangle,
      color: 'text-fill-information-warning',
      bgColor: 'bg-fill-information-warning/10',
    },
    {
      title: 'High Priority Risks',
      value: stats.highRisks,
      icon: TrendingUp,
      color: 'text-text-information-error',
      bgColor: 'bg-fill-information-error/10',
    },
    {
      title: 'Controls Active',
      value: '12',
      icon: Shield,
      color: 'text-text-information-success',
      bgColor: 'bg-fill-information-success/10',
    },
  ];

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fill-brand-primary mx-auto"></div>
          <p className="mt-4 text-text-base-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-sm">
      <div>
        <h1 className="text-3xl font-[700] text-text-base-primary">Dashboard</h1>
        <p className="text-text-base-secondary mt-1">Overview of your AI governance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-sm">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-base-secondary font-[600]">{stat.title}</p>
                <p className="text-3xl font-[700] text-text-base-primary mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-sm">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-xs">
              <div className="flex items-center gap-3 p-3 bg-fill-base-1 rounded-[10px]">
                <div className="w-2 h-2 bg-fill-information-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-[600] text-text-base-primary">New AI asset discovered</p>
                  <p className="text-xs text-text-base-tertiary">ChatGPT Enterprise - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-fill-base-1 rounded-[10px]">
                <div className="w-2 h-2 bg-fill-information-warning rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-[600] text-text-base-primary">Risk scenario updated</p>
                  <p className="text-xs text-text-base-tertiary">Data leakage risk - 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-fill-base-1 rounded-[10px]">
                <div className="w-2 h-2 bg-fill-information-info rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-[600] text-text-base-primary">Control assessment completed</p>
                  <p className="text-xs text-text-base-tertiary">NIST AI RMF - 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-xs">
              <Button variant="outline" className="justify-start">
                <Eye size={18} />
                View Assets
              </Button>
              <Button variant="outline" className="justify-start">
                <AlertTriangle size={18} />
                Risk Register
              </Button>
              <Button variant="outline" className="justify-start">
                <Shield size={18} />
                Controls
              </Button>
              <Button variant="outline" className="justify-start">
                <TrendingUp size={18} />
                Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
