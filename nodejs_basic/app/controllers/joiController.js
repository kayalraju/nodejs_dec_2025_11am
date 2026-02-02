
const User = require('../models/user');
const { studentSchema } = require('../utils/schemaValidation');


class JoiController {
   async createUser(req, res) {
    try{
        const data={
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password
        }
        const {error,value}=studentSchema.validate(data)
        if(error){
            return res.status(400).json({
                success:false,
                message:error.message
            })
        }else{
            const user=new User(value)
            await user.save()
            return res.status(200).json({
                success:true,
                message:'user created successfully',
                data:user
            })
        }

    }catch(error){
        console.log(error)
    }
       
   }
}

module.exports = new JoiController();