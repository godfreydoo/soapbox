import YoutubeList from './YoutubeList.jsx';
import YoutubeCard from './YoutubeCard.jsx';
import TwitterList from './TwitterList.jsx';
import TwitterCard from './TwitterCard.jsx';
import Post from './Post.jsx';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MediaSelect } from './MediaSelect.jsx';
import { Nav } from './Nav.jsx';
import { Login } from './Login.jsx';
import { Register } from './Register.jsx';
import MetricsTab from './metrics/MetricsTab';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

const App = props => {
  const [twitterMetrics, setTwitterMetrics] = useState('');
  const [twitterPosts, setTwitterPosts] = useState('');
  const [youtubeData, setYoutubeData] = useState('');
  const [activePostMetrics, setActivePostMetrics] = useState(null);
  const [currentSocialMedia, setCurrentSocialMedia] = useState(null);

  //currently uses hardcoded user info - will need to update to session/cookie info
  const getTwitterData = function() {
    console.log(document.cookie);
    axios.post('/twitter/hashtag-data', {
      userId: '20702956',
      maxResults: '50'
    })
      .then(resVal => {
        setTwitterData(resVal.data);
        setCurrentSocialMedia('twitter');
        setTwitterMetrics(resVal.data);
      });
    axios.get('/twitter/home-timeline')
      .then(resVal => {
        // setTwitterPosts(resval.data);
        // setTwitterData(resVal.data);
      })
      .catch(err => {
        console.log('Failed to retrieve twitter data');
      });
  };

  const getYoutubeData = function() {
    axios.post('/youtube/video', {
      channelId: 'UCYZclLEqVsyPKP9HW87tPag'
    })
      .then(resVal => {
        setYoutubeData(resVal.data);
        setCurrentSocialMedia('youtube');
      })
      .catch(err => {
        console.log('Failed to retrieve youtube data');
      });

  };

  return (
    <Router>
      <div id="app">
        <Nav />
        <Grid container spacing={2}>
          <Grid item lg={12}>
          </Grid>
          <Grid container item lg={2} spacing={2}>
            <Switch>
              <Route path='/register' exact component={Register}/>
              <Route path='/login' exact component={Login}/>
              <MediaSelect
                getTwitterData={getTwitterData}
                getYoutubeData={getYoutubeData}
                twitterMetrics={JSON.stringify(twitterMetrics)}
                youtubeData={JSON.stringify(youtubeData)}/>
            </Switch>
          </Grid>
          <Grid container item lg={7} spacing={2}>
            {currentSocialMedia === 'youtube' ? (<YoutubeList youtubeData={youtubeData} setActivePostMetrics={setActivePostMetrics}/>)
              : currentSocialMedia === 'twitter' ? (<TwitterList twitterData={twitterData} setActivePostMetrics={setActivePostMetrics}/>)
                : null
            }
          </Grid>
          <Grid container item
            spacing={2}
            lg={3}
            justifyContent="flex-start"
            alignItems="flex-start">
            <Grid item container sm={12}>
              <Post />
            </Grid>
            <Grid item container sm={12}>
              {activePostMetrics && <MetricsTab activePostMetrics={activePostMetrics} accountMetrics={{ likes: 14, dislikes: 20, views: 300}}/>}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
