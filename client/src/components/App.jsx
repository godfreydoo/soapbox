import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MediaSelect } from './MediaSelect.jsx';
import { Nav } from './Nav.jsx';
import { Login } from './Login.jsx';
import { Register } from './Register.jsx';
import axios from 'axios';

const App = props => {
  const [twitterMetrics, setTwitterMetrics] = useState('');
  const [twitterPosts, setTwitterPosts] = useState('');
  const [youtubeData, setYoutubeData] = useState('');

  //currently uses hardcoded user info - will need to update to session/cookie info
  const getTwitterData = function() {
    console.log(document.cookie);
    axios.post('/twitter/hashtag-data', {
      userId: '20702956',
      maxResults: '50'
    })
      .then(resVal => {
        setTwitterMetrics(resVal.data);
      });
    axios.get('/twitter/home-timeline')
      .then(resVal => {
        setTwitterPosts(resval.data);
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
    <Router>
      <div id="app">
        <Nav />
        <Switch>
          <Route path='/register' exact component={Register}/>
          <Route path='/login' exact component={Login}/>
          <MediaSelect
            getTwitterData={getTwitterData}
            getYoutubeData={getYoutubeData}
            twitterMetrics={JSON.stringify(twitterMetrics)}
            youtubeData={JSON.stringify(youtubeData)}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;