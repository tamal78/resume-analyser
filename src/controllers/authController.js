const { generateJWT } = require("../utils/token");

const credentials = {
  username: "naval.ravikant",
  password: "05111974",
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
