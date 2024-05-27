const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER: Route for user registration
router.post("/register", async (req, res) => {
  try {
    // Destructure username, email, and password from request body
    const { username, email, password } = req.body;
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    // Create a new user instance with hashed password
    const newUser = new User({ username, email, password: hashedPassword });
    // Save the new user to the database
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN: Route for user login
router.post("/login", async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    // If user not found, return 404 error
    if (!user) {
      return res.status(404).json("User not found!");
    }
    // Compare password with hashed password
    const match = await bcrypt.compare(req.body.password, user.password);
    // If password doesn't match, return 401 unauthorized error
    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }
    // Sign JWT token with user information
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "3d" }
    );
    // Exclude password from user info
    const { password, ...info } = user._doc;
    // Set token as cookie and send user info
    res.cookie("token", token).status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGOUT: Route for user logout
router.get("/logout", async (req, res) => {
  try {
    // Clear token cookie
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// REFETCH USER: Route for fetching user information using JWT token
router.get("/refetch", (req,res)=>{
  // Extract token from cookies
  const token=req.cookies.token
  // Verify token and send user data
  jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
      if(err){
          return res.status(404).json(err)
      }
      res.status(200).json(data)
  })
})

module.exports = router;
