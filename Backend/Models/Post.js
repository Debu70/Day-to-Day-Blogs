// Importing mongoose module
const mongoose = require('mongoose');

// Defining the schema for the Post model
const PostSchema = new mongoose.Schema({
    // Title of the post
    title: {
        type: String,
        required: true,
        unique: true // Ensures uniqueness of titles
    },
    // Description of the post
    desc: {
        type: String,
        required: true,
        unique: true // Ensures uniqueness of descriptions
    },
    // URL of the photo associated with the post
    photo: {
        type: String,
        required: false,
    },
    // Username of the user who created the post
    username: {
        type: String,
        required: true,  
    },
    // ID of the user who created the post
    userId: {
        type: String,
        required: true,  
    },
    // Categories associated with the post
    categories: {
        type: Array,
    },
}, {
    // Including timestamps for createdAt and updatedAt fields
    timestamps: true
});

// Creating the Post model based on the schema
module.exports = mongoose.model("Post", PostSchema);
