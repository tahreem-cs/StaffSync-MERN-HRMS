const Training = require('../models/training');

// Get all training sessions
exports.getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find().populate('attendees');
    res.status(200).json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new training session
exports.createTraining = async (req, res) => {
  try {
    const newTraining = new Training(req.body);
    const savedTraining = await newTraining.save();
    res.status(201).json(savedTraining);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};