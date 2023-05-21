const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerSuggestion, getbyhostel, getbystudent, updateSuggestion } = require('../controllers/suggestionController');

// @route   Register api/suggestion
// @desc    Register suggestion
// @access  Public
router.post('/register', [
    check('student', 'Student is required').not().isEmpty(),
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
], registerSuggestion);

// @route   GET api/suggestion
// @desc    Get all suggestions by hostel id
// @access  Public
router.post('/hostel', [
    check('hostel', 'Hostel is required').not().isEmpty()
], getbyhostel);

// @route   GET api/suggestion
// @desc    Get all suggestions by student id
// @access  Public
router.post('/student', [
    check('student', 'Student is required').not().isEmpty()
], getbystudent);

// @route Update api/suggestion
// @desc Update suggestion
// @access Public
router.post('/update', [
    check('id', 'Id is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
], updateSuggestion);

module.exports = router;