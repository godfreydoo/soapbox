import React, { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import PropTypes from 'prop-types';

const MetricsTab = props => {
  const [ activeSection, setActiveSection ] = useState('account');

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
      {Object.keys(props.accountMetrics).map((accountMetricName, index) => <MetricCard
        key={index}
        name={accountMetricName}
        metricData={props.accountMetrics[accountMetricName]}
      />)}
    </div>
  )) : (props.activePostMetrics !== null ? (
    <div id="metrics-tab">
      <button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</button>
      <button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</button>
      {Object.keys(props.activePostMetrics).map((postMetricName, index) => <MetricCard
        key={index}
        name={postMetricName}
        metricData={props.activePostMetrics[postMetricName]}
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