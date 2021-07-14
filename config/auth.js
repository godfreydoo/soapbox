/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const { userCache } = require('../server/routes/userCache.js');
=======
const { reqq } = require('../server/routes/reqq.js');
>>>>>>> main

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated) {
      return next();
    }
    req.flash('errorMsg', 'Please log in to view this page');
    res.redirect('/user/login');
  },

  ensureTwitterLogin: function (req, res, next) {
<<<<<<< HEAD
    // debugger;
    if (userCache.req.user.username) {
=======
    if (reqq.req.user.username) {
>>>>>>> main
      next();
    } else {
      res.redirect('/auth/twitter/callback');
    }
  },

  ensureGoogleAuthenticated: function (req, res, next) {
    debugger;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.GOOGLE_CLIENT_SECRET, (err, authDataToSerialize) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = authDataToSerialize.twitter;
      req.tokenSecret = authDataToSerialize.tokenSecret;
      req.token = authDataToSerialize.token;
      next();
    });
  },


  ensureTwitterAuthenticated: function (req, res, next) {
<<<<<<< HEAD
    debugger;
=======
>>>>>>> main
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