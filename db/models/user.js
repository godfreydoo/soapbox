const { User } = require('../schema.js');
const bcrypt = require('bcryptjs');

module.exports = {
  register: async function (body) {
    var newUser = new User({
      name: body.name,
      password: body.password,
      email: body.email,
      usernames: body.usernames
    })

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
      await newUser.save();
    } catch(err) {
      console.error(err);
      console.error('\x1b[31m', 'register in db/models/user.js has an issue');
    }
  },
  updateLastLogin: async function (user) {
    try {
      await User.findOneAndUpdate({ email: user.email }, {$set: { lastLogin: Date.now() }}, { useFindAndModify: false });
    } catch (err) {
      console.error(err);
      console.error('\x1b[31m', 'updateLastLogin in db/controllers/user.js has an issue');
    }
  }
}