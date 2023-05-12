const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { login, changePassword, verifySession } = require('../controllers/authController');

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], login);

// @route   POST api/auth/change-password
// @desc    Change password
// @access  Private
router.post('/change-password', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Old password is required').isLength({ min: 8 }),
    check('newPassword', 'New password of more than 8 character is required').isLength({ min: 8 })
], changePassword);

// @route   POST api/auth/verifysession
// @desc    Verify session
// @access  public
router.post('/verifysession', [
    check('token', 'Token is required').not().isEmpty()
], verifySession);

module.exports = router;
