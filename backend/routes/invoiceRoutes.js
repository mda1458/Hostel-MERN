const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { generateInvoice, getInvoicesbyid, getInvoices } = require('../controllers/invoiceController')

// @route   Generate api/invoice/generate
// @desc    Generate invoice
// @access  Public
router.post('/generate', [
    check('student', 'Student is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty()
], generateInvoice);

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