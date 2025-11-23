import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bell, Code, LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const handleLogout = async () => {
    // Set logout flag to trigger action progress reset
    localStorage.setItem('logoutTriggered', 'true');

    // Dispatch custom event for same-page components
    window.dispatchEvent(new Event('userLogout'));

    await logout();
    navigate('/login');
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  // Get current date/time
  const currentDateTime = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <header className="bg-fill-base-0 border-b border-fill-specific-divider px-[30px] py-[16px]">
      <div className="flex items-center justify-between gap-[16px]">
        {/* Company Name & Logo */}
        <div className="flex items-center gap-[12px]">
          <div className="w-[40px] h-[40px] bg-fill-brand-primary rounded-[10px] flex items-center justify-center">
            <span className="text-text-base-invert text-[18px] font-[700]">TC</span>
          </div>
          <div>
            <h1 className="text-[16px] font-[700] text-text-base-primary">TechCorp Industries</h1>
            <p className="text-[12px] text-text-base-tertiary">Enterprise AI Governance</p>
          </div>
        </div>

        {/* Right Side - Date, Notifications, User */}
        <div className="flex items-center gap-[16px]">
          {/* Date/Time */}
          <div className="text-[13px] text-text-base-secondary">
            {currentDateTime}
          </div>

          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-[8px] hover:bg-[rgb(245,247,255)] rounded-[6px] transition-colors"
            >
              <Bell size={20} className="text-[rgb(74,85,104)]" />
              {/* Notification Badge */}
              <span className="absolute top-[4px] right-[4px] w-[8px] h-[8px] bg-[rgb(255,35,35)] rounded-full border-2 border-white"></span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-[8px] w-[320px] bg-white rounded-[12px] shadow-[rgba(0,0,0,0.1)_0px_4px_20px_0px] border border-[rgb(220,229,242)] z-50">
                <div className="p-[16px] border-b border-[rgb(220,229,242)]">
                  <h3 className="text-[16px] font-[600] text-[rgb(26,32,44)]">Notifications</h3>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {/* Notification 1: Critical Risk */}
                  <div
                    className="p-[16px] hover:bg-[rgb(245,247,255)] cursor-pointer border-b border-[rgb(220,229,242)] transition-colors"
                    onClick={() => navigate('/risk-register')}
                  >
                    <div className="flex items-start gap-[12px]">
                      <div className="w-[8px] h-[8px] bg-[rgb(255,35,35)] rounded-full mt-[6px] flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-[14px] font-[600] text-[rgb(26,32,44)] mb-[4px]">Critical Risk: Prompt Injection Attack</p>
                        <p className="text-[13px] text-[rgb(74,85,104)] mb-[4px]">AIR-004 severity increased to Critical. GPT-4 API vulnerable to data exfiltration.</p>
                        <p className="text-[12px] text-[rgb(113,118,126)]">12 minutes ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Notification 2: Shadow AI Detected */}
                  <div
                    className="p-[16px] hover:bg-[rgb(245,247,255)] cursor-pointer border-b border-[rgb(220,229,242)] transition-colors"
                    onClick={() => navigate('/assets')}
                  >
                    <div className="flex items-start gap-[12px]">
                      <div className="w-[8px] h-[8px] bg-[rgb(255,153,0)] rounded-full mt-[6px] flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-[14px] font-[600] text-[rgb(26,32,44)] mb-[4px]">Shadow AI Asset Discovered</p>
                        <p className="text-[13px] text-[rgb(74,85,104)] mb-[4px]">Llama 3.1 detected in Engineering dept. Risk score: 82/100. Requires review.</p>
                        <p className="text-[12px] text-[rgb(113,118,126)]">1 hour ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Notification 3: Compliance Gap */}
                  <div
                    className="p-[16px] hover:bg-[rgb(245,247,255)] cursor-pointer transition-colors"
                    onClick={() => navigate('/compliance-readiness')}
                  >
                    <div className="flex items-start gap-[12px]">
                      <div className="w-[8px] h-[8px] bg-[rgb(85,81,247)] rounded-full mt-[6px] flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-[14px] font-[600] text-[rgb(26,32,44)] mb-[4px]">Control Gap Alert: GOVERN 1.6</p>
                        <p className="text-[13px] text-[rgb(74,85,104)] mb-[4px]">Critical gap (3.0) identified in AI governance policies. Action required.</p>
                        <p className="text-[12px] text-[rgb(113,118,126)]">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-[12px] border-t border-[rgb(220,229,242)] text-center">
                  <button className="text-[13px] font-[600] text-[rgb(85,81,247)] hover:text-[rgb(97,94,251)]">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* API Docs Button */}
          <button
            onClick={() => window.open('/api/docs', '_blank')}
            className="inline-flex items-center gap-[8px] px-[12px] py-[6px] bg-white text-[rgb(85,81,247)] border border-[rgb(85,81,247)] rounded-[6px] text-[13px] font-[600] hover:bg-[rgb(236,242,252)] transition-colors"
          >
            <Code size={16} />
            API Docs
          </button>

          {/* User Avatar & Logout */}
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center gap-[8px]">
              <div className="w-[32px] h-[32px] rounded-full bg-[rgb(85,81,247)] flex items-center justify-center text-white text-[14px] font-[600]">
                {user?.username?.substring(0, 2).toUpperCase() || 'OA'}
              </div>
              <span className="text-[14px] font-[600] text-[rgb(26,32,44)]">
                {user?.username || 'Or Amir'}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-[6px] px-[10px] py-[6px] text-[rgb(74,85,104)] hover:text-[rgb(255,35,35)] hover:bg-[rgb(255,235,235)] rounded-[6px] text-[13px] font-[600] transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
