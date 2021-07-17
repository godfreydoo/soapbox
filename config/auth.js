/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const { reqCache } = require('../server/routes/reqq.js');
const cookieParser = require('cookie-parser');

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated) {
      return next();
    }
    req.flash('errorMsg', 'Please log in to view this page');
    res.redirect('/user/login');
  },

  ensureTwitterLogin: function (req, res, next) {
    if (reqCache.username) {
      next();
    } else {
      res.redirect('/auth/twitter/callback');
    }
  },

  ensureGoogleAuthenticated: function (req, res, next) {
    debugger;
    const token = req.cookies['google-auth-request'];
    // const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.sendStatus(401);
    }
    next();
    // req.user = authDataToSerialize.youtube;
    // req.token = authDataToSerialize.token;
    // jwt.verify(token, process.env.GOOGLE_CLIENT_SECRET, (err, authDataToSerialize) => {
    //   if (err) {
    //     return res.sendStatus(403);
    //   }

    // });
  },


  ensureTwitterAuthenticated: function (req, res, next) {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    let token;
    if (req.cookies['twitter-auth-request']) {
      token = req.cookies['twitter-auth-request'];
    } else {
      token = req.headers.authorization.split(' ')[1];
    }
    debugger;
    if (token == null) {
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.TWITTER_ACCESS_TOKEN_SECRET, (err, authDataToSerialize) => {
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