import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TwitterCard from './TwitterCard.jsx';
import { makeStyles } from '@material-ui/core/styles';

const mock = [{id: 1}, {id: 2}, {id: 3}];

const twitListStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffe7e6',
  },
}));

const TwitterList = function(props) {
  const [twitterList, setTwitterList] = useState(mock);
  const classes = twitListStyles();

  // useEffect(()=>{
  //   console.log('this is props', props);
  //   setTwitterList(props.twitterData);
  // }, [props.twitterData]);

  return (
    <div styles={classes.parentDiv}>
      <Grid container className={classes.root} spacing={2}>
        {twitterList && twitterList.map((yt) => (
          <Grid item xs={12} sm={6} md={4} key={yt.id}>
            <TwitterCard yt={yt}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TwitterList;