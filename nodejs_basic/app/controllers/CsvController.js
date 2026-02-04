const csv=require('csvtojson');
const CSVMOdel=require('../models/csvModel')


class CsvController{

    async createCsv(req,res){

        try{
            const userData=[]

            csv().fromFile(req.file.path)
            .then(async(response)=>{
                for(let i=0;i<response.length; i++){
                    userData.push({
                        name:response[i].name,
                        email:response[i].email,
                        mobile:response[i].mobile,
                    })
                }
                const datas=await CSVMOdel.insertMany(userData)

                return res.status(201).json({
                    message:"csv data inserted successfully",
                    data:datas
                })
            })
            
        }catch(error){
            console.log(error)
        }
    
    } 
    
    
    async getCsvdata(req,res){
        try{
            const data=await CSVMOdel.find()
            return res.status(200).json({
                message:"csv data get successfully",
                total:data.length,
                data:data
            })

        }catch(error){
            console.log(error)
        }
    }

}




module.exports=new CsvController()