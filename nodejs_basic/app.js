require('dotenv').config();
const express=require('express');
const ejs=require('ejs');
const path=require('path');
const DbConnection=require('./app/config/db');
const cors=require('cors');




const app=express();

DbConnection();

app.use(cors());

app.set('view engine','ejs');
app.set('views','views');


app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')))

//app.use(express.static('uploads'));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const homeRoute=require('./app/routes/homeRoute');
app.use(homeRoute)

//api route
const studentApiRoute=require('./app/routes/studentApiRoute');
app.use('/api/v1',studentApiRoute)

//ejs route
const studentEjsRoute=require('./app/routes/studentEjsRoute');
app.use(studentEjsRoute)

const csvRoute=require('./app/routes/csvRoute');
app.use(csvRoute)

const userRoute=require('./app/routes/userRoute');
app.use(userRoute);

const port=7000;
app.listen(port,()=>{
    console.log(`server is running on port: http://localhost:${port}`);
})