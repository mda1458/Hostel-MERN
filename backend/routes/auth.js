const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('Hello World! I am from auth.js');
})

module.exports = router;