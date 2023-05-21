const { validationResult } = require('express-validator');
const { Suggestion } = require('../models');

// @route   Register api/suggestion
// @desc    Register suggestion
// @access  Public
exports.registerSuggestion = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student, hostel, title, description } = req.body;
    try {
        const newSuggestion = new Suggestion({
            student,
            hostel,
            title,
            description
        });
        await newSuggestion.save();
        success = true;
        res.json({ success, msg: 'Suggestion registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/suggestion
// @desc    Get all suggestions by hostel id
// @access  Public
exports.getbyhostel = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { hostel } = req.body;
    try {
        const suggestions = await Suggestion.find({ hostel }).populate('student', ['name', 'room_no']);
        success = true;
        res.json({ success, suggestions });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/suggestion
// @desc    Get all suggestions by student id
// @access  Public
exports.getbystudent = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student } = req.body;
    try {
        const suggestions = await Suggestion.find({ student }).populate('hostel', ['name']);
        success = true;
        res.json({ success, suggestions });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   Update api/suggestion
// @desc    Update suggestion
// @access  Public
exports.updateSuggestion = async (req, res) => {
    let success = false;
    const { id, status } = req.body;
    try {
        const suggestion = await Suggestion.findByIdAndUpdate(id, { status });
        success = true;
        res.json({ success, msg: 'Suggestion updated successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}