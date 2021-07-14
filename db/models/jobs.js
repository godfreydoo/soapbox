const { Jobs } = require('../schema.js');

module.exports = {
  schedule: async function (method, headers, body, query, params) {
    const task = new Jobs({
      sendAt: body.sendAt || undefined,
      payload: body.payload
    });

    try {
      await task.save();
      return;
    } catch (err) {
      console.error(err);
    }
  },
  getSchedule: async function (method, headers, body, query, params) {
    try {
      let response;
      if (body) { // for client request to get all schedule jobs per user
        response = await Jobs.find({email: body.email});
      } else { // for cron job to get all schedule jobs
        response = await Jobs.find({});
      }
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