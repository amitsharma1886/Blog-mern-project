const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  reviewer: String,
  rating: Number,
  comment: String
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
