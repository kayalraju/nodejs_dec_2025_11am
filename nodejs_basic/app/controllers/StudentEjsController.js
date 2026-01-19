const Student = require('../models/student')

class StudentEjsController {
    async list(req, res) {
        try{
            const data=await Student.find({isDeleted:false})
            res.render('crud/list',{
                data:data
            })

        }catch(error){
            console.log(error)
        }
        
    }
    async add(req, res) {
        res.render('crud/add')
    }
    async create(req, res) {
       try{
        const {name,email}=req.body;
        const data= new Student({
            name,
            email
        })
        const studentdata=await data.save()
        if(!studentdata) throw new Error('something went wrong')
        return res.redirect('/student/list')
        
       }catch(error){
           console.log(error)
       }
    }


    async edit(req,res){
        try{
            const id=req.params.id
            const data=await Student.findById(id)
            res.render('crud/edit',{
                data:data
            })
        }catch(error){
            console.log(error)
        }
    }

    async update(req,res){
        try{
            const id=req.params.id
           
            const data=await Student.findByIdAndUpdate(id,req.body,{new:true})
            return res.redirect('/student/list')
        }catch(error){
            console.log(error)
        }
    }

    //hard delete
    async delete(req,res){
        try{
            const id=req.params.id
            const data=await Student.findByIdAndDelete(id)
            return res.redirect('/student/list')
        }catch(error){
             return res.redirect('/student/list')
        }
    }



    //soft delete
    async softDelete(req,res){
        try{
            const id=req.params.id
            const data=await Student.findByIdAndUpdate(id,{$set:{isDeleted:true}},{new:true})
            return res.redirect('/student/list')
        }catch(error){
             return res.redirect('/student/list')
        }
    }
}

module.exports = new StudentEjsController