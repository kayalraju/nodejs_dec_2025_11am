const express=require('express');
const HomeController = require('../controllers/HomeController');

const Router=express.Router();



Router.get('/',HomeController.home)

Router.get('/About',HomeController.about)


module.exports=Router;