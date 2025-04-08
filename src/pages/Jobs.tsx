
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Job, jobService } from '@/services/jobService';
import Navigation from '@/components/Navigation';
import { BriefcaseIcon, MapPinIcon, SearchIcon } from 'lucide-react';

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  
  useEffect(() => {
    // Fetch jobs from our service
    const allJobs = jobService.getJobs();
    setJobs(allJobs);
    
    // If this is the first load and there are no jobs, add some sample jobs
    if (allJobs.length === 0) {
      const sampleJobs: Omit<Job, 'id' | 'createdAt'>[] = [
        {
          title: 'Frontend Developer',
          company: 'TechCorp',
          location: 'New York, NY',
          description: 'We are looking for a skilled Frontend Developer to join our team...',
          requirements: 'HTML, CSS, JavaScript, React, 2+ years of experience',
          salary: '$80,000 - $100,000',
          type: 'full-time',
          providerId: 'sample1',
          providerName: 'Sarah Johnson',
          providerEmail: 'sarah@techcorp.com'
        },
        {
          title: 'UX Designer',
          company: 'DesignHub',
          location: 'San Francisco, CA',
          description: 'DesignHub is seeking a creative UX Designer to help create amazing user experiences...',
          requirements: 'Figma, Adobe XD, user research, wireframing, 3+ years of experience',
          salary: '$90,000 - $120,000',
          type: 'full-time',
          providerId: 'sample2',
          providerName: 'Michael Chen',
          providerEmail: 'michael@designhub.com'
        },
        {
          title: 'Part-time Data Analyst',
          company: 'DataWise',
          location: 'Remote',
          description: 'Looking for a data analyst to join our team on a part-time basis...',
          requirements: 'SQL, Excel, Python, data visualization',
          salary: '$40 - $50 per hour',
          type: 'part-time',
          providerId: 'sample3',
          providerName: 'Emily Rodriguez',
          providerEmail: 'emily@datawise.io'
        },
        {
          title: 'DevOps Engineer',
          company: 'CloudTech',
          location: 'Austin, TX',
          description: 'CloudTech is expanding our DevOps team to support our growing infrastructure...',
          requirements: 'AWS, Docker, Kubernetes, CI/CD pipelines',
          salary: '$110,000 - $140,000',
          type: 'full-time',
          providerId: 'sample4',
          providerName: 'James Wilson',
          providerEmail: 'james@cloudtech.com'
        },
        {
          title: 'Marketing Intern',
          company: 'GrowthLabs',
          location: 'Chicago, IL',
          description: 'Join our marketing team as an intern and gain valuable experience...',
          requirements: 'Current marketing student, social media skills, analytics',
          salary: '$20 per hour',
          type: 'internship',
          providerId: 'sample5',
          providerName: 'Lisa Parker',
          providerEmail: 'lisa@growthlabs.com'
        }
      ];
      
      // Add sample jobs to our "database"
      sampleJobs.forEach(job => {
        jobService.createJob(job);
      });
      
      // Fetch the updated jobs
      setJobs(jobService.getJobs());
    }
  }, []);
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = selectedType ? job.type === selectedType : true;
    
    return matchesSearch && matchesType;
  });
  
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
      
      <main className="flex-grow">
        {/* Search and Filters */}
        <section className="bg-job-primary py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-6">Find Your Dream Job</h1>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search jobs, companies, or keywords"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="w-full md:w-48">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-types">All Types</SelectItem>
                      <SelectItem value="full-time">Full-Time</SelectItem>
                      <SelectItem value="part-time">Part-Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="bg-job-primary hover:bg-blue-600">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Job Listings */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
              </h2>
            </div>
            
            {filteredJobs.length > 0 ? (
              <div className="grid gap-6">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                          
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
                          </div>
                          
                          <p className="text-gray-600 mb-4">{job.description.substring(0, 150)}...</p>
                          
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Salary:</span> {job.salary}
                          </div>
                        </div>
                        
                        <div className="md:text-right">
                          <p className="text-sm text-gray-500 mb-2">Posted by: {job.providerName}</p>
                          <Link to={`/jobs/${job.id}`}>
                            <Button variant="outline" className="text-job-primary border-job-primary hover:bg-job-primary hover:text-white">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BriefcaseIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search filters or try again later.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Jobs;
