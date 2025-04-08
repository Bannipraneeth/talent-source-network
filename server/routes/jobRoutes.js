
const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  getJobsByProvider,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getJobs).post(protect, createJob);
router.route('/provider').get(protect, getJobsByProvider);
router.route('/:id')
  .get(getJobById)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

module.exports = router;
