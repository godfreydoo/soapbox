import React from 'react';
import MetricsTab from './metrics/MetricsTab';

const App = props => {
  const twitterPosts = [
    {},
    {},
    {},
    {},
    {},
    {}
  ];

  return (
    <div id="app">
      <MetricsTab posts={twitterPosts}/>
    </div>
  );
};

export default App;