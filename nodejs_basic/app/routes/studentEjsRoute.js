const express=require('express');
const StudentEjsController = require('../controllers/StudentEjsController');
const checkUser = require('../middleware/checkUser');


const Router=express.Router();



Router.get('/student/list',checkUser,StudentEjsController.list);
Router.get('/student/add',StudentEjsController.add);
Router.post('/student/create',StudentEjsController.create);
Router.get('/student/edit/:id',StudentEjsController.edit);
Router.post('/student/update/:id',StudentEjsController.update);
//hard delete
Router.get('/student/delete/:id',StudentEjsController.delete);

//soft delete
Router.get('/student/softdelete/:id',StudentEjsController.softDelete);



module.exports=Router;


