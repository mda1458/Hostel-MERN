const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerStudent, getStudent, getAllStudents, updateStudent, deleteStudent } = require('../controllers/studentController');

// @route  POST api/admin/register-student
// @desc   Register student
// @access Public
router.post('/register-student', [
    check('name', 'Name is required').not().isEmpty(),
    check('cms_id', 'CMS ID is required').not().isEmpty(),
    check('room_no', 'Room number is required').not().isEmpty(),
    check('batch', 'Batch is required').not().isEmpty(),
    check('dept', 'Department is required').not().isEmpty(),
    check('course', 'Course is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('father_name', 'Father name is required').not().isEmpty(),
    check('contact', 'Contact is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('cnic', 'CNIC is required').not().isEmpty(),
    check('hostel', 'Hostel is required').not().isEmpty()
], registerStudent);

// @route  POST api/admin/get-student
// @desc   Get student by CMS ID
// @access Public
router.get('/get-student', [
    check('cms_id', 'CMS ID is required').not().isEmpty()
], getStudent);

// @route  POST api/admin/get-all-students
// @access Public
router.get('/get-all-students', getAllStudents);

// @route  POST api/admin/update-student
// @desc   Update student
// @access Public
router.post('/update-student', [
    check('cms_id', 'CMS ID is required').not().isEmpty(),
    check('room_no', 'Room number is required').not().isEmpty(),
    check('batch', 'Batch is required').not().isEmpty(),
    check('dept', 'Department is required').not().isEmpty(),
    check('course', 'Course is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('father_name', 'Father name is required').not().isEmpty(),
    check('contact', 'Contact is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('cnic', 'CNIC is required').not().isEmpty(),
    check('user', 'User is required').not().isEmpty(),
    check('hostel', 'Hostel is required').not().isEmpty()
], updateStudent);

// @route  POST api/admin/delete-student
// @desc   Delete student
// @access Public
router.post('/delete-student', [
    check('cms_id', 'CMS ID is required').not().isEmpty()
], deleteStudent);

module.exports = router;

