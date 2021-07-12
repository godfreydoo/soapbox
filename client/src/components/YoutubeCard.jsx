import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import YouTubeIcon from '@material-ui/icons/YouTube';

const cardStyles = makeStyles((theme) => ({
  root: {
    width: 360,
  },
  media: {
    width: 360,
    height: 202.50
  },
}));

const YTurl = 'https://www.youtube.com/embed/tVCYa_bnITg';

const YoutubeCard = function(props) {
  const classes = cardStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        title="Fireship"
        subheader="5 months ago"
        avatar={
          <Avatar src="https://yt3.ggpht.com/ytc/AKedOLTcIl6kKt3lEPJEySUf_hpHiKDKiFeo9eWPReLysQ=s48-c-k-c0x00ffffff-no-rj"/>
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
        title="100s of reduce"
        component='iframe'
        src={YTurl}
      />
      <CardContent>
        <b>Array Reduce in 100 seconds</b><br/>
        Learn JavaScript's Array Reduce method in 100 seconds. Take many things and reduce them down to one thing.
      </CardContent>
    </Card>
  );
};

export default YoutubeCard;