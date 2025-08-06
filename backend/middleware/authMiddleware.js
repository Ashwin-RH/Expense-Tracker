// Import required packages
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes - only accessible to logged-in users
exports.protect = async (req, res, next) => {
    
    // 1. Extract the token from Authorization header (Bearer <token>)
    let token = req.headers.authorization?.split(" ")[1];

    // 2. If no token present, block access
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        // 3. Verify the token using JWT secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Find the user based on decoded token ID (attach to request)
        // Exclude password field for safety
        req.user = await User.findById(decoded.id).select('-password');

        // 5. Move to the next middleware or controller
        next();
        
    } catch (err) {
        // 6. If token is invalid or expired
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};
