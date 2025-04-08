
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Job, jobService } from '@/services/jobService';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { BriefcaseIcon, CalendarIcon, MapPinIcon, PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

const MyJobs: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  
  useEffect(() => {
    if (user) {
      const providerJobs = jobService.getJobsByProvider(user.id);
      setJobs(providerJobs);
    }
  }, [user]);
  
  const handleDeleteJob = () => {
    if (jobToDelete) {
      try {
        jobService.deleteJob(jobToDelete);
        setJobs(jobs.filter(job => job.id !== jobToDelete));
        toast.success('Job deleted successfully');
      } catch (error) {
        console.error('Error deleting job:', error);
        toast.error('Failed to delete job');
      } finally {
        setJobToDelete(null);
      }
    }
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Job Listings</h1>
            
            <Link to="/post-job">
              <Button className="bg-job-primary hover:bg-blue-600">
                <PlusIcon className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
            </Link>
          </div>
          
          {jobs.length > 0 ? (
            <div className="grid gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                        
                        <div className="flex flex-wrap gap-3 mb-3">
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
                        
                        <p className="text-gray-600 mb-2">{job.description.substring(0, 150)}...</p>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Salary:</span> {job.salary}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 md:text-right">
                        <Link to={`/jobs/${job.id}`}>
                          <Button variant="outline">
                            View
                          </Button>
                        </Link>
                        
                        <Link to={`/edit-job/${job.id}`}>
                          <Button variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-50">
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        
                        <Button 
                          variant="outline" 
                          className="text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => setJobToDelete(job.id)}
                        >
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <BriefcaseIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No jobs posted yet</h3>
              <p className="text-gray-600 mb-6">You haven't posted any job listings yet.</p>
              <Link to="/post-job">
                <Button className="bg-job-primary hover:bg-blue-600">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Post Your First Job
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <AlertDialog open={!!jobToDelete} onOpenChange={(open) => !open && setJobToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job listing and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteJob} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyJobs;
