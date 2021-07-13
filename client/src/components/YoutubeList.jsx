import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import YoutubeCard from './YoutubeCard.jsx';
import { makeStyles } from '@material-ui/core/styles';

const mock = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, ];

const ytListStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffe7e6',
  },
  parentDiv: {
    // width: 1152 px,
  },
}));

const YoutubeList = function(props) {
  const [youtubeList, setYoutubeList] = useState(mock);
  const classes = ytListStyles();
  console.log(props);
  return (
    <div styles={classes.parentDiv}>
      <Grid container className={classes.root} spacing={2}>
        {youtubeList && youtubeList.map((yt) => (
          <Grid item xs={12} sm={6} md={4} key={yt.id}>
            <YoutubeCard yt={yt}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default YoutubeList;