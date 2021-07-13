module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated) {
      return next();
    }
    res.redirect('/user/login');
  },

  ensureTwitterLogin: function (req, res, next) {
    debugger;
    if (req.user) {
      next();
    } else {
      res.redirect('/auth/twitter/callback');
    }
  }
}