const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/posts');
const { validate } = require('../middleware/validator');

// Get all posts
router.get('/', getPosts);

// Get single post
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid post ID')
], validate, getPost);

// Create post
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').isMongoId().withMessage('Invalid category ID')
], validate, createPost);

// Update post
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid post ID'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  body('category').optional().isMongoId().withMessage('Invalid category ID')
], validate, updatePost);

// Delete post
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid post ID')
], validate, deletePost);

module.exports = router;
