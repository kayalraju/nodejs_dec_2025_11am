const express=require('express');
const HomeController = require('../controllers/HomeController');

const Router=express.Router();



Router.get('/',HomeController.home)

// Router.get('/',(req,res)=>{
//     res.send('<h1>home page</h1>');

// })


module.exports=Router;