import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';

const cardStyles = makeStyles((theme) => ({
  youtube: {
    backgroundColor: '#c4302b',
  },
  twitter: {
    backgroundColor: '#00ACEE',
  },
}));

export const MediaSelect = function({ getTwitterData, getYoutubeData, twitterData, youtubeData }) {
  const classes = cardStyles();

  return (
    <div className="media-select-container">
      <div className='button-container'>
        <Button className={classes.youtube}
          onClick={() => {
            getYoutubeData();
          }}
          endIcon={<YouTubeIcon />}
          variant="contained"
          color="primary"
        >
          Youtube
        </Button>
        <Button className={classes.twitter}
          onClick={() => {
            getTwitterData();
          }}
          endIcon={<TwitterIcon />}
          variant="contained"
          color="primary"
        >
          Twitter
        </Button>
      </div>
    </div>
  );
};

MediaSelect.propTypes = {
  getTwitterData: PropTypes.func,
  getYoutubeData: PropTypes.func,
  twitterData: PropTypes.string,
  youtubeData: PropTypes.string
};
