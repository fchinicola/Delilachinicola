const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
const cors = require("cors");

const cookieSession = require("cookie-session");

router.use(cors());

router.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
  })
);

/*
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    successRedirect: "../google/success",
    failureRedirect: "../google/failure",
  })
);

router.get("/google/success", (req, res) => {
  console.log(req.session);
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
      return res.status(200).json(token);
    }
    );
  });
  
  */
  
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
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
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          return res.json({
            token: null,
          });
        }
        return res.status(200).json(token);
      },
    );
  },
);

module.exports = router;
