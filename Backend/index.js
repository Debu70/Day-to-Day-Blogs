// Import required packages
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

// Import routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOO_URL); // Connect to MongoDB using environment variable
    console.log("Database connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

// Middlewares
dotenv.config(); // Load environment variables from .env file
app.use(express.json()); // Parse JSON request bodies
app.use("/images", express.static(path.join(__dirname, "/images"))); // Serve static images
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true // Enable CORS credentials
  })
);
app.use(cookieParser()); // Parse cookies
app.use("/api/auth", authRouter); // Routes for authentication
app.use("/api/users", userRouter); // Routes for user-related operations
app.use("/api/posts", postRouter); // Routes for post-related operations
app.use("/api/comments", commentRouter); // Routes for comment-related operations

// Image upload configuration
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images"); // Specify destination folder for uploaded images
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img); // Specify filename for uploaded image
  }
});

// Define image upload route
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!"); // Respond with success message after image upload
});

// Start the server
app.listen(process.env.PORT, () => {
  connectDB(); // Connect to database
  console.log("Server is listening on port " + process.env.PORT);
});
