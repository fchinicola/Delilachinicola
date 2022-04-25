const passport = require("passport");
const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("../models/User");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new LinkedinStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL_LINKEDIN,
      scope: ["r_emailaddress", "r_liteprofile"],
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      console.log('Linkedin login');
      try {
        let existingUser = await User.findOne({
          email: profile.emails[0].value,
        });
        if (existingUser) {
          if (existingUser.linkedin.id == null) {
            existingUser.linkedin.id = profile.id;
            existingUser.linkedin.email = profile.emails[0].value;
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
