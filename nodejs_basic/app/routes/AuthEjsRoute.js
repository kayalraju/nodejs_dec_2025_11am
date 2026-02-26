const express=require('express');
const AuthEjsController = require('../controllers/AuthEjsController');
const CheckAuth = require('../middleware/CheckAuth');


const Router=express.Router();



Router.get('/register/view',AuthEjsController.registerView);
Router.post('/register/store',AuthEjsController.registerCreate);
Router.get('/login/view',AuthEjsController.LoginView);
Router.post('/login/store',AuthEjsController.LoginCreate);
Router.get('/logout',AuthEjsController.logout);
Router.get('/user/dashboard',CheckAuth ,AuthEjsController.AuthUserCheck,AuthEjsController.dashboard);



//admin login
Router.post('/admin/login/store',AuthEjsController.LoginCreate);

module.exports=Router;