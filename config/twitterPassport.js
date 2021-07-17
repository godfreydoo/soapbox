const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const jwt = require('jsonwebtoken');

module.exports = function(passport) {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback',
  },
  function(token, tokenSecret, profile, cb) {
    const authDataToSerialize = {
      token: token,
      tokenSecret: tokenSecret,
      twitter: profile.username
    };
    const accessToken = jwt.sign(authDataToSerialize, process.env.TWITTER_ACCESS_TOKEN_SECRET);
    return cb(null, profile, accessToken);
  }));

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

};