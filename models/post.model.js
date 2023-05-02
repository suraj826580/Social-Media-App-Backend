const { default: mongoose } = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("post", PostSchema);
module.exports = { PostModel };
