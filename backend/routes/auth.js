const express = require('express');
const { body } = require('express-validator');
const { registerStudent, loginStudent } = require('../controllers/studentController');

const router = express.Router();

// @route   POST /api/auth/registerStudent
// @desc    Register student
router.post(
    '/registerStudent',
    [
        body('name', 'Name is required').not().isEmpty(),
        body('cms_id', 'CMS ID is required').not().isEmpty(),
        body('room_no', 'Room number is required').not().isEmpty(),
        body('batch', 'Batch is required').not().isEmpty(),
        body('dept', 'Department is required').not().isEmpty(),
        body('course', 'Course is required').not().isEmpty(),
        body('email', 'Email is required').not().isEmail(),
        body('contact', 'Contact is required').not().isEmpty(),
        body('password', 'Password length should be greater than 8').isLength({ min: 8 })
    ],
    registerStudent
);

// @route   POST /api/auth/login
// @desc    Login student
router.post(
    '/login',
    [
        body('cms_id', 'CMS ID is required').not().isEmpty(),
        body('password', 'Password is required').not().isEmpty()
    ],
    loginStudent
);

module.exports = router;
