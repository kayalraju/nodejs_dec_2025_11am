require('dotenv').config();
const express=require('express');
const ejs=require('ejs');
const path=require('path');
const DbConnection=require('./app/config/db');




const app=express();

DbConnection();

app.set('view engine','ejs');
app.set('views','views');


app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const homeRoute=require('./app/routes/homeRoute');
app.use(homeRoute)

const studentApiRoute=require('./app/routes/studentApiRoute');
app.use('/api/v1',studentApiRoute)

const port=7000;
app.listen(port,()=>{
    console.log(`server is running on port: http://localhost:${port}`);
})