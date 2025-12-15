
const express=require('express');
const app=express();



app.get('/',(req,res)=>{

    res.send('<h1>hello world</h1>');

})

app.get('/product',(req,res)=>{
    const products=[
        {name:'laptop',price:10000},
        {name:'mobile',price:20000},
        {name:'tv',price:30000},
        {name:'camera',price:40000},
    ]

    res.send(products);
})

app.get('/about',(req,res)=>{

    res.send('<h1>hello about</h1>');

})



const port=7000;
app.listen(port,()=>{
    console.log(`server is running on port: http://localhost:${port}`);
})