/* eslint-disable react/jsx-key */
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
import Typography from '@material-ui/core/Typography';

const twitterTimeConverter = function (twTime) {
  const year = twTime.slice(-4);
  const month = twTime.slice(4, 7);
  const day = twTime.slice(8, 10);
  if (day[0] === '0') {
    day = day[1];
  }
  return `${month} ${day}, ${year}`;
};

const cardStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 15,
    width: 'auto',
    transition: '.8s',
    backgroundColor: '#f7fbff',
    '&:hover': {
      // borderRadius: 50'
      boxShadow: '0 5px 5px 2px #00ACEE',
      transform: 'scale(1.05)'
    }
  },
  cardHeader: {
    'font-weight': 'bold',
  },
  retweet: {
    transform: 'rotate(90deg)',
  },
  cardContent: {
    '&:hover': {
      backgroundColor: '#f0f7ff',
    }

  },
  title: {
    // fontWeight: "fontWeightBold"
    color: 'red'
  },
  cardActionsIcons: {
    justifyContent: 'center'
  }
}));

const TwitterCard = function(props) {
  const classes = cardStyles();
  const { text: message, favorite_count: favoriteCount, retweet_count: retweetCount, created_at: posted, user: {profile_image_url: avatar, name, location, screen_name: screenname}, entities: { hashtags}} = props.tweet;

  const statistics = {
    Favorite: favoriteCount,
    Retweet: retweetCount
  };

  const handleReply = function () {

  };

  const handleRetweet = function () {
    console.log('This is retweet');
  };

  const handleLike = function () {
    console.log('This is like');
  };

  return (
    <>
      {avatar && (<Card className={classes.root} onClick={props.setActivePostMetrics.bind(null, statistics)}>
        {/* {avatar && (<Card className={classes.root}> */}
        <CardHeader
          className={classes.cardHeader}
          title={<b>{name}</b>}
          subheader={`@${screenname} • ${twitterTimeConverter(posted)}`}
          avatar={
            <Avatar src={avatar}/>
          }
          action={
            <TwitterIcon
              fontSize="large"
              style={{color: '#00ACEE'}}
            />
          }
        />
        <CardContent className={classes.cardContent}>
          {message}
          <br />
          <br />
          {hashtags.length > 0 && hashtags.map((hash) => (<b style={{color: '#00ACEE'}}>{`#${hash.text} `}</b>))}
        </CardContent>
        <CardActions className={classes.cardActionsIcons}>
          <IconButton aria-label="reply">
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton aria-label="retweet">
            <RepeatIcon className={classes.retweet}/>
          </IconButton>
          <IconButton aria-label="like">
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>)}
    </>
  );
};

TwitterCard.propTypes = {
  tweet: PropTypes.object,
  setActivePostMetrics: PropTypes.func,
};

export default TwitterCard;