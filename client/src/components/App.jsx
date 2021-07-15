import YoutubeList from './YoutubeList.jsx';
import YoutubeCard from './YoutubeCard.jsx';
import TwitterList from './TwitterList.jsx';
import TwitterCard from './TwitterCard.jsx';
import Post from './Post.jsx';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MediaSelect } from './MediaSelect.jsx';
import { Nav } from './Nav.jsx';
import { Login } from './Login.jsx';
import { Register } from './Register.jsx';
import MetricsTab from './metrics/MetricsTab';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { reqq } from '../../../server/routes/reqq.js';
<<<<<<< HEAD
import Cookie from 'js-cookie';
=======
import mockTwitter2 from './mockTwitter.js';
import Cookies from 'js-cookie';
>>>>>>> 4942126f28b75bbf71e2c00df96838e3c2fc3ac1

const App = props => {
  const [twitterMetrics, setTwitterMetrics] = useState('');
  const [twitterPosts, setTwitterPosts] = useState(mockTwitter2);
  const [youtubeData, setYoutubeData] = useState('');
  const [activeAccountMetrics, setActiveAccountMetrics] = useState(null);
  const [activePostMetrics, setActivePostMetrics] = useState(null);
  const [currentSocialMedia, setCurrentSocialMedia] = useState(null);

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
<<<<<<< HEAD
            <button id="google-auth"><a href="/auth/google">Sign In with Google</a></button>
            <YoutubeList youtubeData={youtubeData} setActivePostMetrics={setActivePostMetrics}/>
            {/* <TwitterList twitterData={twitterData}/> */}
=======
            {currentSocialMedia === 'youtube' ? (<YoutubeList youtubeData={youtubeData} setActivePostMetrics={setActivePostMetrics}/>)
              : currentSocialMedia === 'twitter' ? (<TwitterList twitterPosts={twitterPosts} setActivePostMetrics={setActivePostMetrics}/>)
                : null
            }
>>>>>>> 4942126f28b75bbf71e2c00df96838e3c2fc3ac1
          </Grid>
          <Grid container item
            spacing={2}
            lg={3}
            justifyContent="flex-start"
            alignItems="flex-start">
            <Grid item container sm={12}>
              <Post getTwitterData2={getTwitterData}/>
            </Grid>
            <Grid item container sm={12}>
              <MetricsTab activePostMetrics={activePostMetrics} accountMetrics={activeAccountMetrics}/>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
