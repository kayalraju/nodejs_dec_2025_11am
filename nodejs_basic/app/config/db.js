
require('dotenv').config();
const mongoose = require('mongoose');


const DbConnection=async()=>{

    try {
        await mongoose.connect("mongodb+srv://subarnaghosh371_db_user:Dk6eDD3Y4J87D4Rw@cluster0.7htjjzq.mongodb.net/crud_application");
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports=DbConnection
