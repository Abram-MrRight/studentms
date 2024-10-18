const express = require('express');
const app = express();
const port = 3001;
const db = require('./models');
const bodyParser = require('body-parser');
const cors = require('cors');
const populateDatabase = require('./models/populate');
const { requestLogger, errorLogger } = require('./loggerMiddleware'); // Import both logging middlewares

const cors_options = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(cors_options)); // Apply CORS middleware at the top
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use request logging middleware
app.use(requestLogger); 

// Preflight requests
app.options('*', cors(cors_options));

// Sample route to test database connection
app.get('/test-db', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.json({ message: 'Connection has been established successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sync database
db.sequelize.sync({ force: false }).then(async () => {
  console.log('Database synced');

  if (process.env.POPULATE_DATA === 'true') {
    await populateDatabase();
  }

  require('./routes')(app);

  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}).catch((error) => {
  console.error('Unable to synchronize the database:', error);
});

// Add error logging middleware after your routes
app.use(errorLogger); // Use error logging middleware
app.get('/', (req, res) => {
  res.send('Welcome to the Cyber School API!'); // This is a simple message
});

const logger = require('./fluentLogger');

// Example of logging an error
function someFunction() {
    try {
        // Your code here
    } catch (error) {
        logger.error('error_message', { error: error.message });
    }
}

module.exports = app;
