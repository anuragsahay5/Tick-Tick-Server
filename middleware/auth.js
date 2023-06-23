const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.body.token;
    if (!token) {
      res.status(409).send("No Token");
      return;
    }
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!data) {
      res.status(409).send("Invalid Token");
    } else {
      req.user = data;
      next();
    }
  } catch (error) {
    res.status(401).send(error);
  }
}

module.exports = auth;
