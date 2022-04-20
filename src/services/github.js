const passport = require("passport");
require("dotenv").config();
const GitHubStrategy = require("passport-github2").Strategy;
const { Octokit } = require("@octokit/core");
const User = require("../models/User");

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL_GITHUB,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      console.log("Github login");
      try {
        const octokit = new Octokit({ auth: accessToken });

        const response = await octokit.request("GET /user/emails");
        let existingUser = await User.findOne({
          email: response.data[0].email,
        });
        if (existingUser) {
          if (existingUser.github.id == null) {
            existingUser.github.id = profile.id;
            existingUser.github.email = response.data[0].email;
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
