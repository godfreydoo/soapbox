const passport = require('passport');
const TwitterStrategy = require('passport-twitter');

module.exports = function(passport) {
  debugger;
  passport.use(new TwitterStrategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback',
  },
  function(token, tokenSecret, profile, cb) {
    // console.log(token, tokenSecret, profile);
    return cb(null, profile);
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

};