const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Add new comment
router.post('/', async (req, res) => {
  const { postId, userName, text } = req.body;
  try {
    const comment = new Comment({ postId, userName, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Get comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

module.exports = router;
