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
    <header className="bg-white border-b border-neutral-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-neutral-800">Welcome back, {user?.first_name || user?.username}!</h2>
          <p className="text-sm text-neutral-500">Manage your AI governance and compliance</p>
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
