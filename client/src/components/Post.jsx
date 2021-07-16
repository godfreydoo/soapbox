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
import { alpha } from '@material-ui/core/styles';
import Checkbox from './Posting/Checkbox.jsx';
import Input from '@material-ui/core/Input';

const initialState = {
  sendAt: '',
  payload: '',
  token: '',
  username: '',
};

const cardStyles = makeStyles((theme) => ({
  post: {
    backgroundColor: '#c4302b',
    margin: '0 auto'
  },
  media: {
    backgroundColor: '#00ACEE',
  },
}));

const Post = function (props) {
  const classes = cardStyles();
  const [tweet, setTweet] = useState({
    sendAt: '',
    payload: '',
    token: Cookies.get('twitter-auth-request'),
    username: Cookies.get('username')
  });

  const [youtube, setYouTube] = useState({
    sendAt: '',
    payload: {},
  });

  const [form, setForm] = useState({
    sendAt: '',
    title: '',
    description: '',
    file: '',
  });

  useEffect(() => {
    setYouTube({sendAt: form.sendAt, payload: form });
    setTweet({sendAt: form.sendAt, payload: form.description });
  }, [form]);

  const handleFormData = (e) => {
    setForm(prevData => { return { ...prevData, [e.target.name]: e.target.value }; });
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
    <div>
      <Grid item container direction="column" lg={12} spacing={4} >
        <div className="post-container">
          <section className="post-interface">
            <section>
              <Checkbox />
            </section>
            <TextField
              style={{padding: '10px'}}
              id="outlined-helperText"
              name="title"
              label="Title"
              placeholder="Type your title here!"
              variant="outlined"
              multiline={true}
              rows={2}
              value={form.title}
              maxLength={100}
              onChange={handleFormData}
              fullWidth={true}/>
            <TextField
              style={{padding: '10px'}}
              id="outlined-helperText"
              name="description"
              label="Description"
              placeholder="Type your description here!"
              variant="outlined"
              multiline={true}
              rows={6}
              value={form.description}
              maxLength={5000}
              onChange={handleFormData}
              fullWidth={true}/>
            <section>
              <Input
                type="file"
                name="file"
                placeholder="Add Video"
                onChange={handleFormData}
                disableUnderline={true}/>
            </section>
          </section>
          <section className="post-preview">
          Hello
          </section>
        </div>
        <div>
          <section className="post-submit">
            <Grid item container lg={12} justifyContent="center">
              <Button
                className={classes.post}
                endIcon={<SendIcon />}
                variant="contained"
                color="primary"
                onClick={postTweet}>
                Send Now
              </Button>
              <Button
                className={classes.post}
                endIcon={<PhotoLibraryIcon />}
                variant="contained"
                color="primary">
                Schedule Later
              </Button>
              <Schedule setTweet={setTweet} date={tweet.sendAt} />
            </Grid>
          </section>
        </div>
      </Grid>
    </div>
  );
};

Post.propTypes = {
  getTwitterData2: PropTypes.func,
};

export default Post;