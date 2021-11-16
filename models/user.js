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
      unique: true,
    },
    password: {
      required: false,
      type: String,
    },
    googleId: {
      required: false,
      type: String,
      unique: true,
      sparse: true,
    },
    facebookId: {
      required: false,
      type: String,
      unique: true,
      sparse: true,
    },
    imageUrl: {
      required: false,
      type: String,
      sparse: true,
    },
    designation: {
      required: false,
      type: String,
      sparse: true,
    },
    specialization: {
      required: false,
      type: String,
      sparse: true,
    },
    bio: {
      required: false,
      type: String,
      sparse: true,
    },
    phone: {
      required: false,
      type: String,
      sparse: true,
    },
    company: {
      required: false,
      type: String,
      sparse: true,
    },
    form: {
      required: false,
      type: Boolean,
      sparse: true,
      default:false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
