const Announcement = require('../models/Announcement');

// Post announcement (HR/Admin only)
const createAnnouncement = async (req, res) => {
  try {
    const { title, content, departmentTarget } = req.body;
    const announcement = new Announcement({
      title,
      content,
      postedBy: req.user.id,
      departmentTarget: departmentTarget || 'All'
    });
    await announcement.save();
    res.status(201).json({ message: 'Announcement posted successfully', announcement });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all announcements
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('postedBy', 'name role').sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createAnnouncement, getAnnouncements };