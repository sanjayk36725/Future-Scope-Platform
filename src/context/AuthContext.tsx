import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Preset demo accounts mapping role -> credentials
export const DEMO_USERS: { [key in UserRole]: { email: string; name: string; avatar: string } } = {
  Student: {
    email: 'student@fsp.edu',
    name: 'Sanjay Kumar',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&fit=crop&q=80',
  },
  Faculty: {
    email: 'faculty@fsp.edu',
    name: 'Dr. Evelyn Carter',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&fit=crop&q=80',
  },
  Developer: {
    email: 'dev@fsp.tech',
    name: 'Alex Mercer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80',
  },
  Recruiter: {
    email: 'recruiter@fsp.com',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&fit=crop&q=80',
  },
  'HR Manager': {
    email: 'hr@fsp.corp',
    name: 'Michael Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&q=80',
  },
  Admin: {
    email: 'admin@fsp.gov',
    name: 'Eleanor Vance',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&fit=crop&q=80',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage for active session
    const storedUser = localStorage.getItem('fsp_session_user');
    const storedToken = localStorage.getItem('fsp_session_token');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (e) {
        localStorage.removeItem('fsp_session_user');
        localStorage.removeItem('fsp_session_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    try {
      const demoEmail = email || DEMO_USERS[role].email;
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoEmail, role })
      });
      if (!res.ok) throw new Error("Authentication failed");
      const data = await res.json();

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('fsp_session_user', JSON.stringify(data.user));
      localStorage.setItem('fsp_session_token', data.token);
      setIsLoading(false);
      return true;
    } catch (e) {
      console.error("Login failed, falling back to local simulation:", e);
      // Resolve details using DEMO_USERS or construct dummy account
      const profile = DEMO_USERS[role];
      const loggedInUser: User = {
        id: `usr_${role.toLowerCase().replace(/\s+/g, '_')}`,
        email: email || profile.email,
        name: profile.name,
        role: role,
        avatarUrl: profile.avatar,
        createdAt: new Date().toISOString(),
      };

      const mockToken = `fsp_token_${btoa(JSON.stringify({ userId: loggedInUser.id, role: loggedInUser.role, exp: Date.now() + 3600000 }))}`;

      setUser(loggedInUser);
      setToken(mockToken);
      localStorage.setItem('fsp_session_user', JSON.stringify(loggedInUser));
      localStorage.setItem('fsp_session_token', mockToken);
      setIsLoading(false);
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('fsp_session_user');
    localStorage.removeItem('fsp_session_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        token,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
