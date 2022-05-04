const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const {singtoken} = require("../controllers/userController")

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL_GOOGLE,
      scope: ["profile", "email"],
      passReqToCallback: true,
      state: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await User.findOne({
          email: profile.emails[0].value,
        });
        if (existingUser) {
          if (existingUser.google.id == null) {
            existingUser.google.id = profile.id;
            existingUser.google.email = profile.emails[0].value;
            await existingUser.save();
          }
          return done(null, {_id: existingUser._id,
          admin: existingUser.admin});
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
