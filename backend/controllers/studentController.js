const { generateToken, verifyToken } = require('../utils/auth');
const { validationResult } = require('express-validator');
const { Student, Hostel, User } = require('../models');
const bcrypt = require('bcryptjs');
const { deleteOne } = require('../models/Admin');

const registerStudent = async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, cms_id, room_no, batch, dept, course, email, father_name, contact, address, dob, cnic, hostel, password } = req.body;

    try {
        let student = await Student.findOne({ cms_id });

        if (student) {
            return res.status(400).json({ errors: [{ msg: 'Student already exists' }] });
        }
        let shostel = await Hostel.findOne({ name: hostel });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let user = new User({
            email,
            password: hashedPassword,
            isAdmin: false
        });

        await user.save();
        
        student = new Student({
            name,
            cms_id,
            room_no,
            batch,
            dept,
            course,
            email,
            father_name,
            contact,
            address,
            dob,
            cnic,
            user: user.id,
            hostel: shostel.id
        });
        

        await student.save();

        const token = generateToken(student.id);

        res.json({ token, student });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getStudent = async (req, res) => {
    try {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        const { cms_id } = req.body;

        const student = await Student.findOne({ cms_id }).select('-password');

        if (!student) {
            return res.status(400).json({ errors: [{ msg: 'Student does not exist' }] });
        }

        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().select('-password');
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const updateStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.student.id).select('-password');

        const { name, cms_id, room_no, batch, dept, course, email, father_name, contact, address, dob, cnic, user, hostel } = req.body;

        student.name = name;
        student.cms_id = cms_id;
        student.room_no = room_no;
        student.batch = batch;
        student.dept = dept;
        student.course = course;
        student.email = email;
        student.father_name = father_name;
        student.contact = contact;
        student.address = address;
        student.dob = dob;
        student.cnic = cnic;
        student.hostel = hostel;

        await student.save();

        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const deleteStudent = async (req, res) => {
    try {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        const { cms_id } = req.body;

        const student = await Student.findOne({ cms_id }).select('-password');

        if (!student) {
            return res.status(400).json({ errors: [{ msg: 'Student does not exist' }] });
        }

        const user = await User.findById(student.user);

        await User.deleteOne(user);

        await Student.deleteOne(student);

        res.json({ msg: 'Student deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    registerStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    getAllStudents
}