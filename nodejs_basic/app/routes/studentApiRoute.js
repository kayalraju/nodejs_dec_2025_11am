const express=require('express');
const StudentController = require('../controllers/StudentController');

const Router=express.Router();



Router.post('/create/student',StudentController.createStudent);


module.exports=Router;