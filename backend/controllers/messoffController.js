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
    const today = new Date();
    console.log(leaving_date);
    if (new Date(leaving_date) > new Date(return_date)) {
        return res.status(400).json({success, "message": "Leaving date cannot be greater than return date"});
    }
    else if (new Date(leaving_date) < today) {
        return res.status(400).json({success, "message": "Request cannot be made for past Mess off"});
    }
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
        let date = new Date();
        const requests = await MessOff.countDocuments({student, leaving_date: {$gte: new Date(date.getFullYear(), date.getMonth(), 1), $lte: new Date(date.getFullYear(), date.getMonth()+1, 0)}});
        const approved = await MessOff.countDocuments({student, status: "Approved", leaving_date: {$gte: new Date(date.getFullYear(), date.getMonth(), 1), $lte: new Date(date.getFullYear(), date.getMonth()+1, 0)}});
        success = true;
        return res.status(200).json({success, requests, approved});
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({success, "message": "Server Error"});
    }
}