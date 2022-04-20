const express = require('express');
const passport = require('passport');
const router = express.Router();
const strategy_name = 'google';


const cors = require('cors');
const bodyParser = require('body-parser');

const cookieSession = require('cookie-session');

router.use(cors());

router.use(cookieSession({
    name: 'delilah-session',
    keys: ['key1', 'key2']
  }));


const isLoggedIn = (req, res, next) => {
    console.log("Middle log in");
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}


router.use(passport.initialize());
router.use(passport.session());

router.get("/good",  (req, res) => { res.send("Salio bien") })

router.get("/badlogin", (req, res) => { res.send("logueate") })

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] , prompt:"consent"}));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/badlogin'}),
    function (req, res) {
        res.redirect('/good');
    }
);


module.exports = router;