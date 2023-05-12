const { validationResult } = require('express-validator');
const { MessOff } = require('../models/');
const { verifyToken } = require('../utils/auth');

// @route   request api/messoff/request
// @desc    Request for mess off
// @access  Public
exports.requestMessOff = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), success});
    }
    const { student, leaving_date, return_date } = req.body;
    try {
        const messOff = new MessOff({
            student,
            leaving_date,
            return_date
        });
        await messOff.save();
        success = true;
        return res.status(200).json({success, "message": "Mess off request sent successfully"});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({success, "message": "Server Error"});
    }
}

// @route   GET count of request api/messoff/count
// @desc    Get all mess off requests
// @access  Private
exports.countMessOff = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), success});
    }
    const { student } = req.body;
    try {
        const count = await MessOff.countDocuments({student});
        success = true;
        return res.status(200).json({success, count});
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({success, "message": "Server Error"});
    }
}