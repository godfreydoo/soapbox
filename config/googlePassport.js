var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
      
  function(token, tokenSecret, profile, cb) {
    const authDataToSerialize = {
      token: token,
      tokenSecret: tokenSecret,
      youtube: profile.username
    };
    const accessToken = jwt.sign(authDataToSerialize, process.env.GOOGLE_CLIENT_SECRET);
    return cb(null, profile, accessToken);
  }));
      
  passport.serializeUser(function(user, callback) {
    console.log('serializing user.');
    callback(null, user.id);
  });
      
  passport.deserializeUser(function(user, callback) {
    console.log('deserialize user.');
    callback(null, user.id);
  });
};