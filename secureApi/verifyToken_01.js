const jwt = require("jsonwebtoken");
const privatekey = process.env.privateKey;

const verifyToken_01 = (req, res, next) => {
  try {
    jwt.verify(req.body.token_01, privatekey);
    next();
  } catch (err) {
    res.status(403).json({
      error: true,
      errMessage: `${err.message},Please login again to access this api`,
    });
  }
};
module.exports = verifyToken_01;
