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
      designation: user.designation,
      specialization: user.specialization,
      company: user.company,
      phone: user.phone,
      bio: user.bio,
    };
    return res.status(200).json(User);
  }
});

router.post("/", verifyjwt, async (req, res) => {
  const user = await UserModel.findOne({
    email: req.user.email,
  });
  const { designation, specialization, company, phone, bio,form } = req.body;
  if (user) {
    await UserModel.updateMany(
      { email: user.email },
      {
        $set: {
          designation: designation,
          specialization: specialization,
          company: company,
          phone: phone,
          bio: bio,
          form:form,
        },
      }
    );
    return res.status(200).send("Profile Information Saved");
  }
});

module.exports = router;
