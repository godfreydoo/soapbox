import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import axios from 'axios';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const initialState = '';
const cardStyles = makeStyles((theme) => ({
  post: {
    backgroundColor: '#c4302b',
  },
  media: {
    backgroundColor: '#00ACEE',
  },
}));

const Post = function(props) {
  const [tweet, setTweet] = useState('');
  const classes = cardStyles();

  const handleOnChange = (e) => {
    setTweet(e.target.value);
  };

  const addMedia = function () {
    console.log('Media attached');
  };

  const postTweet = function () {
    if (tweet !== '') {
      var token = Cookies.get('twitter-auth-request');
      let config = {
        method: 'post',
        url: '/twitter/tweet',
        header: {
          'authorization': `Bearer ${token}`
        },
        data: {status: tweet}
      };
      axios(config)
        .then(() => {
          setTweet(initialState);
        })
        // .then(() => {
        //   setTimeout(props.getTwitterData2(), 3000);
        // })
        .catch(err => {
          console.log(err);
        });
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
          value={tweet}
          onChange={handleOnChange}
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
      </Grid>
    </Grid>

  );
};

Post.propTypes = {
  getTwitterData2: PropTypes.func
};

export default Post;