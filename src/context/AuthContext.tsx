
import React, { createContext, useContext, ReactNode } from 'react';
import { useAuthLogic, User } from '@/hooks/useAuthLogic';

type UserRole = 'passenger' | 'vendor' | null;

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean; // Added isLoading to the context type
}

// Initialize with default values to avoid undefined errors
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  role: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isLoading: true
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuthLogic();
  
  return (
    <AuthContext.Provider value={{
      user: auth.user,
      isAuthenticated: auth.isAuthenticated,
      role: auth.role,
      login: auth.login,
      register: auth.register,
      logout: auth.logout,
      isLoading: auth.isLoading
    }}>
      {!auth.isLoading && children}
    </AuthContext.Provider>
  );
};
