const express = require("express");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const UserModel = require("../models/user");
const router = express.Router();
const client = new OAuth2Client(
  "11449592949-67stjoat4god0tro9orlh3c3kab0oe58.apps.googleusercontent.com"
);

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
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

router.post("/google", async (req, res) => {
  try {
    const { googleId, token } = req.body;
    client
      .verifyIdToken({
        idToken: token,
        audience:
          "11449592949-67stjoat4god0tro9orlh3c3kab0oe58.apps.googleusercontent.com",
      })
      .then(async (response) => {
        const { name, email_verified, email } = response.payload;
        if (email_verified) {
          const user = await UserModel.findOne({
            email: email,
          });
          if (user) {
            console.log("Login user there");
            return res.status(200).send("Login");
          } else {
            const user = new UserModel({
              name,
              email,
              googleId,
            });
            user
              .save()
              .then((resp) => {
                console.log("User registered sucessfully");
                return res.status(200).send("User registered sucessfully");
              })
              .catch((error) => {
                return res.status(401).send(error);
              });
          }
        } else {
          return res.status(401).send("Unauthorized request");
        }
      })
      .catch((err) => {
        return res.status(500).send("Internal Server Error");
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
