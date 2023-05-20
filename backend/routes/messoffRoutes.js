const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { requestMessOff, countMessOff, listMessOff } = require('../controllers/messoffController');

// @route   request api/messoff/request
// @desc    Request for mess off
// @access  Public
router.post('/request', [
    check('student', 'Student ID is required').not().isEmpty(),
    check('leaving_date', 'Leaving date is required').not().isEmpty(),
    check('return_date', 'Return date is required').not().isEmpty()
], requestMessOff);

// @route   GET count of request api/messoff/count
// @desc    Get all mess off requests
// @access  Private
router.post('/count', [
    check('student', 'Student ID is required').not().isEmpty()
], countMessOff);

// @route   GET list of request api/messoff/list
// @desc    Get all mess off requests
// @access  Public
router.post('/list', [
    check('hostel', 'Hostel is required').not().isEmpty()
], listMessOff);


module.exports = router;