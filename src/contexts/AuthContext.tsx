
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = 'http://localhost:5000/api/users';

type UserRole = 'seeker' | 'provider' | null;

interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('jobPortalUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('jobPortalUser');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${API_URL}/login`,
        { email, password },
        config
      );

      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem('jobPortalUser', JSON.stringify(data));
      toast.success('Login successful!');
    } catch (error: any) {
      const errorMessage = error.response && error.response.data.message
        ? error.response.data.message
        : 'Login failed. Please try again.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${API_URL}/register`,
        { name, email, password, role },
        config
      );

      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem('jobPortalUser', JSON.stringify(data));
      toast.success('Registration successful!');
    } catch (error: any) {
      const errorMessage = error.response && error.response.data.message
        ? error.response.data.message
        : 'Registration failed. Please try again.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jobPortalUser');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        role: user?.role || null,
        login,
        register,
        logout
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
