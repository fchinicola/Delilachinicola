require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const { handleError } = require("./middlewares/errors");


// Initialitations
const port = process.env.PORT || 3000;
const enviroment = process.env.NODE_ENV;
const apiDescription = process.env.API_DESCRIPTION;
require("./database");
require("./services");

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());


app.use(passport.initialize());
app.use("/api/v2", require("./middlewares/documentation"));

// Add headers before the routes are defined
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

// Routes
app.use("/api/v2", require("./routes/usersRoutes"));
app.use("/api/v2", require("./routes/productsRoutes"));
app.use("/api/v2", require("./routes/paymentRoutes"));
app.use("/api/v2", require("./routes/pedidosRoutes"));
app.use("/api/v2", require("./routes/auth"));
app.use("/api/v2", require("./routes/payments"));

// errorHandler
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Server
app.listen(port, () => {
  let time = new Date().toLocaleTimeString();
  console.log(
    `La aplicacion se esta ejecutando en el ambiente: '${enviroment}'`
  );
  console.log(`Descripcion: ${apiDescription}`);
  console.log(`Server OK on port ${port} at ${time} hs.`);
});

module.exports = app;
