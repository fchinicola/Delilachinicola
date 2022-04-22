const express = require("express");
const router = express.Router();
const passport = require("passport");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const cookieSession = require("cookie-session");

router.use(cors());

router.use(
  cookieSession({
    name: "linkedin-auth-session",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (req, res, next) => {
  console.log("Middle log in");
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

router.use(passport.initialize());
router.use(passport.session());

router.get("/good", (req, res) => {
  res.send("Salio bien para linkedin");
});

router.get("/login", (req, res) => {
  res.send("logueate");
});

router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile"],
    prompt: "consent",
  })
);

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: process.env.REGISTER_URL,
    failureMessage: true,
  }),
  (req, res) => {
    jwt.sign(
      {
        _id: req.user._id,
        admin: req.user.admin,
      },
      JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          return res.json({
            token: null,
          });
        }
        res.redirect('/' +token);
      }
    );
  }
);

module.exports = router;
