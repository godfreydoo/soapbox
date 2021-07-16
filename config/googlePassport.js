var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },

  function(token, refreshToken, profile, cb) {
    const authDataToSerialize = {
      token: token,
      youtube: profile.username
    };
    const accessToken = jwt.sign(authDataToSerialize, process.env.GOOGLE_CLIENT_SECRET);
    return cb(null, profile, token);
  }));

  passport.serializeUser(function(user, callback) {
    console.log('serializing user.');
    callback(null, user);
  });

  passport.deserializeUser(function(user, callback) {
    console.log('deserialize user.');
    callback(null, user);
  });
};