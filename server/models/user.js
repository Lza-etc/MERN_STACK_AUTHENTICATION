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
      required: true,
      type: String,

    },
    googleId: {
      required: false,
      type: String,
      unique:true,
    },
    facebookId: {
      required: false,
      type: String,
      unique:true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
