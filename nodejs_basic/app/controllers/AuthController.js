const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
const OTPModel = require("../models/otpModel"); 

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
}

module.exports = new AuthController();
