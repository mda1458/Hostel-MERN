const { validationResult } = require('express-validator');
const { Attendance } = require('../models');

const markAttendance = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { student, status } = req.body;
    try {
        const attendance = new Attendance(
            {
                student,
                status
            }
        );
        const result = await attendance.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
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

module.exports = {
    markAttendance,
    getAttendance,
    updateAttendance
}

