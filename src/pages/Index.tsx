
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { BriefcaseIcon, SearchIcon, UserPlusIcon } from 'lucide-react';

const Index: React.FC = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Job Match</h1>
              <p className="text-xl mb-8">Connect with top employers and discover opportunities that align with your skills and career goals.</p>
              
              {!isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                      <UserPlusIcon className="mr-2 h-5 w-5" />
                      Create Account
                    </Button>
                  </Link>
                  <Link to="/jobs">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-600">
                      <SearchIcon className="mr-2 h-5 w-5" />
                      Browse Jobs
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex justify-center">
                  {role === 'provider' ? (
                    <Link to="/post-job">
                      <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                        <BriefcaseIcon className="mr-2 h-5 w-5" />
                        Post a Job
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/jobs">
                      <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                        <SearchIcon className="mr-2 h-5 w-5" />
                        Find Jobs
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How JobConnect Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <UserPlusIcon className="h-8 w-8 text-job-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
                <p className="text-gray-600">Sign up as a job seeker to find opportunities or as an employer to post jobs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BriefcaseIcon className="h-8 w-8 text-job-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect with Jobs</h3>
                <p className="text-gray-600">Browse listings, apply for positions, or post job opportunities for talented candidates.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="h-8 w-8 text-job-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Find the Perfect Match</h3>
                <p className="text-gray-600">Connect directly with employers or candidates to discuss opportunities.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take the Next Step in Your Career?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of professionals finding their dream jobs and companies connecting with top talent.</p>
            
            <Link to={isAuthenticated ? '/jobs' : '/register'}>
              <Button size="lg" className="bg-job-primary hover:bg-blue-600">
                {isAuthenticated ? 'Explore Jobs' : 'Get Started Now'}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <BriefcaseIcon className="h-6 w-6 mr-2" />
                <span className="text-xl font-bold">JobConnect</span>
              </div>
              <p className="text-gray-400 mt-2">Connecting talent with opportunity</p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">About</a>
              <a href="#" className="hover:text-blue-400">Contact</a>
              <a href="#" className="hover:text-blue-400">Privacy</a>
              <a href="#" className="hover:text-blue-400">Terms</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} JobConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
