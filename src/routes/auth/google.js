const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const cors = require("cors");
const bodyParser = require("body-parser");

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

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.REGISTER_URL,
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
        res.status(200).send(token);
      }
    );
  }
);

module.exports = router;
