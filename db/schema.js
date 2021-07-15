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

const JobsSchema = new mongoose.Schema({
  sendAt: { type: Date },
  completed: { type: Boolean, default: false },
  payload: mongoose.Schema.Types.Mixed,
  youtubeToken: { type: String},
  twitterToken: { type: String},
  usernames: {
    twitter: String,
    youtube: String
  }
});

const User = mongoose.model('User', UserSchema);
const Jobs = mongoose.model('Jobs', JobsSchema);

module.exports = {
  User,
  Jobs
};