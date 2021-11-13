const express = require("express");
const router = express.Router();
const verifyjwt = require("../middleware/authenticate");

router.get("/", verifyjwt, (req, res) => {
  res.json(req.user);
});

module.exports = router;
