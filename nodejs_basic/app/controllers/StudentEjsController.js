const Student = require('../models/student')

class StudentEjsController {
    async list(req, res) {
        try{
            const data=await Student.find()
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
}

module.exports = new StudentEjsController