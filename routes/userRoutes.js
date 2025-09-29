// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes (authentication)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require authentication)
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;