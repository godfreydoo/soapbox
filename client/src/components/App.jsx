import YoutubeList from './YoutubeList.jsx';
import YoutubeCard from './YoutubeCard.jsx';
import TwitterList from './TwitterList.jsx';
import TwitterCard from './TwitterCard.jsx';
import Post from './Post.jsx';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MediaSelect } from './MediaSelect.jsx';
import { NavLoggedIn } from './NavLoggedIn.jsx';
import { NavLoggedOut } from './NavLoggedOut.jsx';
import { Login } from './Login.jsx';
import { Register } from './Register.jsx';
import MetricsTab from './metrics/MetricsTab';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { reqq } from '../../../server/routes/reqq.js';
import mockTwitter2 from './mockTwitter.js';
import Cookies from 'js-cookie';

const getAppAuthCookie = function() {
  if (Cookies.get('application-auth')) {
    return true;
  }
  return false;
};

const App = props => {
  const [twitterMetrics, setTwitterMetrics] = useState('');
  const [twitterPosts, setTwitterPosts] = useState(mockTwitter2);
  const [youtubeData, setYoutubeData] = useState('');
  const [activeAccountMetrics, setActiveAccountMetrics] = useState(null);
  const [activePostMetrics, setActivePostMetrics] = useState(null);
  const [currentSocialMedia, setCurrentSocialMedia] = useState(null);
  const [applicationAuth, setApplicationAuth] = useState(getAppAuthCookie());

  //currently uses hardcoded user info - will need to update to session/cookie info
  const getTwitterData = function() {

    var token = Cookies.get('twitter-auth-request');
    // console.log(document.cookie);
    // console.log(reqq);
    let config = {
      method: 'get',
      url: '/twitter/home-timeline',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    axios.post('/twitter/hashtag-data', {
      userId: '20702956',
      maxResults: '50'
    })
      .then(resVal => {
        setCurrentSocialMedia('twitter');
        setTwitterMetrics(resVal.data);
      });
    axios(config)
      .then(resVal => {
        setTwitterPosts(resVal.data);
        setCurrentSocialMedia('twitter');
      })
      .catch(err => {
        setCurrentSocialMedia('twitter');
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
        setActivePostMetrics(null);
        axios.get(`/youtube/channel-stats?id=${'UCYZclLEqVsyPKP9HW87tPag'}`)
          .then(response => {
            setActiveAccountMetrics(response.data.items[0].statistics);
          })
          .catch(err => {
            console.log('Failed to retrieve account metrics data');
          });
      })
      .catch(err => {
        console.log('Failed to retrieve youtube data');
      });
  };

  const getCurrentPath = function() {
    return window.location.pathname;
  };

  const unauthorizedPaths = function() {
    if (getCurrentPath() !== '/login' || getCurrentPath() !== '/register') {
      return true;
    } else {
      return false;
    }
  };

  if (!applicationAuth) {
    return (
      <Router>
        {unauthorizedPaths() ? <Redirect to='/login'/> : null}
        <div id="app">
          <NavLoggedOut />
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login setApplicationAuth={setApplicationAuth}/>
          </Route>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div id="app">
        <NavLoggedIn
          setApplicationAuth={setApplicationAuth}
          applicationAuth={applicationAuth}/>
        <Grid container spacing={2}>
          <Grid item lg={12}>
          </Grid>
          <Grid container item lg={2} spacing={2}>
            <Switch>
              <MediaSelect
                getTwitterData={getTwitterData}
                getYoutubeData={getYoutubeData}
                twitterMetrics={JSON.stringify(twitterMetrics)}
                youtubeData={JSON.stringify(youtubeData)}/>
            </Switch>
          </Grid>
          <Grid container item lg={7} spacing={2}>
            {currentSocialMedia === 'youtube' ? (<YoutubeList youtubeData={youtubeData} setActivePostMetrics={setActivePostMetrics}/>)
              : currentSocialMedia === 'twitter' ? (<TwitterList twitterPosts={twitterPosts} setActivePostMetrics={setActivePostMetrics}/>)
                : null
            }
          </Grid>
          <Grid container item
            spacing={2}
            lg={3}
            justifyContent="flex-start"
            alignItems="flex-start">
            <Grid container item lg={12} direction="column">
              <Post getTwitterData2={getTwitterData}/>
              <MetricsTab activePostMetrics={activePostMetrics} accountMetrics={activeAccountMetrics}/>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
