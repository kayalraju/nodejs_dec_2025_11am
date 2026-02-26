const Employee=require('../models/employee')

class EmployeeController{

    async createEmployee(req,res){
        try {
      const { firstName, lastName, gender, email, salary, department } =
        req.body;

      if (
        !firstName ||
        !lastName ||
        !gender ||
        !email ||
        !salary ||
        !department
      ) {
        return res.status(400).json({
          message: "Please fill all required fields",
        });
      }

    //   const existingEmployee = await Employee.findOne({ email });
    //   if (existingEmployee) {
    //     return res.status(400).json({
    //       message: "Employee with this email already exists",
    //     });
    //   }

      const employee = new Employee({
        firstName,
        lastName,
        gender,
        email,
        salary,
        department,
      });

      const savedEmployee = await employee.save();

      return res.status(200).json({
        message: "Employee created successfully",
        data: savedEmployee,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error creating employee",
        error: err.message,
      });
    }

    }  
    
    

    async getEmployee(req,res){ 

        try{

            const data=await Employee.find()
            return res.status(200).json({
                success:true,
                total:data.length,
                message:'get employee successfully',
                data:data
            })

        }catch(error){
            console.log(error);
            

        }


    }

    async getMatchEmployee(req,res){

        try{

            const data= await Employee.aggregate([
                // {
                //     $match:{gender:'male',salary:{$gt:500}}
                // },
                // {
                //     $project:{
                //         gender:0,
                //         salary:0,
                        
                //     }
                // }

                // {
                //     $limit:4
                // }
                // {
                //     $skip:4
                // }
                // {
                //     $sort:{salary:-1}
                // }
                // {
                //     $addFields:{totalSalary:{$add:['$salary',100]}, company:'Google'}
                // }

                // {
                //     $sample:{size:5}
                // }
                // {
                //     $group:{_id:'$department',count:{$sum:1}}
                // }
                // {
                //     $group:{_id:'$department',count:{$sum:1},avgSalary:{$avg:'$salary'}}
                // }
                // { $match:{ gender:'male'}}, 
                // { $group:{_id:'$department.name', totalEmployees: { $sum:1 }, totalSalary: { $sum: '$salary' } } 
                // },
            ])
            return res.status(200).json({
                success:true,
                data:data
            })
    
        }
        catch(error){
            console.log(error);
        }
    }
}


module.exports=new EmployeeController()