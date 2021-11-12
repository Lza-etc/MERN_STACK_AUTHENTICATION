const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const user = new UserModel({
      name,
      email,
      password:hashedPassword,
    });
    user
      .save()
      .then((resp) => {
        console.log("User registered sucessfully");
        return res.status(200).send("User registered sucessfully");
      })
      .catch((error) => {
        if (error.keyValue.email != null && error.code === 11000) {
          return res.status(422).send("Email already registered !!!");
        }
      });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
