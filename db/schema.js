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
  },
});

const TwitterJobsSchema = new mongoose.Schema({
  completed: { type: Boolean, default: false },
  sendAt: { type: Date },
  payload: mongoose.Schema.Types.Mixed,
  token: { type: String },
  username: { type: String }
});

const User = mongoose.model('User', UserSchema);
const TwitterJobs = mongoose.model('TwitterJobs', TwitterJobsSchema);

module.exports = {
  User,
  TwitterJobs,
};