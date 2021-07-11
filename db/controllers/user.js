const model = require('../models');

module.exports = {
  register: async function (req, res, body) {
    try {
      await model.user.register(body);
      res.status(200);
      console.log('\x1b[31m', 'User has successfully registered', res.statusCode);
      res.redirect('/user/login');
    } catch (err) {
      console.error(err);
      console.error('\x1b[31m', 'register in db/controllers/user.js has an issue');
    }
  },
  updateLastLogin: async function (req, res, user) {
    try {
      await model.user.updateLastLogin(user);
    } catch (err) {
      console.error(err);
      console.error('\x1b[31m', 'updateLastLogin in db/controllers/user.js has an issue');
    }
  }
}