// src/app.js
// Import necessary modules and configure environment variables
require('dotenv').config(); // Loads environment variables from .env file
const express = require('express'); // Express.js application framework
const connectDB = require('./config/db'); // Database connection setup
const initServer = require('./config/server'); // Initialize the Express server
const userRoutes = require('./routes/userRoutes'); // User-related routes
const errorHandler = require('./utils/errorHandler'); // Error handling middleware

// Initialize the Express app and set up basic middlewares
const app = initServer();
// App initialization typically includes setting up essential middleware like JSON parsing
app.use(express.json()); // Middleware to parse incoming JSON request bodies

// Connect to the database
connectDB();

// Mount user-specific routes under /api/users
app.use('/api/users', userRoutes);

// Global error handling middleware to catch and respond to uncaught exceptions
app.use(errorHandler);

// Define server port (uses environment variable PORT or defaults to 5000)
const PORT = process.env.PORT || 5000;

// Start the server and log its operational port
app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
});