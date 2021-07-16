import React, { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import PropTypes from 'prop-types';

const MetricsTab = props => {
  const [activeSection, setActiveSection] = useState('account');

  const transformData = (data) => {
    var results = {};

    for (var i = 0; i < data.length; i++) {
      var tweet = data[i];

      results['impression count'] = tweet.non_public_metrics.impression_count;
      results['url link clicks'] = tweet.non_public_metrics.url_link_clicks;
      results['public_metrics'] = tweet.public_metrics.retweet_count;
      results['public_metrics'] = tweet.public_metrics.reply_count;
      results['public_metrics'] = tweet.public_metrics.like_count;
      results['public_metrics'] = tweet.public_metrics.quote_count;
    }

    return results;
  };

  const data = props.accountMetrics && props.selected === 'twitter' ? transformData(props.accountMetrics) : props.accountMetrics;

  return activeSection === 'account' ? (props.accountMetrics === null ? (
    <div id="metrics-tab">
      <button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</button>
      <button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</button>
      Select a social media to display account metrics for.
    </div>
  ) : (
    <div id="metrics-tab">
      <button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</button>
      <button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</button>
      {Object.keys(data).map((accountMetricName, index) => <MetricCard
        key={index}
        name={accountMetricName}
        metricData={Object.values(props.accountMetrics)[index]}
      />)}
    </div>
  )) : (props.activePostMetrics !== null ? (
    <div id="metrics-tab">
      <button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</button>
      <button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</button>
      {Object.keys(props.activePostMetrics).map((postMetricName, index) => <MetricCard
        key={index}
        name={postMetricName}
        metricData={Object.values(props.activePostMetrics)[index]}
      />)}
    </div>
  ) : (
    <div id="metrics-tab">
      <button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</button>
      <button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</button>
      Select a post to display metrics for.
    </div>
  ));
};

MetricsTab.propTypes = {
  accountMetrics: PropTypes.object,
  activePostMetrics: PropTypes.object
};

export default MetricsTab;