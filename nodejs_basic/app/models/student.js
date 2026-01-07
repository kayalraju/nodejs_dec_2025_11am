const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const StudentSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    
})


const StudentMOdel=mongoose.model('student',StudentSchema)

module.exports=StudentMOdel