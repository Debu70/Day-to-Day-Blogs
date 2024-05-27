// Importing mongoose module
const mongoose = require('mongoose');

// Defining the schema for the Comment model
const CommentSchema = new mongoose.Schema({
    // The content of the comment
    comment: {
        type: String,
        required: true,
    },
    // The author of the comment
    author: {
        type: String,
        required: true,
    },
    // The ID of the post to which the comment belongs
    postId: {
        type: String,
        required: true,
    },
    // The ID of the user who made the comment
    userId: {
        type: String,
        required: true
    }
}, {
    // Including timestamps for createdAt and updatedAt fields
    timestamps: true
});

// Creating the Comment model based on the schema
module.exports = mongoose.model("Comment", CommentSchema);
