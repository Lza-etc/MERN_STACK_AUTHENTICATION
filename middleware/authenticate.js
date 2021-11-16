const { auth } = require("google-auth-library");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJwt = (req, res, next) => {
  const authHeader = req.header("authorisation");
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).send("Token Hampered");
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).send("Please send a token");
  }
};
module.exports = verifyJwt;
