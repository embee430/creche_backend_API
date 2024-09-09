// utils/logger.js

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file'); // Import the daily rotate file transport
const path = require('path');
const fs = require('fs');

// Create directories if they do not exist
const logsDir = path.join(__dirname, '../logs');
const logPreviousDir = path.join(__dirname, '../log_previous');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

if (!fs.existsSync(logPreviousDir)) {
  fs.mkdirSync(logPreviousDir);
}

// Define the log rotation configuration
const fileTransport = new DailyRotateFile({
  filename: path.join(logsDir, 'server-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d', // Keep log files for 14 days
  zippedArchive: true
});

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(), // Add color to console output
    winston.format.simple()
  )
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    fileTransport,
    consoleTransport
  ]
});

// Rotate log files when the server restarts
const moveOldLogs = () => {
  const files = fs.readdirSync(logsDir);
  files.forEach(file => {
    const oldLogPath = path.join(logsDir, file);
    const newLogPath = path.join(logPreviousDir, file);
    fs.renameSync(oldLogPath, newLogPath);
  });
};

moveOldLogs();

module.exports = logger;
