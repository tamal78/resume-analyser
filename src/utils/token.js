const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateJWT = (username) => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: "4d" });
};

module.exports = { generateJWT };
