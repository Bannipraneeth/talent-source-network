
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Job, jobService } from '@/services/jobService';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { BriefcaseIcon, CalendarIcon, MapPinIcon, MailIcon, ArrowLeftIcon, PhoneIcon, SendIcon } from 'lucide-react';
import { toast } from 'sonner';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      const jobData = jobService.getJobById(id);
      if (jobData) {
        setJob(jobData);
      } else {
        navigate('/jobs');
        toast.error('Job not found');
      }
    }
  }, [id, navigate]);
  
  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send a message to the job provider
    // For now, we'll just show a success message
    toast.success('Your message has been sent! The job provider will contact you soon.');
    setContactOpen(false);
    setMessage('');
    setPhone('');
  };
  
  const getJobTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      case 'internship':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <BriefcaseIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-semibold">Loading job details...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="outline" className="mb-6" onClick={() => navigate('/jobs')}>
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Job Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-3">{job.title}</h1>
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <BriefcaseIcon className="h-4 w-4 mr-1" />
                        <span>{job.company}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      
                      <Badge variant="outline" className={getJobTypeBadgeColor(job.type)}>
                        {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                      </Badge>
                      
                      <div className="flex items-center text-gray-600">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="text-lg font-semibold mb-2">Salary: {job.salary}</div>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                    <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                    <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar - Apply/Contact */}
            <div>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500">Company</div>
                      <div className="font-medium">{job.company}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-medium">{job.location}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Job Type</div>
                      <div className="font-medium">
                        {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Salary</div>
                      <div className="font-medium">{job.salary}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Posted by</div>
                      <div className="font-medium">{job.providerName}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{job.providerEmail}</div>
                    </div>
                  </div>
                  
                  {isAuthenticated ? (
                    user?.role === 'seeker' ? (
                      <Button 
                        className="w-full bg-job-primary hover:bg-blue-600"
                        onClick={() => setContactOpen(true)}
                      >
                        <MailIcon className="h-4 w-4 mr-2" />
                        Contact Employer
                      </Button>
                    ) : (
                      <div className="text-sm text-gray-500 text-center p-2 bg-gray-100 rounded">
                        You are logged in as a job provider.
                      </div>
                    )
                  ) : (
                    <div className="space-y-4">
                      <div className="text-sm text-gray-500 text-center">
                        You need to be logged in as a job seeker to contact employers.
                      </div>
                      <Link to="/login">
                        <Button className="w-full">
                          Login to Contact
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Contact Dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Employer</DialogTitle>
            <DialogDescription>
              Send a message to {job.providerName} about the {job.title} position at {job.company}.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleContact}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Your Phone Number
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Introduce yourself and explain why you're interested in this position..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setContactOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-job-primary hover:bg-blue-600">
                <SendIcon className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobDetails;
