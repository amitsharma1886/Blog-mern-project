const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const router = express.Router();
const path = require("path");

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    let image = "";

    if (req.file) {
      image = "/uploads/" + req.file.filename; // Relative path served from backend
    } else if (imageUrl && imageUrl.startsWith("http")) {
      image = imageUrl;
    }

    const newPost = new Post({
      title,
      content,
      image,
      comments: [],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Post
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post", detail: err });
  }
});
router.post("/:id/comment", async (req, res) => {
  try {
    const { user, text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push({ user, text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
