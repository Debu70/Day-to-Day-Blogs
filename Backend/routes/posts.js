const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const Post = require('../Models/Post');
const Comment = require('../Models/Comment');
const verifyToken = require('../verifyToken');

// CREATE: Route to create a new post
router.post("/create", verifyToken, async (req, res) => {
    try {
        // Create a new post instance with request body
        const newPost = new Post(req.body);
        // Save the new post to the database
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE: Route to update a post by ID
router.put("/:id", verifyToken, async (req, res) => {
    try {
        // Find and update the post by ID
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE: Route to delete a post by ID
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        // Find and delete the post by ID
        await Post.findByIdAndDelete(req.params.id);
        // Also delete associated comments
        await Comment.deleteMany({ postId: req.params.id });
        res.status(200).json("Post has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET POST DETAILS: Route to get details of a post by ID
router.get("/:id", async (req, res) => {
    try {
        // Find post by ID
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET POSTS: Route to get all posts or search posts by title
router.get("/", async (req, res) => {
    const query = req.query;
    try {
        // Search filter based on query
        const searchFilter = {
            title: { $regex: query.search, $options: "i" }
        };
        // Find posts based on search query or return all posts
        const posts = await Post.find(query.search ? searchFilter : null);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USER POSTS: Route to get all posts by a specific user
router.get("/user/:userId", async (req, res) => {
    try {
        // Find posts by userId
        const posts = await Post.find({ userId: req.params.userId });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
