const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  console.log('token : ',req.headers,req.query.token);
  const token =
    req.body.token || req.query.token || req.headers["access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;