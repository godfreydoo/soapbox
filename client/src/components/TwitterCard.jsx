import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import TwitterIcon from '@material-ui/icons/Twitter';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShareIcon from '@material-ui/icons/Share';

const cardStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 15,
    width: 360,
  },
  media: {
  },
  retweet: {
    transform: 'scaleX(1)',
  }
}));

const TwitterCard = function(props) {
  const classes = cardStyles();
  const { text: message, user: {profile_image_url: avatar, name, location, screen_name: screenname}} = props.tweet;

  const handleRetweet = function () {
    console.log('This is retweet');
  };

  const handleLike = function () {
    console.log('This is like');
  };

  return (
    <>
      {avatar && (<Card className={classes.root}>
        <CardHeader
          title={name}
          subheader={`@${screenname}`}
          avatar={
            <Avatar src={avatar}/>
          }
          action={
            <TwitterIcon
              fontSize="large"
              style={{color: '00ACEE'}}
            />
          }
        />
        <CardContent>
          {message}
        </CardContent>
        <CardActions>
          <IconButton aria-label="reply" onClick={handleRetweet}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton aria-label="retweet" onClick={handleRetweet}>
            <RepeatIcon className={classes.retweet}/>
          </IconButton>
          <IconButton aria-label="like" onClick={handleLike}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={handleLike}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>)}
    </>
  );
};

TwitterCard.propTypes = {
  tweet: PropTypes.object,
};

export default TwitterCard;