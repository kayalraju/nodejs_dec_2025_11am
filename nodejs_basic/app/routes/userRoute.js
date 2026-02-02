const express=require('express');
const joiController = require('../controllers/joiController');


const Router=express.Router();





Router.post('/create/user',joiController.createUser);


module.exports=Router;