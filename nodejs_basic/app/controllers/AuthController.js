const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { name } = require("ejs");
const jwt = require("jsonwebtoken");
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

      const user = new User({ name, email, phone, password: hasPassword });
      const data = await user.save();
      return res.status(201).json({
        success: true,
        message: "user created successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
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
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "invalid credentials",
        });
      }
      //  if(user.is_verified===false){
      //   return res.status(400).json({
      //     success:false,
      //     message:'user not verified'
      //   })
      // }

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
