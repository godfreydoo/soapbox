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

const cardStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 15
  },
  media: {
    width: 360,
    height: 202.50
  },
}));

const YTurl = 'https://www.youtube.com/embed/tVCYa_bnITg';

const YoutubeCard = function(props) {
<<<<<<< HEAD
<<<<<<< HEAD
  const { id, snippet: { channelId, channelTitle, title, description }, statistics} = props.yt;
=======
  const [isExpanded, setIsExpanded] = useState(false);
  const { id, snippet: { channelId, channelTitle, title, description, publishedAt }, statistics} = props.yt;
>>>>>>> 29ad95e14cd5eddda4f48bd58e6e3a83e5cc38da
=======
  const [isExpanded, setIsExpanded] = useState(false);
  const { id, snippet: { channelId, channelTitle, title, description }, statistics} = props.yt;
>>>>>>> devin
  const YTurl = `https://www.youtube.com/embed/${id}`;
  const avatar = 'https://yt3.ggpht.com/ytc/AKedOLR2ex_eFpC5a9xnkQqAYITEjBAYD1VUhTJmC0LN=s88-c-k-c0x00ffffff-no-rj';

  const handleExpandClick = function() {
    setIsExpanded(!isExpanded);
  };

  const classes = cardStyles();

  return (
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
      <CardContent>
        <b>{title}</b><br/>
        {isExpanded && description}
      </CardContent>
      <CardActions>
        {!isExpanded ? <ExpandMoreIcon onClick={handleExpandClick}></ExpandMoreIcon> : <ExpandLessIcon onClick={handleExpandClick}></ExpandLessIcon>}
      </CardActions>
    </Card>
  );
};

YoutubeCard.propTypes = {
  yt: PropTypes.object,
  setActivePostMetrics: PropTypes.func
};

export default YoutubeCard;