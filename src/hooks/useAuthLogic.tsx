
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'passenger' | 'vendor' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export const useAuthLogic = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      // In a real app, this would be an API call
      // Mock login for now
      console.log('Login attempt with:', { email, password, role });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back to IRCTC Foodie!`,
      });
      
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      // In a real app, this would be an API call
      // Mock registration for now
      console.log('Registration attempt with:', { name, email, password, role });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: "Welcome to IRCTC Foodie!",
      });
      
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please check your details and try again.",
        variant: "destructive"
      });
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
    });
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    role: user?.role || null,
    login,
    register,
    logout
  };
};
