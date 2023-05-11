const { validationResult } = require('express-validator');
const { Complaint } = require('../models');

// @route   Register api/compalint
// @desc    Register complaint
// @access  Public
exports.registerComplaint = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student, hostel, type, title, description } = req.body;
    try {
        const newComplaint = new Complaint({
            student,
            hostel,
            type,
            title,
            description
        });
        await newComplaint.save();
        success = true;
        res.json({ success, msg: 'Complaint registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/complaint
// @desc    Get all complaints by hostel id
// @access  Public
exports.getbyhostel = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { hostel } = req.body;
    try {
        const complaints = await Complaint.find({ hostel }).populate('student', ['name', 'email', 'rollno']);
        success = true;
        res.json({ success, complaints });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/complaint
// @desc    Get all complaints by student id
// @access  Public
exports.getbystudent = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student } = req.body;
    try {
        const complaints = await Complaint.find({ student }).populate('hostel', ['name']);
        success = true;
        res.json({ success, complaints });
    }
    catch (err) {
        console.error(err.errors);
        res.status(500).send('Server error');
    }
}
