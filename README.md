# Table of Contents
* [Soapbox](#soapbox)
* [Getting Started](#getting-started)
* [Tech Stack](#tech-stack)
* [Functionality](#functionality)
* [Architecture](#architecture)
* [Requirements](#requirements)
* [Team](#team)


# Soapbox
- Social media aggregation application allowing the user to view post and analytics data from various social media platforms. Current functionality includes YouTube and Twitter.
- User can switch between social media outlets and view their home timeline (Twitter) or view their currently uploaded videos (YouTube).
- Metrics and analytics for Twitter and YouTube can be seen below:

- Twitter
  - Average number of retweets/likes per hashtag usage
  - Average number of retweets/likes per url link usage
  - Recent hashtags' percentage of total retweets
  - Recent url links' percentage of total retweets
  - Metrics on number of retweets and favorites per tweet on home timeline

- YouTube
  - Likes
  - Dislikes
  - Views
  - Favorites
  - Comments

Metrics and analytics for Twitter include retweet, hashtag, and URL tracking . Metrics and analytics for Youtube include, likes, dislikes, views, favorites, and comments.


## Functionality
Below outlines major functionalities for a minimum viable product, achieved over a four-day period of coding

### Register and Login:

![](Register:Login.gif)

### Twitter Home Timeline:

![](TwitterTimeline.gif)

### YouTube Feed:

![](YouTubeFeed.gif)

### Batch Posting:

![](BatchPosting.gif)


## Getting Started
1. Fork this repository and clone it to your local disk. Navigate to the project folder on your computer.
2. In the project root directory and client directory, run these commands
```bash
npm install

cd client
npm install
```
3. The project is bundled with webpack, split between production and development configurations for optimization. Run these commands from the client directory.
```bash
npm run build-dev
npm run build-prod
```
4. Lastly, open up a new terminal and navigate to the root directory. Start the server with these commands. This will also start the scheduler with Cron.
```bash
npm run server
```
5. See [Requirements](#requirements) to learn how to set your environment variables. In summary, you will need to set up Twitter Developer and Google Developer profiles for tokens.
6. Navigate to http://localhost:3000


## Tech Stack
Client is built with React Router and MaterialUI, and compiled with Babel and bundled with webpack. Recharts is used to generate the charting for platform analytics, and other various libraries are used for utility.

Server is built with Express, and MongoDB is interacted through Mongoose. Initial authentication is implemented via Passport and various local strategies, alongside with the use of JSON Web Tokens. Interaction with YouTube and Twitter are done through external libaries for security and convenience. Scheduler for scheduled posting is done with Cron.


### - Client Dependencies
* @babel/preset-env : Version 7.14.7,
* @babel/preset-react : Version 7.14.5,
* @date-io/date-fns : Version 1.3.13,
* @material-ui/core : Version 4.12.1,
* @material-ui/icons : Version 4.11.2,
* @material-ui/pickers : Version 3.3.10,
* axios : Version 0.21.1,
* babel-loader : Version 8.2.2,
* babel-plugin-recharts : Version 2.0.0,
* css-loader : Version 6.0.0,
* date-fns : Version 2.22.1,
* js-cookie : Version 2.2.1,
* react : Version 17.0.2,
* react-dom : Version 17.0.2,
* react-router-dom : Version 5.2.0,
* recharts : Version 2.0.10,
* style-loader : Version 3.1.0

### - Client DevDependencies
* @babel/core : Version 7.14.6,
* @babel/plugin-proposal-class-properties : Version 7.14.5,
* @babel/plugin-transform-runtime : Version 7.14.5,
* eslint : Version 7.30.0,
* eslint-plugin-react : Version 7.24.0,
* eslint-plugin-react-hooks : Version 4.2.0,
* html-webpack-plugin : Version 5.3.2,
* webpack : Version 5.44.0,
* webpack-cli : Version 4.7.2,
* webpack-merge : Version 5.8.0

### - Root Dependencies
* axios : Version 0.21.1,
* bcryptjs : Version 2.4.3,
* connect-flash : Version 0.1.1,
* cookie-parser : Version 1.4.5,
* cookie-session : Version 1.4.0,
* cors : Version 2.8.5,
* cron : Version 1.8.2,
* date-and-time : Version 1.0.1,
* dotenv : Version 10.0.0,
* express : Version 4.17.1,
* express-session : Version 1.17.2,
* googleapis : Version 81.0.0,
* js-cookie : Version 2.2.1,
* jsonwebtoken : Version 8.5.1,
* mongoose : Version 5.13.2,
* multer : Version 1.4.2,
* open : Version 8.2.1,
* passport : Version 0.4.1,
* passport-google-oauth : Version 2.0.0,
* passport-local : Version 1.0.0,
* passport-twitter : Version 1.0.4,
* redis (note: this is created in #57 PR but not merged to main)
* twitter : Version 1.7.1,
* twitter-api-v2 : Version 1.1.1,
* twitter-v2 : Version 1.1.0,
* uuid : Version 3.4.0,
* youtube-api : Version 3.0.1

### - Root DevDependencies
* eslint : Version 7.30.0,
* faker : Version 5.5.3,
* jest : Version 27.0.6,
* nodemon : Version 2.0.12,
* supertest : Version 6.1.3



## Architecture
For more information on client and server code / logic, you can find them here
* [Client](client/Client%Architecture/README.md)
* [Server](server/Server%Architecture/README.md)



## Requirements
- Google Developer account to have access to Google Oauth2 credentials
  *step 1: Create account with Google developers, and then create a new project
  *step 2: Click Enable API and Services / navigate to API section
  *step 3: Find and enable YouTube Data API v3
  *step 4: Create credentials for OAuth client ID
  *step 5: Configure consent screen and set up application
  *step 6: Click external (you can set permissions later)
  *step 7: Fill in the required fields with Authorised domains as http://localhost:3000
  *step 8: Add scopes for all YouTube v3 related API
  *step 9: Add users by their emails (very important step)
  *step 10: Click Create OAuth client ID again and you will be asked to add redirect URIs
  *step 11: Authorised JavaScipt origins as http://localhost:3000
  *step 12: Authorised redirect URIs as http://localhost:3000/api/youtube/oauth2/callback
  *step 13: Credentials will now be created
  *step 14: Copy client_id, client_id_secret, and the redirect URIs into your .env file

- Twitter Developer account to have access to Twitter Oauth2 credentials

## Team
[Devin Hight](https://github.com/dhightnm)
[Tea Skela](https://github.com/tskela)
[Gabriel Wright](https://github.com/wrightgabriel0220)
[Godfrey Doo](https://github.com/godfreydoo)
[Francis Yao](https://github.com/franciskyao)
[Will Weindel](https://github.com/will-weindel)