import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const MediaSelect = function({ getTwitterData, getYouTubeData, twitterData, youtubeData }) {

  return (
    <div className="media-select-container">
      <div className='button-container'>
        <button
          onClick={() => {
            getYouTubeData();
          }}>YouTube</button>
        <button
          onClick={() => {
            getTwitterData();
          }}>Twitter</button>
        <div>{JSON.stringify(twitterData)}</div>
        <div>{JSON.stringify(youtubeData)}</div>
      </div>
    </div>
  );
};

MediaSelect.propTypes = {
  getTwitterData: PropTypes.func,
  getYouTubeData: PropTypes.func,
  twitterData: PropTypes.string,
  youtubeData: PropTypes.string
};