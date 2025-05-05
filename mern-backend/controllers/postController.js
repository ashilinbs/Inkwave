const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, slug, content, categories, tags, featuredImage, published } = req.body;

    const post = new Post({
      title,
      slug,
      content,
      author: req.user.id,
      categories,
      tags,
      featuredImage,
      published,
    });

    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author").populate("categories");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};