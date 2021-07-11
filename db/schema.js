const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  usernames: {
    twitter: String,
    youtube: String
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
}