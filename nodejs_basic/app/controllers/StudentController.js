const Student=require('../models/student')

class StudentController{

    async createStudent(req,res){
        //console.log(req.body);
        
        try{
            const {name,email}=req.body;
            const data= new Student({
                name,
                email
            })

            await data.save()
            return res.status(201).json({
                success:true,
                message:'Student created successfully',
                data:data
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