import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import axios from 'axios';

const Post = function() {

  const [tweet, setTweet] = useState('');

  const handleOnChange = (e) => {
    setTweet(e.target.value);
  };

  const postTweet = function () {
    var token = Cookies.get('twitter-auth-request');
    let config = {
      method: 'post',
      url: '/twitter/tweet',
      header: {
        Authorization: `Bearer ${token}`
      },
      data: tweet
    };
    console.log(config);
    axios(config)
      .then(() => {
        console.log('Tweet has posted');
      })
      .catch(err => {
        console.log(err);
      });
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
          value={tweet}
          onChange={handleOnChange}
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
      </div>
    </>

  );
};

export default Post;