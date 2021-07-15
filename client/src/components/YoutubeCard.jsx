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

const cardStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 15,
    transition: '.8s',
    '&:hover': {
      boxShadow: '0 5px 5px 2px #c4302b',
      transform: 'scale(1.05)'
    }
  },
  media: {
    width: 360,
    height: 202.50
  },
}));

const YTurl = 'https://www.youtube.com/embed/tVCYa_bnITg';

const YoutubeCard = function(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id, snippet: { channelId, channelTitle, title, description }, statistics} = props.yt;
  const YTurl = `https://www.youtube.com/embed/${id}`;
  const avatar = 'https://yt3.ggpht.com/ytc/AKedOLR2ex_eFpC5a9xnkQqAYITEjBAYD1VUhTJmC0LN=s88-c-k-c0x00ffffff-no-rj';

  const handleExpandClick = function() {
    setIsExpanded(!isExpanded);
  };

  const classes = cardStyles();

  return (
    // <Card className={classes.root}>
    <Card className={classes.root} onClick={props.setActivePostMetrics.bind(null, statistics)}>
      <CardHeader
        title={channelTitle}
        // subheader="5 months ago"
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
        className={classes.media}
        title={title}
        component='iframe'
        src={YTurl}
      />
      <CardActions>
        <IconButton aria-label="like">
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="dislike">
          <ThumbDownAltIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <b>{title}</b><br/>
      </CardContent>
      <CardActions>
        {!isExpanded ? <IconButton><ExpandMoreIcon onClick={handleExpandClick}></ExpandMoreIcon></IconButton>
          : <IconButton><ExpandLessIcon onClick={handleExpandClick}></ExpandLessIcon></IconButton>}
      </CardActions>
      {isExpanded && <CardContent>{description}</CardContent>}
    </Card>
  );
};

YoutubeCard.propTypes = {
  yt: PropTypes.object,
  setActivePostMetrics: PropTypes.func
};

export default YoutubeCard;