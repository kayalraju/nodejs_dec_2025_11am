
const express=require('express');
const ejs=require('ejs');
const app=express();


app.set('view engine','ejs');
app.set('views','views');





const homeRoute=require('./app/routes/homeRoute');
app.use(homeRoute)

const port=7000;
app.listen(port,()=>{
    console.log(`server is running on port: http://localhost:${port}`);
})