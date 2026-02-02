const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:"https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },);

  StudentSchema.index({ name: 1})

const StudentMOdel = mongoose.model("student", StudentSchema);

module.exports = StudentMOdel;
