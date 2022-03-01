require('dotenv').config();

const express = require('express');
const app = express();
const helmet = require("helmet");
const { documentacionSwagger } = require('./middlewares/documentation');
const { handleError } = require('./middlewares/errors');

// Initialitations
const port = process.env.PORT || 3000;
require('./database');

// Middlewares
app.use(helmet());
app.use(express.json());
//app.use(jsonParseError);

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Routes
app.use('/api/v2', require('./routes/usersRoutes'));
app.use('/api/v2', require('./routes/productsRoutes'));
app.use('/api/v2', require('./routes/paymentRoutes'));
app.use('/api/v2', require('./routes/pedidosRoutes'));


// errorHandler
app.use((err, req, res, next) => {
  handleError(err, res);
});


// Server
app.listen(port, () => {
  documentacionSwagger(app);
  let time = new Date().toLocaleTimeString();
  console.log(`Server OK on port ${port} at ${time} hs.`);
});

module.exports = app;