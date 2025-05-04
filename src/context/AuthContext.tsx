
import React, { createContext, useContext } from 'react';
import { useAuthLogic, User } from '@/hooks/useAuthLogic';

type UserRole = 'passenger' | 'vendor' | null;

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthLogic();
  
  return (
    <AuthContext.Provider value={{
      user: auth.user,
      isAuthenticated: auth.isAuthenticated,
      role: auth.role,
      login: auth.login,
      register: auth.register,
      logout: auth.logout
    }}>
      {!auth.isLoading && children}
    </AuthContext.Provider>
  );
};
