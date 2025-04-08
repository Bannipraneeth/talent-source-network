
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  providerId: string;
  providerName: string;
  providerEmail: string;
  createdAt: string;
}

// In a real app, these functions would make API calls to MongoDB
// For now, we'll use localStorage as a mock database

const getJobs = (): Job[] => {
  try {
    const jobs = localStorage.getItem('jobPortalJobs');
    return jobs ? JSON.parse(jobs) : [];
  } catch (error) {
    console.error('Failed to get jobs:', error);
    return [];
  }
};

const getJobById = (id: string): Job | null => {
  try {
    const jobs = getJobs();
    return jobs.find(job => job.id === id) || null;
  } catch (error) {
    console.error('Failed to get job:', error);
    return null;
  }
};

const getJobsByProvider = (providerId: string): Job[] => {
  try {
    const jobs = getJobs();
    return jobs.filter(job => job.providerId === providerId);
  } catch (error) {
    console.error('Failed to get provider jobs:', error);
    return [];
  }
};

const createJob = (job: Omit<Job, 'id' | 'createdAt'>): Job => {
  try {
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const jobs = getJobs();
    jobs.push(newJob);
    localStorage.setItem('jobPortalJobs', JSON.stringify(jobs));
    
    return newJob;
  } catch (error) {
    console.error('Failed to create job:', error);
    throw new Error('Failed to create job');
  }
};

const updateJob = (id: string, updatedJob: Partial<Job>): Job => {
  try {
    const jobs = getJobs();
    const index = jobs.findIndex(job => job.id === id);
    
    if (index === -1) {
      throw new Error('Job not found');
    }
    
    const updated = { ...jobs[index], ...updatedJob };
    jobs[index] = updated;
    localStorage.setItem('jobPortalJobs', JSON.stringify(jobs));
    
    return updated;
  } catch (error) {
    console.error('Failed to update job:', error);
    throw new Error('Failed to update job');
  }
};

const deleteJob = (id: string): boolean => {
  try {
    const jobs = getJobs();
    const filtered = jobs.filter(job => job.id !== id);
    
    if (filtered.length === jobs.length) {
      throw new Error('Job not found');
    }
    
    localStorage.setItem('jobPortalJobs', JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to delete job:', error);
    throw new Error('Failed to delete job');
  }
};

export const jobService = {
  getJobs,
  getJobById,
  getJobsByProvider,
  createJob,
  updateJob,
  deleteJob
};
