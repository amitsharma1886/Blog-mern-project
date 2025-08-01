const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    comments: [commentSchema],
  },
  { timestamps: true } // 👈 isse createdAt aur updatedAt auto add hoga
);

module.exports = mongoose.model("Post", postSchema);
