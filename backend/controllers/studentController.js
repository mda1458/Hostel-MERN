const { generateToken, verifyToken } = require('../utils/auth');
const { validationResult } = require('express-validator');
const { Student, Hostel, User } = require('../models');
const bcrypt = require('bcryptjs');

const registerStudent = async (req, res) => {
    // console.log(req.body);
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors);
        return res.status(400).json({success, errors: errors.array() });
    }

    const { name, cms_id, room_no, batch, dept, course, email, father_name, contact, address, dob, cnic, hostel, password } = req.body;

    try {
        let student = await Student.findOne({ cms_id });

        if (student) {
            return res.status(400).json({success, errors: [{ msg: 'Student already exists' }] });
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

        success = true;
        res.json({success, token, student });

    } catch (err) {
        console.log(err);
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

const getStudent = async (req, res) => {
    try {
        // console.log(req.body);
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({success, errors: errors.array() });
        }

        const { cms_id } = req.body;

        const student = await Student.findOne({ cms_id }).select('-password');

        if (!student) {
            return res.status(400).json({success, errors: [{ msg: 'Student does not exist' }] });
        }

        success = true;
        res.json({success, student });
    } catch (err) {
        console.log(err);
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

const getAllStudents = async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors);
        return res.status(400).json({success, errors: errors.array() });
    }

    let { hostel } = req.body;

    try {

        const shostel = await Hostel.findOne({ name: hostel });

        const students = await Student.find({ hostel: shostel.id }).select('-password');

        success = true;
        res.json({success, students});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

const updateStudent = async (req, res) => {

    let success = false;
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

        success = true;
        res.json({success, student});
    } catch (err) {
        console.log(err);
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

const deleteStudent = async (req, res) => {
    try {
        // console.log(req.body);
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({success, errors: errors.array() });
        }

        const { cms_id } = req.body;

        const student = await Student.findOne({ cms_id }).select('-password');

        if (!student) {
            return res.status(400).json({success, errors: [{ msg: 'Student does not exist' }] });
        }

        const user = await User.findById(student.user);

        await User.deleteOne(user);

        await Student.deleteOne(student);

        success = true;
        res.json({success, msg: 'Student deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

module.exports = {
    registerStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    getAllStudents
}