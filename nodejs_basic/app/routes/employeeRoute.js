const express=require('express');
const EmployeeController = require('../controllers/EmployeeController');


const Router=express.Router();



Router.post('/create/employee',EmployeeController.createEmployee);
Router.get('/employee',EmployeeController.getEmployee);
Router.get('/match',EmployeeController.getMatchEmployee);


module.exports=Router;