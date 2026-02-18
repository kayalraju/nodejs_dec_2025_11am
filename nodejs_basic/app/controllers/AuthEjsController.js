

const User=require('../models/user');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
class AuthEjsController{

    async AuthUserCheck(req, res, next) {
        try {
            if (req.user) {
                next()
            } else {
                res.redirect('/login/view');
            }
        } catch (err) {
            console.log(err)
        }
    }

    async registerView(req,res){
        res.render('register')
    }
    async registerCreate(req,res){
        const { name, email, phone, password } = req.body;
              if (!name || !email || !phone || !password) {
                return res.redirect('/register/view');
              }
              const existingUser = await User.findOne({ email: email });
              if (existingUser) {
                return res.redirect('/register/view');
              }
              const salt = await bcryptjs.genSalt(10);
              const hasPassword = await bcryptjs.hash(password, salt);
        
              const userData = new User({ name, email, phone, password: hasPassword });
              const user = await userData.save();
              
             if(user){
                return res.redirect('/login/view');
             }else{
                return res.redirect('/register/view');
             }
            } catch (error) {
              return res.redirect('/register/view');
            }
    


    
    async LoginView(req,res){
        res.render('login')
    }
    async LoginCreate(req,res){
         try {
              const { email, password } = req.body;
              const user = await User.findOne({ email: email });
              console.log("data", user.password);
        
              if (!user) {
                return res.redirect('/login/view');
              }
            //     if(!user.is_verified){
            //     return res.status(400).json({
            //       success:false,
            //       message:'user not verified please verify your account'
            //     })
            //   }
              const isMatch = await bcryptjs.compare(password, user.password);
              if (!isMatch) {
                return res.redirect('/login/view');
              }
             
        if(user && isMatch && user.role=='user'){
            const token = jwt.sign(
                {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" },
              );
              if (token) {
                    res.cookie('userToken', token)
                    res.redirect('/user/dashboard');
                } else {
                    console.log('login failed');
                }

        }
              
             
            } catch (error) {
              return res.status(500).json({
                success: false,
                message: error.message,
              });
            }
    }
    async dashboard(req,res){
        res.render('dashboard',{
            user:req.user
        })
    }



    //logout
    async logout(req,res){
        res.clearCookie('userToken');
        res.redirect('/login/view');
    }

}


module.exports=new AuthEjsController(); 