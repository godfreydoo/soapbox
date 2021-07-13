const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('../db/schema');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        let user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'Email is not registered' });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password is incorrect' });
        }
      } catch (err) {
        console.error(err);
        console.error('\x1b[31m', 'Passport strategy at config/passport.js has an issue');
      }

    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};