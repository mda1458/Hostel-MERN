const { validationResult } = require('express-validator');
const { Student, Attendance } = require('../models');

const markAttendance = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({success, errors: errors.array() });
    }
    const { student, status } = req.body;
    const date = new Date();
    const alreadyattendance = await Attendance.findOne({ student, date: { $gte: date.setHours(0, 0, 0, 0), $lt: date.setHours(23, 59, 59, 999) } });
    if (alreadyattendance) {
        return res.status(409).json({ success, error: 'Attendance already marked' });
    }
    
    try {
        const attendance = new Attendance(
            {
                student,
                status
            }
        );
        const result = await attendance.save();
        success = true;
        res.status(201).json(success,result);
    } catch (err) {
        res.status(500).json({ success, error: err.message });
    }
}

const getAttendance = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success, errors: errors.array() });
    }
    const { student } = req.body;
    try {
        const attendance = await Attendance.find({ student });
        success = true;
        res.status(200).json({ success, attendance });
    }
    catch (err) {
        res.status(500).json({ success, error: err.message });
    }
}

const updateAttendance = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { student, status } = req.body;
    try {
        const attendance = await Attendance.findOneAndUpdate({ student, date:date.now() }, { status });
        res.status(200).json(attendance);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getHostelAttendance = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success, errors: errors.array() });
    }
    const { hostel } = req.body;
    try {
        const date = new Date();
        const students = await Student.find({ hostel });
        const attendance = await Attendance.find({ student: { $in: students }, date: { $gte: date.setHours(0, 0, 0, 0), $lt: date.setHours(23, 59, 59, 999) } }).populate('student', ['_id','name', 'room_no', 'cms_id']);
        success = true;
        res.status(200).json({ success, attendance });
    }
    catch (err) {
        res.status(500).json({ success, error: err.message });
    }
}

module.exports = {
    markAttendance,
    getAttendance,
    updateAttendance,
    getHostelAttendance
}

