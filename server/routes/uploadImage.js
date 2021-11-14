const express = require("express");
const multer = require("multer");
const path = require("path");
const verifyjwt = require("../middleware/authenticate");
const UserModel = require("../models/user");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const checkFileType = (file, cb) => {
  const allowedExt = /jpeg|png|jpg|gif/;
  const ext = allowedExt.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedExt.test(file.mimetype);
  if (mimetype && ext) {
    return cb(null, true);
  } else {
    return cb(
      "Invalid Image Format (Available formats are jpeg|png|jpg|gif )",
      false
    );
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("image");

router.post("/", verifyjwt, (req, res) => {
  console.log("image  ");
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(422).send(err);
    } else {
      // req.file
      if (req.file === undefined) {
        //upload a file
        return res.status(400).send("Please Upload an Image");
      }
      console.log(req.get("host"));
      const imageUrl = "http://" + req.get("host") + "/" + req.file.path;
      await UserModel.updateOne(
        { email: req.user.email },
        { $set: { imageUrl: imageUrl } }
      );
    }
  });
  return res.status(200).send("Image successfull");
});

module.exports = router;
