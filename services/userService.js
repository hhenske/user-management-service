// services/userService.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Service for user-related operations.
 */


/**
 * Registers a new user.
 * @param {Object} userData - The user data for registration.
 * @returns {Promise<Object>} - The newly created user object.
 */
const registerUser = async (userData) => {
  const { email, password } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }
// Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({ ...userData, password: hashedPassword });
  await newUser.save();

  return newUser;
};

/**
 * Logs in a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<string>} - The JWT token.
 * */
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
   // Generate a JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

/**
 * Retrieves user profile by ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} - The user profile object.
 */
const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password'); // Exclude password from the response
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = { registerUser, loginUser, getUserProfile };