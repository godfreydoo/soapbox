# Client Architecture
#### Master Component (App) States
* applicationAuth - boolean allowing access to app
* twitterAuth - boolean allowing access to Twitter dashboard and data
* twitterUsername
* youtubeAuth
* twitterMetrics
* twitterAnalytics
* twitterPosts
* youtubeData
* activeAccountMetrics
* activePostMetrics
* currentSocialMedia
* firstTwitterPrint - boolean to allow Twitter data to show after Twitter login

#### MetricsTab States
* activeSection

#### YoutubeList States
* youtubeList - array of data to be mapped into the YoutubeCard component

#### YoutubeCard States
* isExpanded - should video description displayed be expanded
* didClickedLikeDislike - was the like/dislike button clicked already

#### TwitterList States
* twitterList - array of data to be mapped into the TwitterCard component