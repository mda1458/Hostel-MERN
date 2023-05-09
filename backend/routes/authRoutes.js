const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { login, register } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Authenticate user and get token
// @access  Public
router.post('/register', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password length should be greater than 8').isLength({ min: 8 }),
    check('isAdmin', 'isAdmin is required').not().isEmpty()
], register);

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], login);

module.exports = router;
