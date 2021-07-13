require('dotenv').config({ path: '../../config/.env'});
const router = require('express').Router();
const axios = require('axios');
const controllers = require('../../db/controllers');
const { User } = require('../../db/schema.js');
const passport = require('passport');
// Pass ensureAuthenticated as a second parameter in routing to authenticate
const { ensureAuthenticated } = require('../../config/auth');

require('../../config/passport')(passport);


router.get('/logout', (req, res) => {
  req.logout();
  // console.log('\x1b[36m', 'User has been logged out');
  req.flash('successMsg', 'You have successfully logged out');
  res.redirect(200, '/users/login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      req.flash('errorMsg', info);
      return next(err);
    }
    if (!user) {
      // console.log('\x1b[31m', 'User has failed to log in');
      req.flash('errorMsg', info);
      return res.redirect(403, '/user/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      controllers.user.updateLastLogin(req, res, user);
      // redirect to login page like /dashboard or whatever route we decide on
      // console.log('\x1b[36m', 'User has successfully logged in');
      req.flash('successMsg', 'You are now logged in');
      return res.redirect(200, '/dashboard');
    });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, password2, usernames } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
      errors.push({msg: 'Please fill in all fields' });
    }

    if (password !== password2) {
      errors.push({msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({msg: 'Password should be at least 6 characters'});
    }

    if (errors.length > 1) {
      res.send(errors);
    } else {
      let user = await User.findOne({ email: email });
      if (user) {
        errors.push({msg: 'Email is already registered'});
        // console.log('\x1b[31m', 'Email is already registered')
        res.status(403).send(errors);
      } else {
        controllers.user.register(req, res, { name, email, password, usernames});
      }
    }
  } catch (err) {
    console.error(err);
    console.error('\x1b[31m', 'Routing for registration at routes/user.js has an issue');
  }
});



module.exports = router;