
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'passenger' | 'vendor';
  requireAuth?: boolean; // New prop to make authentication optional
  redirectTo?: string;   // Custom redirect path
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  role, 
  requireAuth = true,  // By default routes are protected
  redirectTo = '/login'
}) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Store the current path in localStorage to redirect back after login
    localStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to={redirectTo} replace />;
  }

  // If role is required and user doesn't have that role
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
