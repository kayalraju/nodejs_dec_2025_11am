const express=require('express');
const StudentEjsController = require('../controllers/StudentEjsController');


const Router=express.Router();



Router.get('/student/list',StudentEjsController.list);
Router.get('/student/add',StudentEjsController.add);
Router.post('/student/create',StudentEjsController.create);



module.exports=Router;


