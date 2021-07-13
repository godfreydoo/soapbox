import React from 'react';
import MetricCard from './MetricCard';

const MetricsTab = props => {
  return (
    <div id="metrics-tab">
      {props.posts.map(post => <MetricCard />)}
    </div>
  );
};

export default MetricsTab;