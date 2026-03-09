
const express=require('express');
const Router=express.Router();
const sqlRoute=require('./SqlRoute');
const AuthEjsRoute=require('./AuthEjsRoute');



Router.use('/sql',sqlRoute);
Router.use(AuthEjsRoute);




module.exports=Router;