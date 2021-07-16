import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import axios from 'axios';
import PropTypes from 'prop-types';
import Schedule from './Posting/Schedule.jsx';
import Grid from '@material-ui/core/Grid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { alpha } from '@material-ui/core/styles';
import Checkbox from './Posting/Checkbox.jsx';
import Input from '@material-ui/core/Input';

const initialState = {
  tweet: {
    sendAt: '',
    payload: '',
    token: '',
    username: '',
  },
  youtube: {
    sendAt: '',
    payload: {},
  },
  form: {
    sendAt: '',
    title: '',
    description: '',
    file: null,
  }
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
  const [tweet, setTweet] = useState({ sendAt: '', payload: '', token: Cookies.get('twitter-auth-request'), username: Cookies.get('username') });
  const [youtube, setYouTube] = useState({ sendAt: '', payload: {} });
  const [form, setForm] = useState({ sendAt: '', title: '', description: '', file: null });
  const [mediaSelected, setMediaSelected] = React.useState({ youtube: false, twitter: false });

  useEffect(() => {
    setYouTube({sendAt: form.sendAt, payload: form });
    setTweet(prevData => { return {...prevData, sendAt: form.sendAt, payload: form.description }; });
  }, [form]);

  const handleFormData = (e) => {
    let value = event.target.name === 'file' ? event.target.files[0] : e.target.value;
    setForm({...form, [e.target.name]: value });
  };

  const handlePostRouting = () => {
    if (mediaSelected.youtube && mediaSelected.twitter) {
      debugger;
      Promise.allSettled([postTweet(), postVideo()]);
    } else {
      if (mediaSelected.twitter) {
        postTweet();
      }
      if (mediaSelected.youtube) {
        postVideo();
      }
    }
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
      url: '/jobs/schedule-twitter',
      data: tweet
    };
    if (tweet.payload !== '') {
      if (tweet.sendAt < new Date()) {
        axios(immediatePost).then(() => { setForm(initialState.form); setTweet(initialState.youtube); }).catch(err => { console.log(err); });
      } else {
        axios(scheduledPost).then(() => { setForm(initialState.form); setTweet(initialState.youtube); }).catch(err => { console.log(err); });
      }
    } else {
      alert('Tweet cannot be empty');
    }
  };
  const postVideo = async function () {

    var videoData = new FormData();

    await videoData.append('videoFile', youtube.payload.file);
    await videoData.append('title', youtube.payload.title);
    await videoData.append('description', youtube.payload.description);


    var immediatePost = {
      method: 'post',
      url: '/api/youtube/upload',
      data: videoData
    };
    var scheduledPost = {
      method: 'post',
      url: '/jobs/schedule-youtube',
      data: {
        sendAt: youtube.sendAt,
        payload: videoData
      }
    };
    debugger;
    if (youtube.payload !== '') {
      if (youtube.sendAt < new Date()) {
        axios(immediatePost).then(() => { setForm(initialState.form); setYouTube(initialState.form); }).catch(err => { console.log(err); });
      } else {
        axios(scheduledPost).then(() => { setForm(initialState.form); setYouTube(initialState.form); }).catch(err => { console.log(err); });
      }
    } else {
      alert('YouTube details cannot be empty');
    }
  };

  return (
    <div>
      <Grid item container direction="column" lg={12} spacing={4} >
        <div className="post-container">
          <section className="post-interface">
            <section>
              <Checkbox setMediaSelected={setMediaSelected}/>
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
                disableUnderline={true}
                accept="video/mp4"/>
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
                onClick={handlePostRouting}>
                Send Now
              </Button>
              <Button
                className={classes.post}
                endIcon={<AccessTimeIcon />}
                variant="contained"
                color="primary"
                onClick={handlePostRouting}>
                Schedule Later
              </Button>
              <Schedule setForm={setForm} date={form.sendAt} />
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