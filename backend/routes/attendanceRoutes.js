const express = require('express');
const router = express.Router();
const { checkIn, checkOut, getMyAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/auth');

router.post('/check-in', protect, checkIn);
router.post('/check-out', protect, checkOut);
router.get('/my-history', protect, getMyAttendance);

module.exports = router;