import React, { useState } from 'react';
import { MediaSelect } from './MediaSelect.jsx';
import axios from 'axios';

const App = props => {
  const [youtubeData, setYoutubeData] = useState('');
  const [twitterData, setTwitterData] = useState('');

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

  return (
    <div id="app">
      React and Webpack are running correctly!
      <MediaSelect
        getTwitterData={getTwitterData}
        twitterData={JSON.stringify(twitterData)}/>
    </div>
  );
};

export default App;