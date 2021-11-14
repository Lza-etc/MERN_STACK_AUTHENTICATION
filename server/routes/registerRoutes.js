const express = require("express");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const jwt = require("jsonwebtoken");
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
        const userJwt = {
          name: name,
          email: email,
        };
        const accessToken = jwt.sign(userJwt, process.env.ACCESS_TOKEN);
        return res
          .status(200)
          .json({ message: "success", authorisation: accessToken });
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
        const { name, email_verified, email,picture} = response.payload;
        if (email_verified) {
          const user = await UserModel.findOne({
            email: email,
          });
          if (user) {
            const userJwt = {
              name: name,
              email: email,
            };
            const accessToken = jwt.sign(userJwt, process.env.ACCESS_TOKEN);
            return res
              .status(200)
              .json({ message: "success", authorisation: accessToken });
          } else {
            const user = new UserModel({
              name,
              email,
              googleId,
              imageUrl:picture,
            });
            user
              .save()
              .then((resp) => {
                const userJwt = {
                  name: name,
                  email: email,
                };
                const accessToken = jwt.sign(userJwt, process.env.ACCESS_TOKEN);
                return res
                  .status(200)
                  .json({ message: "success", authorisation: accessToken });
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

router.post("/facebook", async (req, res) => {
  const accessToken = req.body.accessToken;
  const facebookId = req.body.facebookId;
  const urlGraphFacebook = `https://graph.facebook.com/v2.11/${facebookId}/?fields=id,name,picture,email&access_token=${accessToken}`;
  try {
    const response = await axios.get(urlGraphFacebook);
    const { name, email,picture } = response.data;
    let fUser;
    try {
      fUser = await UserModel.findOne({
        email: response.data.email,
      });
    } catch (error) {
      console.log(error);
    }
    if (fUser) {
      if (!fUser.facebookId) {
        await UserModel.updateOne(
          { email: email },
          { $set: { facebookId: facebookId } }
        );
      }

      const userJwt = {
        name: name,
        email: email,
      };
      const accessToken = jwt.sign(userJwt, process.env.ACCESS_TOKEN);
      return res
        .status(200)
        .json({ message: "success", authorisation: accessToken });
    } else {
      try {
        const user = new UserModel({
          name,
          email,
          facebookId,
          imageUrl:picture,
        });
        user
          .save()
          .then((resp) => {
            const userJwt = {
              name: name,
              email: email,
            };
            const accessToken = jwt.sign(userJwt, process.env.ACCESS_TOKEN);
            return res
              .status(200)
              .json({ message: "success", authorisation: accessToken });
          })
          .catch((error) => {
            return res.status(401).send(error);
          });
      } catch (error) {}
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("");
  }
});

module.exports = router;
