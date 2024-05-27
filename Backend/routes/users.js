const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const Post = require('../Models/Post');
const Comment = require('../Models/Comment');
const verifyToken = require('../verifyToken');

// UPDATE: Route to update user information by ID
router.put("/:id", verifyToken, async (req, res) => {
    try {
        // If request body contains password, hash it
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hashSync(req.body.password, salt);
        }
        // Update user information by ID
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// DELETE: Route to delete user by ID
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        // Find and delete user by ID
        await User.findByIdAndDelete(req.params.id);
        // Delete all posts associated with the user
        await Post.deleteMany({ userId: req.params.id });
        // Delete all comments associated with the user
        await Comment.deleteMany({ userId: req.params.id });
        res.status(200).json("User has been deleted!");
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// GET USER: Route to get user information by ID
router.get("/:id", async (req, res) => {
    try {
        // Find user by ID
        const user = await User.findById(req.params.id);
        // Exclude password field from user info
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
