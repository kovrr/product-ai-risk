import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Eye, 
  AlertTriangle, 
  BarChart3, 
  Link2, 
  Shield,
  ClipboardCheck 
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/assets', icon: Eye, label: 'Assets Visibility' },
    { path: '/risk-register', icon: AlertTriangle, label: 'Risk Register' },
    { path: '/quantification', icon: BarChart3, label: 'Quantification' },
    { path: '/supply-chain', icon: Link2, label: 'Supply Chain' },
    { path: '/controls', icon: Shield, label: 'Controls Maturity' },
    { path: '/self-assessment', icon: ClipboardCheck, label: 'Self-Assessment' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 h-screen flex flex-col">
      <div className="p-6 border-b border-neutral-200">
        <h1 className="text-2xl font-bold text-primary">AIKovrr</h1>
        <p className="text-xs text-neutral-500 mt-1">AI Governance Platform</p>
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
          <p>© 2025 AIKovrr</p>
          <p className="mt-1">Powered by Kovrr</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
