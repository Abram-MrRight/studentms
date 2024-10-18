const fs = require('fs');
const path = require('path');
const winston = require('winston');

// Define the log file path
const logPath = path.join(__dirname, 'logs', 'app.log');

// Ensure the logs directory exists
fs.mkdirSync(path.dirname(logPath), { recursive: true });

// Create a winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: logPath }),
        new winston.transports.Console() // Optional: Log to console as well
    ],
});

// Middleware function
const requestLogger = (req, res, next) => {
    logger.info({
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date().toISOString(),
        ip: req.ip,
    });
    next();
};

// Error logging middleware
const errorLogger = (err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString(),
        ip: req.ip,
    });
    res.status(500).json({ error: 'Internal Server Error' });
};

// Export the middleware and the error logger
module.exports = { requestLogger, errorLogger };
