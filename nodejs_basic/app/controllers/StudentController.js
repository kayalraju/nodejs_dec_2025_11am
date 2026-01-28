const StatusCode = require('../helper/StatusCode');
const Student=require('../models/student')

class StudentController{

    async createStudent(req,res){
        //console.log(req.body);

        //console.log(req.file);
        
        
        try{
            const {name,email}=req.body;
            const data= new Student({
                name,
                email
            })
            if(req.file){
                data.image=req.file.path
            }
            await data.save()
            return res.status(StatusCode.CREATED).json({
                success:true,
                message:'Student created successfully',
                data:data
            })
          

        }catch(error){
              return res.status(StatusCode.SERVER_ERROR).json({
                success:false,
                message:error.message
               
            })

        }
    }


    async getAllStudents(req,res){
        try{
            const data=await Student.find()
             return res.status(200).json({
                success:true,
                total:data.length,
                message:'get student successfully',
                data:data
            })

        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }


    async getSingleStudent(req,res){
        try{
            const id=req.params.id
            const data=await Student.findById(id)

            return res.status(200).json({
                success:true,
                message:'get single data successfully',
                data
                
            })
        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }


    async updateStudent(req,res){
        try{
            const id=req.params.id;
            const data=await Student.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json({
                success:true,
                message:'update student successfully',
            })

        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message
            }) 
        }

    }

    async deleteStudent(req,res){
        try{
            const id=req.params.id;
            const data=await Student.findByIdAndDelete(id)
            return res.status(200).json({
                success:true,
                message:'delete student successfully',
            })

        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message
            }) 
        }
    }

}

module.exports=new StudentController