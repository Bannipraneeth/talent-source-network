
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BriefcaseIcon, HomeIcon, LogInIcon, LogOutIcon, UserIcon, UserPlusIcon } from 'lucide-react';

const Navigation: React.FC = () => {
  const { isAuthenticated, logout, role } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <BriefcaseIcon className="h-6 w-6 text-job-primary" />
            <span className="text-xl font-bold text-gray-800">JobConnect</span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className={`flex items-center space-x-1 text-gray-600 hover:text-job-primary ${isActive('/') ? 'text-job-primary font-medium' : ''}`}>
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link to="/jobs" className={`flex items-center space-x-1 text-gray-600 hover:text-job-primary ${isActive('/jobs') ? 'text-job-primary font-medium' : ''}`}>
              <BriefcaseIcon className="h-4 w-4" />
              <span>Jobs</span>
            </Link>
            
            {isAuthenticated && (
              <Link to="/profile" className={`flex items-center space-x-1 text-gray-600 hover:text-job-primary ${isActive('/profile') ? 'text-job-primary font-medium' : ''}`}>
                <UserIcon className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            )}
            
            {isAuthenticated && role === 'provider' && (
              <Link to="/my-jobs" className={`flex items-center space-x-1 text-gray-600 hover:text-job-primary ${isActive('/my-jobs') ? 'text-job-primary font-medium' : ''}`}>
                <BriefcaseIcon className="h-4 w-4" />
                <span>My Jobs</span>
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <Button variant="ghost" onClick={logout} className="flex items-center space-x-1">
                <LogOutIcon className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="flex items-center space-x-1">
                    <LogInIcon className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-job-primary hover:bg-blue-600 flex items-center space-x-1">
                    <UserPlusIcon className="h-4 w-4" />
                    <span>Register</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
