const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next({ status: 401, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next({ status: 403, message: "Forbidden: Invalid token" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateJWT;
