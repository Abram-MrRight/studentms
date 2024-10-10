const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');
const bodyParser = require('body-parser');
const cors = require('cors');
const populateDatabase = require('./models/populate')

const cors_options = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(cors_options)); // Apply CORS middleware at the top
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Preflight requests
app.options('*', cors(cors_options));

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

module.exports = app;