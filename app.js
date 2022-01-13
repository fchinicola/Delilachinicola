const express = require('express');
const app = express();
require('dotenv').config();
require('./src/controllers/userController');
require('./src/models/database');
const { documentacionSwagger } = require('./src/middlewares/documentation');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./src/routes/usersRoutes.js');
app.use('/', routes);

app.listen(port, () => {
  documentacionSwagger(app);
  console.log(`Server OK on port ${port}.`);
});
