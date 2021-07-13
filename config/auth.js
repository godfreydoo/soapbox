const jwt = require('jsonwebtoken');

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated) {
      return next();
    }
    req.flash('errorMsg', 'Please log in to view this page');
    res.redirect('/user/login');
  },

  ensureTwitterLogin: function (req, res, next) {
    // debugger;
    if (req.user) {
      next();
    } else {
      res.redirect('/auth/twitter/callback');
    }
  },

  ensureTwitterAuthenticated: function (req, res, next) {
    // debugger;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authDataToSerialize) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = authDataToSerialize.twitter;
      req.tokenSecret = authDataToSerialize.tokenSecret;
      req.token = authDataToSerialize.token;
      next();
    });
  },
};