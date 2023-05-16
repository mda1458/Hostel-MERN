const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerComplaint, getbyhostel, getbystudent, resolve } = require('../controllers/complaintController');

// @route   Register api/compalint/register
// @desc    Register complaint
// @access  Public
router.post('/register', [
    check('student', 'Student is required').not().isEmpty(),
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
], registerComplaint);

// @route   GET api/complaint/hostel
// @desc    Get all complaints by hostel id
// @access  Public
router.post('/hostel/', [
    check('hostel', 'Hostel is required').not().isEmpty()
], getbyhostel);

// @route   GET api/complaint/student
// @desc    Get all complaints by student id
// @access  Public
router.post('/student', [
    check('student', 'Student is required').not().isEmpty()
], getbystudent);

// @route   GET api/complaint/resolve
// @desc    Get complaint by complaint id
// @access  Public
router.post('/resolve', [
    check('id', 'Complaint id is required').not().isEmpty()
], resolve);


module.exports = router;