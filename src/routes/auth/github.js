const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const cors = require("cors");
const cookieSession = require("cookie-session");

router.use(cors());

router.use(
  cookieSession({
    name: "github-auth-session",
    keys: ["key1", "key2"],
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    prompt: "consent",
    session: false,
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
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
