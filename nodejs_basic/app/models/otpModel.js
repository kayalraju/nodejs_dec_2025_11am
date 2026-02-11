const mongoose = require("mongoose");

// Defining Schema
const Otpchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "15m" },
});

// Model
const OtpModel = mongoose.model("otp", Otpchema);

module.exports = OtpModel;
