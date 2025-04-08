
const Job = require('../models/jobModel');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get jobs created by provider
// @route   GET /api/jobs/provider
// @access  Private
const getJobsByProvider = async (req, res) => {
  try {
    const jobs = await Job.find({ providerId: req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      requirements,
      salary,
      type,
    } = req.body;

    const job = new Job({
      title,
      company,
      location,
      description,
      requirements,
      salary,
      type,
      providerId: req.user._id,
      providerName: req.user.name,
      providerEmail: req.user.email,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      requirements,
      salary,
      type,
    } = req.body;

    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    // Check if the user is the job provider
    if (job.providerId.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized to update this job' });
      return;
    }

    job.title = title || job.title;
    job.company = company || job.company;
    job.location = location || job.location;
    job.description = description || job.description;
    job.requirements = requirements || job.requirements;
    job.salary = salary || job.salary;
    job.type = type || job.type;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    // Check if the user is the job provider
    if (job.providerId.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized to delete this job' });
      return;
    }

    await job.deleteOne();
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJobs,
  getJobById,
  getJobsByProvider,
  createJob,
  updateJob,
  deleteJob,
};
