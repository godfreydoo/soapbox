const CronJob = require('cron').CronJob;
const { Jobs } = require('../../db/schema');
const models = require('../../db/models/jobs');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const date = require('date-and-time');

const logStream = fs.createWriteStream(path.join(__dirname, 'cron.log'));
const now = new Date();

const consoleEveryMinute = new CronJob('* * * * *', function () {
  logStream.write(`${date.format(now, 'YYYY/MM/DD HH:mm:ss')}\n`);
}, null, true, 'America/Los_Angeles');

const executeJob = async function () {
  try {

  } catch (err) {
    console.error(err);
  }
};

const updateJob = async function () {
  try {

  } catch (err) {
    console.error(err);
  }
};

const checkJobs = new CronJob('* * * * *', async function () {
  try {
    let response = await models.getSchedule();
    if (response.length > 0) {

      response.filter(document => document.completed === false).forEach((value, index) => {
        // console.log(value);
      });

    } else {
      logStream.write(`${date.format(now, 'YYYY/MM/DD HH:mm:ss')} -- no scheduled jobs\n`);
    }
  } catch (err) {
    console.error(err);
  }
}, null, true, 'America/Los_Angeles');


// every day at 10am will delete schedule jobs
const deleteJobs = new CronJob('0 10 * * *', async function () {
  try {
    let response = await Jobs.deleteMany({completed: true});
    logStream.write(`${date.format(now, 'YYYY/MM/DD HH:mm:ss')} -- ${response} deleted completed jobs`);
  } catch (err) {
    console.error(err);
  }
}, null, true, 'America/Los_Angeles');


module.exports = {
  consoleEveryMinute,
  checkJobs,
  deleteJobs
};


