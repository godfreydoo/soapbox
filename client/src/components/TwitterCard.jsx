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
  const { text: message, user: {profile_image_url: avatar, name, location, screen_name}} = props.tweet;
  console.log(props.tweet);
  return (
    <>
    {avatar && (<Card className={classes.root}>
      <CardHeader
        title={name}
        subheader={`@${screen_name}`}
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
      {/* <CardMedia
        className={classes.media}
        image="https://i.imgur.com/kc9gSnm.png"
      /> */}
      <CardContent>
        {message}
      </CardContent>
    </Card>)}
    </>
  );
};

export default TwitterCard;