// src/controllers/userController.js
const User = require('../models/userModel');

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password before saving to the database
    onst hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Successful registration response
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Registration error:', error.message);

    // Respond with an error message
    res.status(500).json({
        error: 'Registration failed.',
        details: error.message
    });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        // User not found, return 404
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        // Invalid credentials, return 401
        return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        // Return the token
        res.status(200).json({ token });
     } catch (error) {
         // Respond with a generic error if login fails
    res.status(500).json({ error: 'Login failed.' });
    }
};