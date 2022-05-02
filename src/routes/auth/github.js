const express = require('express');

const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;



router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
    prompt: 'consent',
  }),
);

router.get(
  '/github/callback',
  passport.authenticate('github', {

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
