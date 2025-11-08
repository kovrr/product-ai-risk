import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-[rgb(220,229,242)] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="px-[24px] py-[16px] border-l-4 border-l-[rgb(85,81,247)]">
          <h2 className="text-[20px] font-[700] text-[rgb(26,32,44)] mb-[4px]">Welcome to Kovrr AI Risk Management</h2>
          <p className="text-[14px] text-[rgb(74,85,104)]">Comprehensive AI risk quantification and governance platform</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-neutral-50 rounded-lg">
            <User size={20} className="text-primary" />
            <div>
              <p className="text-sm font-semibold text-neutral-800">{user?.username}</p>
              <p className="text-xs text-neutral-500 capitalize">{user?.role}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-ghost"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
