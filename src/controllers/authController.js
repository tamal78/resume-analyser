const { generateJWT } = require("../utils/token");
reqquire("dotenv").config();

const credentials = {
  username: process.env.username,
  password: process.env.password,
};

const login = (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next({ status: 400, message: "Missing credentials" });
    }

    if (
      username !== credentials.username ||
      password !== credentials.password
    ) {
      return next({ status: 401, message: "Invalid username or password" });
    }

    const token = generateJWT(username);
    res.status(200).json({ JWT: token });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
