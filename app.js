// app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;