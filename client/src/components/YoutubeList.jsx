import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import YoutubeCard from './YoutubeCard.jsx';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const ytListStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffe7e6',
  },
}));

const YoutubeList = function(props) {
  const [youtubeList, setYoutubeList] = useState(null);

  const classes = ytListStyles();

  useEffect(()=>{
    setYoutubeList(props.youtubeData);
  }, [props.youtubeData]);

  return (
    <div styles={classes.parentDiv}>
      <Grid container className={classes.root} spacing={2}>
        {youtubeList && youtubeList.map((yt) => (
          <Grid item xs={12} sm={6} md={4} key={yt[0].id}>
            <YoutubeCard yt={yt[0]} setActivePostMetrics={props.setActivePostMetrics}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

YoutubeList.propTypes = {
  setActivePostMetrics: PropTypes.func,
  youtubeData: PropTypes.number,
};

export default YoutubeList;