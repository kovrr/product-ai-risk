import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, AlertTriangle, TrendingUp, Shield, Plus, Download, Calendar, FileText, Users, Settings } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/atoms/card';
import { Button } from '../components/atoms/button';
import { Badge } from '../components/atoms/badge';
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
    <div className="space-y-[32px]">
      {/* Page Header */}
      <div className="mb-[32px]">
        <h1 className="text-[38px] font-[700] text-[rgb(26,32,44)] tracking-[-0.5px] mb-[8px]">Dashboard Overview</h1>
        <p className="text-[16px] text-[rgb(74,85,104)]">Real-time insights into your AI risk posture</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-[12px] mb-[32px]">
        <button 
          onClick={() => navigate('/compliance-readiness')}
          className="inline-flex items-center gap-[8px] px-[20px] py-[10px] bg-[rgb(85,81,247)] text-white text-[14px] font-[600] rounded-[6px] border-none shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] cursor-pointer transition-all duration-200 hover:bg-[rgb(97,94,251)] hover:-translate-y-[1px]"
        >
          <Plus size={18} />
          New Assessment
        </button>
        <button 
          onClick={() => console.log('Export report')}
          className="inline-flex items-center gap-[8px] px-[20px] py-[10px] bg-white text-[rgb(48,48,69)] text-[14px] font-[600] rounded-[6px] border border-[rgb(220,229,242)] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] cursor-pointer transition-all duration-200 hover:bg-[rgb(245,247,255)] hover:border-[rgb(163,173,181)]"
        >
          <Download size={18} />
          Export Report
        </button>
        <button 
          onClick={() => console.log('Schedule review')}
          className="inline-flex items-center gap-[8px] px-[20px] py-[10px] bg-white text-[rgb(48,48,69)] text-[14px] font-[600] rounded-[6px] border border-[rgb(220,229,242)] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] cursor-pointer transition-all duration-200 hover:bg-[rgb(245,247,255)] hover:border-[rgb(163,173,181)]"
        >
          <Calendar size={18} />
          Schedule Review
        </button>
        <button 
          onClick={() => console.log('Generate docs')}
          className="inline-flex items-center gap-[8px] px-[20px] py-[10px] bg-white text-[rgb(48,48,69)] text-[14px] font-[600] rounded-[6px] border border-[rgb(220,229,242)] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] cursor-pointer transition-all duration-200 hover:bg-[rgb(245,247,255)] hover:border-[rgb(163,173,181)]"
        >
          <FileText size={18} />
          Generate Documentation
        </button>
        <button 
          onClick={() => console.log('Team management')}
          className="inline-flex items-center gap-[8px] px-[20px] py-[10px] bg-white text-[rgb(48,48,69)] text-[14px] font-[600] rounded-[6px] border border-[rgb(220,229,242)] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] cursor-pointer transition-all duration-200 hover:bg-[rgb(245,247,255)] hover:border-[rgb(163,173,181)]"
        >
          <Users size={18} />
          Team Management
        </button>
        <button 
          onClick={() => console.log('Settings')}
          className="inline-flex items-center gap-[8px] px-[20px] py-[10px] bg-white text-[rgb(48,48,69)] text-[14px] font-[600] rounded-[6px] border border-[rgb(220,229,242)] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] cursor-pointer transition-all duration-200 hover:bg-[rgb(245,247,255)] hover:border-[rgb(163,173,181)]"
        >
          <Settings size={18} />
          Settings
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[32px]">
        {statCards.map((stat) => (
          <Card 
            key={stat.title}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={stat.onClick}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-base-secondary font-[600]">{stat.title}</p>
                <p className="text-3xl font-[700] text-text-base-primary mt-2">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-xs text-text-base-tertiary mt-1">{stat.subtitle}</p>
                )}
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Asset Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
        {/* Recent Assets */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Assets</CardTitle>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/assets')}
                className="text-xs"
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
                    className="flex items-center gap-3 p-3 bg-fill-base-1 rounded-[10px] cursor-pointer hover:bg-fill-base-2 transition-colors"
                    onClick={() => navigate(`/assets/${asset.id}`)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-[600] text-text-base-primary truncate">
                          {asset.name}
                        </p>
                        <StatusBadge status={asset.status} size="sm" />
                      </div>
                      <div className="flex items-center gap-2">
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
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>High-Risk Assets</CardTitle>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/assets?risk=high')}
                className="text-xs"
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
                    className="flex items-center gap-3 p-3 bg-fill-base-1 rounded-[10px] cursor-pointer hover:bg-fill-base-2 transition-colors"
                    onClick={() => navigate(`/assets/${asset.id}`)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-[600] text-text-base-primary truncate">
                          {asset.name}
                        </p>
                        <StatusBadge status={asset.status} size="sm" />
                      </div>
                      <div className="flex items-center gap-2">
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
      </div>
    </div>
  );
};

export default Dashboard;
