const { TwitterJobs } = require('../schema.js');
const { YouTubeJobs } = require('../schema.js');

module.exports = {
  scheduleTwitter: async function (method, headers, body, query, params) {
    const task = new TwitterJobs(body);
    try {
      await task.save();
    } catch (err) {
      console.error(err);
    }
  },
  getSchedule: async function (method, headers, body, query, params) {
    try {
      let response = await TwitterJobs.find({});
      return response;
    } catch (err) {
      console.error(err);
    }
  },
  deleteSchedule: async function (method, headers, body, query, params) {
    try {
      let response = await TwitterJobs.deleteOne({_id: params.id});
      return response;
    } catch (err) {
      console.error(err);
    }
  },
};