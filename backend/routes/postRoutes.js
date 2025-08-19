const express = require("express");
const upload = require("../middleware/upload");
const {
  createPost,
  getPosts,
  deletePost,
  getProfile,
} = require("../controllers/postController");

const router = express.Router();

router.post("/user", upload.single("image"), createPost);
router.get("/", getPosts);
router.get("/profile", getProfile);
router.delete("/delete/:id", deletePost);

module.exports = router;
