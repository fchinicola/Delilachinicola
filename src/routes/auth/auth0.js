const express = require("express");
const passport = require("passport");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

router.use(cors());


router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/auth0",
  passport.authenticate("auth0", {
    scope: ["openid email profile"],
    session: false,
  })
);

router.get(
  "/auth0/callback",
  passport.authenticate("auth0", {
    session: false,
    failureRedirect: "../../users/register",
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
        res.json({
          token,
        });
      }
    );
  }
);

module.exports = router;
