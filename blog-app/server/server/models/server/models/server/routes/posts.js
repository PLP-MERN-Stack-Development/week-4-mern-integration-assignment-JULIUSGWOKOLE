const Post = require('../models/Post');
const { NotFoundError } = require('../middleware/errorHandler');

// Get all posts
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('category');
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Get single post
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Create post
exports.createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category');
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
};
