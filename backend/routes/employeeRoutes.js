const express = require('express');
const router = express.Router();
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/auth');

// GET all employees (HR & Manager), CREATE employee (HR only)
router.route('/')
  .get(protect, authorize('Admin', 'HR', 'Manager'), getEmployees)
  .post(protect, authorize('Admin', 'HR'), createEmployee);

// UPDATE & DELETE employee (HR only)
router.route('/:id')
  .put(protect, authorize('Admin', 'HR'), updateEmployee)
  .delete(protect, authorize('Admin', 'HR'), deleteEmployee);

module.exports = router;