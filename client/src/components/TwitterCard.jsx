import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import TwitterIcon from '@material-ui/icons/Twitter';

const cardStyles = makeStyles((theme) => ({
  root: {
    width: 360,
  },
  media: {
    width: 360,
    height: 300
  },
}));

const YTurl = 'https://www.youtube.com/embed/tVCYa_bnITg';

const TwitterCard = function(props) {
  const classes = cardStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        title="THE DOM @the_dommer"
        subheader="1 hr ago"
        avatar={
          <Avatar src="https://i.imgur.com/mXnMTOe.png"/>
        }
        action={
          <TwitterIcon
            fontSize="large"
            style={{color: '00ACEE'}}
          />
        }
      />
      <CardMedia
        className={classes.media}
        image="https://i.imgur.com/kc9gSnm.png"
      />
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </CardContent>
    </Card>
  );
};

export default TwitterCard;