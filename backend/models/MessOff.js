const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessOffSchema = new Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:'student'
    },
    leaving_date:{
        type:Date,
        required:true
    },
    return_date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    },
    request_date:{
        type:Date,
        default:Date.now
    }
})

module.exports = MessOff = mongoose.model('messoff',MessOffSchema);