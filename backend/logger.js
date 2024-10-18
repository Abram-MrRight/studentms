const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

// Create log directory if it doesn't exist
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// Configure the logger
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()  // Log format in JSON
    ),
    transports: [
        new transports.File({ filename: path.join(logDirectory, 'backend.log') }),
        new transports.Console() // Optional: log to console as well
    ],
});

// Export the logger
module.exports = logger;
