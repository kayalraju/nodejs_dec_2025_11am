const express=require('express');
const SqlController = require('../controllers/SqlController');

const Router=express.Router();




Router.post('/create/tracher',SqlController.createTeacher)
Router.get('/tracher',SqlController.getTeacher)






module.exports=Router;