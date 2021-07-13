import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const MediaSelect = function({ getTwitterData, twitterData }) {

  return (
    <div className="media-select-container">
      <div className='button-container'>
        <button>YouTube</button>
        <button onClick={() => {
          getTwitterData();
        }}>Twitter</button>
        <div>{JSON.stringify(twitterData)}</div>
      </div>
    </div>
  );
};

MediaSelect.propTypes = {
  getTwitterData: PropTypes.func,
  twitterData: PropTypes.string
};