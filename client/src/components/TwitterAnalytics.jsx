import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import axios from 'axios';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TwitterBarChart from './TwitterBarChart';

const cardStyles = makeStyles((theme) => ({
  analytics: {
    backgroundColor: '#c4302b',
  },
}));

const TwitterAnalytics = function () {
  const [clicked, setClicked] = useState(false);
  const [twitterAnalytics, setTwitterAnalytics] = useState([]);

  const classes = cardStyles();

  const handleClick = (e) => {
    if (!clicked) {
      getTwitterAnalytics();
    } else {
      setClicked(false);
    }
  };

  const transformData = (data) => {
    var transformed = [];

    for (var key in data.hashtagData) {
      var metrics = data.hashtagData[key];
      var record = {};
      record['hashtag'] = `#${key}`;
      record['retweets'] = metrics.retweets;
      record['replies'] = metrics.replies;
      record['likes'] = metrics.likes;
      record['totalTweets'] = metrics.totalTweets,
      record['retweetAvg'] = metrics.retweetAvg,
      record['replyAvg'] = metrics.replyAvg,
      record['likesAvg'] = metrics.likesAvg;

      transformed.push(record);
    }

    return transformed;
  };

  const getTwitterAnalytics = function () {
    var id = Cookies.get('id');

    axios.post('/twitter/hashtag-data', {
      userId: `${id}`,
      maxResults: '50'
    })
      .then(resVal => {
        setTwitterAnalytics(transformData(resVal.data));
      })
      .then(() => setClicked(true));
  };

  const getAnalyticsButton = clicked ?
    (<>
      <Grid item container lg={12} justifyContent="center">
        <TwitterBarChart data={twitterAnalytics} />
      </Grid>
      <Grid item container lg={12} justifyContent="center">
        <Button className={classes.analytics}
          onClick={handleClick}
          variant="contained"
          color="primary" >
          Hide Analytics
        </Button>
      </Grid>
    </>
    ) :
    (<Grid item container lg={12} justifyContent="center">
      <Button className={classes.analytics}
        onClick={handleClick}
        variant="contained"
        color="primary" >
        Get Analytics
      </Button>
    </Grid>);

  return (
    <div styles={{ width: '100%' }}>
      <Grid item container direction="column" lg={12} spacing={4} >
        {getAnalyticsButton}
      </Grid>
    </div>
  );
};

export default TwitterAnalytics;