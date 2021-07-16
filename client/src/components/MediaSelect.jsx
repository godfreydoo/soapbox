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
    'backgroundColor': '#c4302b',
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

export const MediaSelect = function({ twitterAuth, twitterUsername, getTwitterData, getYoutubeData, setApplicationAuth }) {
  const classes = cardStyles();

  return (
    <div className="media-select-container">
      <div className={classes.btncontainer}>
        <MiniDrawer
          getYoutubeData={getYoutubeData}
          getTwitterData={getTwitterData}
          twitterAuth={twitterAuth}
          twitterUsername={twitterUsername}
          setApplicationAuth={setApplicationAuth}>
        </MiniDrawer>
      </div>
    </div>
  );
};

MediaSelect.propTypes = {
  setApplicationAuth: PropTypes.func,
  twitterAuth: PropTypes.bool,
  twitterUsername: PropTypes.string,
  getTwitterData: PropTypes.func,
  getYoutubeData: PropTypes.func
};
