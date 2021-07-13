import React, { useState } from 'react';
import { MediaSelect } from './MediaSelect.jsx';
import MetricsTab from './metrics/MetricsTab';
import axios from 'axios';
//import {BrowserRouter as Router, Switch, Route} from 'react-dom-router';

const App = props => {
  const [twitterData, setTwitterData] = useState('');
  const [youtubeData, setYoutubeData] = useState('');

  const PostMetrics = [
    {},
    {},
    {},
    {},
    {}
  ];

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
      React and Webpack are running correctly!
      <MediaSelect
        getTwitterData={getTwitterData}
        getYoutubeData={getYoutubeData}
        twitterData={JSON.stringify(twitterData)}
        youtubeData={JSON.stringify(youtubeData)}/>
      <MetricsTab activePostMetrics={PostMetrics} accountMetrics={[{}, {}, {}]}/>
    </div>
  );
};

export default App;