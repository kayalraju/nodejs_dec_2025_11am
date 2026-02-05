const express=require('express');
const AuthController = require('../controllers/AuthController');
const AuthCheck = require('../middleware/authCheck');

const Router=express.Router();



Router.post('/register',AuthController.register);
Router.post('/login',AuthController.login);
Router.get('/profile',AuthCheck,AuthController.profile);

module.exports=Router;