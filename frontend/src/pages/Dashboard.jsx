import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/newComponents/atoms/card';
import { Button } from '@/newComponents/atoms/button';
import { Badge } from '@/newComponents/atoms/badge';
import { mockAssets, getHighRiskAssets, getShadowAIAssets } from '../data';
import { StatusBadge, RiskScoreBadge, UserAvatar } from '../components/molecules';
import { getUserById } from '../data';

const Dashboard = () => {
  const navigate = useNavigate();

  // Calculate stats from mock data
  const stats = useMemo(() => {
    const shadowAssets = getShadowAIAssets();
    const highRiskAssets = getHighRiskAssets();
    const sanctionedAssets = mockAssets.filter(a => a.status === 'sanctioned');
    const underReviewAssets = mockAssets.filter(a => a.status === 'under_review');

    return {
      totalAssets: mockAssets.length,
      sanctioned: sanctionedAssets.length,
      shadow: shadowAssets.length,
      underReview: underReviewAssets.length,
      highRisk: highRiskAssets.length,
      riskScenarios: 5, // From mock data
    };
  }, []);

  // Get recent assets (last 5 added)
  const recentAssets = useMemo(() => {
    return [...mockAssets]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
  }, []);

  // Get high-risk assets (top 5)
  const topHighRiskAssets = useMemo(() => {
    return getHighRiskAssets().slice(0, 5);
  }, []);

  const statCards = [
    {
      title: 'Total AI Assets',
      value: stats.totalAssets,
      subtitle: `${stats.sanctioned} Sanctioned`,
      icon: Eye,
      color: 'text-text-brand-primary',
      bgColor: 'bg-fill-brand-primary-transparent',
      onClick: () => navigate('/assets'),
    },
    {
      title: 'Shadow AI',
      value: stats.shadow,
      subtitle: 'Unapproved Tools',
      icon: AlertTriangle,
      color: 'text-fill-information-error',
      bgColor: 'bg-fill-information-error/10',
      onClick: () => navigate('/assets?status=shadow'),
    },
    {
      title: 'Under Review',
      value: stats.underReview,
      subtitle: 'Pending Assessment',
      icon: TrendingUp,
      color: 'text-fill-information-warning',
      bgColor: 'bg-fill-information-warning/10',
      onClick: () => navigate('/assets?status=under_review'),
    },
    {
      title: 'High Risk Assets',
      value: stats.highRisk,
      subtitle: 'Critical & High',
      icon: Shield,
      color: 'text-text-information-error',
      bgColor: 'bg-fill-information-error/10',
      onClick: () => navigate('/assets?risk=high'),
    },
  ];

  return (
    <div className="min-h-screen bg-fill-base-1 p-md space-y-md">
      {/* Page Header */}
      <div className="space-y-xs">
        <h1 className="text-[32px] font-[700] text-text-base-primary">Dashboard</h1>
        <p className="text-[14px] text-text-base-secondary">Overview of your AI governance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-sm">
        {statCards.map((stat) => (
          <Card
            key={stat.title}
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] border-0"
            onClick={stat.onClick}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-xs">
                <p className="text-[12px] text-text-base-secondary font-[600] uppercase tracking-wide">{stat.title}</p>
                <p className="text-[32px] font-[700] text-text-base-primary leading-none">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-[11px] text-text-base-tertiary">{stat.subtitle}</p>
                )}
              </div>
              <div className={`p-sm rounded-[15px] ${stat.bgColor}`}>
                <stat.icon className={stat.color} size={28} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Asset Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-sm">
        {/* Recent Assets */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[20px]">Recent Assets</CardTitle>
              <Button
                variant="ghost"
                onClick={() => navigate('/assets')}
                className="text-[12px] h-auto py-xs px-sm hover:bg-fill-base-1"
              >
                View All →
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-xs">
              {recentAssets.map((asset) => {
                const owner = getUserById(asset.owner_id);
                return (
                  <div
                    key={asset.id}
                    className="flex items-center gap-sm p-sm bg-fill-base-1 rounded-[15px] cursor-pointer hover:bg-fill-base-2 transition-all hover:shadow-sm border border-transparent hover:border-stroke-base-secondary"
                    onClick={() => navigate(`/assets/${asset.id}`)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-xs mb-1">
                        <p className="text-sm font-[600] text-text-base-primary truncate">
                          {asset.name}
                        </p>
                        <StatusBadge status={asset.status} size="sm" />
                      </div>
                      <div className="flex items-center gap-xs">
                        <p className="text-xs text-text-base-tertiary">{asset.vendor_name}</p>
                        {owner && (
                          <>
                            <span className="text-text-base-tertiary">•</span>
                            <UserAvatar name={owner.name} size="xs" showName={false} />
                          </>
                        )}
                      </div>
                    </div>
                    <RiskScoreBadge tier={asset.risk_tier} size="sm" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* High-Risk Assets */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[20px]">High-Risk Assets</CardTitle>
              <Button
                variant="ghost"
                onClick={() => navigate('/assets?risk=high')}
                className="text-[12px] h-auto py-xs px-sm hover:bg-fill-base-1"
              >
                View All →
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-xs">
              {topHighRiskAssets.map((asset) => {
                const owner = getUserById(asset.owner_id);
                return (
                  <div
                    key={asset.id}
                    className="flex items-center gap-sm p-sm bg-fill-base-1 rounded-[15px] cursor-pointer hover:bg-fill-base-2 transition-all hover:shadow-sm border border-transparent hover:border-stroke-base-secondary"
                    onClick={() => navigate(`/assets/${asset.id}`)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-xs mb-1">
                        <p className="text-sm font-[600] text-text-base-primary truncate">
                          {asset.name}
                        </p>
                        <StatusBadge status={asset.status} size="sm" />
                      </div>
                      <div className="flex items-center gap-xs">
                        <p className="text-xs text-text-base-tertiary">
                          Score: {asset.risk_score.toFixed(0)}/100
                        </p>
                        <span className="text-text-base-tertiary">•</span>
                        <p className="text-xs text-text-base-tertiary">{asset.vendor_name}</p>
                      </div>
                    </div>
                    <RiskScoreBadge tier={asset.risk_tier} size="sm" showScore score={asset.risk_score} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-[20px]">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
              <Button
                variant="outline"
                className="justify-start h-auto py-sm flex-col items-center gap-xs hover:bg-fill-base-1 hover:border-fill-brand-primary hover:text-fill-brand-primary transition-all rounded-[15px]"
                onClick={() => navigate('/assets')}
              >
                <Eye size={24} />
                <span className="text-[12px] font-[600]">View Assets</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-sm flex-col items-center gap-xs hover:bg-fill-base-1 hover:border-fill-brand-primary hover:text-fill-brand-primary transition-all rounded-[15px]"
                onClick={() => navigate('/risk-register')}
              >
                <AlertTriangle size={24} />
                <span className="text-[12px] font-[600]">Risk Register</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-sm flex-col items-center gap-xs hover:bg-fill-base-1 hover:border-fill-brand-primary hover:text-fill-brand-primary transition-all rounded-[15px]"
                onClick={() => navigate('/ai-assurance-plan')}
              >
                <Shield size={24} />
                <span className="text-[12px] font-[600]">Controls</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-sm flex-col items-center gap-xs hover:bg-fill-base-1 hover:border-fill-brand-primary hover:text-fill-brand-primary transition-all rounded-[15px]"
                onClick={() => navigate('/compliance-readiness')}
              >
                <TrendingUp size={24} />
                <span className="text-[12px] font-[600]">Compliance</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
