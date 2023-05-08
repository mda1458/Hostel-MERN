const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:'student'
    },
    date:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        required:true
    }
})

module.exports = Attendance = mongoose.model('attendance',AttendanceSchema);