import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import youtubeImg from './assets/youtube.png';
import twitterImg from './assets/Twitter-Logo.png';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

// const cards = [{name: 'Youtube', image: './assets/youtube.png' }, 2, 3, 4, 5, 6, 7, 8, 9];

export default function WelcomePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className="main-background">
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
           SoapBox
            </Typography>
          </Toolbar>
        </AppBar>
        <main className="main-welcome">
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <CardMedia src="./assets/youtube.png"/>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              SoapBox
              </Typography>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Be.Heard.
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                {'Welcome to SoapBox. Your hub for social media aggrigation. Find all of your favorite Social\
              Media applications in one place so you don\'t have to keep switching apps to keep up your presence.'}
              </Typography>
            
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card >
                  <CardMedia
                    className={classes.cardMedia}
                    image={youtubeImg}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Your YouTube Channel
                    </Typography>
                    <Typography>
                      View your videos, see metrics and upload videos right from here!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card >
                  <CardMedia
                    className={classes.cardMedia}
                    image={twitterImg}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Your Twitter Feed
                    </Typography>
                    <Typography>
                      See your Tweets, get analytics and write Tweets from one dashboard!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}