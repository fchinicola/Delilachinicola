const express = require('express');

const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

router.get('/good', (req, res) => {
  res.send('Salio bien para linkedin');
});

router.get('/login', (req, res) => {
  res.send('logueate');
});

router.get(
  '/linkedin',
  passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile'],
    prompt: 'consent',
  }),
);

router.get(
  '/linkedin/callback',
  passport.authenticate('linkedin', {
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
