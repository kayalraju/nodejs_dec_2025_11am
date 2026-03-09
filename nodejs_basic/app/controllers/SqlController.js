
const {Teachers}=require('../models');
class SqlController{


    async createTeacher(req,res){
        //console.log(req.body);
        
        try{
            const {name,email,phone,subject}=req.body;
            const data=await Teachers.create({name,email,phone,subject})
             return res.status(200).json({message:"teacher created successfully",data})

        }catch(error){
            return res.status(500).json({message:error.message})
        }
    }


    async getTeacher(req,res){
        try{
            const data=await Teachers.findAll()
             return res.status(200).json({message:"teacher get successfully",data})
        }catch(error){
             return res.status(500).json({message:error.message})
        }
    }

}


module.exports=new SqlController()