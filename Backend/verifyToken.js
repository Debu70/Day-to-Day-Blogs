const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Extract token from cookies
    
    // If token is not present, return unauthorized error
    if (!token) {
        return res.status(401).json("You are not authenticated!");
    }
    
    // Verify the token using the secret key
    jwt.verify(token, process.env.SECRET, async (err, data) => {
        if (err) {
            return res.status(403).json("Token is not valid!"); // If token is not valid, return forbidden error
        }
        
        req.userId = data._id; // Store user ID from decoded token in request object
        
        next(); // Proceed to the next middleware function
    });
};

module.exports = verifyToken;
