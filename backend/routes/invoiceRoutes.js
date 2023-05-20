const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { generateInvoices, getInvoicesbyid, getInvoices } = require('../controllers/invoiceController')

// @route   Generate api/invoice/generate
// @desc    Generate invoice
// @access  Public
router.post('/generate', [
    check('hostel', 'Hostel is required').not().isEmpty(),
], generateInvoices);

// @route   GET api/invoice/getbyid
// @desc    Get all invoices
// @access  Public
router.post('/getbyid', [
    check('hostel', 'Hostel is required').not().isEmpty()
], getInvoicesbyid);

// @route   GET api/invoice/student
// @desc    Get all invoices
// @access  Public
router.post('/student', [
    check('student', 'Student is required').not().isEmpty()
], getInvoices);



module.exports = router;