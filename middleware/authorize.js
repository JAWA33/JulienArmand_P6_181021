require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "403: unauthorized request";
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({ error: "403: unauthorized request" });
  }
};
