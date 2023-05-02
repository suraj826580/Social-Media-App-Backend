const { Router } = require("express");
const { auth } = require("../middleware/Auth.middleware");
const { PostModel } = require("../models/post.model");

const postRoute = Router();

postRoute.get("/", auth, async (req, res) => {
  const { device } = req.query;
  console.log(device);
  try {
    if (device) {
      const posts = await PostModel.find({ userID: req.body.userID, device });
      res.status(200).send(posts);
    } else {
      const posts = await PostModel.find({ userID: req.body.userID });
      res.status(200).send(posts);
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

postRoute.post("/", auth, async (req, res) => {
  const { title, body, device, userID } = req.body;
  if (title && body && device) {
    const post = new PostModel({ title, body, device, userID });
    await post.save();
    res.status(200).send({ msg: "Post has been Added" });
  } else {
    res.send({ msg: "Something Wrong Check Again" });
  }
});
postRoute.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findOne({ _id: id });
  try {
    if (post.userID === req.body.userID) {
      await PostModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: "post has been Delete Successfully" });
    } else {
      res
        .status(400)
        .send({ msg: "You Are not Authothorized to do this Action" });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});
postRoute.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findOne({ _id: id });
  try {
    if (post.userID === req.body.userID) {
      await PostModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).send({ msg: "post has been Updated Successfully" });
    } else {
      res
        .status(400)
        .send({ msg: "You Are not Authothorized to do this Action" });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = { postRoute };
