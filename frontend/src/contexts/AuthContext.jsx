import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Only try to get user if we have a session cookie
      const hasSessionCookie = document.cookie.includes('sessionid=');
      if (hasSessionCookie) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      // If we get a 401, clear the user and stop loading
      if (error.response && error.response.status === 401) {
        setUser(null);
      } else {
        console.error('Auth check failed:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
