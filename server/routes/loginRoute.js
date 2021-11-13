const express = require("express");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email: email,
    });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const userJwt = {
          name: user.name,
          email: user.email,
        };
        const accessToken = jwt.sign(userJwt, process.env.ACCESS_TOKEN);
        return res
          .status(200)
          .json({ message: "success", authorisation: accessToken });
      } else {
        return res.status(403).send("Incorrect Password");
      }
    } else {
      return res.status(401).send("Email Not Registered !!");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
