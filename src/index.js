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