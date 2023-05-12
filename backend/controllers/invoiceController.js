const { validationResult } = require('express-validator');
const {Invoice, MessOff, Student} = require('../models');
const {Mess_bill_per_day} = require('../constants/mess');

// @route   Generate api/invoice/generate
// @desc    Generate invoice
// @access  Public
exports.generateInvoice = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), success});
    }
    const {student, title} = req.body;
    let invoice = await Invoice.findOne({student: student});
    if (invoice) {
        return res.status(400).json({errors: [{msg: 'Invoice already exists'}], success});
    }
    // get days in previous month
    let daysinlastmonth = new Date( new Date().getFullYear(), new Date().getMonth(), 0).getDate();

    console.log(Mess_bill_per_day);
    let amount = Mess_bill_per_day*daysinlastmonth;
    let messoff = await MessOff.find({student: student});
    if (messoff) {
        messoff.map((messoffone) => {
            if (messoffone.status === 'Approved' && messoffone.return_date.getMonth()+1 === new Date().getMonth()) {
                console.log(messoffone);
                let leaving_date = messoffone.leaving_date;
                let return_date = messoffone.return_date;
                let number_of_days = (return_date - leaving_date)/(1000*60*60*24);
                amount -= Mess_bill_per_day*number_of_days;
            }
        });
    }
    console.log(amount);
    try {
        let invoice = new Invoice({
            student,
            title,
            amount
        });
        await invoice.save();
        success = true;
        res.status(200).json({success, invoice});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/invoice/getbyid
// @desc    Get all invoices
// @access  Public
exports.getInvoicesbyid = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), success});
    }
    const { hostel } = req.body;
    let student = await Student.find({hostel: hostel});
    try {
        let invoices = await Invoice.find({student: student});
        success = true;
        res.status(200).json({success, invoices});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/invoice/student
// @desc    Get all invoices
// @access  Public
exports.getInvoices = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), success});
    }
    const { student } = req.body;
    try {
        let invoices = await Invoice.find({student: student});
        success = true;
        res.status(200).json({success, invoices});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}