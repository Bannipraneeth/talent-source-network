
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

type UserRole = 'seeker' | 'provider' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
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
      // This would be replaced with actual MongoDB API call
      console.log('Logging in with:', email, password);
      
      // For demo purposes, simulate a login
      // In a real app, you would validate credentials against MongoDB
      if (email && password) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user exists in localStorage (our fake DB for now)
        const allUsers = JSON.parse(localStorage.getItem('jobPortalUsers') || '[]');
        const foundUser = allUsers.find((u: any) => u.email === email);
        
        if (foundUser && foundUser.password === password) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem('jobPortalUser', JSON.stringify(userWithoutPassword));
          toast.success('Login successful!');
        } else {
          toast.error('Invalid email or password');
          throw new Error('Invalid email or password');
        }
      } else {
        toast.error('Please provide email and password');
        throw new Error('Please provide email and password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      // This would be replaced with actual MongoDB API call
      console.log('Registering:', name, email, password, role);
      
      // For demo purposes, simulate registration
      // In a real app, you would store this in MongoDB
      if (name && email && password && role) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists in localStorage
        const allUsers = JSON.parse(localStorage.getItem('jobPortalUsers') || '[]');
        const existingUser = allUsers.find((u: any) => u.email === email);
        
        if (existingUser) {
          toast.error('User with this email already exists');
          throw new Error('User already exists');
        }
        
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password, // In a real app, this would be hashed
          role,
          createdAt: new Date().toISOString()
        };
        
        // Add to our "database"
        allUsers.push(newUser);
        localStorage.setItem('jobPortalUsers', JSON.stringify(allUsers));
        
        // Store user in state without password
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem('jobPortalUser', JSON.stringify(userWithoutPassword));
        
        toast.success('Registration successful!');
      } else {
        toast.error('Please fill in all required fields');
        throw new Error('Missing required fields');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      throw error;
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
