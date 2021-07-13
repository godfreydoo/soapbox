import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';



const Post = function() {
  return (
    <>
      <div>
        <TextField
          id="outlined-helperText"
          label="Message"
          defaultValue="Type your message here!"
          variant="outlined"
          multiline="true"
          rows={4}
          style={{width: 300}}
        />
      </div>
      <div>
        <Button
          endIcon={<SendIcon />}
          variant="contained"
          color="primary"
        >
          Send
        </Button>
      </div>
    </>

  );
};

export default Post;