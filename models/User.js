// models/User.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;