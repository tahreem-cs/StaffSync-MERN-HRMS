const express = require('express');
const router = express.Router();
const { 
  createTraining, 
  getTrainings 
} = require('../controllers/trainingController');
const { protect, authorize } = require('../middleware/auth');

// Get all training programs (or user-specific training)
router.get('/', protect, getTrainings);

// Create a new training course/program (HR & Manager only)
router.post('/', protect, authorize('Admin', 'HR', 'Manager'), createTraining);

// Update employee training progress/status
// router.patch('/:id/status', protect, updateTrainingStatus);

module.exports = router;