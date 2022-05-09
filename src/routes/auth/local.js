const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { ErrorHandler, handleError } = require("../../middlewares/errors");

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        throw new ErrorHandler(info.statusCode, info.message);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, admin: user.admin };
        const token = jwt.sign(body, JWT_SECRET);

        console.log(`Se a logeado el iduser: ${user._id.toString()}`);
        return res.status(202).json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
