import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Eye, 
  AlertTriangle, 
  DollarSign, 
  Link2, 
  Shield,
  ClipboardCheck,
  Activity
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Hero Dashboard' },
    { path: '/assets', icon: Eye, label: 'Assets Visibility' },
    { path: '/risk-register', icon: AlertTriangle, label: 'Risk Register' },
    { path: '/compliance-readiness', icon: ClipboardCheck, label: 'Compliance Readiness' },
    { path: '/ai-assurance-plan', icon: Shield, label: 'AI Assurance Plan' },
    { path: '/financial-quantification', icon: DollarSign, label: 'Gen AI Exposure' },
    { path: '/governance-monitoring', icon: Activity, label: 'Governance & Monitoring' },
    { path: '/integration-hub', icon: Link2, label: 'Integration Hub' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 h-screen flex flex-col">
      <div className="p-6 border-b border-neutral-200">
        <img 
          src="/kovrr-logo.svg" 
          alt="Kovrr" 
          className="h-8 mb-2"
        />
        <p className="text-xs text-neutral-500">Kovrr.ai - AI Governance Platform</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-200">
        <div className="text-xs text-neutral-500">
          <p>© 2025 Kovrr.ai</p>
          <p className="mt-1">AI Risk Management Platform</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
