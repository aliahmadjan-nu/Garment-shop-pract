const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Checkpoint 1: Verify the user is logged in
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the request contains a Bearer token in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Split "Bearer TOKEN_STRING" to extract just the token string
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user data from MongoDB using the ID inside the token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move forward to the controller function
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token validation failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no identity token found');
  }
});

// Checkpoint 2: Verify the user is an Admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized. Administrative privileges required');
  }
};

module.exports = { protect, admin };
