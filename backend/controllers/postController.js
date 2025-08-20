const Post = require("../models/home");
const User = require("../models/user");
const Reply = require("../models/reply");

exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const newPost = new Post({ ...req.body, post: text, image: imageUrl });
    await newPost.save();

    res.status(201).json({ message: "Post created", data: newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { firstname } = req.query;
    const profileData = await User.findOne({ firstname: firstname });
    res.json(profileData);
  } catch (error) {
    console.log("profile data error at backend", error.message);
  }
};

exports.reply = async (req, res) => {

  try {
    const reply = new Reply(req.body);
    await reply.save();
    res.status(200).json({ message: "reply saved successfully", data: reply });
  } catch (error) {
    res.status(500).json("reply not saved !!!");
  }
};

exports.getReply = async (req, res) => {
  try {
    const data = await Reply.find();
    res.json(data);
  } catch (error) {
    res.json("error getting replies", error);
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ message: "Fetched posts", data: posts });
  } catch (err) {
    res.status(400).json({ message: "Error fetching posts" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
