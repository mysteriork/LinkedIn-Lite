const mongoose = require("mongoose");

const replyPost = new mongoose.Schema(
  {
    postId: String,
    userId: String,
    reply: String,
    name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("reply", replyPost);
