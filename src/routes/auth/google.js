const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: '/login', failureMessage: true }),
  (req,res) => {res.redirect('../google/success')}
);

router.get("/google/success", isLoggedIn, (req, res) => {
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

router.get("../google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

module.exports = router;
