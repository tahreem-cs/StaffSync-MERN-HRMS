const express = require('express');
const router = express.Router();
const { applyLeave, getMyLeaves, getAllLeaves, updateLeaveStatus } = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, applyLeave);
router.get('/my-leaves', protect, getMyLeaves);
router.get('/all', protect, authorize('Admin', 'HR', 'Manager'), getAllLeaves);
router.patch('/:id/status', protect, authorize('Admin', 'HR', 'Manager'), updateLeaveStatus);

module.exports = router;