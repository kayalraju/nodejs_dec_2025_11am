const express=require('express');
const AuthController = require('../controllers/AuthController');
const AuthCheck = require('../middleware/authCheck');

const Router=express.Router();



Router.post('/register',AuthController.register);
Router.post('/verify/account',AuthController.verifyAccount);
Router.post('/login',AuthController.login);
Router.get('/profile',AuthCheck,AuthController.profile);

Router.post('/reset-password-link',AuthController.resetPasswordLink);
Router.post('/reset-password/:id/:token',AuthController.resetPassword);

module.exports=Router;