const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const tokenVerify = jwt.verify(token.split(" ")[1], "masai");
    req.body.userID = tokenVerify.userID;

    next();
  } else {
    res.status(400).send({ msg: "Login First" });
  }
};
module.exports = { auth };
