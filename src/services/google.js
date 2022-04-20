const passport = require('passport');
require("dotenv").config();
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const strategy_name = 'google';
// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//         done(null, user);
// });

passport.use(strategy_name,new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL_GOOGLE
},
function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));