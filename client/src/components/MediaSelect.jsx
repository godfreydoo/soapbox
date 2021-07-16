import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { makeStyles } from '@material-ui/core/styles';
import MiniDrawer from './Sidebar';
import PropTypes from 'prop-types';

import axios from 'axios';

const cardStyles = makeStyles((theme) => ({
  youtube: {
    'height': '100px',
    'background-color': '#c4302b',
    'margin-bottom': '20px',
    'border-radius': '100px',
    'width': '100px',
  },
  twitter: {
    'backgroundColor': '#00ACEE',
    'margin-bottom': '20px',
    'border-radius': '100px',
    'width': '100px',
    'height': '100px',
  },
  btncontainer: {
    'display': 'flex',
    'flex-direction': 'column',
    'flex-wrap': 'wrap',
    'align-items': 'stretch',
    'align-content': 'space-around',
  },
}));

export const MediaSelect = function({ twitterAuth, twitterUsername, getTwitterData, getYoutubeData }) {
  const classes = cardStyles();

  return (
    <div className="media-select-container">
      <div className={classes.btncontainer}>
        {/* <MiniDrawer> */}
        <Button className={classes.youtube}
          onClick={() => {
            getYoutubeData();
          }}
          endIcon={<YouTubeIcon />}
          variant="contained"
          color="primary" >
            Youtube
        </Button>
        <Button className={classes.twitter}
          onClick={() => {
            if (!twitterAuth) {
              window.location.replace('/auth/twitter/callback');
            } else {
              getTwitterData();
            }
          }}
          endIcon={<TwitterIcon />}
          variant="contained"
          color="primary" >
            Twitter
        </Button>
        {/* </MiniDrawer> */}

      </div>
      <div className='twitter-account-container'>
        {twitterUsername ? `${twitterUsername}'s Feed` : null}
      </div>
    </div>
  );
};

MediaSelect.propTypes = {
  twitterAuth: PropTypes.bool,
  twitterUsername: PropTypes.string,
  getTwitterData: PropTypes.func,
  getYoutubeData: PropTypes.func
};
