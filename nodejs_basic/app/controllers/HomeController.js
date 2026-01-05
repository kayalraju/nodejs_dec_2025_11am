

class HomeController{

    async home(req,res){

        const user={
            name:'webskitters',
            age:20
        }

       res.render('index',{
        data:user
       });
    }
    async about(req,res){
       res.render('about',{
        title:'about Page'
       });
    }
}


module.exports=new HomeController();