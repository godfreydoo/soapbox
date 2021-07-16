import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import axios from 'axios';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TwitterBarChart from './TwitterBarChart';
import TwitterPieChart from './TwitterPieChart';
import TwitterUrlPieChart from './TwitterUrlPieChart';

const cardStyles = makeStyles((theme) => ({
  analytics: {
    'backgroundColor': '#c4302b',
  },
}));

const TwitterAnalytics = function (props) {

  const showAnalytics = props.data &&
    (<>
      <Grid item container lg={12} justifyContent="center">
        <div>Average metrics by hashtag</div>
        <TwitterBarChart data={props.data[0]} entity="hashtag" />
      </Grid>
      <Grid item container lg={12} justifyContent="center">
        <div>Total retweets by hashtag</div>
        <TwitterPieChart data={props.data[0]} />
      </Grid>
      <Grid item container lg={12} justifyContent="center">
        <div>Average metrics by url link</div>
        <TwitterBarChart data={props.data[1]} entity="url" />
      </Grid>
      <Grid item container lg={12} justifyContent="center">
        <div>Total retweets by url link</div>
        <TwitterUrlPieChart data={props.data[1]} />
      </Grid>
    </>
    );

  return (
    <div styles={{ width: '100%' }}>
      <Grid item container direction="column" lg={12} spacing={4} >
        {showAnalytics}
      </Grid>
    </div>
  );
};

TwitterAnalytics.propTypes = {
  data: PropTypes.array,
};

export default TwitterAnalytics;