const Attendance = require('../models/Attendance');

// Check-In
const checkIn = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already checked in today
    let attendance = await Attendance.findOne({ employeeId: req.user.id, date: today });
    if (attendance && attendance.checkIn) {
      return res.status(400).json({ message: 'Already checked in today' });
    }

    if (!attendance) {
      attendance = new Attendance({
        employeeId: req.user.id,
        date: today,
        checkIn: new Date(),
        status: 'Present'
      });
    } else {
      attendance.checkIn = new Date();
    }

    await attendance.save();
    res.status(200).json({ message: 'Checked in successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Check-Out
const checkOut = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({ employeeId: req.user.id, date: today });
    if (!attendance || !attendance.checkIn) {
      return res.status(400).json({ message: 'You have not checked in today' });
    }

    attendance.checkOut = new Date();
    await attendance.save();

    res.status(200).json({ message: 'Checked out successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get My Attendance
const getMyAttendance = async (req, res) => {
  try {
    const history = await Attendance.find({ employeeId: req.user.id }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { checkIn, checkOut, getMyAttendance };