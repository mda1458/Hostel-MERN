const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HostelSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    rooms:{
        type:Number,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    vacant:{
        type:Number,
        required:true
    },
    manager:{
        type:Schema.Types.ObjectId,
        ref:'admin'
    }
})

module.exports = Hostel = mongoose.model('hostel',HostelSchema);
