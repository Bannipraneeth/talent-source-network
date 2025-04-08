
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface Job {
  _id: string;
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

// Configure axios with auth token
const configureAxios = () => {
  const user = localStorage.getItem('jobPortalUser');
  const token = user ? JSON.parse(user).token : null;
  
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

const getJobs = async (): Promise<Job[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/jobs`);
    return data;
  } catch (error) {
    console.error('Failed to get jobs:', error);
    return [];
  }
};

const getJobById = async (id: string): Promise<Job | null> => {
  try {
    const { data } = await axios.get(`${API_URL}/jobs/${id}`);
    return data;
  } catch (error) {
    console.error('Failed to get job:', error);
    return null;
  }
};

const getJobsByProvider = async (): Promise<Job[]> => {
  try {
    const config = configureAxios();
    const { data } = await axios.get(`${API_URL}/jobs/provider`, config);
    return data;
  } catch (error) {
    console.error('Failed to get provider jobs:', error);
    return [];
  }
};

const createJob = async (job: Omit<Job, '_id' | 'createdAt' | 'providerId' | 'providerName' | 'providerEmail'>): Promise<Job> => {
  try {
    const config = configureAxios();
    const { data } = await axios.post(`${API_URL}/jobs`, job, config);
    return data;
  } catch (error) {
    console.error('Failed to create job:', error);
    throw new Error('Failed to create job');
  }
};

const updateJob = async (id: string, updatedJob: Partial<Job>): Promise<Job> => {
  try {
    const config = configureAxios();
    const { data } = await axios.put(`${API_URL}/jobs/${id}`, updatedJob, config);
    return data;
  } catch (error) {
    console.error('Failed to update job:', error);
    throw new Error('Failed to update job');
  }
};

const deleteJob = async (id: string): Promise<boolean> => {
  try {
    const config = configureAxios();
    await axios.delete(`${API_URL}/jobs/${id}`, config);
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
