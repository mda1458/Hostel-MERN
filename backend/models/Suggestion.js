const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuggestionSchema = new Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:'student'
    },
    hostel:{
        type:Schema.Types.ObjectId,
        ref:'hostel'
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

module.exports = Suggestion = mongoose.model('suggestion',SuggestionSchema);