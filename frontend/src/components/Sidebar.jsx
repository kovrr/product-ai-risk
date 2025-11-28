import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Eye,
  AlertTriangle,
  DollarSign,
  Link2,
  Shield,
  ClipboardCheck,
  Activity,
  Lock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Load collapsed state from localStorage
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Hero Dashboard', disabled: false },
    { path: '/assets', icon: Eye, label: 'Asset Visibility', disabled: false },
    { path: '/risk-register', icon: AlertTriangle, label: 'Risk Register', disabled: false },
    { path: '/compliance-readiness', icon: ClipboardCheck, label: 'Compliance Readiness', disabled: false },
    { path: '/ai-assurance-plan', icon: Shield, label: 'AI Assurance Plan', disabled: false },
    { path: '/financial-quantification', icon: DollarSign, label: 'Gen AI Exposure', disabled: false },
    { path: '/integration-hub', icon: Link2, label: 'Integration Hub', disabled: false },
  ];

  return (
    <aside className={`bg-white border-r border-neutral-200 h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Header with Logo and Collapse Button */}
      <div className="border-b border-neutral-200 relative">
        <div className={`p-6 ${isCollapsed ? 'px-4' : ''}`}>
          {!isCollapsed && (
            <>
              <img
                src="/kovrr-logo.svg"
                alt="Kovrr"
                className="h-8 mb-2"
              />
              <p className="text-xs text-neutral-500">Kovrr.ai - AI Governance Platform</p>
            </>
          )}
          {isCollapsed && (
            <div className="flex justify-center">
              <img
                src="/kovrr-logo.svg"
                alt="Kovrr"
                className="h-8"
              />
            </div>
          )}
        </div>

        {/* Collapse/Expand Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 bg-white border border-neutral-200 rounded-full p-1 hover:bg-neutral-50 transition-colors shadow-sm"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight size={16} className="text-neutral-600" />
          ) : (
            <ChevronLeft size={16} className="text-neutral-600" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          if (item.disabled) {
            return (
              <div
                key={item.path}
                className={`flex items-center rounded-lg text-neutral-400 cursor-not-allowed opacity-50 relative group ${isCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-4 py-3'
                  }`}
                title={isCollapsed ? `${item.label} - Coming Soon` : 'Coming Soon'}
              >
                {!isCollapsed && <Lock size={16} className="absolute left-2 top-3" />}
                <item.icon size={20} className={isCollapsed ? '' : 'ml-4'} />
                {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
                {!isCollapsed && (
                  <span className="absolute hidden group-hover:block bg-neutral-800 text-white text-xs px-2 py-1 rounded right-4 top-3 whitespace-nowrap z-50">
                    Coming Soon
                  </span>
                )}
                {isCollapsed && (
                  <span className="absolute left-full ml-2 hidden group-hover:block bg-neutral-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                    {item.label} - Coming Soon
                  </span>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center rounded-lg transition-colors relative group ${isCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-4 py-3'
                } ${isActive
                  ? 'bg-primary text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
                }`
              }
              title={isCollapsed ? item.label : ''}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
              {isCollapsed && (
                <span className="absolute left-full ml-2 hidden group-hover:block bg-neutral-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className="p-4 border-t border-neutral-200">
          <div className="text-xs text-neutral-500">
            <p>© 2025 Kovrr.ai</p>
            <p className="mt-1">AI Risk Management Platform</p>
          </div>
        </div>
      )}
      {isCollapsed && (
        <div className="p-2 border-t border-neutral-200 flex justify-center">
          <div className="text-xs text-neutral-500 text-center">
            <p>©</p>
            <p className="mt-1">2025</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
