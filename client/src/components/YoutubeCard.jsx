import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import YouTubeIcon from '@material-ui/icons/YouTube';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ShareIcon from '@material-ui/icons/Share';

const ytTimeConverter = function(ytTime) {
  const monthWords = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };
  const year = ytTime.slice(0, 4);
  const month = monthWords[parseInt(ytTime.slice(5, 7)).toString()];
  const day = ytTime.slice(8, 10);

  return `${month} ${day}, ${year}`;
};

const cardStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 15,
    transition: '.8s',
    backgroundColor: '#fffafa',
    '&:hover': {
      boxShadow: '0 5px 5px 2px #c4302b',
      transform: 'scale(1.05)'
    }
  },
  cardHeader: {
    backgroundColor: '#fff5f5'
  },
  cardActions: {
    justifyContent: 'center',
    margin: 'auto',
    alignItems: 'center',

  },
  videoTitle: {
    '&:hover': {
      backgroundColor: '#fff5f5'
    }
  },
  media: {
    justifyContent: 'center',
    margin: 'auto',
    alignItems: 'center',
  },
  desc: {
    maxHeight: 300,
    'overflow-y': 'auto',
    'overflow-x': 'hidden'
  }
}));

// const YTurl = 'https://www.youtube.com/embed/tVCYa_bnITg';

const YoutubeCard = function(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [didClickedLikeDislike, setDidClickedLikeDislike] = useState(false);
  const { id, snippet: { channelId, channelTitle, title, description, publishedAt }, statistics} = props.yt;
  const { likeCount, dislikeCount, viewCount } = statistics;
  const [likes, setLikes] = useState(likeCount);
  const [dislikes, setDislikes] = useState(dislikeCount);
  const YTurl = `https://www.youtube.com/embed/${id}`;
  const avatar = 'https://yt3.ggpht.com/ytc/AKedOLR2ex_eFpC5a9xnkQqAYITEjBAYD1VUhTJmC0LN=s88-c-k-c0x00ffffff-no-rj';

  const handleExpandClick = function() {
    setIsExpanded(!isExpanded);
  };

  const handleLike = function() {
    if (!didClickedLikeDislike) {
      var count = parseInt(likes) + 1;
      setDidClickedLikeDislike(true);
      setLikes(count);
    }
  };
  const handleDislike = function() {
    if (!didClickedLikeDislike) {
      var count = parseInt(dislikes) + 1;
      setDidClickedLikeDislike(true);
      setDislikes(count);
    }
  };

  const classes = cardStyles();

  return (
    <Card className={classes.root} onClick={props.setActivePostMetrics.bind(null, statistics)}>
      <CardHeader
        className={classes.cardHeader}
        title={<b>{channelTitle}</b>}
        avatar={
          <Avatar src={avatar}/>
        }
        action={
          <YouTubeIcon
            fontSize="large"
            style={{color: '#c4302b'}}
          />
        }
      />
      <CardMedia
        justify="center"
        className={classes.media}
        title={title}
        component='iframe'
        src={YTurl}
      />
      <CardActions className={classes.cardActions}>
        <IconButton size="small" aria-label="like" id="like" onClick={handleLike}>
          <ThumbUpIcon />
          {likes}
        </IconButton>
        <IconButton size="small" aria-label="dislike" id="dislike" onClick={handleDislike}>
          <ThumbDownAltIcon />
          {dislikes}
        </IconButton>
        <IconButton size="small" aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <CardContent className={classes.videoTitle}>
        <b>{title}</b><br/>
        {viewCount} views • {ytTimeConverter(publishedAt)}
      </CardContent>
      <CardActions>
        {!isExpanded ? <IconButton><ExpandMoreIcon onClick={handleExpandClick}></ExpandMoreIcon></IconButton>
          : <IconButton><ExpandLessIcon onClick={handleExpandClick}></ExpandLessIcon></IconButton>}
      </CardActions>
      {isExpanded && <CardContent className={classes.desc}>{description}</CardContent>}
    </Card>
  );
};

YoutubeCard.propTypes = {
  yt: PropTypes.object,
  setActivePostMetrics: PropTypes.func
};

export default YoutubeCard;