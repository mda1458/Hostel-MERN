const { generateToken, verifyToken } = require('../utils/auth');
const { validationResult } = require('express-validator');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerStudent = async (req, res) => {
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

        const token = generateToken(student.id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const loginStudent = async (req, res) => {
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

        const token = generateToken(student.id);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.student.id).select('-password');
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const updateStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.student.id).select('-password');

        const { name, cms_id, room_no, batch, dept, course, email, contact } = req.body;

        student.name = name;
        student.cms_id = cms_id;
        student.room_no = room_no;
        student.batch = batch;
        student.dept = dept;
        student.course = course;
        student.email = email;
        student.contact = contact;

        await student.save();

        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.student.id).select('-password');

        await student.remove();

        res.json({ msg: 'Student deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    registerStudent,
    loginStudent,
    getStudent,
    updateStudent,
    deleteStudent
}