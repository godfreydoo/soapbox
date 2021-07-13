import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';

export const MediaSelect = function({ getTwitterData, getYoutubeData, twitterData, youtubeData }) {

  return (
    <div className="media-select-container">
      <div className='button-container'>
        <button
          onClick={() => {
            getYoutubeData();
          }}>YouTube</button>
        <button
          onClick={() => {
            getTwitterData();
          }}>Twitter</button>
        {/* <div>{JSON.stringify(twitterData)}</div>
        <div>{JSON.stringify(youtubeData)}</div> */}
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