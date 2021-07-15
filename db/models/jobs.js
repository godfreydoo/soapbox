const { Jobs } = require('../schema.js');

module.exports = {
  schedule: async function (method, headers, body, query, params) {
    const task = new Jobs(body);
    try {
      await task.save();
    } catch (err) {
      console.error(err);
    }
  },
  getSchedule: async function (method, headers, body, query, params) {
    try {
      let response = await Jobs.find({});
      return response;
    } catch (err) {
      console.error(err);
    }
  },
  deleteSchedule: async function (method, headers, body, query, params) {
    try {
      let response = await Jobs.deleteOne({_id: params.id});
      return response;
    } catch (err) {
      console.error(err);
    }
  },
};