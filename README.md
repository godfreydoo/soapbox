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
- Users can switch between social media outlets and view their home timeline (Twitter) or view their currently uploaded videos (YouTube).
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

![](RegisterLogin.gif)

### Twitter Home Timeline:

![](TwitterTimeline.gif)

### YouTube Feed:

![](YoutubeFeed.gif)

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
Client is built with React Router and MaterialUI, compiled with Babel,  and bundled with webpack. Recharts library is used to generate charting for platform analytics, and other various libraries are used for utility.

Server is built with Express, and MongoDB is interacted through Mongoose. Initial authentication is implemented via Passport and various local strategies, alongside with the use of JSON Web Tokens. Interaction with YouTube and Twitter are done through external libraries for security and convenience. Scheduler for scheduled posting is done with Cron.


### - Dependencies and devDependencies
* [Client](client/package.json)
* [Server](server/package.json)



## Architecture
For more information on client and server code / logic, you can find them here
* [Client](client/Client%Architecture/README.md)
* [Server](server/Server%Architecture/README.md)



## Requirements
Google Developer account to have access to Google Oauth2 credentials.
1. Create account with Google developers, and then create a new project
2. Click Enable API and Services, and enable YouTube Data API v3
3. Create credentials for OAuth client ID
4. Configure consent screen and set up application
* Fill in the required fields with Authorised domains as http://localhost:3000
* Add scopes for all YouTube v3 related API
* Add users by their emails (very important step)
5. Click Create OAuth client ID again and you will be asked to add redirect URIs
* Authorised JavaScript origins as http://localhost:3000
* Authorised redirect URIs as http://localhost:3000/api/youtube/oauth2/callback
6. Copy client_id, client_id_secret, and the redirect URIs into your .env file

- Twitter Developer account to have access to Twitter Oauth2 credentials

## Team
* [Devin Hight](https://github.com/dhightnm)
* [Tea Skela](https://github.com/tskela)
* [Gabriel Wright](https://github.com/wrightgabriel0220)
* [Godfrey Doo](https://github.com/godfreydoo)
* [Francis Yao](https://github.com/franciskyao)
* [Will Weindel](https://github.com/will-weindel)
