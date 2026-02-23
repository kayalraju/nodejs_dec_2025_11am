const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
const OTPModel = require("../models/otpModel");
const transporter=require('../config/emailConfig') 


class AuthController {
  async register(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      if (!name || !email || !phone || !password) {
        return res.status(400).json({
          success: false,
          message: "all fields are required",
        });
      }
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "user already exists",
        });
      }
      const salt = await bcryptjs.genSalt(10);
      const hasPassword = await bcryptjs.hash(password, salt);

      const userData = new User({ name, email, phone, password: hasPassword });
      const user = await userData.save();
      await sendEmail (req, user);
      return res.status(201).json({
        success: true,
        message: "user created successfully and send a mail to verify your account",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }


  async verifyAccount(req, res) {
    try{
      const {email,otp}=req.body;
      // Check if all required fields are provided
            if (!email || !otp) {
                return res.status(400).json({ status: false, message: "All fields are required" });
            }
            const existingUser = await User.findOne({ email });

            // Check if email doesn't exists
            if (!existingUser) {
                return res.status(404).json({ status: "failed", message: "Email doesn't exists" });
            }

            // Check if email is already verified
            if (existingUser.is_verified) {
                return res.status(400).json({ status: false, message: "Email is already verified" });
            }
            // Check if there is a matching email verification OTP
            const emailVerification = await OTPModel.findOne({ userId: existingUser._id, otp });
            if (!emailVerification) {
                if (!existingUser.is_verified) {
                    // console.log(existingUser);
                    await sendEmail(req, existingUser);
                    return res.status(400).json({ status: false, message: "Invalid OTP, new OTP sent to your email" });
                }
                return res.status(400).json({ status: false, message: "Invalid OTP" });
            }
            // Check if OTP is expired
            const currentTime = new Date();
            // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
            if (currentTime > expirationTime) {
                // OTP expired, send new OTP
                await sendEmail(req, existingUser);
                return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
            }
            // OTP is valid and not expired, mark email as verified
            existingUser.is_verified = true;
            await existingUser.save();

            // Delete email verification document
            await OTPModel.deleteMany({ userId: existingUser._id });
            return res.status(200).json({ status: true, message: "Email verified successfully please login" });


    }catch(error){
      return res.status(500).json({
        success:false,
        message:error.message
      })
    }
    
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      console.log("data", user.password);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "invalid mail id",
        });
      }
        if(!user.is_verified){
        return res.status(400).json({
          success:false,
          message:'user not verified please verify your account'
        })
      }
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "invalid credentials",
        });
      }
     

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

      return res.status(200).json({
        success: true,
        message: "user login successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        token: token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async profile(req, res) {
    return res.status(200).json({
      message: "profile get successfully",
      data: req.user,
    });
  }



  async resetPasswordLink(req,res){
    try{
      const { email } = req.body;
        if (!email) {
          return res.status(400).json({ status:false, message: "Email field is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ status:false, message: "Email doesn't exist" });
        }
        // Generate token for password reset
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const UrlLink = jwt.sign({ userID: user._id }, secret, { expiresIn: '20m' });
        // Reset Link and this link generate by frontend developer
        const resetLink = `${process.env.FRONTEND_HOST}/account/reset-password-confirm/${user._id}/${UrlLink}`;
        console.log(resetLink);
        // Send password reset email  
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Password Reset Link",
          html: `<p>Hello ${user.name},</p><p>Please <a href="${resetLink}">Click here</a> to reset your password.</p>`
        });
        // Send success response
        res.status(200).json({ status:true, message: "Password reset email sent. Please check your email." });
  

    }catch(error){
      console.log(error);
      
    }

  }


  async resetPassword(req,res){
   try{
        const { password, confirmPassword } = req.body;
       const { id, token } = req.params;
       const user = await User.findById(id);
       if (!user) {
         return res.status(404).json({ status:false, message: "User not found" });
       }
       // Validate token check 
       const new_secret = user._id + process.env.JWT_SECRET_KEY;
       const decoded = jwt.verify(token, new_secret);
       if (!decoded) {
         return res.status(400).json({ status:false, message: "Invalid or expired link" });
       }
 
       if (!password || !confirmPassword) {
         return res.status(400).json({ status:false, message: "New Password and Confirm New Password are required" });
       }
 
       if (password !== confirmPassword) {
         return res.status(400).json({ status:false, message: "New Password and Confirm New Password don't match" });
       }
        // Generate salt and hash new password
        const salt = await bcryptjs.genSalt(10);
        const newHashPassword = await bcryptjs.hash(password, salt);
  
        // Update user's password
        const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } });
  
        // Send success response
        res.status(200).json({ status: "success", message: "Password reset successfully" });
    }catch(error){
      console.log(error);
      
    } 

  }


}

module.exports = new AuthController();
