const express = require("express");
const router = express.Router();
const google = require("./google");
const linkedin = require("./linkedin");
const github = require('./github');
const local = require("./local");
//const auth0 = require('./auth0');
//const facebook = require('./facebook');

router.get("/failed", (req, res) => res.send("You Failed to log in!"));

router.use("/auth", google);
router.use("/auth", linkedin);
router.use('/auth', github);
//router.use('/auth', auth0);

module.exports = router;
