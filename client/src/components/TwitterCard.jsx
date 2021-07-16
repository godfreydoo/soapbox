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

const cardStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 15,
    width: 'auto',
  },
  media: {
  },
}));

const TwitterCard = function(props) {
  const classes = cardStyles();
  const { text: message, user: {profile_image_url: avatar, name, location, screen_name: screenname}} = props.tweet;
  // console.log(props.tweet);
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

TwitterCard.propTypes = {
  tweet: PropTypes.object,
};

export default TwitterCard;