# Server Architecture
### Database
* The database is built on MongoDB Altas Cloud (utilizing Mongoose for server-side interaction) to store user data and scheduled-post information in separate collections. Our database is queried for login authentication, or to update the status of future posts. Our database sub-repository provides a number of models and controllers to assist the server in reads/writes.

### Server
* The server utilizes Express architecture, implementing Passport to assist in authentication. The three main server routes are Twitter (authentication, db interaction and calls to Twitter API), YouTube (authentication, db interaction and calls to Youtube API), and User-posting (db interaction).

#### Task Scheduler
* Cron scheduler to check for upcoming task(s), executes them concurrently, updates them for tracking, and removes completed tasks.

![](https://github.com/blue-ocean-picard/soapbox/blob/e66347e9fd26871797c37de49a11f22537119af8/cron-diagram.png)
