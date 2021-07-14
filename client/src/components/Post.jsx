import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import axios from 'axios';
import PropTypes from 'prop-types';
import Schedule from './Schedule.jsx';

const initialState = {
  sendAt: '',
  twitterPayload: {
    status: '',
  },
  twitterToken: ''
};

const Post = function(props) {
  const [tweet, setTweet] = useState({
    sendAt: '',
    twitterPayload: {
      status: '',
    },
    twitterToken: Cookies.get('twitter-auth-request')
  });
  console.log(tweet);

  const handleDateTimeOnChange = (e) => {
    setTweet(prevDetails => { return { ...prevDetails, sendAt: new Date() }; });
  };

  const handleStatusOnChange = (e) => {
    setTweet(prevDetails => { return { ...prevDetails, twitterPayload: { status: e.target.value } }; });
  };

  const postTweet = function () {
    var immediatePost = {
      method: 'post',
      url: '/twitter/tweet',
      header: {
        'authorization': `Bearer ${Cookies.get('twitter-auth-request')}`
      },
      data: {status: tweet.twitterPayload.status}
    };
    var scheduledPost = {
      method: 'post',
      url: '/jobs/schedule',
      data: tweet
    };

    if (tweet !== '') {
      if (tweet.sendAt === '') {
        axios(immediatePost).then(() => { setTweet(initialState); }).catch(err => { console.log(err); });
      } else {
        axios(scheduledPost).then(() => { setTweet(initialState); }).catch(err => { console.log(err); });
      }
    } else {
      alert('Tweet cannot be empty');
    }
  };

  return (
    <>
      <div>
        <TextField
          id="outlined-helperText"
          label="Message"
          placeholder="Type your message here!"
          variant="outlined"
          multiline={true}
          rows={4}
          style={{width: 300}}
          value={tweet.twitterPayload.status}
          onChange={handleStatusOnChange}
        />
      </div>
      <div>
        <Button
          endIcon={<SendIcon />}
          variant="contained"
          color="primary"
          onClick={postTweet}
        >
          Send
        </Button>
        <Schedule handleDateTimeOnChange={handleDateTimeOnChange}/>
      </div>
    </>

  );
};

Post.propTypes = {
  getTwitterData2: PropTypes.func
};

export default Post;