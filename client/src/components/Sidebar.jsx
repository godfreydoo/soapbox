import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom';
import Compose from './Compose';
import PropTypes from 'prop-types';
import axios from 'axios';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  typeography: {
    flexGrow: 1,
    align: 'center'
  },
}));

const cardStyles = makeStyles((theme) => ({
  youtube: {
    'margin-left': '5px',
    'margin-top': '1em',
    'height': '65px',
    'background-color': '#c4302b',
    'margin-bottom': '20px',
    'border-radius': '100px',
    'width': '65px',
    'transition': '.8s',
  },
  twitter: {
    'margin-left': '5px',
    'margin-top': '1em',
    'height': '65px',
    'backgroundColor': '#00ACEE',
    'margin-bottom': '20px',
    'border-radius': '100px',
    'width': '65px',
    'transition': '.8s',
  },
  btncontainer: {
    'display': 'flex',
    'flex-direction': 'column',
    'flex-wrap': 'wrap',
    'align-items': 'stretch',
    'align-content': 'space-around',
  },
  compose: {
    'margin-left': '5px',
    'margin-top': '1em',
    'height': '65px',
    'backgroundColor': 'primary',
    'margin-bottom': '20px',
    'border-radius': '100px',
    'width': '65px',
    'transition': '.8s',
  }
}));

const cardStylesOpen = makeStyles((theme) => ({
  youtube: {
    'margin-left': '5px',
    'margin-top': '1em',
    'height': '100px',
    'background-color': '#c4302b',
    'margin-bottom': '20px',
    'border-radius': '100px',
    'width': '100px',
    'transition': '.8s',
  },
  twitter: {
    'margin-left': '5px',
    'margin-top': '1em',
    'height': '100px',
    'backgroundColor': '#00ACEE',
    'margin-bottom': '20px',
    'border-radius': '100px',
    'width': '100px',
    'transition': '.8s',
  },
  btncontainer: {
    'display': 'flex',
    'flex-direction': 'column',
    'flex-wrap': 'wrap',
    'align-items': 'stretch',
    'align-content': 'space-around',
  },
  compose: {
    'margin-left': '5px',
    'margin-top': '1em',
    'height': '100px',
    'backgroundColor': 'primary',
    'margin-bottom': '20px',
    'border-radius': '100px',
    'width': '100px',
    'transition': '.8s',
  }
}));


export default function MiniDrawer({ getYoutubeData, twitterAuth, twitterUsername, getTwitterData, setApplicationAuth }) {
  let buttonclasses;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  if (open) {
    buttonclasses = cardStylesOpen();
  } else {
    buttonclasses = cardStyles();

  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Soapbox
          </Typography>
          <Typography variant="h6" noWrap>
            <div className='twitter-account-container'>
              {twitterUsername ? `${twitterUsername}'s Feed` : null}
            </div>
          </Typography>
          <Link
            className='nav-link'
            to='/login'
            onClick={() => {
              setApplicationAuth(false);
              axios.get('/auth/twitter/logout');
            }}>
            <Button color="inherit">Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <p>Social Media Options</p>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Button className={buttonclasses.youtube}
            onClick={() => {
              getYoutubeData();
            }}
            endIcon={<YouTubeIcon />}
            variant="contained"
            color="primary" >
            {open ? 'YouTube' : 'YT'}
          </Button>
          <Divider />
          <Button className={buttonclasses.twitter}
            onClick={() => {
              if (!twitterAuth) {
                window.location.replace('/auth/twitter/callback');
              } else {
                getTwitterData();
              }
            }}
            endIcon={<TwitterIcon />}
            variant="contained"
            color="primary" >
            {open ? 'Twitter' : 'TW'}
          </Button>
        </List>
        <Divider />
        <Compose open={open}/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

MiniDrawer.propTypes = {
  setApplicationAuth: PropTypes.func,
  twitterAuth: PropTypes.bool,
  twitterUsername: PropTypes.string,
  getTwitterData: PropTypes.func,
  getYoutubeData: PropTypes.func
};

export {cardStyles, cardStylesOpen};
