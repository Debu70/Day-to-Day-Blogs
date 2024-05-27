const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const Post = require('../Models/Post');
const Comment = require('../Models/Comment');
const verifyToken = require('../verifyToken');

// CREATE: Route to create a new comment
router.post("/create", verifyToken, async (req, res) => {
    try {
        // Create a new comment instance with request body
        const newComment = new Comment(req.body);
        // Save the new comment to the database
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE: Route to update a comment by ID
router.put("/:id", verifyToken, async (req, res) => {
    try {
        // Find and update the comment by ID
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE: Route to delete a comment by ID
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        // Find and delete the comment by ID
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET POST COMMENTS: Route to get comments for a specific post by postId
router.get("/post/:postId", async (req, res) => {
    try {
        // Find comments by postId
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
