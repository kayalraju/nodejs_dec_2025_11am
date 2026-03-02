const express=require('express');

const LookupController=require('../controllers/lookupController')

const Router=express.Router();



Router.post('/create/category',LookupController.createCategory);
Router.get('/category',LookupController.getCategory);
Router.post('/create/subcategory',LookupController.createSubCategory);
Router.get('/subcategory',LookupController.getSubCategory);



module.exports=Router;