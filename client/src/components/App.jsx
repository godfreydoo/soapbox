import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { getAppAuthCookie, getTwitterAuthCookie } from './controllers/getCookies.js';
import { getYoutubeAuthCookie, getTwitterUsername } from './controllers/getCookies.js';
import { getTwitterMetricsConfig, getTwitterPostsConfig } from './models/axiosConfig.js';
import { getTwitterHashtagConfig, getTwitterUserConfig } from './models/axiosConfig.js';
import Login from './Login.jsx';
import Register from './Register.jsx';
import NavLoggedIn from './NavLoggedIn.jsx';
import NavLoggedOut from './NavLoggedOut.jsx';
import MediaSelect from './MediaSelect.jsx';
import YoutubeList from './YoutubeList.jsx';
import TwitterList from './TwitterList.jsx';
import Analytics from './Analytics.jsx';
import MetricsTab from './metrics/MetricsTab';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Cookies from 'js-cookie';
import transformTwitterData from './transformTwitterData.js';

import '../styles/style.css';
import '../styles/analytics.css';
import '../styles/login.css';
import '../styles/register.css';
import '../styles/metrics.css';
import '../styles/modal.css';
import '../styles/tiles.css';
import '../styles/compose.css';

const App = props => {
  const [applicationAuth, setApplicationAuth] = useState(getAppAuthCookie());
  const [twitterAuth, setTwitterAuth] = useState(getTwitterAuthCookie());
  const [twitterUsername, setTwitterUsername] = useState(getTwitterUsername());
  const [youtubeAuth, setYoutubeAuth] = useState(getYoutubeAuthCookie());
  const [twitterMetrics, setTwitterMetrics] = useState(null);
  const [twitterAnalytics, setTwitterAnalytics] = useState(null);
  const [twitterPosts, setTwitterPosts] = useState(null);
  const [youtubeData, setYoutubeData] = useState(null);
  const [activeAccountMetrics, setActiveAccountMetrics] = useState(null);
  const [activePostMetrics, setActivePostMetrics] = useState(null);
  const [currentSocialMedia, setCurrentSocialMedia] = useState(null);
  const [firstTwitterPrint, setFirstTwitterPrint] = useState(false);

  const getTwitterData = function () {
    const token = Cookies.get('twitter-auth-request');
    const id = Cookies.get('id');
    const twitterMetricsConfig = getTwitterMetricsConfig(id);
    const twitterUserConfig = getTwitterUserConfig(token, id);
    const twitterHashtagConfig = getTwitterHashtagConfig(id);
    const twitterPostConfig = getTwitterPostsConfig(token);

    axios(twitterPostConfig)
      .then(resVal => {
        setTwitterPosts(resVal.data);
      })
      .catch(err => {
        console.log(err, 'Failed to retrieve Twitter Post data');
      });

    axios(twitterHashtagConfig)
      .then(resVal => {
        setTwitterAnalytics(transformTwitterData(resVal.data));
      })
      .catch(err => {
        console.log('Failed to retrieve Twitter Hashtag data');
      });

    // axios(twitterUserConfig)
    //   .then(resVal => {
    //     // setActiveAccountMetrics([resVal.data]);
    //   })
    //   .catch(err => {
    //     console.log(err, 'Failed to retrieve Twitter User data');
    //   });

    // axios(twitterMetricsConfig)
    //   .then(resVal => {
    //     setTwitterMetrics(resVal.data);
    //   })
    //   .catch(err => {
    //     console.log('Failed to retrieve Twitter Metrics data');
    //   });

    setCurrentSocialMedia('twitter');

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
        <Grid container spacing={10}>
          <Grid item={true} lg={12}>
          </Grid>
          <Grid container item={true} lg={2} spacing={2}>
            <Switch>
              <MediaSelect
                twitterAuth={twitterAuth}
                twitterUsername={twitterUsername}
                getTwitterData={getTwitterData}
                getYoutubeData={getYoutubeData}
                setApplicationAuth={setApplicationAuth} />
            </Switch>
          </Grid>
          <Grid container item={true} lg={7} spacing={2}>
            {currentSocialMedia === 'youtube' ? (<YoutubeList youtubeData={youtubeData} setActivePostMetrics={setActivePostMetrics} />)
              : currentSocialMedia === 'twitter' ? (<TwitterList twitterPosts={twitterPosts} setActivePostMetrics={setActivePostMetrics} />)
                : null
            }
          </Grid>
          <Grid container
            spacing={2}
            lg={3}
            item={true}
            justifyContent="flex-start"
            alignItems="flex-start">
            <Grid item={true} container sm={12}>
              {twitterAuth ? <MetricsTab
                selected={currentSocialMedia}
                activePostMetrics={activePostMetrics}
                accountMetrics={activeAccountMetrics} /> : null}
              {twitterAuth ? <Analytics selected={currentSocialMedia} data={twitterAnalytics} /> : null}
            </Grid>
            {/* <Grid item={true} container sm={12}> */}
            {/* </Grid> */}
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;