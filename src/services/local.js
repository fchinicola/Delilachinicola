const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require('bcrypt');

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.create({ username, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        const usuario = await User.findOne({ username });

        if (!usuario) {
          return done(null, false, { message: 'User not found', statusCode: 401 });
        }

        const validate = await bcrypt.compare(password, usuario.password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password', statusCode: 401 });
        }

        return done(null, usuario, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);