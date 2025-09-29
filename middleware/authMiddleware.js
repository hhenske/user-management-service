// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware for verifying JWT tokens to authenticate users
const authMiddleware = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  try {
    // Verify the token and attach the user information to the request object
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Store the user information in the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;