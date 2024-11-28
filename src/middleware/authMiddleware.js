const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;

  let authHeader = req.header.Authorization || req.header.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    // If no token is found in the Authorization header, deny access
    if (!token) {
      return res.status(404).json("No token, Access denied...");
    }

    try {
      // Verifying the token using the secret key stored in the env file
      const decode = jwt.verify(token, process.env.JWT_SEC);
      req.user = decode;
      next();
    } catch (err) {
      //Invalid token error
      return res.status(401).json("Invalid or expired token, Access denied...");
    }
  } else {
    // If the Authorization header is not found or not in Bearer format,
    return res
      .status(400)
      .json("Authorization header not found or incorrect format...");
  }
};

module.exports = verifyToken;
