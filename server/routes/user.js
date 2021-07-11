require('dotenv').config({ path: '../../config/.env'});
const router = require('express').Router();
const axios = require('axios');
const controllers = require('../../db/controllers');
const { User } = require('../../db/schema.js');
const passport = require('passport');

router.get('/logout', (req, res) => {
  req.logout();
  console.log('\x1b[36m', 'User has been logged out');
  res.redirect('/users/login');
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log('\x1b[31m', 'User has failed to log in')
      return res.redirect('/user/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      controllers.user.updateLastLogin(req, res, user);
      // redirect to login page like /dashboard or whatever route we decide on
      console.log('\x1b[36m', 'User has successfully logged in')
      return res.redirect('/dashboard');
    });
  })(req, res, next);
})

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
          res.send(errors);
        } else {
          controllers.user.register(req, res, { name, email, password, usernames});
        }
      }
  } catch (err) {
    console.error(err);
    console.error('\x1b[31m', 'Routing for registration at routes/user.js has an issue');
  }
})

/*
1.) Curl command to login a user and will save to database if it doesn't already exist
curl --header "Content-Type: application/json" --request POST --data '{"name": "testing do not delete me", "password": "password123", "password2": "password123", "email": "g@gmail.com", "usernames": {"twitter": "asdf"}}' 'http://localhost:3000/user/register'

2.) No password or incorrect password provided, will fail and log error message
curl --header "Content-Type: application/json" --request POST --data '{"email": "g@gmail.com"}' 'http://localhost:3000/user/login'
curl --header "Content-Type: application/json" --request POST --data '{"email": "g@gmail.com", "password": "12"}' 'http://localhost:3000/user/login'

3.) Password provided, will succeed and log success message and update last login date and time in database
curl --header "Content-Type: application/json" --request POST --data '{"email": "g@gmail.com", "password": "password123"}' 'http://localhost:3000/user/login'

4.) User log out
curl 'http://localhost:3000/user/logout'
*/


module.exports = router;