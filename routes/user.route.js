const { Router } = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const userRoute = Router();

userRoute.post("/register", async (req, res) => {
  const user = req.body;

  try {
    bcrypt.hash(user.password, 5, async (err, hash) => {
      // Store hash in your password DB
      if (hash) {
        const newuser = new UserModel({ ...user, password: hash });
        await newuser.save();
        res.status(200).send({ msg: "User Has Been Added" });
      } else {
        res.status(400).send({ msg: "Something wrong" });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});
userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    bcrypt.compare(password, user.password).then((result) => {
      // result == true
      if (result) {
        const token = jwt.sign({ userID: user._id }, "masai", {
          expiresIn: "1h",
        });
        res.status(200).send({ msg: "Login successfull ", token });
      } else {
        res.status(400).send({ msg: "Wrong Password" });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = { userRoute };
