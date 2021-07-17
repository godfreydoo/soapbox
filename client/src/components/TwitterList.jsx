import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TwitterCard from './TwitterCard.jsx';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TwitterBarChart from './TwitterBarChart';

const twitterListStyles = makeStyles((theme) => ({
  devin: {
<<<<<<< HEAD
    backgroundColor: '#fafafa',
=======
    // backgroundColor: '#75ACEE',
>>>>>>> main
    'margin-left': '2em',
  },
}));

const TwitterList = function(props) {
  const [twitterList, setTwitterList] = useState(null);
  const classes = twitterListStyles();

  useEffect(()=>{
    setTwitterList(props.twitterPosts);
  }, [props.twitterPosts]);

  return (
    <div className="twitter-list-container"styles={classes.parentDiv}>
      <Grid container className={classes.devin} spacing={2}>
        {twitterList && twitterList.map((tweet) => (
          <Grid item xs={12} sm={6} md={4} key={tweet.id}>
            <TwitterCard tweet={tweet} setActivePostMetrics={props.setActivePostMetrics}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

TwitterList.propTypes = {
  twitterPosts: PropTypes.array,
  setActivePostMetrics: PropTypes.func,
};

export default TwitterList;