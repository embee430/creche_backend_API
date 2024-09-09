const express = require('express');
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const logger = require('./utils/logger');

// Import routes
const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');
const childRoutes = require('./routes/children');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Logging middleware
app.use((req, res, next) => {
    const start = Date.now();
  
    // Log request details
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
  
    // Log response details
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info(`Response: ${res.statusCode} ${res.statusMessage} - ${duration}ms`);
    });
  
    next();
  });

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define the port
const PORT = process.env.PORT || 5001;

// PostgreSQL database configuration
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: (msg) => logger.info(msg) // Disable logging or set to a function for custom logging
});

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Initialize models and sync the database
const db = require('./models'); // Import models

db.sequelize.sync()
  .then(() => {
    logger.info('Database tables created or updated.');
  })
  .catch((err) => {
    logger.error('Error syncing database:', err);
  });

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/children', childRoutes);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
