const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const verifyjwt = require("../middleware/authenticate");

router.get("/", verifyjwt, async (req, res) => {
  const user = await UserModel.findOne({
    email: req.user.email,
  });
  if (user) {
    const User = {
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
    };
    return res.status(200).json(User);
  }
});

module.exports = router;
