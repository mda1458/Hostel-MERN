const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

const router = express.Router();

// *********************************************************************************************************************
// ********************************************* STUDENT REGISTRATION *********************************************************
// *********************************************************************************************************************
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
    async (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, cms_id, room_no, batch, dept, course, email, contact, password } = req.body;

        try {
            let student = await Student.findOne({ cms_id });

            if (student) {
                return res.status(400).json({ errors: [{ msg: 'Student already exists' }] });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            student = new Student({
                name,
                cms_id,
                room_no,
                batch,
                dept,
                course,
                email,
                contact,
                password: hashedPassword
            });

            await student.save();

            const payload = {
                student: {
                    id: student.id
                }
            };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// *********************************************************************************************************************
// ********************************************* STUDENT LOGIN *********************************************************
// *********************************************************************************************************************
// @route   POST /api/auth/login
// @desc    Login student
router.post(
    '/login',
    [
        body('cms_id', 'CMS ID is required').not().isEmpty(),
        body('password', 'Password is required').not().isEmpty()
    ],
    async (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        const { cms_id, password } = req.body;

        try {
            let student = await Student.findOne({ cms_id });

            if (!student) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, student.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const payload = {
                student: {
                    id: student.id
                }
            };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
