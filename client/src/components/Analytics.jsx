import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TwitterAnalytics from './TwitterAnalytics.jsx';

const Analytics = function (props) {

  const analytics = props.selected && props.data && props.selected === 'twitter' ? (<div style={{ width: '100%' }}>
    <TwitterAnalytics data={props.data} />
  </div>) : null;

  return (
    <>{analytics} </>
  );
};

Analytics.propTypes = {
  selected: PropTypes.string,
  data: PropTypes.array,
};

export default Analytics;