// Importing mongoose module
const mongoose = require('mongoose');

// Defining the schema for the User model
const UserSchema = new mongoose.Schema({
    // Username of the user
    username: {
        type: String,
        required: true,
        unique: true // Ensures uniqueness of usernames
    },
    // Email of the user
    email: {
        type: String,
        required: true,
        unique: true // Ensures uniqueness of emails
    },
    // Password of the user
    password: {
        type: String,
        required: true,
    }
}, {
    // Including timestamps for createdAt and updatedAt fields
    timestamps: true
});

// Creating the User model based on the schema
module.exports = mongoose.model("User", UserSchema);
