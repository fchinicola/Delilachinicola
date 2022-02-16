require('dotenv').config();

const express = require('express');
const app = express();
const helmet = require("helmet");
const { documentacionSwagger } = require('./middlewares/documentation');

// Initialitations
const port = process.env.PORT || 3000;
require('./database');

// Middlewares
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/v2', require('./routes/usersRoutes'));
app.use('/api/v2', require('./routes/productsRoutes'));
app.use('/api/v2', require('./routes/paymentRoutes'));

// Server
app.listen(port, () => {
  documentacionSwagger(app);
  let time = new Date().toLocaleTimeString();
  console.log(`Server OK on port ${port} at ${time} hs.`);
});
