import YoutubeList from './YoutubeList.jsx';
import YoutubeCard from './YoutubeCard.jsx';
import TwitterList from './TwitterList.jsx';
import TwitterCard from './TwitterCard.jsx';
import WelcomePage from './shared/WelcomePage.jsx';
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
import { getAppAuthCookie, getTwitterAuthCookie } from './controllers/getCookies.js';
import { getYoutubeAuthCookie, getTwitterUsername } from './controllers/getCookies.js';
import TwitterAnalytics from './TwitterAnalytics.jsx';

import '../styles/style.css';
import '../styles/analytics.css';
import '../styles/login.css';
import '../styles/register.css';
import '../styles/metrics.css';
import '../styles/modal.css';
import '../styles/tiles.css';


const App = props => {
  const [twitterMetrics, setTwitterMetrics] = useState('');
  const [twitterPosts, setTwitterPosts] = useState(mockTwitter2);
  const [youtubeData, setYoutubeData] = useState('');
  const [activeAccountMetrics, setActiveAccountMetrics] = useState(null);
  const [activePostMetrics, setActivePostMetrics] = useState(null);
  const [currentSocialMedia, setCurrentSocialMedia] = useState(null);
  const [applicationAuth, setApplicationAuth] = useState(getAppAuthCookie());
  const [twitterAuth, setTwitterAuth] = useState(getTwitterAuthCookie());
  const [firstTwitterPrint, setFirstTwitterPrint] = useState(false);
  const [twitterUsername, setTwitterUsername] = useState(getTwitterUsername());
  const [youtubeAuth, setYoutubeAuth] = useState(getYoutubeAuthCookie());

  //currently uses hardcoded user info - will need to update to session/cookie info
  const getTwitterData = function () {
    var token = Cookies.get('twitter-auth-request');
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

    if (!firstTwitterPrint) {
      setFirstTwitterPrint(true);
    }
  };

  const getYoutubeData = function () {
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

  const getCurrentPath = function () {
    return window.location.pathname;
  };

  const unauthorizedPaths = function () {
    if (getCurrentPath() !== '/login' || getCurrentPath() !== '/register') {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!firstTwitterPrint && twitterAuth) {
      getTwitterData();
    }
    if (!twitterUsername) {
      getTwitterUsername();
    }
  });

  if (!applicationAuth) {
    return (
      <Router>
        {unauthorizedPaths() ? <Redirect to='/login' /> : null}
        <div id="app">
          <NavLoggedOut />
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login setApplicationAuth={setApplicationAuth} />
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
          applicationAuth={applicationAuth} />
        <Grid container spacing={2}>
          <Grid item lg={12}>
          </Grid>
          <Grid container item lg={2} spacing={2}>
            <Switch>
              <MediaSelect
                twitterAuth={twitterAuth}
                twitterUsername={twitterUsername}
                getTwitterData={getTwitterData}
                getYoutubeData={getYoutubeData}
                setApplicationAuth={setApplicationAuth} />
            </Switch>
          </Grid>
          <Grid container item lg={7} spacing={2}>
            {currentSocialMedia === 'youtube' ? (<YoutubeList youtubeData={youtubeData} setActivePostMetrics={setActivePostMetrics} />)
              : currentSocialMedia === 'twitter' ? (<TwitterList twitterPosts={twitterPosts} setActivePostMetrics={setActivePostMetrics} />)
                : <WelcomePage />
            }
          </Grid>
          <Grid container item
            spacing={2}
            lg={3}
            justifyContent="flex-start"
            alignItems="flex-start">
            <Grid item container sm={12}>
              {twitterAuth ? <TwitterAnalytics selected={currentSocialMedia} /> : null}
            </Grid>
            <Grid item container sm={12}>
              {twitterAuth ? <MetricsTab
                activePostMetrics={activePostMetrics}
                accountMetrics={activeAccountMetrics} /> : null}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;