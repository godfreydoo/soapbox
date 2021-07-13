import YoutubeList from './YoutubeList.jsx';
import YoutubeCard from './YoutubeCard.jsx';
import TwitterCard from './TwitterCard.jsx';
import Post from './Post.jsx';
import React, { useState } from 'react';
import { MediaSelect } from './MediaSelect.jsx';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
//import {BrowserRouter as Router, Switch, Route} from 'react-dom-router';

const App = props => {
  const [twitterData, setTwitterData] = useState('');
  const [youtubeData, setYoutubeData] = useState('');

  //currently uses hardcoded user info - will need to update to session/cookie info
  const getTwitterData = function() {
    axios.post('/twitter/hashtag-data', {
      userId: '20702956',
      maxResults: '50'
    })
      .then(resVal => {
        setTwitterData(resVal.data);
      });
  };

  const getYoutubeData = function() {
    axios.post('/youtube/video', {
      channelId: 'UCYZclLEqVsyPKP9HW87tPag'
    })
      .then(resVal => {
        console.log(resVal);
        setYoutubeData(resVal.data);
      });
  };

  return (
    <div id="app">
      <Grid container spacing={2}>
        <Grid item lg={12}>
          Soapbox banner
        </Grid>
        <Grid container item lg={2} spacing={2}>
          <MediaSelect
            getTwitterData={getTwitterData}
            getYoutubeData={getYoutubeData}
            twitterData={JSON.stringify(twitterData)}
            youtubeData={JSON.stringify(youtubeData)}
          />
        </Grid>
        <Grid container item lg={7} spacing={2}>
          <YoutubeList youtubeData/>
        </Grid>
        <Grid container item
          spacing={2}
          lg={3}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item container sm={12}>
            <Post />
          </Grid>
          <Grid item container sm={12}>
            <TwitterCard />
          </Grid>
        </Grid>
      </Grid>
      {/* React and Webpack are running correctly! */}
    </div>
  );
};

export default App;