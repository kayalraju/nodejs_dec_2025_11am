const express=require('express');
const StudentController = require('../controllers/StudentController');
const StudentImage = require('../utils/studentImage');

const Router=express.Router();



Router.post('/create/student',StudentImage.single('image'),StudentController.createStudent);
Router.get('/students',StudentController.getAllStudents);
Router.get('/student/edit/:id',StudentController.getSingleStudent);
Router.put('/student/update/:id',StudentController.updateStudent);
Router.delete('/student/delete/:id',StudentController.deleteStudent);


module.exports=Router;


