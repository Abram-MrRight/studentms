// fluentLogger.js
const fluent = require('fluent-logger');

// Replace 'studentms_backend' with your application's name
fluent.configure('studentms_backend', {
    host: 'localhost', // Adjust the host if your Fluentd server is on a different machine
    port: 24224,       // Default port for Fluentd
});

module.exports = fluent;
