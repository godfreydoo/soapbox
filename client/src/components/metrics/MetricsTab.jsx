import React, { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import PropTypes from 'prop-types';

const MetricsTab = props => {
  const [ activeSection, setActiveSection ] = useState('account');

  useEffect(() => {
    console.log('activeSection is: ', activeSection);
  }, [activeSection]);

  return activeSection === 'account' ? (
    <div id="metrics-tab">
      <button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</button>
      <button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</button>
      {props.activePostMetrics.map((post, index) => <MetricCard key={index} />)}
    </div>
  ) : (
    <div id="metrics-tab">
      <button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</button>
      <button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</button>
      {props.accountMetrics.map((metric, index) => <MetricCard key={index} metricData={metric} />)}
    </div>
  );
};

MetricsTab.propTypes = {
  accountMetrics: PropTypes.array,
  activePostMetrics: PropTypes.array
};

export default MetricsTab;