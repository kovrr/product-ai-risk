import React, { useState } from 'react';
import { User, ChevronDown, LogOut } from 'lucide-react';

/**
 * UserSwitcher - Standard user menu component
 * Shows logged-in user with dropdown for switching users and logout
 * Logout automatically resets all action progress
 */
export const UserSwitcher = ({ currentUser, onUserChange, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const users = [
    { email: 'or@kovrr.com', name: 'Or (CISO)', role: 'Chief Information Security Officer' },
    { email: 'shai@kovrr.com', name: 'Shai', role: 'Security Engineer' },
    { email: 'yakir@kovrr.com', name: 'Yakir', role: 'Risk Manager' },
    { email: 'naomi@kovrr.com', name: 'Naomi', role: 'Compliance Officer' }
  ];

  const currentUserData = users.find(u => u.email === currentUser) || users[0];

  const handleUserSelect = (email) => {
    onUserChange(email);
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <div className="relative">
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
          {currentUserData.name.charAt(0)}
        </div>
        <div className="text-left">
          <div className="text-sm font-medium text-neutral-900">{currentUserData.name}</div>
          <div className="text-xs text-neutral-500">{currentUserData.role}</div>
        </div>
        <ChevronDown size={16} className={`text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
            <div className="p-3 border-b border-neutral-200">
              <div className="text-xs font-semibold text-neutral-500 mb-2">LOGGED IN AS</div>
              <div className="text-sm font-medium text-neutral-900">{currentUserData.name}</div>
              <div className="text-xs text-neutral-500">{currentUserData.email}</div>
            </div>

            <div className="p-2">
              <div className="text-xs font-semibold text-neutral-500 px-2 py-1 mb-1">SWITCH USER</div>
              {users.map(user => (
                <button
                  key={user.email}
                  onClick={() => handleUserSelect(user.email)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${user.email === currentUser
                      ? 'bg-primary bg-opacity-10 text-primary font-medium'
                      : 'hover:bg-neutral-100 text-neutral-700'
                    }`}
                >
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-neutral-500">{user.role}</div>
                </button>
              ))}
            </div>

            <div className="p-2 border-t border-neutral-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
