import React, { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const MetricsTab = props => {
  const [ activeSection, setActiveSection ] = useState('account');
  const classes = useStyles();

  return activeSection === 'account' ? (props.accountMetrics === null ? (
    <div id="metrics-tab" className={classes.root}>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</Button>
        <Button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</Button>
      </ButtonGroup>
      <br />
      Select a social media to display account metrics for.
    </div>
  ) : (
    <div id="metrics-tab" className={classes.root}>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</Button>
        <Button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</Button>
      </ButtonGroup>
      {Object.keys(props.accountMetrics).map((accountMetricName, index) => <MetricCard
        key={index}
        name={accountMetricName}
        metricData={props.accountMetrics[accountMetricName]}
      />)}
    </div>
  )) : (props.activePostMetrics !== null ? (
    <div id="metrics-tab" className={classes.root}>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</Button>
        <Button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</Button>
      </ButtonGroup>
      {Object.keys(props.activePostMetrics).map((postMetricName, index) => <MetricCard
        key={index}
        name={postMetricName}
        metricData={props.activePostMetrics[postMetricName]}
      />)}
    </div>
  ) : (
    <div id="metrics-tab" className={classes.root}>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</Button>
        <Button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</Button>
      </ButtonGroup>
      <br />
      Select a post to display metrics for.
    </div>
  ));

  // return activeSection === 'account' ? (props.accountMetrics === null ? (
  //   <div id="metrics-tab">
  //     <button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</button>
  //     <button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</button>
  //     Select a social media to display account metrics for.
  //   </div>
  // ) : (
  //   <div id="metrics-tab">
  //     <button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</button>
  //     <button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</button>
  //     {Object.keys(props.accountMetrics).map((accountMetricName, index) => <MetricCard
  //       key={index}
  //       name={accountMetricName}
  //       metricData={Object.values(props.accountMetrics)[index]}
  //     />)}
  //   </div>
  // )) : (props.activePostMetrics !== null ? (
  //   <div id="metrics-tab">
  //     <button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</button>
  //     <button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</button>
  //     {Object.keys(props.activePostMetrics).map((postMetricName, index) => <MetricCard
  //       key={index}
  //       name={postMetricName}
  //       metricData={Object.values(props.activePostMetrics)[index]}
  //     />)}
  //   </div>
  // ) : (
  //   <div id="metrics-tab">
  //     <button id="select-account-section" onClick={setActiveSection.bind(null, 'account')}>Account</button>
  //     <button id="select-post-section" onClick={setActiveSection.bind(null, 'post')}>Post</button>
  //     Select a post to display metrics for.
  //   </div>
  // ));
};

MetricsTab.propTypes = {
  accountMetrics: PropTypes.object,
  activePostMetrics: PropTypes.object
};

export default MetricsTab;