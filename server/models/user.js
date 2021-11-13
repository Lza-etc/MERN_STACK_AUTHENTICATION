const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;
const UserSchema = new mongooseSchema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      required:false,
      type: String,

    },
    googleId: {
      required: false,
      type: String,
      unique:true,
      sparse: true,
      
    },
    facebookId: {
      required: false,
      type: String,
      unique:true,
      sparse: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
