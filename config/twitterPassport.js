const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const { User } = require('../db/schema');

module.exports = function (passport) {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback',
  },
  function (token, tokenSecret, profile, cb) {
    // User.update(
    //   { usernames: { twitter: `${profile.username}` } },
    //   {
    //     $set: {
    //       "twitter_tokens.access_key": `${token}`,
    //       "twitter_tokens.access_secret": `${tokenSecret}`,
    //     }
    //   })
    //   .then(() => console.log('done'));

    return cb(null, profile);
  }));

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

};