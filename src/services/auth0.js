const passport = require("passport");
const Auth0Strategy = require("passport-auth0").Strategy;
require("dotenv").config();
const User = require("../models/User");


passport.use(
  "auth0",
  new Auth0Strategy(
    {
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL_AUTH0,
      domain: process.env.AUTH0_DOMAIN,
      state: false,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
        console.log('Auth0 login')
        try {
          let existingUser = await User.findOne({
            email: profile.emails[0].value,
          });
          if (existingUser) {
            if (existingUser.auth0.id == null) {
              existingUser.auth0.id = profile.id;
              existingUser.auth0.email = profile.emails[0].value;
              await existingUser.save();
            }
            return done(null, existingUser);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );