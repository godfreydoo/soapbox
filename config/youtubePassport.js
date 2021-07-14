var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/youtube/callback'
},

function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    console.log(profile);
    return done(err, user);
  });
}
));

passport.serializeUser(function(user, callback) {
  console.log('serializing user.');
  callback(null, user.id);
});

passport.deserializeUser(function(user, callback) {
  console.log('deserialize user.');
  callback(null, user.id);
});