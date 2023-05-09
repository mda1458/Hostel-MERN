const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:'student'
    },
    hostel:{
        type:Schema.Types.ObjectId,
        ref:'hostel'
    },
    type:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Complaint = mongoose.model('complaint',ComplaintSchema);
