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
import Grid from '@material-ui/core/Grid';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const initialState = {
  sendAt: '',
  payload: '',
  token: '',
  username: '',
};

const cardStyles = makeStyles((theme) => ({
  post: {
    backgroundColor: '#c4302b',
  },
  media: {
    backgroundColor: '#00ACEE',
  },
}));

const Post = function (props) {
  const [tweet, setTweet] = useState({
    sendAt: '',
    payload: '',
    token: Cookies.get('twitter-auth-request'),
    username: Cookies.get('username')
  });
  const classes = cardStyles();

  const handleStatusOnChange = (e) => {
    setTweet(prevDetails => { return { ...prevDetails, payload: e.target.value }; });
  };

  const addMedia = function () {
    console.log('Media attached');
  };

  const postTweet = function () {
    var immediatePost = {
      method: 'post',
      url: '/twitter/tweet',
      header: {
        'authorization': `Bearer ${Cookies.get('twitter-auth-request')}`
      },
      data: { status: tweet.payload }
    };
    var scheduledPost = {
      method: 'post',
      url: '/jobs/schedule',
      data: tweet
    };
    if (tweet.payload !== '') {
      if (tweet.sendAt < new Date()) {
        axios(immediatePost).then(() => { setTweet(initialState); }).catch(err => { console.log(err); });
      } else {
        axios(scheduledPost).then(() => { setTweet(initialState); }).catch(err => { console.log(err); });
      }
    } else {
      alert('Tweet cannot be empty');
    }
  };

  return (
    <Grid item container direction="column" lg={12} spacing={4} >
      <Grid item container lg={12} justifyContent="center">
        <TextField
          id="outlined-helperText"
          label="Message"
          placeholder="Type your message here!"
          variant="outlined"
          multiline={true}
          rows={4}
          value={tweet.payload}
          onChange={handleStatusOnChange}
          fullWidth={true}
        />
      </Grid>
      <Grid item container lg={12} justifyContent="center">
        <ButtonGroup fullWidth={true}>
          <Button
            className={classes.post}
            endIcon={<SendIcon />}
            variant="contained"
            color="primary"
            onClick={postTweet}>
            Send
          </Button>
          <Button
            className={classes.post}
            endIcon={<PhotoLibraryIcon />}
            variant="contained"
            color="primary"
            onClick={addMedia}>
            Photo/Video
          </Button>
        </ButtonGroup>
        <Schedule setTweet={setTweet} date={tweet.sendAt} />
      </Grid>
    </Grid>
  );
};

Post.propTypes = {
  getTwitterData2: PropTypes.func,
};

export default Post;